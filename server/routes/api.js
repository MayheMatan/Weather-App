const express = require('express');
const router = express.Router();
const City = require('../models/City');
const axios = require("axios");
const moment = require("moment")

const createCity = city => {
    return {
        name: city.name,
        temperature: Math.floor(city.main.temp - 273.15),
        condition: city.weather[0].main,
        conditionPic: city.weather[0].icon,
        sunrise: moment(city.sys.sunrise).format("HH:mm"),
        sunset: moment(city.sys.sunset).format("HH:mm"),
        country: city.sys.country,
        updatedAt: city.dt
    }
}

router.get("/city/:cityName", (req, res) => {
    const { cityName } = req.params;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b4ff253ee2972c7a7db45a5679acb916`)
        .then(response => res.status(200).send(createCity(response.data)))
        .catch(error => res.send(error.message))
});

router.get("/cities", (req, res) => {
    City.find({}).then(results => res.send(results));
});

router.post("/city", (req, res) => {
    console.log(req.body) //TODO: ADD ONLLY RELAVENT CITY DETAILES
    const newCity = new City(req.body);
    newCity.save();
    res.end()
});

router.delete("/city/:cityName", (req, res) => {
    const { cityName } = req.params
    City.deleteOne({ name: cityName }).then(results => res.end());
});

router.put('/city/:cityName', async function(req, res) {
    const { cityName } = req.params
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b4ff253ee2972c7a7db45a5679acb916`)
    if (!response) { return res.send("0") }
    const city = new City(createCity(response.data))
    await City.deleteOne({ name: cityName })
    await city.save()
    res.send(city);
})


module.exports = router;