const utils = require('./controllers/utilsController');
const gare = require('./controllers/gareController');
const pb = require('./controllers/personalbestController');
const stat = require('./controllers/statController');


const vasche = async () => {
    try {
        const response = await utils.tipoVasche();

        console.log(response);

    } catch (error) {
        console.log(error);
    }
}

const categorie = async () => {
    try {
        const response = await utils.categorie();

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const stagioni = async () => {
    try {
        const response = await utils.stagioni();

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const specialita = async () => {
    try {
        const response = await utils.specialita();

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const listagare = async () => {
    try {
        const params = {
            //stagione: 2022,
            stagione: '',
            categoria: '',
            specialita: '',            
            //vasca: 1,
            vasca: '',
            page: 200,
            limit: 50
        }
        const response = await gare.getListGare(params);

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const garaitem = async () => {
    try {
        const response = await gare.getGaraById(1);

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const storegara = async () => {
    try {
        const gara = {
            cognome: 'MASCI',
            nome: 'FEDERICO',
            codice_fiscale: 'MSCFRC75D11H501C',
            societa: 'Flaminio Sporting Club',
            id_lunghezza_vasca: 1,
            meeting: '1° Meeting Olgiata',
            luogo: 'Roma',
            data_risultato: '1479596400',
            id_categoria: 68,
            tempo_ufficiale: '10333',
            punteggio: 814.938,
            data_nascita: '1975-04-11T00:00:00Z',
            id_tipo_cronometraggio: 2,
            codice_gara: '01',
            stagione: '2016',
            sesso: 'M'
        }
        const response = await gare.insertGara(gara);

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const updategara = async () => {
    try {
        const gara = {
            societa: 'Flaminio Sporting Club',
            id_lunghezza_vasca: 1,
            meeting: '1° Meeting Olgiata',
            luogo: 'Roma',
            data_risultato: '1479596400',
            id_categoria: 68,
            tempo_ufficiale: '10333',
            punteggio: 814.938,
            id_tipo_cronometraggio: 2,
            codice_gara: '01',
            stagione: '2023',
        }
        const response = await gare.updateGara(239, gara);

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const deletegara = async () => {
    try {
        const response = await gare.deleteGara(240);

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const personalbest = async () => {
    try {
        const vasca = 1;
        const categoria = 'M45';
        const stagione = 2013;
        const response = await pb.getPersonalBest(vasca);

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const statistiche = async () => { 
    try {
        const response = await stat.supermaster(2021);

        console.log(response);

        const response2 = await stat.ironmaster(2013);
        console.log(response2);
    } catch (error) {
        console.log(error);
    }
}

//vasche();
//categorie();
//stagioni();
//specialita();
//garaitem();
//storegara();
//updategara();
//deletegara();
//listagare();
//personalbest();
statistiche();