const express = require('express');
const exphbs = require('express-handlebars'); //Manejo de vistas con handelbars
const path = require('path'); //Crear rutas
const icon8 = require('./icon8');
const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({ //Configuarion para usar handlebars
    defaultLayout: 'index.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs' //Indicamos que usaremos esta extensión en lugar de .handlebars
    //helpers: require('./lib/handlebars') //Incluimos las funciones helpers a handlebars
}));
app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false})); //Para que express acepte peticiones realizadas con formularios HTML
app.use(express.json()); //Para que express reciba y envie obejetos json

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/icons'));

// start server
app.listen(app.get('port'), () => console.log('Server started listening on port', app.get('port')));