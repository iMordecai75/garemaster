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
                host: '',
                port: '',
                user: '',
                password: '',
                database: '',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
            }
        }
    }
}