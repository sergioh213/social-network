const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser')
const db = require("./db/db.js");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bc = require("./db/bcrypt.js")
const bcrypt = require('./db/bcrypt')
const csurf = require('csurf')
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require("./s3");
const config = require("./config");
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const sessMiddleware = cookieSession({
       secret: `I'm always angry.`,
       maxAge: 1000 * 60 * 60 * 24 * 14
   })

app.use(sessMiddleware);
io.use(function(socket, next) {
    sessMiddleware(socket.request, socket.request.res, next);
});
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(csurf());
app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

app.use(express.static("./public"))

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/registration", (req, res) => {
    console.log("inside POST /Registration", req.body)
    const {first_name, last_name, email, password} = req.body
    if (
        first_name == ""
        || last_name == ""
        || email == ""
        || password == ""
    ) {
        res.json({
            error: "Please, fill in all the fields"
        })
    } else {
        bcrypt.hashPassword(password)
        .then(hashedPassword => {
            db.newUser(first_name, last_name, email, hashedPassword)
            .then(userInfo => {
                console.log("NEW USER SAVED!");
                req.session.user = {id: userInfo.id, first_name: first_name, last_name: last_name, email: email, hashedPassword: hashedPassword}
                console.log("logging req.session.user.id when it is created: ", req.session.user.id);
                res.json({
                    success: true,
                    id: userInfo.id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    hashedPassword: hashedPassword
                })
            }).catch(err => {
                console.log(err);
                res.json({
                    error: "Email already exists"
                })
            })
        }).catch(err => {
            console.log(err);
            res.json({
                error: "Ups, Something went wrong when encrypting the your password"
            })
        })
    }
})

app.post("/upload", uploader.single('file'), s3.upload, (req, res) => {
    console.log("we are here, and the file is: ", req.file.filename);
    db.changeUserPic(req.session.user.id, config.s3Url + req.file.filename).then(imgUrl => {
        res.json({
            success: true,
            url: imgUrl
        })
    })
})

app.get("/user", (req, res) => {
    db.getUserById(req.session.user.id).then(data => {
        res.json({
            ...data,
            image: data.image_url || '/content/default_profile_picture.png'
        })
    }).catch((err) => {
        console.log("logging error", err);
        res.sendStatus(500)
    })
})

app.get("/user/:id.json", (req, res) => {
    if (req.session.user.id == req.params.id) {
        res.json({
            redirect: true
        })
    } else {
        db.getUserById(req.params.id).then(data => {
            res.json({
                ...data,
                image: data.image_url || '/content/default_profile_picture.png'
            })
        })
    }
})

app.get("/friend/:id.json", (req, res) => {
    db.getCurrentStatus(req.session.user.id, req.params.id).then(data => {
        console.log("req.session.user.id: ", req.session.user.id, " req.params.id: ", req.params.id);
        res.json(data && {
            sessionUserId: req.session.user.id,
            status: data.status,
            senderId: data.sender_id,
            receiverId: data.receiver_id
        })
    }).catch(err => {
        console.log(err);
    })
})

app.post("/friend/:id.json", (req, res) => {
    console.log("req.params.id IN FRIEND REQUEST: ", req.params.id);
    db.setStatus(req.session.user.id, req.params.id).then(data => {
        console.log("current status (evfd): ", data);
        res.json({
            sessionUserId: req.session.user.id,
            status: 1,
            senderId: data.sender_id,
            receiverId: data.receiver_id
        })
    }).catch(err => {
        console.log(err);
    })
})

app.post("/terminate/:id.json", (req, res) => {
    console.log("beggining of delete post in server");
    db.deleteFriend(req.session.user.id, req.params.id).then(data => {
        res.json({
            sessionUserId: req.session.user.id,
            status: null,
        })
    }).catch(err => {
        console.log(err);
    })
})

app.post("/accept/:id.json", (req, res) => {
    console.log("beggining of accept post in server");
    db.acceptFriend(req.session.user.id, req.params.id).then(data => {
        console.log("Status accepted (friendship accepted): ", data);
        res.json({
            sessionUserId: req.session.user.id,
            status: 2,
            senderId: data.sender_id,
            receiverId: data.receiver_id
        })
    }).catch(err => {
        console.log(err);
    })
})

