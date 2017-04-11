function grpBarChart(){
    var width = 720,
    height = 400,
    margin = {
        top: 20,
        bottom: 30,
        left: 40,
        right: 20
    }
    var columnX="",
    columnY="",
    columnGrp="";

    function chart(selection){
        var data = selection.enter().data();
        var div = selection,
        svg = div.selectAll("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background", "rgb(240,240,240)");

        var chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom;

        var grp = domainList(data, columnGrp)

        var tooltip = selection.append("div")
                .attr("class", "tooltip")
                .attr("width", "100px")
                .text("");

        var xScale = d3.scaleBand()
            .domain(data.map(function(el, i){ return el.key;}))
            .rangeRound([0, chartWidth])
            .paddingInner(0.1);

        var grpScale = d3.scaleBand()
            .domain(grp)
            .rangeRound([0, xScale.bandwidth()])
            .padding(0.05)

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(domainList(data, columnY))]).nice()
            .range([chartHeight, 0]);

        var colScale = d3.scaleOrdinal()
            .domain(grp)
            //.range(["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"])
            .range(["#98abc5", "#8a89a6", "#7b6888",
                    "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var overallG = svg .append("g")
            .attr("id", "overallG")
            .attr("width", chartWidth)
            .attr("height", chartHeight)
            .attr("transform",
                "translate("+margin.left+", "+margin.top+")")

        var grpG = overallG .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("id","grpG")
            .attr("name",function(d){return "g_"+d.key;})
            .attr("transform", function(d){
                return "translate("+ xScale(d.key) + ", 0)";
            });

        var bar = grpG  .selectAll("rect")
            .data(function(d){return d.values;})
            .enter()
            .append("rect")
            .attr("id","bar")
            .attr("name", function(d){return "bar_"+ d[columnGrp];})
            .attr("x", function(d,i){
                return grpScale(d[columnGrp]);
                })
            .attr("y", function(d){
                return chartHeight;
                })
            .attr("width", grpScale.bandwidth())
            .attr("height", 0)
            .attr("fill", function(d,i) {
                return colScale(d[columnGrp]);
                })
            .on("mouseover", function(d){
                tooltip.html("The Population for the state of "
                + d[columnX] +" in the age band of "+d[columnGrp]+" is "
                + d[columnY])
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function(){
                return tooltip.style("top",
                                (d3.event.pageY - 10) + "px")
                            .style("left",
                                (d3.event.pageX + 10)+ "px");

            })
            .on("mouseout", function(d){
                return tooltip.style("visibility", "hidden");
            });

        bar .transition()
            .attr("height", function(d){
                return chartHeight - yScale(d[columnY]);
            })
            .attr("y", function(d){
                return yScale(d[columnY]);
            })
            .delay(function(d,i){
                return i * 20;
            })
            .duration(2000)
            .ease(d3.easeElastic);

        overallG.append("g")
                .attr("id","xAxisG")
                .attr("transform",
                    "translate(0, "+chartHeight+")")
                .attr("class", "axis")
                .call(d3.axisBottom(xScale));


        overallG.append("g")
                .attr("id","yAxisG")
                .attr("class","axis")
                .call(d3.axisLeft(yScale).ticks(null,"s"))
            .append("text")
            .attr("x", 2)
            .attr("y", yScale(yScale.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text(columnY);

        var legendG = overallG.append("g")
            .attr("id","legendG")
            .attr("class", "legend")

        var legend = legendG.selectAll("g")
            .data(grp.reverse())
            .enter()
            .append("g")
            .attr("transform", function(d,i){
                return "translate(0, "+i*20+")";
                })

        legend  .append("rect")
            .attr("x",chartWidth - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", colScale);

        legend  .append("text")
            .attr("x", chartWidth - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d){return d;});

        function domainList(d, column) {
            var map = d.map(v =>
                        v.values.map(c =>
                            c[column]
                            )
                        )
                    .reduce((a, b) => a.concat(b));
            var arr = [...new Set(map)];
            return arr;
        }



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

    chart.columnGrp = function(value) {
        if(!value){
            return alert('Group variable needs to be provided');
        }
        columnGrp = value;
        return chart;
    }
    return chart;
}
