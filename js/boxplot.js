function boxplot(){
    var width = 960,
    height = 400,
    columnX = "",
    columnY = "",
    margin = {
        top:10,
        bottom: 30,
        left: 30,
        right: 10
    }

    function chart(selection){
        var data = selection.enter().data();
        var div = selection,
        svg = div.selectAll("svg")
        svg.attr("width", width)
            .attr("height", height)
            .style("background", "rgb(240,240,240)");

        var chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom

        var tooltip = selection.append("div")
            .attr("class","tooltip")
            .attr("width", "100px")
            .text("");

        var xAxis = d3.scaleBand()
            .domain([data.map(function(d){return d[columnX];})])
            .range([0, chartWidth]);

        var yAxis = d3.scaleLinear()
            .domain([0, d3.max(data, function(d){return d[columnY];})])
            .range([chartHeight, 0])

    }

    chart.width = function() {

    }
    chart.height = function() {

    }
    chart.columnX = function() {

    }
    chart.columnY = function(){

    }
}
