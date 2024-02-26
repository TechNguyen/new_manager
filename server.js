import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import Route from './src/routers/index.js'
import db from './src/config/database/index.js'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import appMiddleware from './src/middleware/app.middleware.js'
import path from 'path'
import { fileURLToPath } from 'url'
import {Redis} from 'ioredis'

// const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT || 8081;
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: false
}))


//Connect to database
db.connect()
//connect to redis
//cors
app.use(cors());
app.use(morgan('combined'))
//Route
appMiddleware(app);
Route(app);



//static file
app.use(express.static(path.join(__dirname,'public')));

//config route
app.listen(port,  () => {
    console.log(`Server start on ${port}`)
})  