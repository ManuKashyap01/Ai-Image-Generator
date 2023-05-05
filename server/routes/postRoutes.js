import express from "express";
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'

import Post from "../mongodb/models/post.js";

dotenv.config()

/*The const keyword is used to declare a constant variable named router, which is assigned the value returned by the express.Router() function. 
This function creates a new router object that can be used to define routes for handling HTTP requests. 
Once the router object is created, it can be used to define routes using the router.METHOD() functions, where METHOD is the HTTP method (e.g. GET, POST, PUT, DELETE, etc.) that the route should handle.
*/
const router=express.Router()

// export the router to be used as middleware in index.js file
export default router