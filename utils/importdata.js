const fs = require('fs');
const db = require('./database');

let conn = new db();
let query = "SHOW COLUMNS FROM gare";
let fields = [];
let calcolaPunteggio = (tempo, tempobase) => {
    let mtempo = (Math.floor(tempo / 10000) * 60000) + (tempo % 10000) * 10;
    let mtempobase = (Math.floor(tempobase / 10000) * 60000) + (tempobase % 10000) * 10;
    return (mtempobase / mtempo * 1000);
};

conn.query(query, (values) => {
    values.forEach(element => {
        if (element.Field != 'id') {
            fields.push(element.Field);
        }        
    });
    fs.readdir(
        './data',
        'utf8',
        (error, arrFiles) => {
            if (error) {
                console.error(error);
                return;
            }
            for (let f of arrFiles) {                
                let read = fs.createReadStream(`${__dirname}/data/${f}`);
                read.on('error', (error) => {
                    console.log(f, error.message);
                });
                read.on('data', (data) => {
                    try {
                        let datajson = JSON.parse(data);
                        let gare = datajson.response.docs;

                        let insert = "";
                        gare.forEach(gara => {
                            gara['punteggio'] = calcolaPunteggio(gara['tempo_ufficiale'], gara['tempo_base']);

                            try {
                                conn.saveItem('gare', fields, gara, (values) => {
                                    console.log(values);
                                });
                            } catch (error) {
                                console.error(f, error);
                            }

                        });

                    } catch (error) {
                        console.error(f, error);
                    }
                });

            }
        }
    );

});


