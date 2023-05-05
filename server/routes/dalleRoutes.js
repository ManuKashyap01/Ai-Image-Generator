import express from "express";
import * as dotenv from 'dotenv'
import { Configuration,OpenAIApi } from "openai";

dotenv.config()

/*The const keyword is used to declare a constant variable named router, which is assigned the value returned by the express.Router() function. 
This function creates a new router object that can be used to define routes for handling HTTP requests. 
Once the router object is created, it can be used to define routes using the router.METHOD() functions, where METHOD is the HTTP method (e.g. GET, POST, PUT, DELETE, etc.) that the route should handle.
*/
const router=express.Router()

const configuration=new Configuration({
    apiKey:process.env.OPENAI_KEY,
})

const openai=new OpenAIApi(configuration)

router.route('/').get((req,res)=>{
    res.send('Hello from inner dalle')
})

router.route('/').post(async (req,res)=>{
    try {
        const {prompt}=req.body
        // console.log(prompt)
        const aiResponse=await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'url'
        })

        const image=aiResponse.data.data[0].url

        res.status(200).send({photo:image})
    } catch (error) {
        console.log('error in post route of dalle',error)
        res.status(500).send(error)
    }
})
// export the router to be used as middleware in index.js file
export default router