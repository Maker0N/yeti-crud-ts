const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.static("src"));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json({ limit: "50mb", extended: true }))

const admins = [{
  login: 'admin',
  pass: 'admin'
}]

app.put('/login', (req, res) => {
  let isAuth
  admins.forEach(it =>
    it.login === req.body.login && it.pass === req.body.pass
    ? isAuth = true
    : isAuth = false
  )
  res.send(isAuth)
})

app.listen(PORT, () => console.log(`Server start on port: ${PORT}`, new Date()))