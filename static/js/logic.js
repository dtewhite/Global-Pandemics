function buildChart(data) {
    
    // Cast confirmed cases as integers
    // data.forEach(function(data) {
    //     data.confirmed_cases = +data.confirmed_cases;
    //     console.log(data.confirmed_cases)
    //   });

    let tbody = d3.select("tbody");

    tbody.html("");

    // This is an attempt to format the numbers w/ commas
    // data.confirmed_cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    data.slice(0,20).forEach((dataRow) => {
        var row = tbody.append("tr"); 
        Object.values(dataRow).forEach((val) => {
            var cell = row.append("td");
            cell.text(val);
        });
    })

    // let svgWidth = 300;
    // let svgHeight = 300;

    // let margin = {
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0
    // };

    // let width = svgWidth - margin.left - margin.right;
    // let height = svgHeight - margin.top - margin.bottom;

    // let svg = d3.select("#bar")
    // .append("svg")
    // .attr("width", svgWidth)
    // .attr("height", svgHeight);

    // // will this clear out previous graph? should we not even be using svg to create a plotly graph?
    // svg.html("");

    // let chartGroup = svg.append("g")
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    // .attr("id", "chart");


    let tenBiggest = data.slice(0,5)

    let countries = tenBiggest.map(data => data.country)
    let cases = tenBiggest.map(data => data.confirmed_cases)

    var trace = {
        x: countries,
        y: cases,
        type: "bar"
      };
      
      var data = [trace];
      
      var layout = {
        xaxis: { title: "Country" },
        yaxis: { title: "Cases"}
      };
      
      Plotly.newPlot("bar", data, layout);     
}
