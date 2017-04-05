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
            .style('background', '#bce8f1')

        var tooltip = selection
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color","#626D71")
            .style("border-radius", "6px")
            .style("text-align", "center")
            .style("font-family", "monospace")
            .style("width", "400px")
            .text("");
        var barwidth = width - margin.left - margin.right
        var barheight = height - margin.top - margin.bottom
        var colors = d3.scaleLinear()
            .domain([0, data.length * .33, data.length * .66, data.length])
            .range(['#d6e9c6', '#bcb5ff', '#faebcc', '#ebccd1'])

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
                return barheight - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){ return yScale(d)})
            .style("fill", function(d, i){ return colors(i);})
            .style("stroke", "#31708f")
            .style("stroke-width", "1")
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
