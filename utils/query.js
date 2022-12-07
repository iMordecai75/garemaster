var query = {
    action: '',
    table: '',
    fields: [],
    whereArray: [],
    joinArray: [],
    setArray: [],
    orderArray: [],
    groupByArray: [],
    insert : function (table) {
        this.action = 'insert';
        this.table = table;
    },
    update: function (table) {
        this.action = 'update';
        this.table = table;
    },
    delete: function (table) {
        this.action = 'delete';
        this.table = table;
    },
    select: function (field) {
        this.fields.push(field);
    },
    from: function (table) {
        this.action = 'select';
        this.table = table;
    },
    set: function (condition) {
        this.setArray.push(condition);
    },
    where: function (condition) {
        this.whereArray.push(condition);
    },
    join: function (type, condition) {
        this.joinArray.push(type + 'JOIN ' + condition);
    },
    order: function (field, direction) { 
        this.orderArray.push(field + ' ' + direction);
    },
    group: function (field) { 
        this.groupByArray.push(field);
    },
    toString: function () {
        let sql = '';

        switch (this.action) {
            case 'insert':
                sql = 'INSERT INTO' + this.table;
                break;
            case 'update':
                sql = 'UPDATE ' + this.table;
                break;
            case 'delete':
                sql = 'DELETE FROM' + this.table;
                break;
            case 'select':
                sql = 'SELECT ' + this.fields.join(', ');
                sql += 'FROM ' + table;
                break;
        }

        if (this.join.length > 0) {
            sql += '' + this.join.join(' ');
        }

        if (this.set.length > 0) {
            sql += '' + this.set.join(', ');
        }

        if (this.where.length > 0) {
            sql += ' WHERE ' + this.where.join(' AND ');
        }

        if (this.groupByArray.length > 0) {
            sql += 'GROUP BY' + this.groupByArray.join(', ');
        }

        if (this.orderArray.length > 0) {
            sql += 'ORDER BY' + this.orderArray.join(', ');
        }

        return sql;
    }
}