const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')

//initializations
const app = express()

app.use(express.json())

//settings
//indicarle al sistema que vamos a usar el puerto ya definido en la variable port si no que use el 4000
app.set('port', process.env.PORT || 4000)

//nos sirve para decirle al sistema la ruta de la carpeta de las vistas
app.set('views', path.join(__dirname, 'views'))

/* configuracion del motor de plantillas express-handlebars layout le indicamos que estara en esa capeta loyouts
y todas las paginas que agreguemos segun esta configuracion ya quedara enlazado con todas las paginas */
app.engine(
  '.hbs',
  exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
)
app.set('view engine', '.hbs')

//middlewares
//hay q arrancar morgan para que empieze a monitorear el sistema
app.use(morgan('dev'))
//sentencia para que los campos input se le puedan capturar sus valores
app.use(express.urlencoded({ extended: false })) //body formulario

//rutas publicas
app.use(require('./routes/index.routes'))

//static files
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app
