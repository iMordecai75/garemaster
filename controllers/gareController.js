const pool = require('../db');

async function getListGare(params) {
    try {
        const { stagione, categoria, specialita, vasca, page, limit } = params;
        let query = 'SELECT `id`,`atleta`,`codice_fiscale`,`denominazione`,`lunghezza_vasca`,`descrizione`,`luogo`,`data_risultato`,`sigla_categoria`,`tempo_base`,`tempo_ufficiale`,`punteggio`,`data_nascita`,`tipo_cronometraggio`,`descrizione_breve`,`stagione`,`sesso`';
        query += ' FROM `gare`';
        let where = [];
        let values = [];
        if (stagione) {
            where.push('stagione = ?');
            values.push(stagione);
        }
        if (categoria) {
            where.push('sigla_categoria =?');
            values.push(categoria);
        }

        if (specialita) {
            where.push('codice_gara =?');
            values.push(specialita);
        }

        if (vasca) {
            where.push('id_lunghezza_vasca =?');
            values.push(vasca);
        }

        if (where.length > 0) {
            query +=' WHERE '+ where.join(' AND ');
        }

        if (page && limit) {
            query += 'LIMIT? OFFSET?';
            values.push(page);
            values.push(limit);
        }

        const [result] = await pool.query(query, values);

        return result;
    } catch (error) {
        throw error; 
    }
}

module.exports = {
    getListGare,
};