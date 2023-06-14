const pool = require('../db');

async function tipoVasche() {
    try {
        const [result] = await pool.query('SELECT DISTINCT id_lunghezza_vasca, `lunghezza_vasca`,`lunghezza` FROM `gare`');

        return result;        
    } catch (error) {
        throw error;
    }
}

async function categorie() {
    try {
        const [result] = await pool.query('SELECT DISTINCT `id_categoria`,`sigla_categoria`,`categoria` FROM gare ORDER BY `sigla_categoria`');

        return result;
    } catch (error) {
        throw error;
    }
}

async function stagioni() {
    try {
        const [result] = await pool.query('SELECT DISTINCT `stagione` AS anno, CONCAT(stagione,"/",stagione+1) AS stagione FROM `gare` ORDER BY stagione');

        return result;
    } catch (error) {
        throw error;
    }
}

async function specialita() {
    try {
        const [result] = await pool.query('SELECT DISTINCT `id_tipo_gara`, `codice_gara`, `descrizione_breve`, `gara` FROM `gare` ORDER BY `codice_gara`');

        return result;
    } catch (error) {
        throw error;
    }
}

async function atleti() {
    try {
        const [result] = await pool.query('SELECT DISTINCT atleta, cognome, nome, codice_fiscale, data_nascita, sesso FROM gare ORDER BY cognome, nome');

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    tipoVasche,
    categorie,
    stagioni,
    specialita,
    atleti
};