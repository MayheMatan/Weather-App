const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String,
    sunrise: String,
    sunset: String,
    country: String,
});

const City = mongoose.model("City", citySchema);
module.exports = City;