const mysql = require('mysql');
const config = require('../config/config');

var database = function () {

    this.params = config.params();
    this.connection = mysql.createConnection(this.params);

    this.query = function (query, callback) {
        this.connection.query(
            query,
            function (err, values) {
                if (err) throw err;                
                callback(values);
            }            
        );
    }

    this.loadList = function (table, fields, where, callback) {
        let query = 'SELECT ' + fields.join(', ') + ' FROM ' + table;
        if (where.length > 0) {
            query += 'WHERE' + where.join(' AND ');
        }
        
        this.connection.query(
            query,
            function (err, values, fields) {
                if (err) throw err;
                callback(values);
            }
        );
    }

    this.loadItem = function (table, fields, id, callback) {
        let query = 'SELECT ' + fields.join(', ') + ' FROM ' + table + ' WHERE id=' + id;
        this.connection.query(
            query,
            function (err, values, fields) {
                if (err) throw err;
                callback(values[0]);
            }
        );
    }

    this.saveItem = function (table, fields, item, callback) { 
        let val = [];
        fields.forEach(key => {
            val.push("'" + item[key] + "'");
        });
        
        let query = 'INSERT INTO ' + table + ' (' + fields.join(', ') + ') VALUES (' + val.join(', ') + ')';
        this.connection.query(
            query,
            function (err, values, fields) {
                if (err) throw err;
                callback(values.insertId);
            }
        );

    }

    this.updateItem = function (table, id, fields, item, callback) {
        let set = [];
        fields.forEach(key => {
            set.push(key + " = '" + item[key] + "'");
        });

        let query = 'UPDATE ' + table + 'SET ' + set.join(', ') + ' WHERE id = ' + id;
        this.connection.query(
            query,
            function (err, values, fields) {
                if (err) throw err;
                callback(values);
            }
        );

    }

    this.deleteItem = function (table, id, callback) {
        let query = 'DELETE FROM' + table + 'WHERE id =' + id;
        this.connection.query(
            query,
            function (err, values, fields) {
                if (err) throw err;
                callback(values);
            }
        );
    }
}

module.exports = database;