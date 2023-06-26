const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and process it    
function bargraphFunction(bargraph) {

  d3.json(url).then(function(data) {
      console.log(data);

        let samples = data.samples;
        // let firstsample = samples[0]
        let filteredData = samples.filter(sam => sam.id === bargraph)[0];

        let trace1 = {
            x: filteredData.sample_values.slice(0, 10).reverse(),
            y: filteredData.otu_ids.slice(0, 10).map(text => `OTU ${text}`).reverse(),
            type: 'bar',
            text: filteredData.otu_labels.slice(0, 10).reverse(),
            orientation: 'h'
        };

        let mapdata = [trace1];

        var layout = {
            title: 'Top 10 OTUs by Individual',
        };

        Plotly.newPlot('bar', mapdata, layout);

      });

  };

function init() {
  let dropdownMenu = d3.select("#selDataset");

  d3.json(url).then(function(data) {

    let names = data.names;
    names.forEach((eachName) => {dropdownMenu.append("option").text(eachName)
      .property("value", eachName)}) 

        bargraphFunction(names[0])

      });
    };

init();

function optionChanged(newValue) {
  bargraphFunction(newValue)
};
