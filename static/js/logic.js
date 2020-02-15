function buildChart(data) {
    
    // Cast confirmed cases as integers
    // data.forEach(function(data) {
    //     data.confirmed_cases = +data.confirmed_cases;
    //     console.log(data.confirmed_cases)
    //   });

    let tbody = d3.select("tbody");

    tbody.html("");

    data.forEach((dataRow) => {
        // Append a row to the table body
        var row = tbody.append("tr"); 

        Object.values(dataRow).forEach((val) => {
            var cell = row.append("td");
            cell.text(val);
        });
    })
}
