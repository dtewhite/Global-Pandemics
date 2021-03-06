function buildChart(data) {

    let tbody = d3.select("tbody");

    tbody.html("");

    data.slice(0,20).forEach((dataRow) => {
        let parsed = []
        parsed.push(dataRow.country)
        parsed.push(dataRow.confirmed_cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
        let row = tbody.append("tr"); 
        parsed.forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    })

    let tenBiggest = data.slice(0,5)

    let countries = tenBiggest.map(data => data.country)
    let cases = tenBiggest.map(data => data.confirmed_cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))

    let trace = {
        x: countries,
        y: cases,
        type: "bar",
        marker: {color: 'red'}
      };
      
    let chartData = [trace];
    
    let layout = {
      xaxis: { title: "Country",
        titlefont: {
          size: 16,
          color: 'white'
        },
        tickfont: {
          size: 14,
          color: 'white'
      }},
      yaxis: { title: "Cases",
        titlefont: {
          size: 16,
          color: 'white'
        },
        tickfont: {
          size: 14,
          color: 'white'
      }},
      plot_bgcolor:"black",
      paper_bgcolor:"black",
      border_bgcolor:"black"
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

    let myMap = L.map("map", {
      center: [0, 0],
      zoom: 1.5
    });

    baseMap.addTo(myMap)
    
    for (var i = 0; i < data.length; i++) {
      let entry = data[i];
      let location = [data[i].latitude, data[i].longitude]
      L.circleMarker(location, {
        fillOpacity: 0.5,
        color: "black",
        fillColor: "red",
        radius: Math.log(entry.confirmed_cases)*1.5
      }).bindPopup("<h6><strong>" + entry.country + "</strong></h6> <hr> <h6>Confirmed Cases " + entry.confirmed_cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</h6>")
        .addTo(myMap)
    }
}