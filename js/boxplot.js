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
                .append("line")
                .attr("name","rngLine_"+d.day)
                .attr("id","rangeLine")
                .attr("x1",0)
                .attr("x2",0)
                .attr("y1", yScale(d.max) - yScale(d.median))
                .attr("y2", yScale(d.min) - yScale(d.median))
                .style("stroke", "black")
                .style("stroke-width", "4px")

                d3.select(this)
                .append("rect")
                .attr("name","rect_"+d.day)
                .attr("id","dist")
                .attr("width", 20)
                .attr("height", yScale(d.q1) - yScale(d.q3))
                .attr("x", -10)
                .attr("y", yScale(d.q3) - yScale(d.median))
                .style("fill","rgb(240,240,240)")
                .style("stroke","black")

                d3.select(this)
                .append("line")
                .attr("name","mxmark_"+d.day)
                .attr("id","maxmark")
                .attr("x1", -10)
                .attr("x2", 10)
                .attr("y1", yScale(d.max) - yScale(d.median))
                .attr("y2", yScale(d.max) - yScale(d.median))
                .style("stroke", "black")
                .style("stroke-width", "4px")

                d3.select(this)
                .append("line")
                .attr("name","mnmark_"+d.day)
                .attr("id","minmark")
                .attr("x1", -10)
                .attr("x2", 10)
                .attr("y1", yScale(d.min) - yScale(d.median))
                .attr("y2", yScale(d.min) - yScale(d.median))
                .style("stroke", "black")
                .style("stroke-width", "4px")

                d3.select(this)
                .append("line")
                .attr("name","mdmark_"+d.day)
                .attr("id","medmark")
                .attr("x1", -10)
                .attr("x2", 10)
                .attr("y1", 0)
                .attr("y2", 0)
                .style("stroke", "grey")
                .style("stroke-width", "4px")


            })


        overallG.append("g")
                .attr("id","xAxisG")
                .attr("transform",
                    "translate(0, "+ chartHeight +")")
                .attr("class", "axis")
                .call(d3.axisBottom(xScale));

        overallG.append("g")
                .attr("id","yAxisG")
                .attr("class","axis")
                .call(d3.axisLeft(yScale).ticks(null,"s"))

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
