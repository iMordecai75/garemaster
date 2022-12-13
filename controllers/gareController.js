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
            where.push('lunghezza =?');
            values.push(vasca);
        }

        if (where.length > 0) {
            query += ' WHERE ' + where.join(' AND ');
        }

        if (page && limit) {
            query += ' LIMIT ? OFFSET ?';
            values.push(parseInt(limit));
            values.push(parseInt(page));
        }

        const [result] = await pool.query(query, values);

        return result;
    } catch (error) {
        throw error;
    }
}

async function getGaraById(id) {
    try {
        let query = 'SELECT `id`,`atleta`,`codice_fiscale`,`denominazione`,`lunghezza_vasca`,`descrizione`,`luogo`,`data_risultato`,`sigla_categoria`,`tempo_base`,`tempo_ufficiale`,`punteggio`,`data_nascita`,`tipo_cronometraggio`,`descrizione_breve`,`stagione`,`sesso`';
        query += 'FROM `gare` WHERE `id` =?';

        const [result] = await pool.query(query, [id]);

        return result;
    } catch (error) {
        throw error;
    }
}

async function insertGara(gara) {
    try {
        let { cognome, nome, codice_fiscale, societa, lunghezza, meeting, luogo, data_risultato, sigla_categoria,
            tempo_ufficiale, punteggio, data_nascita, id_tipo_cronometraggio, codice_gara, stagione, sesso } = gara;

        let query = 'SELECT DISTINCT id_categoria, categoria FROM gare WHERE sigla_categoria = ?';
        const [categoria] = await pool.query(query, [sigla_categoria]);

        query = 'SELECT id_tipo_gara, descrizione_breve, gara FROM gare WHERE codice_gara = ?';
        const [tipo_gara] = await pool.query(query, [codice_gara]);

        query = 'INSERT INTO `gare` (`atleta`,`cognome`,`nome`,`codice_fiscale`,`denominazione`,`id_lunghezza_vasca`,'
            + '`lunghezza_vasca`,`lunghezza`,`descrizione`, `luogo`, `data_risultato`,`id_categoria`, `sigla_categoria`, `categoria`,'
            + '`tempo_base`, `tempo_ufficiale`, `punteggio`, `data_nascita`, `id_tipo_cronometraggio`, `tipo_cronometraggio`,'
            + '`id_tipo_gara`, `codice_gara`, `descrizione_breve`, `gara`, `stagione`, `sesso`) VALUES ('
            + '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        let values = [];
        values.push(cognome + ' ' + nome);
        values.push(cognome);
        values.push(nome);
        values.push(codice_fiscale);
        values.push(societa);        
        values.push(lunghezza == 25 ? 1 : 2);
        values.push(lunghezza + 'm');
        values.push(lunghezza);
        values.push(meeting);
        values.push(luogo);
        values.push(data_risultato);        
        values.push(categoria[0].id_categoria);
        values.push(sigla_categoria); 
        values.push(categoria[0].categoria);
        //tempo_base
        values.push('');
        values.push(tempo_ufficiale);
        values.push(punteggio);
        values.push(data_nascita);
        values.push(id_tipo_cronometraggio);
        values.push(id_tipo_cronometraggio == 1 ? "Manuale" : "Automatico");
        values.push(tipo_gara[0].id_tipo_gara);
        values.push(codice_gara);
        values.push(tipo_gara[0].descrizione_breve);
        values.push(tipo_gara[0].gara);
        values.push(stagione);
        values.push(sesso);

        const [result] = await pool.query(query, values);
        return result;

    } catch (error) {
        throw error;
    }
}

async function updateGara(id, gara) {
    try {
        let { societa, lunghezza, meeting, luogo, data_risultato, sigla_categoria,
            tempo_ufficiale, punteggio, id_tipo_cronometraggio, codice_gara, stagione } = gara;

        let query = 'SELECT DISTINCT id_categoria, categoria FROM gare WHERE sigla_categoria = ?';
        const [categoria] = await pool.query(query, [sigla_categoria]);

        query = 'SELECT id_tipo_gara, descrizione_breve, gara FROM gare WHERE codice_gara = ?';
        const [tipo_gara] = await pool.query(query, [codice_gara]);

        query = 'UPDATE gare SET denominazione =?, id_lunghezza_vasca =?, lunghezza_vasca =?, lunghezza =?, '
            + 'descrizione =?, luogo =?, data_risultato =?, id_categoria =?, sigla_categoria =?, categoria =?, '
            + 'tempo_ufficiale =?, punteggio =?, id_tipo_cronometraggio =?, tipo_cronometraggio =?, id_tipo_gara =?, '
            + 'codice_gara =?, descrizione_breve =?, gara =?, stagione =? WHERE id = ?';

        let values = [];
        values.push(societa);        
        values.push(lunghezza == 25 ? 1 : 2);
        values.push(lunghezza + 'm');
        values.push(lunghezza);
        values.push(meeting);
        values.push(luogo);
        values.push(data_risultato);
        values.push(categoria[0].id_categoria);
        values.push(sigla_categoria);        
        values.push(categoria[0].categoria);
        values.push(tempo_ufficiale);
        values.push(punteggio);
        values.push(id_tipo_cronometraggio);
        values.push(id_tipo_cronometraggio == 1 ? "Manuale" : "Automatico");
        values.push(tipo_gara[0].id_tipo_gara);
        values.push(codice_gara);
        values.push(tipo_gara[0].descrizione_breve);
        values.push(tipo_gara[0].gara);
        values.push(stagione);
        values.push(id);

        const [result] = await pool.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
}

async function deleteGara(id) {
    try {
        let query = "DELETE FROM gare WHERE id = ?";
        const [result] = await pool.query(query, [id]);

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getListGare,
    getGaraById,
    insertGara,
    updateGara,
    deleteGara
};