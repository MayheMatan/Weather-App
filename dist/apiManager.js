class APIManager {
    constructor() {
        this.cityData = [];
    }
    getDataFromDB = async() => {
        const cities = await $.get('/cities')
        if (cities) {
            this.cityData = cities
        }
    }

    getCityData = async cityName => {
        const cityData = await $.get(`/city/${cityName}`);
        cityData.new = true;
        this.cityData.push(cityData);
    }

    saveCity = cityName => {
        for (let city of this.cityData) {
            if (cityName === city.name) {
                city.new = false;
                $.post(`/city`, city)
            }
        }
    }

    removeCity = cityName => {
        const cityIndex = this.cityData.findIndex(city => city.name === cityName);
        this.cityData.splice(cityIndex, 1);
        $.ajax({
            url: `/city/${cityName}`,
            type: "DELETE",
        });
    }

    updateCity = async cityName => {
        const response = await $.ajax({
            url: `./city/${cityName}`,
            method: "PUT",
            success: newCity => {
                const i = this.cityData.findIndex(city => city.name === cityName);
                this.cityData.splice(i, 1, newCity);
            }
        });
        return response;
    }
}