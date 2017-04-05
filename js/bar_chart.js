function barChart(){
    var width = 400,
        height = 600

    function chart(selection) {
        var data = selection.enter().data();
        var div = selection,
            svg = div.selectAll('svg');
        svg.attr('width', width).attr('height', height);

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

        var xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([0,width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height])

        var bar = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d, i){
                return xScale(i);
            })
            .attr("y", function(d){
                return height - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){ return yScale(d)})
            .attr("fill",function(d){return "rgb(0,0,"+ d*10 +")"})
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
