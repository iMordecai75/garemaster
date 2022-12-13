const pool = require('../db');

async function getPersonalBest(vasca, categoria = '', stagione = 0) {
    try {
        let cond = [];
        let query = 'SELECT `id`,`atleta`,`codice_fiscale`,`denominazione`,`lunghezza_vasca`,`descrizione`,`luogo`,`data_risultato`,`sigla_categoria`,`tempo_base`,`tempo_ufficiale`,`punteggio`,`data_nascita`,`tipo_cronometraggio`,`descrizione_breve`,`stagione`,`sesso` '
            + ' FROM gare INNER JOIN (SELECT MIN(tempo_ufficiale) AS tempo, codice_gara FROM `gare` WHERE lunghezza = ? ';        
        cond.push(vasca);

        if (categoria != '') {
            query = query + 'AND `sigla_categoria` =? ';
            cond.push(categoria);
        }
        if (stagione > 0) {
            query = query + 'AND `stagione` =? ';
            cond.push(stagione);
        }

        query += ' GROUP BY codice_gara) AS pb ON pb.codice_gara = gare.codice_gara AND pb.tempo = gare.tempo_ufficiale';
        query = query + ' ORDER BY gare.codice_gara ASC';
        
        const [result] = await pool.query(query, cond);

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPersonalBest
}