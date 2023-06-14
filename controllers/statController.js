const pool = require('../db');

async function supermaster(stagione) {
    try {
        
        const result = await statistiche(stagione, 5);
        return result;
    } catch (error) {
        throw error;
    }
}

async function ironmaster(stagione) {
    try {

        const result = await statistiche(stagione, 18);
        return result;
    } catch (error) {
        throw error;
    }
}

async function statistiche(stagione, limit) {
    try {
        let query = 'SELECT `id`,`atleta`,`codice_fiscale`,`denominazione`,`lunghezza_vasca`,`descrizione`,`luogo`,FROM_UNIXTIME(`data_risultato`) AS data_risultato,`sigla_categoria`,`tempo_base`,`tempo_ufficiale`,`punteggio`,`data_nascita`,`tipo_cronometraggio`,`descrizione_breve`,`stagione`,`sesso`'
            + ' FROM gare INNER JOIN('
            + ' SELECT MAX(punteggio) AS punti, codice_gara FROM`gare` WHERE stagione = ? GROUP BY codice_gara ORDER BY punti DESC LIMIT ?'
            + ') AS sm ON sm.punti = gare.punteggio AND sm.codice_gara = gare.codice_gara ORDER BY punteggio DESC';

        const [result] = await pool.query(query, [stagione, limit]);
        return result;
    } catch (error) {
        throw error;
    }
}

async function getPersonalBest(vasca, params) {
    try {
        const { stagione, categoria } = params;
        console.log(vasca, stagione, categoria);
        let cond = [];
        let query = 'SELECT `id`,`atleta`,`codice_fiscale`,`denominazione`,`lunghezza_vasca`,`descrizione`,`luogo`,FROM_UNIXTIME(`data_risultato`) AS data_risultato,`sigla_categoria`,`tempo_base`,`tempo_ufficiale`,`punteggio`,`data_nascita`,`tipo_cronometraggio`,`descrizione_breve`,`stagione`,`sesso` '
            + ' FROM gare INNER JOIN (SELECT MIN(tempo_ufficiale) AS tempo, codice_gara FROM `gare` WHERE lunghezza = ? ';
        cond.push(vasca);

        if (categoria) {
            query = query + 'AND `sigla_categoria` =? ';
            cond.push(categoria);
        }
        if (stagione > 0) {
            query = query + 'AND `stagione` =? ';
            cond.push(stagione);
        }

        query += ' GROUP BY codice_gara) AS pb ON pb.codice_gara = gare.codice_gara AND pb.tempo = gare.tempo_ufficiale';
        query = query + ' ORDER BY gare.codice_gara ASC';
        console.log(query);
        const [result] = await pool.query(query, cond);

        return result;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    supermaster,
    ironmaster,
    getPersonalBest
}