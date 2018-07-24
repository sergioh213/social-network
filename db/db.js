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
        RETURNING *
        `
    const params = [first_name, last_name, email, hashed_password]
    return db.query(q, params).then(results => {
        return results.rows
    })
}
