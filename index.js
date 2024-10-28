
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const taskRoute = require('./taskRoute')

const app = express()

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use('/task', taskRoute);

mongoose.connect('mongodb+srv://taruntarunksingh:LSfM9KZW6B4MxtxR@cluster0.hxfuk.mongodb.net/DEMO?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
});

app.listen(5000, () => {
    console.log('Server is running on the port 5000')
})

