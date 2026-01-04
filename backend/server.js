const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express()
const PORT = process.env.PORT || 3000
require('dotenv').config()
const path = require('path')


const adminRoutes = require('./routes/Admin.route');
const colonieRoutes = require('./routes/Colonie.route')
const contactRoutes = require('./routes/Contact.route')
const reservationRoutes = require('./routes/Reservation.route')



main()
.then("Connexion reussi à la base de donné")
.catch(err => console.log("Quelque chose s'est mal passé :",err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/SunCamp')
}

app.use(express.json())
app.use(cors())
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/api/admin', adminRoutes);
app.use('/api/colonies', colonieRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/reservation',reservationRoutes)


app.listen(PORT, ()=>{
    console.log(`En ecoute sur le port ${PORT}`)
})