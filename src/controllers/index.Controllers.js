const fs = require('fs')
const { v4: uuid } = require('uuid')
const indexCtrl = {}
/* se convierte el arreglo de formato json a string */

const json_books = fs.readFileSync('src/books.json', 'utf-8')
let books = JSON.parse(json_books)

indexCtrl.renderIndex = (req, res) => {
  res.render('index', { books })
}

indexCtrl.renderCreate = (req, res) => {
  res.render('new-book')
}

indexCtrl.postCreate = (req, res) => {
  /* para no estar declarandolos uno a uno y todos son req.body, se crea asi */
  const { name, author, image, description } = req.body
  if (!name || !author || !image || !description) {
    res.status(400).send('no deben estar vacidos')
    return
  }
  let newBook = { id: uuid(), name, author, image, description }
  /* guarda los datos que estan en campos */
  books.push(newBook)
  /* Convierte un json en string para guardarlo y se almacena en una variable*/
  const json_books = JSON.stringify(books)
  /* con esta sentencia escribimos en el archivo json los datos importar fs */
  fs.writeFileSync('src/books.json', json_books, 'utf-8')
  res.redirect('/')

  /* console.log(req.body)*/
}
indexCtrl.getDelete = (req, res) => {
  /* esta sentencia de aqui abajo, realiza un recorrido del arreglo con condicional todos los datos sera agregados en el recorrido excepto el que coincida con el ID 
  que es el que se eliminara, y no se pintara*/
  books = books.filter((book) => book.id != req.params.id)
  const json_books = JSON.stringify(books)
  /* con esta sentencia escribimos en el archivo json los datos importar fs */
  fs.writeFileSync('src/books.json', json_books, 'utf-8')
  /* res.send('received') */
  res.redirect('/')
}

module.exports = indexCtrl
