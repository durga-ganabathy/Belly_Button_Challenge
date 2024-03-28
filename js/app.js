// Use the d3 library to read the sample.json from the url
const url= "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log("data is", data)
})

// To select the new sample
let sampleSelector = d3.select("#selDataset")

function init() {
    d3.json(url).then(function(data) {
        // let sampleSelector  = d3.select("#selDataset")
        // To get the sample names
        let sampleName = data.names
        // let sampleData = data.samples
        console.log("sample names are", sampleName)
        // Inserts the selected id from names
        for(let i=0;i<sampleName.length;i++){
          let sampleId = sampleName[i]
          sampleSelector.append("option").text(sampleId).property("value",sampleId)};

    // To Call the functions with the first id
        barChart(sampleName[0]);
        bubbleChart(sampleName[0]);
        sampleMetadata(sampleName[0]);
            })}
          
    init();


    // Updates the charts when the sample id is changed
    function optionChanged(sampleId){
        barChart(sampleId)
        bubbleChart(sampleId)
        sampleMetadata(sampleId)
        console.log("The sample id value is:",sampleId)
            }

    //  Horizontal Bar chart with the top 10 samples 
    function barChart(sampleId){
        d3.json(url).then(function(data) {
        // To get the samples data and store it in the array
            let sampleData_bar = data.samples; 
            console.log("Samples data:",sampleData_bar)
// Arrow function is used to filter and get the sample values, out_ids and otu_labels for that filtered sample id
// To check if the id property of each sample object from the array sampleData is equal to the sampleId
            let filteredValue_bar= sampleData_bar.filter(sample => sample.id == sampleId)
            let sampleValData_bar = filteredValue_bar[0]
            console.log("filtered value",filteredValue_bar)
            console.log("Sample data for the filtered id: ",sampleValData_bar)
            let x_sampleValues_bar = sampleValData_bar.sample_values;
            let y_otuIds_bar= sampleValData_bar.otu_ids;
            let otuLabels_bar = sampleValData_bar.otu_labels;

            // console.log("x is",x_sampleValues);
        //    console.log("y_otuIds", y_otuIds);
        //    console.log("otuLabels",otuLabels);

        // To display the top 10 OTUs based on the sample values
           let x_sampleSlice_bar =x_sampleValues_bar.slice(0, 10).reverse();
           let y_otuIdsSlice_bar = y_otuIds_bar.slice(0, 10).map(id => `OTU ${id}`).reverse();
           let otuLabelsSlice_bar = otuLabels_bar.slice(0, 10).reverse();
           console.log("Sample values for the filtered id: ", x_sampleSlice_bar);
           console.log("OTU IDs for the filtered id: ",y_otuIdsSlice_bar);
           console.log("OTU Labels for the filtered id:", otuLabelsSlice_bar);

        // To plot the bar chart
           let trace1 = {
           x: x_sampleSlice_bar,
           y: y_otuIdsSlice_bar,
           text: otuLabelsSlice_bar,
            name: "Belly-Button",
            type: "bar",
            orientation: "h"
         };
    
    // Data array
           let dataTrace = [trace1];
    // Apply a title to the layout
           let layout = {
              title: "<b>Top 10 OTU(bacteria) found in Belly-Button<br> of each id</b><br>",
              margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100 }
            
        }
        Plotly.newPlot("bar", dataTrace, layout);
    })};
    // barChart();

// Create a bubble chart that displays each sample.

    function bubbleChart(sampleId){
        d3.json(url).then(function(data) {
            // To get the samples and store it in sampleData array
           let sampleData = data.samples;
           

// Arrow function is used to filter and get the sample values, out_ids and otu_labels for that filtered sample id
// To check if the id property of each sample object from the array sampleData is equal to the sampleId
        
           let filteredValue = sampleData.filter(sample => sample.id == sampleId)
           let sampleValData = filteredValue[0]
           console.log("filtered value",filteredValue)
           console.log("Sample data for the filtered id: ",sampleValData)

           let sample_values = sampleValData.sample_values;
           let otu_ids= sampleValData.otu_ids;
           let otu_labels = sampleValData.otu_labels;

        //    console.log("Sample values for the filtered id: ", sample_values);
        //    console.log("OTU IDs for the filtered id: ",otu_ids);
        //    console.log("OTU Labels for the filtered id:", otu_labels);

        //    To plot the bubble chart
           let trace2 = {
            x:otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker:{
             color : otu_ids,
             size : sample_values,
             colorscale: 'Earth'
           }
    };
    
    // Data array
        let dataTrace2 = [trace2];

    // Apply a title to the layout
        let layout2 = {
                title:"<b>Bubble Chart for each id based <br> on sample size</b><br>",
                // showlegend: false,
                height: 800,
                width: 800,
                xaxis: {title: "OTU ID"}
              };
       
        Plotly.newPlot("bubble", dataTrace2, layout2);
      
        
    })};
    // bubbleChart();
    
    
    function sampleMetadata(sampleId){
        d3.json(url).then(function(data){
            console.log("sample id is:", sampleId)
            let MetadataSample = d3.select("#sample-metadata").html("")
            let metaData = data.metadata;
            let M_filteredValue = metaData.filter((sample) => sample.id == sampleId)
            let M_sampleValData = M_filteredValue[0]
            console.log("Individual's demographic information: ",M_filteredValue)

            // Build-in Javascript object that returns an array of key-value pairs
            key_value = Object.entries(M_sampleValData)
            key_value.forEach(([key, value]) => {
                    MetadataSample.append("h6").text(`${key}: ${value}`)});
          
        
    })};
   
    // sampleMetadata();
    
    