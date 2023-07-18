const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routes = require('./routes/routes')
const app = express();
require('./config/db').connect();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'https://task-manager-kshitij.vercel.app' }));


app.use('/', routes)

module.exports = app;