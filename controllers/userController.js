const pool = require('../db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

async function userLogin(username, plainPassword) {
    try {
        const [user] = await getUserByUsername(username);
        const { id, password } = user;        
        const logged = await bcrypt.compare(plainPassword, password);
        
        if (logged) {
            const user = {
                username: username,
                password: password
            }

            const token = jwt.sign({ user: user }, 'secretkey'); //, { expiresIn: '1h' }

            let query = 'UPDATE users SET token = ? WHERE id = ?';

            const [result] = await pool.query(query, [token, id]);

            return token;
        } else {
            return "User o Password errati";
        }
        
    } catch (error) {
        throw error;
    }
}

async function getUserByUsername(username) { 
    try {
        let query = 'SELECT `id`,`username`,`password`,`token`,`token_espiration` FROM users WHERE username = ?';

        const [result] = await pool.query(query, [username]);

        return result;
    } catch (error) {
        throw error;
    }
}

async function getUserById(id) {
    try {
        let query = 'SELECT `id`,`username`,`password`,`token`,`token_expiration`';
        query += 'FROM `users` WHERE `id` =?';

        const [result] = await pool.query(query, [id]);

        return result;
    } catch (error) {
        throw error;
    }
}

async function insertUser(user) {
    try {
        let { username, password, email } = user;
        let query = "INSERT INTO `users` (`username`, `password`, `email`) VALUES (?,?,?)";

        const hash = await bcrypt.hash(password, 10);

        let values = [];
        values.push(username);
        values.push(hash);
        values.push(email);

        const [result] = await pool.query(query, values);

        return result;
    } catch (error) {
        throw error;
    }
}

async function updateUser(id, user) { 
    try {
        let { username, password, email } = user;

        let query = "UPDATE `users` SET `username` = ?, `password` = ?, `email` = ? WHERE `id` = ?";

        let values = [];
        values.push(username);
        values.push(password);
        values.push(email);
        values.push(id);

        const [result] = await pool.query(query, values);

        return result;
    } catch (error) {
        throw error;
    }
}

async function deleteUser(id) { 
    try {
        let query = "DELETE FROM users WHERE id = ?";

        const [result] = await pool.query(query, [id]);

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
    userLogin
}