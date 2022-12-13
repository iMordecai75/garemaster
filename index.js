const express = require('express');
const app = express();
// C R U D
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

// routes management
const utilsRoutes = require('./routes/api/utils');
const statRoutes = require('./routes/api/stat');
const pbRoutes = require('./routes/api/personalbest');
const gareRoutes = require('./routes/api/gare');

app.use('/api/utils', utilsRoutes);
app.use('/api/stat', statRoutes);
app.use('/api/personalbest', pbRoutes);
app.use('/api/gare', gareRoutes);

app.listen(4000, () => console.log('listening on port 4000'));