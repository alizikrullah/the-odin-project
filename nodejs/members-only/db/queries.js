const pool = require('./pool');

async function getUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
}

async function createUser(name, email, hashedPassword) {
    await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [name, email, hashedPassword]
    );
}

async function updateUserRole(id, role) {
    await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, id]);
}

async function getAllPosts() {
    const { rows } = await pool.query(
        'SELECT posts.*, users.name FROM posts JOIN users ON posts.user_id = users.id ORDER BY created_at DESC'
    );
    return rows;
}

async function createPost(title, content, userId) {
    await pool.query(
        'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3)',
        [title, content, userId]
    );
}

async function deletePost(id) {
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
}

module.exports = {
    getUserByEmail,
    createUser,
    updateUserRole,
    getAllPosts,
    createPost,
    deletePost,
};