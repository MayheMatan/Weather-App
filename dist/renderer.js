class Renderer {
    renderData(cities) {
        const source = $("#weather-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({ cities })
        $("#results").empty().append(newHTML)
    }
}