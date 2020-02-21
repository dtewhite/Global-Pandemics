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

    map.remove();

    let baseMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets", 
      accessToken: API_KEY
    })

    d3.select("#generateMap")
      .insert("div")
      .attr("id", "map")
      .attr("class", "col-lg-11 col-md-11 col-sm-11")

    // let container = L.DomUtil.get("map"); if(container != null){ container._leaflet_id = null; }

    let myMap = L.map("map", {
      center: [0, 0],
      zoom: 1.5
    });

    baseMap.addTo(myMap)
    
    for (var i = 0; i < data.length; i++) {
      let entry = data[i];
      let location = [data[i].latitude, data[i].longitude]
      // markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
      //   .bindPopup(response[i].descriptor));
      L.marker(location)
        .bindPopup("<h4>" + entry.country + "</h4> <hr> <h6>Confirmed Cases " + entry.confirmed_cases + "</h6>")
        .addTo(myMap)
    }
    // myMap.invalidateSize()
}

function initMap(data) {
    // let container = L.DomUtil.get("map"); if(container != null){ container._leaflet_id = null; }

    let myMap = L.map("map", {
      center: [50, 0],
      zoom: 1.5
    });

    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets", 
      accessToken: API_KEY
    }).addTo(myMap);
}