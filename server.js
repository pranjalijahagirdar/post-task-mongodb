const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express')

const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
// const crypto = require('crypto').webcrypto;
// globalThis.crypto = crypto

require('dotenv').config();

const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json())

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Title is required field"],
        trim:true,
        minlength:[5, "Title must be at least 5 character"]
    },
    content:{
        type:String,
        required:[true, "Content is required"],
        trim:true
    },
    author:{
        type:String,
        required:[true, "Author is required"]
    },
    category:{
        type:String,
        required:[true, "Category is required"]
    }
},
{
    timestamps : true
});

const post = mongoose.model("posts", postSchema);

async function startServer(){
    try{
        if(!process.env.MONGODB_URI){
            throw new Error("Mongodb URI missing in env folder file")
        }

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongodb connected successfully!")

        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`)
        })

    }catch(err){
        console.log("Error", err.message)
        process.exit(1)
    }
}

startServer()