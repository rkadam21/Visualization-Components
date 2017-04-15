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

    function chart(selection) {
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

        var xScale = d3.scaleBand()
            .domain(data.map(function(d){return d[columnX];}))
            .range([0, chartWidth]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data,
                function(d){return d[columnY];})]).nice()
            .range([chartHeight, 0]);

        var overallG = svg.append("g")
            .attr("id","overallG")
            .attr("width", chartWidth)
            .attr("height", chartHeight)
            .attr("transform",
            "translate("+ margin.left + ", "+ margin.top + ")");

        var circles = overallG.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("name", function(d){return "cir_"+d.day;})
            .attr("r", 2)
            .attr("cx", function(d, i){return xScale(d.day);})
            .attr("cy", function(d){ return yScale(d.median);})

        var gBox = overallG.selectAll("g#gBox")
            .data(data)
            .enter()
            .append("g")
            .attr("id","gBox")
            .attr("name", function(d){
                return"g_" + d.day;
            })
            .attr("transform", function(d){
                return "translate(" + xScale(d.day) + ", "
                + yScale(d.median) + ")";})
            .each(function(d, i){
                d3.select(this)
                .append("rect")
                .attr("width", 20)
                .attr("height", function(d){
                    return yScale(d.q1) - yScale(d.q3);
                })
                .style("fill","none")
                .style("stroke","black")

            })

    }

    chart.width = function(value) {
        if(!arguments.length){
            return width;
        }
        width = value
        return chart
    }

    chart.height = function(value) {
        if(!arguments.length){
            return height;
        }
        height = value
        return chart
    }

    chart.columnX = function(value) {
        if(!value){
            return alert('X-axis variable needs to be provided');
            }
        columnX = value;
        return chart;
    }

    chart.columnY = function(value) {
        if(!value){
            return alert('Y-axis variable needs to be provided');
            }
        columnY = value;
        return chart;

    }
    return chart;

}
