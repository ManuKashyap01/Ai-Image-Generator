import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

// This will enable us to use environment variables comin from .env file
dotenv.config()

// this will start our express app
const app=express()

/*This code sets up Cross-Origin Resource Sharing (CORS) middleware for an Express.js application.

CORS is a security feature implemented by web browsers that restricts web pages from making requests to a different domain than the one that served the web page. 
This is done to prevent malicious websites from accessing sensitive data from other websites.

By using the cors() middleware, the Express.js application is allowing cross-origin requests from any domain. 
This means that the application can receive requests from other domains
*/
app.use(cors({
    origin:['https://creatify1.netlify.app','http://127.0.0.1:5173']
}))

/*This code sets up a middleware function in an Express.js application that parses incoming requests with JSON payloads. 

The express.json() function is used to create this middleware. The {limit:'50mb'}
option specifies the maximum size of the JSON payload that can be parsed, in this case, 50 megabytes. 

This is useful for preventing denial-of-service attacks or other malicious behavior that could overload the server with large payloads.
*/
app.use(express.json({limit:'50mb'}))

app.use('/api/v1/post',postRoutes)
app.use('/api/v1/dalle',dalleRoutes)

app.get('/',async (req,res)=>{
    res.send('Hello from server dall-e second draft')
})

const startServer=async ()=>{
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080,()=>{
            console.log('server has started on port http://localhost:8080')
        })
    } catch (error) {
        console.log('error in try catch of startServer',error)
    }
}

startServer()
