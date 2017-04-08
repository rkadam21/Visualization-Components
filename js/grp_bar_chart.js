function grpBarChart(){
    var width = 720,
    height = 400,
    margin = {
        top: 30,
        bottom: 30,
        left: 50,
        right: 10
    }
    function chart(selection){
        var data = selection.enter().data();
        var div = selection,
        svg = div.select("svg")
            .attr("width", width)
            .attr("height", height);

        var chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom;

        var tooltip = svg.append("div")
                .attr("class", "tooltip")
                .attr("width", 100);

        var xAxis = d3.scaleBand()
            .domain(data.map(function(el){ return el[columnX];}))
            .rangeRound([0, chartWidth])
            .paddingInner(0.1);

        var yAxis = d3.scaleLinear()
            .domain(d3.extent(data, function(d){return d[columnY];}))
            .range([0, chartHeight])
    }

    chart.width = function(value){

    }

    chart.height = function(value){

    }

    chart.columnX = function(value){

    }

    chart.columnY = function(value){

    }

    chart.group = function(value){

    }
}
