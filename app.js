require('dotenv').config();
const userRoutes = require('./routes/index')
const bodyParser = require("body-parser");
const winston = require('winston');

const express = require('express')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', userRoutes.user);
app.use('/api/auth', userRoutes.auth);

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'info.log' })
    ]
  });

  logger.info(`Example app listening on port ${port}`)
})