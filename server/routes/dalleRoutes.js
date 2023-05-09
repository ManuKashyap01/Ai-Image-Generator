import express from "express";
import * as dotenv from 'dotenv'
import fetch from 'node-fetch'
import { Configuration,OpenAIApi } from "openai";

dotenv.config()

/*The const keyword is used to declare a constant variable named router, which is assigned the value returned by the express.Router() function. 
This function creates a new router object that can be used to define routes for handling HTTP requests. 
Once the router object is created, it can be used to define routes using the router.METHOD() functions, where METHOD is the HTTP method (e.g. GET, POST, PUT, DELETE, etc.) that the route should handle.
*/
const router=express.Router()

// const configuration=new Configuration({
//     apiKey:'api key',
// })

// const openai=new OpenAIApi(configuration)

router.route('/').get((req,res)=>{
    res.send('Hello from inner dalle')
})

router.route('/').post(async (req,res)=>{
    try {
        const {prompt}=req.body
        // console.log(prompt)
        const aiResponse=await fetch(
            `https://api.edenai.run/v2/image/generation`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.EDENAI_API_KEY}`
              },
              body: JSON.stringify({
                providers: 'openai',
                text: prompt,
                resolution: '512x512',
                num_images: 1
              })
            }
          );
        
        const data = await aiResponse.json();
        const image=data.openai.items[0].image_resource_url
        console.log(data,image);
        res.status(200).json({photo:image})
    } catch (error) {
        // used the if else clause below for debugging
    //     if (error.response) {
    //     console.log("Avatar error status: ", error.response.status);
    //     console.log("Avatar error data: ", error.response.data);
    //   } else {
    //     console.log("Avatar error message: ", error.message);
    //   }
        res.status(500).json(error)
    }
})
// export the router to be used as middleware in index.js file
export default router
