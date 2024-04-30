import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected to the database");
        })

        connection.on('error', (error) => {
            console.log("Error connecting to the database");
            console.log(error);
        })
    }
    catch(error){
        console.log("Error connecting to the database");
        console.log(error);
    }
}