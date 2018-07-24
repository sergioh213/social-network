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

app.use(
   cookieSession({
       secret: `I'm always angry.`,
       maxAge: 1000 * 60 * 60 * 24 * 14
   })
);
app.use(cookieParser());

// app.use(csurf())
// app.use(function(req, res, next) {
//    res.locals.csrfToken = req.csrfToken();
//    next();
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
            .then(results => {
                console.log("NEW USER SAVED!");
                req.session.user = {id: results.id, first_name: first_name, last_name: last_name, email: email, hashedPassword: hashedPassword}
                res.json({
                    success: true,
                    id: results.id,
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

// app.use((req, res, next) => {
//     console.log("middleware in use");
//     if(!req.session.user){
//         console.log("no user ID found, redirecting to signUp/logIn...");
//         res.redirect("/registration")
//     } else {
//         next()
//     }
// })

app.get("/welcome", (req, res) => {
    if(req.session.user){
        res.redirect("/")
    } else {
        res.sendFile(__dirname + '/index.html');
    }
})

app.get('/logout', (req, res) => {
    req.session = null
    res.redirect('/welcome')
})

app.get('*', function(req, res) {
    if(!req.session.user){
        res.redirect("/welcome")
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
