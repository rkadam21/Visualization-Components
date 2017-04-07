function multiLine() {
    var width = 720,
    height = 400,
    columnX = "",
    columnY1 = "",
    columnY2 = ""
    margin = {
        top : 30,
        bottom : 30,
        left : 50,
        right : 10
    }

    function chart(selection){
        var data = selection.enter().data()
        var div = selection,
        svg = div.selectAll("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background", "#99c7a0")

        var tooltip = selection
            .append("div")
            .attr("class", "tooltip")
            .text("");

        var chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom;

        //define scales/ranges
        var xScale = d3.scaleTime()
            .domain(d3.extent(data, function(d){return d[columnX];}))
            .range([0, chartWidth])

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function(d){
                return Math.max(d[columnY1], d[columnY2]);
            })])
            .range([chartHeight, 0])

        //define valueLine1
        var valueLine1 = d3.line()
            .x(function(d){return xScale(d[columnX]);})
            .y(function(d){return yScale(d[columnY1]);})

        //define valueline2
        var valueLine2 = d3.line()
            .x(function(d){return xScale(d[columnX]);})
            .y(function(d){return yScale(d[columnY2]);})

        var gLine = svg.append("g")
            .attr("id","gLine")
            .attr("transform",
                "translate("+ margin.left +", "+ margin.top + ")")
            .attr("width", chartWidth)
            .attr("height", chartHeight)

        var gCircle1 = svg.append("g")
            .attr("id","gCircle1")
            .attr("transform",
                "translate("+ margin.left +", "+ margin.top + ")")
            .attr("width", chartWidth)
            .attr("height", chartHeight)
        var gCircle2 = svg.append("g")
            .attr("id","gCircle2")
            .attr("transform",
                "translate("+ margin.left +", "+ margin.top + ")")
            .attr("width", chartWidth)
            .attr("height", chartHeight)
        //draw the valuelines
        gLine .append("path")
            .data([data])
            .attr("class","line")
            .attr("d", valueLine1)


        gLine .append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", "rgb(200,75,75)")
            .attr("d", valueLine2);

        gCircle1 .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r",3)
            .attr("cx", function(d){
                return xScale(d[columnX]);
                })
            .attr("cy", function(d){
                return yScale(d[columnY1])
            })
            .style("fill","darkblue")
            .on("mouseover", function(d){
                tooltip.html("The "+ columnY1 + " count is: "
                + d[columnY1] + "<br>" + " for the " + columnX + " of "+ d[columnX]);
                return tooltip.style("visibility","visible");
            })
            .on("mousemove", function(){
                return tooltip.style("top",
                                (d3.event.pageY - 10) + "px")
                            .style("left",
                                (d3.event.pageX + 10) + "px");
                })
            .on("mouseout", function(d){
                return tooltip.style("visibility","hidden");
            });

        gCircle2 .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r",3)
            .attr("cx", function(d){
                return xScale(d[columnX]);
                })
            .attr("cy", function(d){
                return yScale(d[columnY2])
            })
            .style("fill","darkred")
            .on("mouseover", function(d){
                tooltip.html("The "+ columnY2 + " count is: "
                + d[columnY2] + "<br>" + " for the " + columnX + " of "+ d[columnX]);
                return tooltip.style("visibility","visible");
            })
            .on("mousemove", function(){
                return tooltip.style("top",
                                (d3.event.pageY - 10) + "px")
                            .style("left",
                                (d3.event.pageX + 10) + "px");
                })
            .on("mouseout", function(d){
                return tooltip.style("visibility","hidden");
            });

        var xAxis = d3.axisBottom(xScale)
            .ticks(30);
        d3  .select("svg").append("g")
            .attr("id", "xAxisG")
            .call(xAxis)
            .attr("transform",
                "translate("+ margin.left + ", "
                + (height - margin.bottom) + ")");

        var yAxis = d3.axisLeft(yScale)
            .ticks(10);
        d3  .select("svg").append("g")
            .attr("id","yAxisG")
            .call(yAxis)
            .attr("transform",
                "translate("+ margin.left + ", "
                + (margin.top)+")");
    }
    chart.width = function(value) {
        if(!arguments.length){
            return width;
        }
        width = value;
        return chart;
    }

    chart.height = function(value) {
        if(!arguments.length){
            return height;
            }
        height = value;
        return chart;
        }

    chart.columnX = function(value) {
        if(!value){
            return alert('X-axis variable needs to be provided');
        }
        columnX = value;
        return chart;
    }

    chart.columnY1 = function(value) {
        if(!value){
            return alert('Y1-axis variable needs to be provided');
        }
        columnY1 = value;
        return chart;
    }

    chart.columnY2 = function(value) {
        if(!value){
            return alert('Y1-axis variable needs to be provided');
        }
        columnY2 = value;
        return chart;
    }
    return chart;
}
