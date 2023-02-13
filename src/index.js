const express = require("express")
const cors = require('cors')
const app = express()
const routesv1 = require("./routes/v1/indexRoutes")

app.use(cors());
app.use(express.json())
app.use("/api/v1", routesv1.router)

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public'))) // localhost:3001/static/dibujos/1.jpeg

app.use((err, req, res, next) => {
  console.log("Esta funcion captura todos los erroes de Express")
  console.log(err.stack)
  res.status(500).end()
})

// Mensaje arcoiris

function getRandomColor() {
  const colores = ["41","42","43","44","45","46"]
  const index =  Math.floor(Math.random() * 6);
  return colores[index];
}

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(
      `\x1b[${getRandomColor()}m%s\x1b[0m`,
      `[start] 🚀 Server listening on port ${PORT} 🚀`
    );
})