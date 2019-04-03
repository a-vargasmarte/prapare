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
var margin = { top: 20, right: 20, bottom: 30, left: 200 },
  width = 1200 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

// set the ranges
var y = d3
  .scaleBand()
  .range([height, 0])
  .padding(0.1);

var x = d3.scaleLinear().range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
y.domain(
  prapareFiltered.map(function(d) {
    return d.name;
  })
);
//y.domain([0, d3.max(data, function(d) { return d.sales; })]);

// append the rectangles for the bar chart
svg
  .selectAll(".bar")
  .data(prapareFiltered)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr('fill', '#5f89ad')
  .attr("width", function(d) {
    return x(d.percent);
  })
  .attr("y", function(d) {
    return y(d.name);
  })
  .attr("height", y.bandwidth());

// add the x Axis
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .style('font', '17px arial')
  .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
.style('font', '17px arial')
.call(d3.axisLeft(y));
