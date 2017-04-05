function barChart(){
    var width = 720,
        height = 400
    var margin = {
      top: 30,
      right: 10,
      bottom: 30,
      left: 50
    }
    function chart(selection) {
        var data = selection.enter().data();
        var div = selection,
            svg = div.selectAll('svg');
        svg .attr('width', width).attr('height', height)
            .style('background', '#99c7a0')

        var tooltip = selection
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color","#626D71")
            .style("border-radius", "6px")
            .style("text-align", "left")
            .style("font-family", "monospace")
            .style("width", "150px")
            .text("");

        var barwidth = width - margin.left - margin.right
        var barheight = height - margin.top - margin.bottom

        var colors = d3.scaleLinear()
            .domain([0, data.length * .33, data.length * .66, data.length])
            .range(['#96ceb4','#ffeead','#ff6f69','#ffcc5c'])

        var xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([0, barwidth])

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, barheight])

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
                return barheight;
            })
            .attr("width", xScale.bandwidth()-3)
            .attr("height", 0)
            .style("fill", function(d, i){ return colors(i);})
            .style("stroke", "#31708f")
            .style("stroke-width", "1")
            .on("mouseover", function(d){
                tooltip.html("This is tooltip text for data."+"<br>"
                + "The datapoint is: " + d);
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
            return yScale(d);
        })
        .attr("y", function(d){
            return barheight - yScale(d);
        })
        .delay(function(d, i){
            return i * 20;
        })
        .duration(2000)
        .ease(d3.easeElastic)

        var xAxis = d3.axisBottom(xScale)
            .ticks(data.size)
        d3.select("svg").append("g")
            .attr("id","xAxisG")
            .call(xAxis)
            .attr("transform",
            "translate("+ margin.left + ", " + (height-margin.bottom) + ")")

        var yAxisScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([barheight, 0])
        var yAxis = d3.axisLeft(yAxisScale)
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
    return chart;
    }
