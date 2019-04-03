let prapareData = {
  name: "Survey Questions",
  children: [
    {
      name: "Prevalence",
      children: [
        {
          name: "medicine or medical care",
          percent: 34
        },
        {
          name: "food",
          percent: 28
        },
        {
          name: "housing insecurity",
          percent: 16
        },
        {
          name: "utilities",
          percent: 14
        },
        {
          name: "clothing",
          percent: 9
        },
        {
          name: "phone service",
          percent: 7
        },
        {
          name: "transportation",
          percent: 5
        },
        {
          name: "child care",
          percent: 3
        }
      ]
    }
  ]
};

let prapareFiltered = prapareData.children[0].children;

// set the dimensions and margins of the graph
var margin = { top: 20, right: 250, bottom: 30, left: 200 },
  width = 1000 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// set the ranges
var y = d3
  .scaleBand()
  .range([height, 0])
  .padding(0.1);

var x = d3.scaleLinear().range([0, width]);

// set graph title

let titleSvg = d3
  .select("body")
  .append("svg")
  .style("font-size", "32px")
  .style("font-weight", "bold")
  .attr("id", "title")
  .attr("width", width + margin.left + margin.right)
  .attr("height", "100px")
  .append("text")
  .attr(
    "transform",
    "translate(" + margin.left * 5 + "," + margin.top * 1.5 + ")"
  )
  .attr("text-anchor", "end")
  .text("Common Social Determinants of Health Risk Factors (n = 1,400)");

let subTitle = d3
  .select("#title")
  .append("text")
  .style("font-size", "26px")
  .style("font-weight", "normal")
  .style("font-style", "italic")
  .attr("text-anchor", "end")
  .attr(
    "transform",
    "translate(" + margin.left * 4.47 + "," + margin.top * 3 + ")"
  )
  .attr("id", "subtitleText")
  .text(
    "Based on patient responses to select items from the PRAPARE assessment"
  );

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left * 2 + "," + margin.top + ")");

// format the data
prapareFiltered.forEach(function(d) {
  d.percent = +d.percent;
});

// Scale the range of the data in the domains
x.domain([
  0,
  d3.max(prapareFiltered, function(d) {
    return d.percent;
  })
]);
let text = [];
y.domain(
  prapareFiltered.map(function(d, i) {
    let firstWord =
      d.name
        .split(" ")[0]
        .charAt(0)
        .toUpperCase() + d.name.split(" ")[0].slice(1);

    nameArray = d.name.split(" ");

    text.push(firstWord + " " + nameArray.slice(1).join(" "));

    return text[i];
  })
);

// console.log(text);
//y.domain([0, d3.max(data, function(d) { return d.sales; })]);

// append the rectangles for the bar chart
let bars = svg
  .selectAll(".bar")
  .data(prapareFiltered)
  .enter()
  .append("g");

let barObjectArray = {
  y: [],
  height: []
};
bars
  .append("rect")
  .attr("class", function(d, i) {
    return `bar${i}`;
  })
  .attr("fill", "#5f89ad")
  .attr("width", function(d) {
    return x(d.percent);
  })
  .attr("y", function(d, i) {
    // console.log(d)
    barObjectArray.y.push(y(text[i]));
    barObjectArray.height.push(50);
    console.log(y(text[i]));
    return y(text[i]);
  })
  .attr("height", y.bandwidth());
// console.log(barObjectArray);
//add a value label to the right of each bar
bars
  .append("text")
  .attr("class", function(d, i) {
    return `label${i}`;
  })
  //y position of the label is halfway down the bar
  .attr("y", function(d, i) {
    console.log(d.percent);
    // console.log(y.bandwidth());
    // console.log(y(d.percent));
    return barObjectArray.y[i] + barObjectArray.height[i] * 0.7;
  })
  //x position is 3 pixels to the right of the bar
  .attr("x", function(d) {
    return x(d.percent) + 5;
  })
  .text(function(d) {
    // console.log(d);
    return d.percent;
  })
  .style("font-weight", "bold");

// add the x Axis
// svg
//   .append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .style("font", "17px arial")
//   .call(d3.axisBottom(x));

// add the y Axis
svg
  .append("g")
  .style("font", "25px arial")
  .call(d3.axisLeft(y));

// hide domain and and lines
$("path.domain").attr("opacity", 0);

$(".tick line").attr("opacity", 0);

console.log($(".bar1").position());
