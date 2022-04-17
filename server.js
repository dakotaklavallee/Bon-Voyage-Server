const express = require('express');
const cors = require('cors');
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
require('dotenv').config();
const axios = require('axios').default;

const app = express();

const router = express.Router();
const PORT = process.env.PORT || 8080;

router.get('/', cors(), (req, res) => {
  res.json({ message: 'Hello Heroku!' });
})

router.get("/restaurants", cors(), (req, res, next) => {
    const key = process.env.BING_API_KEY;
    const restaurauntURL = `https://dev.virtualearth.net/REST/v1/LocalSearch/?query=${req.query.query}&userLocation=${req.query.userLatitude},${req.query.userLongitude},${req.query.scale}&key=${key}`;
    async function serverFetchRests(){
        try{
            const data = await axios.get(restaurauntURL);
            console.log(data);
            res.json(data.data);
        }catch(error){
            next(error)
        }
    }
    serverFetchRests();
});

router.get("/bars", cors(), (req, res, next) => {
    const key = process.env.BING_API_KEY;
    const barURL = `https://dev.virtualearth.net/REST/v1/LocalSearch/?query=${req.query.query}&userLocation=${req.query.userLatitude},${req.query.userLongitude},${req.query.scale}&key=${key}`;
    async function serverFetchBars(){
        try{
            const data = await axios.get(barURL);
            console.log(data);
            res.json(data.data);
        }catch(error){
            next(error)
        }
    }
    serverFetchBars();
});

router.get("/coffeeandtea", cors(), (req, res, next) => {
    const key = process.env.BING_API_KEY;
    const coffeeURL = `https://dev.virtualearth.net/REST/v1/LocalSearch/?query=${req.query.query}&userLocation=${req.query.userLatitude},${req.query.userLongitude},${req.query.scale}&key=${key}`;
    async function serverFetchCoffee(){
        try{
            const data = await axios.get(coffeeURL);
            console.log(data);
            res.json(data.data);
        }catch(error){
            next(error)
        }
    }
    serverFetchCoffee();
});

router.get("/adventures", cors(), (req, res, next) => {
    const key = process.env.BING_API_KEY;
    const adventureURL = `https://dev.virtualearth.net/REST/v1/LocalSearch/?query=${req.query.query}&userLocation=${req.query.userLatitude},${req.query.userLongitude},${req.query.scale}&key=${key}`;
    async function serverFetchAdventures(){
        try{
            const data = await axios.get(adventureURL);
            console.log(data);
            res.json(data.data);
        }catch(error){
            next(error)
        }
    }
    serverFetchAdventures();
});

app.use('/', router);

//Route not found.
app.use(notFound);
//Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} `);
})

module.exports = app