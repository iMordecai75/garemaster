module.exports = {
    params: function (mode) {
        if (mode == 'staging') {
            return {
                host: '127.0.0.1',
                port: '3306',
                user: 'usr_book',
                password: 'U(7NeFgNd9pwu/Y',
                database: 'gare',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            }
        } else if (mode == 'produzione'){
            return {
                //host: '172.24.112.4',
                host: 'sql7.freemysqlhosting.net',
                port: '3306',
                //user: 'root',                
                //password: 'db-sql-garemaster!2023',
                //database: 'gare',
                user: 'sql7627766',
                password: '5IuLkrrI5p',
                database: 'sql7627766',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
            }
        }
    }
}