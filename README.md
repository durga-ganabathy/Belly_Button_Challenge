# Belly_Button_Challenge

Link to my Interactive Dashboard:

https://durga-ganabathy.github.io/Belly_Button_Challenge/

STEPS FOR BELLY-BUTTON CHALLENGE:

1. Used the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

2. Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

. Used sample_values as the values for the bar chart.

. Used otu_ids as the labels for the bar chart.

. Used otu_labels as the hovertext for the chart.


3. Created a bubble chart that displays each sample.

 . Used otu_ids for the x values.

. Used sample_values for the y values.

. Used sample_values for the marker size.

. Used otu_ids for the marker colors.

. Used otu_labels for the text values.


4. Displayed the sample metadata, i.e., an individual's demographic information.

 . Displayed each key-value pair from the metadata JSON object somewhere on the page.


5. Plots gets updated when a new sample is selected.
   
6. created layout for the dashboard. 

7. Deployed the app to a free static page GitHub Pages.

References:

1. https://stackoverflow.com/questions/59974916/how-to-add-an-index-to-each-option-as-a-value

2. https://plotly.com/javascript/colorscales/

3. https://progate.com/docs/github-pages
