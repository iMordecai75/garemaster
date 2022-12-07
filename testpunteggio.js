let calcolaPunteggio = (tempo, tempobase) => {
    let mtempo = (Math.floor(tempo / 10000) * 60000) + (tempo % 10000) * 10;
    let mtempobase = (Math.floor(tempobase / 10000) * 60000) + (tempobase % 10000) * 10;
    return (mtempobase / mtempo * 1000);
};

calcolaPunteggio(11427, 5636);
