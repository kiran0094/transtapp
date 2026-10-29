import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { router } from './routes/index.js'

const app = express()
app.use(express.json())
dotenv.config()

app.use('/api/v1/',router);
const main=()=>{
    try{
        const dbUrl = process.env.DB_URL
        if (!dbUrl) {
            throw new Error('DB_URL is not set')
        }
        mongoose.connect(dbUrl)
    }
    catch(e){
        console.log("error in connecting DB")
    }

    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000')
    })
}
main()