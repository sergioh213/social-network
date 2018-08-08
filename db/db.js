const spicedPg = require("spiced-pg")

let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL)
} else {
    db = spicedPg('postgres:sergioherrero:password@localhost:5432/social-network');
}

exports.newUser = function(first_name, last_name, email, hashed_password) {
    const q = `
        INSERT INTO users (first_name, last_name, email, hashed_password)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `
    const params = [first_name, last_name, email, hashed_password]
    return db.query(q, params).then(results => {
        return results.rows[0]
    })
}

exports.saveBio = function(id, bio) {
    // console.log("bd, id: ", id, "bio: ", bio);
    const params = [id, bio];
    const q = `
        UPDATE users SET
        bio = $2
        WHERE id = $1
        RETURNING *;
        `;
    return db.query(q, params).then(userInfo => {
        // console.log("bio on the db: ", userInfo.rows[0].bio);
        return userInfo.rows[0].bio
    })
}

exports.getPasswordDB = function(email) {
    const params = [email]
    return db.query('SELECT hashed_password FROM users WHERE email = $1;', params)
        .then(results => {
            return results.rows[0]
        })
}

exports.getEmails = function(email) {
    const params = [email]
    return db.query('SELECT * FROM users WHERE email = $1;', params)
        .then(results => {
            return results.rows[0]
        })
}

exports.changeUserPic = function(user_id, image_url) {
    const params = [user_id, image_url];
    const q = `
        UPDATE users SET
        image_url = $2
        WHERE id = $1
        RETURNING *;
        `;
    return db.query(q, params).then(userInfo => {
        return userInfo.rows[0].image_url
    })
}

exports.getMessages = function() {
    const q = `
        SELECT chat.id, users.first_name, users.last_name, users.image_url, chat.message, chat.sender_id, chat.created_at
        FROM chat
        JOIN users
        ON chat.sender_id = users.id
        ORDER BY chat.id DESC LIMIT 10;
        `
        // 'SELECT * FROM chat ORDER BY id DESC LIMIT 10;'
    return db.query(q)
        .then(results => {
            console.log("results.rows in getMessages: ", results.rowsHEREEEE );
            return results.rows.sort( (a, b) => {
                return a.id - b.id
            })
        })
}

exports.saveMessage = function(userId, message) {
    const params = [userId, message]
    const q = `
            INSERT INTO chat (sender_id, message)
            VALUES ($1, $2)
            RETURNING *;
        `;
    return db.query(q, params).then(results => {
        console.log("HEREEEE results.rows[0] in post: ", results.rows[0]);
        return results.rows[0]
    })
}

exports.getUserById = function(id) {
    // console.log("logging id being passed to db getUserById: ", id);
    const params = [id]
    return db.query('SELECT * FROM users WHERE id = $1;', params)
        .then(results => {
            // console.log("logging results.rows[0] on db getUserById: ", results.rows[0]);
            return results.rows[0]
        })
}

exports.getCurrentStatus = function(sender_id, receiver_id) {
    const params = [sender_id, receiver_id]
    const q = `
        SELECT * FROM friendships
        WHERE ((sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1))
        `;
    return db.query(q, params).then(results => {
        console.log("results.rows[0] during get: ", results.rows[0]);
        return results.rows[0]
    }).catch(err => {
        return err
    })
}

exports.setStatus = function(sender_id, receiver_id) {
    const params = [sender_id, receiver_id]
    const q = `
        INSERT INTO friendships (sender_id, receiver_id)
        VALUES ($1, $2)
        RETURNING *;
        `;
    return db.query(q, params).then(results => {
        console.log("results.rows[0] in post: ", results.rows[0]);
        return results.rows[0]
    })
}

exports.deleteFriend = function(sender_id, receiver_id) {
    console.log("delete happening in db");
    const params = [sender_id, receiver_id]
    const q = `
        DELETE FROM friendships
        WHERE ((sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1));
        `;
    return db.query(q, params).then(results => {
        console.log("results.rows[0] in delete db: ", results.rows[0]);
        return results.rows[0]
    })
}

exports.acceptFriend = function(sender_id, receiver_id) {
    console.log("accept happening in db");
    const params = [sender_id, receiver_id]
    const q = `
        UPDATE friendships
        SET status = 2
        WHERE ((sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1));
        `;
    return db.query(q, params).then(results => {
        console.log("results.rows[0] in accept db: ", results.rows[0]);
        return results.rows[0]
    })
}

exports.getUsersByIds = function(ids) {
    const params = [ids]
    const q = `SELECT * FROM users WHERE id = ANY($1)`;
    return db.query(q, params).then(results => {
        console.log("results.rows in accept db: ", results.rows);
        return results.rows
    })
}

exports.getFriends = function(userid) {
    const params = [userid]
    const q = `SELECT * FROM friendships
        WHERE ((sender_id = $1 OR receiver_id = $1)
        AND (status = 2))
        `;
    return db.query(q, params).then(results => {
        console.log("getFriends: ", results.rows);
        return results.rows
    })
}

exports.getWannabes = function(userid) {
    const params = [userid]
    const q = `SELECT * FROM friendships
        WHERE (receiver_id = $1
        AND status = 1)
        `;
    return db.query(q, params).then(results => {
        console.log("getWannabes: ", results.rows);
        return results.rows
    })
}

exports.getFriendsWannabes = function(userId) {
    const params = [userId]

    const q = `
        SELECT users.id, first_name, last_name, image_url, status
        FROM friendships
        JOIN users
        ON (status = 1 AND receiver_id = $1 AND sender_id = users.id)
        OR (status = 2 AND receiver_id = $1 AND sender_id = users.id)
        OR (status = 2 AND sender_id = $1 AND receiver_id = users.id)
    `;

    return db.query(q, params).then(results => {
        console.log("getFriendsWannabes: ", results.rows);
        return results.rows
    })
}
