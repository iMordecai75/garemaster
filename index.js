const express = require('express');
const ehb = require('express-handlebars');
const cors = require('cors');
const app = express();

app.use(cors());
// C R U D
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
//Bootstrap
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

//Engine
app.engine('.hbs', ehb.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

// routes management
const authRoutes = require('./routes/auth/login');
const tokenRoutes = require('./routes/auth/token');
const userRoutes = require('./routes/api/user');
const utilsRoutes = require('./routes/api/utils');
const statRoutes = require('./routes/api/stat');
const gareRoutes = require('./routes/api/gare');

app.use('/auth/login', authRoutes);
app.use('/auth/token', tokenRoutes);
app.use('/api/user', userRoutes);
app.use('/api/utils', utilsRoutes);
app.use('/api/stat', statRoutes);
app.use('/api/gare', gareRoutes);

app.listen(4000, () => console.log('listening on port 4000'));