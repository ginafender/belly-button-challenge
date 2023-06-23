const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

let sample_values = Object.values(samples.sample_values);
let otu_ids = Object.values(samples.otu_ids);
let otu_labels = Object.values(samples.otu_labels);

// display default plot
function init() {
    let data = [{
        values: sample_values,
        labels: otu_ids,
        type: "bar"
    }];

    let layout = {
        height: 600,
        width: 800
    };

    Plotly.newPlot("bar", data, layout);
}