// app.get("/messages", (req, res) => {
//     db.getMessages().then( ({messages}) => {
//         res.json({
//             messages: messages
//         })
//     })
// })
//
// app.post("/messages", (req, res) => {
//     db.saveMessage(req.session.user.id, req.body.message).then( ({data}) => {
//         res.json({
//             data: data
//         })
//     })
// })

app.post("/bio", (req, res) => {
    console.log("req.body.bio: ", req.body.bio);
    db.saveBio(req.session.user.id, req.body.bio).then(bio => {
        console.log("bio on the server: ", bio);
        res.json({bio})
    })
})

app.post("/login", (req, res) => {
    db.getEmails(req.body.email).then(userInfo => {
        if (userInfo && userInfo.email) {
            bcrypt.checkPassword(req.body.password, userInfo.hashed_password)
                .then(passwordsMatch => {
                    if(passwordsMatch) {
                        req.session.user = {id: userInfo.id, firstName: userInfo.first_name, lastName: userInfo.last_name, email: userInfo.email, hashedPassword: userInfo.hashed_password}
                        res.json({
                            success: true,
                            id: userInfo.id,
                            first_name: userInfo.first_name,
                            last_name: userInfo.last_name,
                            email: userInfo.email,
                            hashedPassword: userInfo.hashed_password
                        })
                    } else {
                        res.json({
                            success: false,
                            error: 'Wrong password'
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        success: false,
                        error: 'Wrong password'
                    })
                })
        } else {
            res.json({
                success: false,
                error: 'Email not found'
            })
        }
    })
})

app.get("/welcome", (req, res) => {
    if(req.session.user){
        res.redirect("/")
    } else {
        res.sendFile(__dirname + '/index.html');
    }
})

app.get('/friendsWannabes.json', (req, res) => {
    console.log("in '/friends.json'");
    console.log("req.session.user.id :    ", req.session.user.id);
    db.getFriendsWannabes(req.session.user.id).then(friendsWannabes => {
        console.log("returned list of friends: ", friendsWannabes);
        res.json({ friendsWannabes })
    })
})

app.get('/logout', (req, res) => {
    req.session = null
    res.redirect('/welcome')
})

app.get('*', function(req, res) {
    if(!req.session.user) {
        res.redirect("/welcome")
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

let onlineUsers = {};

io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    if (!socket.request.session || !socket.request.session.user.id) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.user.id

    onlineUsers[socket.id] = userId
    console.log("onlineUsers after connection: ", onlineUsers);

    if (Object.values(onlineUsers).filter(
        id => id == userId
    ).length == 1) {
        // or db query to get the data, and pass it as the 2nd argument (better)
        db.getUserById(userId).then(userInfo => {
            socket.broadcast.emit('userJoined', {
                id: userId,
                user: userInfo
            })
            console.log("socket user: ", userInfo);
        })
    }

    db.getUsersByIds(Object.values(onlineUsers)).then(
        onlineUsers => socket.emit('onlineUsers', onlineUsers)
    )

    socket.on('disconnect', function() {
        io.emit('userLeft', userId)
        console.log(`socket with the id ${socket.id} is now disconnected`);
        console.log("onlineUsers after disconnect!! ", onlineUsers);
        delete onlineUsers[socket.id]
    });
    // io.sockets.sockets['jaflkjalkjefsukjh'].emit('hiDavid')

    ///// receiving from the client and the server fowards it to the other client ///////
    socket.on("privateMessage", data => {
        io.sockets.sockets[data.socketId].emit('privateMessage')
    })

    socket.on('thanks', function(data) {
        console.log(data);
    });

    socket.on("newMessage", message => {
        console.log("message received by the server: ", message);
        db.saveMessage(socket.request.session.user.id, message).then( data => {
            console.log("DATA   DATA   DATA: ", data);
            db.getUserById(userId).then(userInfo => {
                let newMessage = {
                    message: data.message,
                    sender_id: data.sender_id,
                    id: data.id,
                    created_at: data.created_at,
                    first_name: userInfo.first_name,
                    last_name: userInfo.last_name,
                    image_url: userInfo.image_url
                }
                io.sockets.emit("newMessage", newMessage)
            })
        })
    })

    db.getMessages().then( messages => {
        // console.log("GET MESSAGES IN SERVER: ", messages);
        socket.emit("chatMessages", messages)
    })

    socket.emit('welcome', {
        message: 'Welome. It is nice to see you'
    });
});
