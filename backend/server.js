const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const adminRoutes = require('./routes/Admin.route');
require('dotenv').config()
const PORT = process.env.PORT

main()
.then("Connexion reussi à la base de donné")
.catch(err => console.log("Quelque chose s'est mal passé :",err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/SunCamp')
}

app.use(express.json())
app.use(cors())
app.use('/api/admin', adminRoutes);

app.listen(PORT, ()=>{
    console.log(`En ecoute sur le port ${PORT}`)
})