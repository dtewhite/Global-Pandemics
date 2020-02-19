function buildChart(data) {

    let tbody = d3.select("tbody");

    tbody.html("");

    // This is an attempt to format the numbers w/ commas
    // data.confirmed_cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    data.slice(0,20).forEach((dataRow) => {
        // use map to make a list of country & confirmed cases
        let row = tbody.append("tr"); 
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    })

    let tenBiggest = data.slice(0,5)

    let countries = tenBiggest.map(data => data.country)
    let cases = tenBiggest.map(data => data.confirmed_cases)

    let trace = {
        x: countries,
        y: cases,
        type: "bar"
      };
      
      let chartData = [trace];
      
      let layout = {
        xaxis: { title: "Country" },
        yaxis: { title: "Cases"}
      };
      
      Plotly.newPlot("bar", chartData, layout);   
      
      // let myMap = L.map("map", {
      //   center: [0, 0],
      //   zoom: 2
      // });

      // L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      //   maxZoom: 18,
      //   id: "mapbox.streets", 
      //   accessToken: API_KEY
      // }).addTo(myMap);

      for (var i = 0; i < data.length; i++) {
        var city = data[i];
        L.marker(city.location)
          .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
          .addTo(myMap);
      }
      
}
