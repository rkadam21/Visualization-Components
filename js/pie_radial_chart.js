function piradial(){
    var width = 500,
    height = 500,
    margin = {
        top: 10,
        left: 10,
        right:10,
        bottom:10
    }
    function chart(selection){
        var data = selection.enter().data();
        var div = selection,
        svg = div.selectAll("svg")
            .attr("width", width)
            .attr("height", height)
            //.style("background","rgb(225,225,225)")

        var tooltip = selection
            .append("div")
            .attr("class","tooltip")
            .text("")

        var chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom,
        radius = Math.min(chartWidth, chartHeight) / 2;

        var colScale = d3.scaleOrdinal(d3.schemeCategory10);
        var colScale1 = d3.scaleOrdinal(d3.schemeCategory20b);

        var arc = d3.arc()
            .outerRadius(radius-120)
            .innerRadius(0);

        var labelArc = d3.arc()
            .outerRadius(radius-40)
            .innerRadius(radius-40);

        var pie = d3.pie()
            .sort(null)
            .value(function(d){return d;});

        var overAllG = svg.append("g")
            .attr("name", "overAllG")
            .attr("transform", "translate("+
                chartWidth / 2 + ", "+ chartHeight / 2 + ")");

        var pieG = overAllG.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class","arc")

        pieG.append("path")
            .attr("d", arc)
            .style("fill", function(d){return colScale(d.data);});


        var arcRad = d3.arc()
            .outerRadius(radius - 90)
            .innerRadius(radius - 115)
            .startAngle(Math.PI)
            .cornerRadius(12)

        var background = overAllG.append("g")
            .append("path")
            .datum({endAngle:3*Math.PI})
            .attr("d", arcRad)
            .style("fill","#ccc")

        var foreground = overAllG.append("g")
            .append("path")
            .datum({endAngle: Math.PI + 0.75 * 2*Math.PI})
            .attr("d", arcRad)
            .style("fill","lightblue")

    }

    return chart;
}
