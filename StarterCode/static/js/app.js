const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Bar Graph   
function bargraphFunction(bargraph) {
  d3.json(url).then(function(data) {
      console.log(data);

        let samples = data.samples;
        // let firstsample = samples[0];
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

// Bubble Chart
function bubbleChart(bubble) {
  d3.json(url).then(function(data) {

    let samples = data.samples;
    // let firstsample = samples[0];
    let filteredData = samples.filter(sam => sam.id === bubble)[0];

    var trace2 = {
      x: filteredData.otu_ids,
      y: filteredData.sample_values,
      text: filteredData.otu_labels,
      mode: 'markers',
      marker: {
        size: filteredData.sample_values,
        color: filteredData.otu_ids
      }
    };
    
    var data = [trace2];
    
    var layout = {
      showlegend: false,
      height: 600,
      width: 1100
    };
    
    Plotly.newPlot('bubble', data, layout);

  });
};

// MetaData display
function metadataFunction(metadataBox) {
    d3.json(url).then(function(data) {

    let metadata = data.metadata;
    let filteredmetaData = metadata.filter(met => met.id == metadataBox);
    // console.log(filteredmetaData[0]);

    let result = filteredmetaData[0];

    let textBox = d3.select("#sample-metadata"); 
    textBox.html("");

    var info = [
      {key: "ID", value: result.id},
      {key: "Ethinicity", value: result.ethnicity},
      {key: "Gender", value: result.gender},
      {key: "Age", value: result.age},
      {key: "Location", value: result.location},
      {key: "BB Type", value: result.bbtype},
      {key: "W Frequency", value: result.wfreq}
    ];

    info.forEach(function(item) {
      textBox.append("h6")
        .text(item.key + ": " + item.value)
        .style("font-size", "12px");
    });
  })
};

// Dropdown Menu
function init() {
  let dropdownMenu = d3.select("#selDataset");

  d3.json(url).then(function(data) {

    let names = data.names;
    names.forEach((eachName) => {dropdownMenu.append("option").text(eachName)
      .property("value", eachName)}) 

        bargraphFunction(names[0])
        bubbleChart(names[0])
        metadataFunction(names[0])

      });
    };
init();

// Call all functions
function optionChanged(newValue) {
  bargraphFunction(newValue)
  bubbleChart(newValue)
  metadataFunction(newValue)
};
