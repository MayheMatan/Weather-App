const apiManager = new APIManager()
const renderer = new Renderer()

const msToTime = duration => Math.floor((duration / (1000 * 60 * 60)) % 24)

const loadPage = async() => {
    let currentTime = new Date()
    await apiManager.getDataFromDB()
    for (let city of apiManager.cityData) {
        const cityTime = moment(city.updatedAt, "ddd, h:mm A").toDate()
        const hoursPassed = msToTime(currentTime - cityTime);
        if (hoursPassed >= 3) {
            await apiManager.updateCity(city.name)
        }
    }
    renderer.renderData(apiManager.cityData)
}


const handleSearch = async cityInput => {
    await apiManager.getCityData(cityInput)
    renderer.renderData(apiManager.cityData)
}


$("#search-button").click(() => {
    handleSearch($("#city-input").val())
    $("#city-input").val("")
})


$("#results").on("click", ".add-button", function() {
    const cityName = $(this).siblings(".left-content").find("p").text().split(',');
    apiManager.saveCity(cityName[0]);
    renderer.renderData(apiManager.cityData)
})

$("#results").on("click", ".remove-button", function() {
    const cityName = $(this).siblings(".left-content").find("p").text().split(',');
    apiManager.removeCity(cityName[0])
    renderer.renderData(apiManager.cityData)
})

$("#results").on("click", ".refresh-button", async function() {
    const cityName = $(this).siblings(".left-content").find("p").text().split(',');
    await apiManager.updateCity(cityName)
    renderer.renderData(apiManager.cityData)
});

loadPage();