import express from "express";
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import axios from 'axios'

import Post from "../mongodb/models/post.js";

dotenv.config()

/*The const keyword is used to declare a constant variable named router, which is assigned the value returned by the express.Router() function. 
This function creates a new router object that can be used to define routes for handling HTTP requests. 
Once the router object is created, it can be used to define routes using the router.METHOD() functions, where METHOD is the HTTP method (e.g. GET, POST, PUT, DELETE, etc.) that the route should handle.
*/

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API,
    api_secret:process.env.CLOUD_SECRET
})

const router=express.Router()

// GET ALL POSTS
router.route('/').get(async(req,res)=>{
    try {
        const posts=await Post.find({})
        res.status(200).json({success:true,data:posts})
    } catch (error) {
        res.status(500).json({success:false,message:error})
    }
})

// CREATE A POST
router.route('/').post(async(req,res)=>{
    try {
        // parameters coming from the frontend
        const {name,prompt,photo}=req.body
        
        // download image from openAI URL
        const imagePath=`temp/${Date.now()}.jpg`
        const writer=fs.createWriteStream(imagePath)
        const imageResponse=await axios.get(photo,{responseType:'stream'})
        imageResponse.data.pipe(writer)
        
        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        
        const cloudinaryResponse=(await cloudinary.uploader.upload(imagePath)).secure_url

        // this creates a new post in the database
        const newPost=await Post.create({
            name,
            prompt,
            photo:cloudinaryResponse,
        })

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting temporary file:', err);
          }
        });
        res.status(201).json({success:true,data:newPost})
    } catch (err) {
        res.status(500).json({message:'internal server error',err})
    }
    })

// export the router to be used as middleware in index.js file
export default router