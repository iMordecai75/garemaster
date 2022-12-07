#Elenco Tipo Vasche
SELECT DISTINCT id_lunghezza_vasca, `lunghezza_vasca`,`lunghezza` FROM `gare`;

#Elenco Categorie
SELECT DISTINCT `id_categoria`,`sigla_categoria`,`categoria` FROM gare ORDER BY `sigla_categoria`

#Elenco Stagioni
SELECT DISTINCT `stagione` FROM `gare` ORDER BY stagione

#Elenco Specialità
SELECT DISTINCT `id_tipo_gara`, `codice_gara`, `descrizione_breve`, `gara` FROM `gare` ORDER BY `codice_gara`

#gara/:specialita/:vasca?stagione=?&categoria=?
SELECT 
`id`,
`atleta`,
`codice_fiscale`,
`denominazione`,
`lunghezza_vasca`,
`descrizione`,
`luogo`,
`data_risultato`,
`sigla_categoria`,
`tempo_base`,
`tempo_ufficiale`,
`punteggio`,
`data_nascita`,
`tipo_cronometraggio`,
`descrizione_breve`,
`stagione`,
`sesso`
FROM gare
WHERE `codice_gara` = :specialita AND `lunghezza` = :vasca
(stagione=? AND id_categoria = ?)
ORDER BY `tempo_ufficiale`

#personalbest
SELECT 
`id`,
`atleta`,
`codice_fiscale`,
`denominazione`,
`lunghezza_vasca`,
`descrizione`,
`luogo`,
`data_risultato`,
`sigla_categoria`,
`tempo_base`,
`tempo_ufficiale`,
`punteggio`,
`data_nascita`,
`tipo_cronometraggio`,
`descrizione_breve`,
`stagione`,
`sesso`
FROM gare
INNER JOIN 
(SELECT MIN(tempo_ufficiale) AS tempo, `codice_gara` FROM gare WHERE `id_lunghezza_vasca` = 1 GROUP BY codice_gara) AS spec
ON spec.codice_gara = gare.codice_gara AND tempo = tempo_ufficiale
ORDER BY gare.codice_gara

#supermaster
SELECT 
`id`,
`atleta`,
`codice_fiscale`,
`denominazione`,
`lunghezza_vasca`,
`descrizione`,
`luogo`,
`data_risultato`,
`sigla_categoria`,
`tempo_base`,
`tempo_ufficiale`,
`punteggio`,
`data_nascita`,
`tipo_cronometraggio`,
`descrizione_breve`,
`stagione`,
`sesso`
FROM gare
INNER JOIN 
(SELECT MAX(punteggio) AS punti, `codice_gara` FROM gare WHERE `stagione` = 2021 GROUP BY codice_gara) AS spec
ON spec.codice_gara = gare.codice_gara AND punti = punteggio
ORDER BY gare.punteggio DESC
LIMIT 5