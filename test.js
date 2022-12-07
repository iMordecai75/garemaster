utils = require('./controllers/utilsController');
gare = require('./controllers/gareController');


const vasche = async() => {
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
            stagione: 2021,
            categoria: '',
            specialita: '',
            vasca: 1,
            page: 0,
            limit: 50
        }
        const response = await gare.getListGare(params);

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

//vasche();
//categorie();
//stagioni();
//specialita();
listagare();