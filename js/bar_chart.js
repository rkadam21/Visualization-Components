function barChart(){
    var width = 720,
        height = 400,
    margin = {
      top: 30,
      right: 10,
      bottom: 30,
      left: 50
    },
    columnX = "",
    columnY = "";

    function chart(selection) {
        var data = selection.enter().data();
        var div = selection,
            svg = div.selectAll("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background", "#99c7a0")

        var chartWidth = width - margin.left - margin.right
        var chartHeight = height - margin.top - margin.bottom

        var tooltip = selection
            .append("div")
            .attr("class", "tooltip")
            .style("width", "150px")
            .text("");


        var xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([0, chartWidth])
            .paddingInner(0.1)

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function(d){
                return +d[columnY];
            })])
            .range([chartHeight, 0]);

        var colScale = d3.scaleLinear()
            .domain([0, data.length * .33, data.length * .66, data.length])
            .range(["#96ceb4","#ffeead","#ff6f69","#ffcc5c"])

        var bar = svg.append('g')
            .attr('transform',
                'translate(' + margin.left + ', ' + margin.top + ')')
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d, i){
                return xScale(i);
            })
            .attr("y", function(d){
                return chartHeight;
            })
            .attr("width", xScale.bandwidth())
            .attr("height", 0)
            .style("fill", 'rgb(200,75,75)')
            .style("stroke", "#31708f")
            .style("stroke-width", "1")
            .on("mouseover", function(d){
                tooltip.html("This is tooltip text for data."+"<br>"
                + "The datapoint is: " + d[columnY]);
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function() {
                return tooltip.style("top",
                                (d3.event.pageY - 10) + "px")
                            .style("left",
                                (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function(d){
                return tooltip.style("visibility", "hidden");
            })

        bar.transition()
        .attr("height", function(d){
            return chartHeight - yScale(d[columnY]);
        })
        .attr("y", function(d){
            return yScale(d[columnY]);
        })
        .delay(function(d, i){
            return i * 20;
        })
        .duration(2000)
        .ease(d3.easeElastic)

        var xScaleAxis = d3.scaleBand()
              .domain(data.map(function(el){return el[columnX];}))
              .range([0, chartWidth])

        var xAxis = d3.axisBottom(xScaleAxis)
            .ticks(data.size)
        d3.select("svg").append("g")
            .attr("id","xAxisG")
            .call(xAxis)
            .attr("transform",
            "translate("+ margin.left + ", " + (height-margin.bottom) + ")")

        var yAxis = d3.axisLeft(yScale)
            .ticks(10)
        d3.select("svg").append("g")
            .attr("id","yAxisG")
            .call(yAxis)
            .attr("transform",
                "translate("+ margin.left + ", " + margin.top + ")")

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

    chart.columnY = function(value) {
        if(!value){
            return alert('Y-axis variable needs to be provided');
        }
        columnY = value;
        return chart;
    }
    return chart;
}
