const pool = require('../db');
const bcrypt = require("bcrypt");

async function userLogin(username, plainPassword) {
    try {
        const { id, password, apikey } = await getUserByUsername(username);
        const logged = await bcrypt.compare(plainPassword, password);

        if (logged) {
            return apikey;
        } else {
            return "User o Password errati";
        }

    } catch (error) {
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        let params = [
            {
                'key': 'username',
                'value': username
            }
        ];
        const [result] = await getUser(params);
   
        return result;
    } catch (error) {
        throw error;
    }
}

async function getUserById(id) {
    try {
        let params = [
            {
                'key': 'id',
                'value': id
            }
        ];
        const result = await getUser(params);

        return result;
    } catch (error) {
        throw error;
    }
}

async function getUserByApikey(apikey) {
    try {
        let params = [
            {
                'key': 'apikey',
                'value': apikey
            }
        ]
        const [result] = await getUser(params);

        return result;
    } catch (error) {
        throw error;
    }
}

async function getUser(params) {
    try {
        let query = 'SELECT `id`,`username`,`password`,`apikey` FROM users';
        let values = [];
        let where = [];
        
        params.forEach(element => {
            where.push(element.key + ' = ?');
            values.push(element.value);
        });
        
        query += ' WHERE ' + where.join(' AND ');
        
        const [result] = await pool.query(query, values);
        
        return result;
    } catch (error) {
        throw error;
    }
}

async function insertUser(user) {
    try {
        let { username, password, email } = user;
        let query = "INSERT INTO `users` (`username`, `password`, `email`, `apikey`) VALUES (?,?,?,?)";

        const hash = await bcrypt.hash(password, 10);
        const apikey = generateApikey(10);

        let values = [];
        values.push(username);
        values.push(hash);
        values.push(email);
        values.push(apikey);

        const [result] = await pool.query(query, values);

        return result;
    } catch (error) {
        throw error;
    }
}

async function updateUser(id, user) {
    try {
        let { username, password, email } = user;
        let query = '';
        let values = [];
        values.push(username);
        //controllo se è stata aggiornata la password
        if (password.lenght > 0) {
            query = "UPDATE `users` SET `username` = ?, `password` = ?, `email` = ?, `apikey` = ? WHERE `id` = ?";

            const hash = await bcrypt.hash(password, 10);
            values.push(hash);
        } else {
            query = "UPDATE `users` SET `username` = ?, `email` = ?, `apikey` = ? WHERE `id` = ?";
        }
        const apikey = generateApikey(10);

        values.push(email);
        values.push(apikey);
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

function generateApikey(lenght) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

module.exports = {
    getUserById,
    getUserByApikey,
    insertUser,
    updateUser,
    deleteUser,
    userLogin
}