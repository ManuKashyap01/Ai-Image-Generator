import mongoose from "mongoose";

const connectDB=(url)=>{
    /* The "strictQuery" option enforces strict mode for queries, which means that any query that references a field that is not defined in the schema will throw an error. 
    This helps to prevent unexpected behavior and ensures that data is consistent with the defined schema.
    */
    mongoose.set('strictQuery',true)

    mongoose.connect(url)
        .then(()=>console.log('Database connected'))
        .catch((err)=>console.log('Error in database',err))
}

export default connectDB