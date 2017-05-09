function piradial(){
    var width = 500,
    height = 500,
    margin = {
        top: 10,
        left: 10,
        right:10,
        bottom:10
    };
    var val="",
    cat="",
    catVal="";
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
        radius = Math.min(chartWidth, chartHeight) / 2,
        tau = 2 * Math.PI;

        var catArr = data.map(function(el){return el[cat];});
        var categoryVal = (catArr.filter(function(el){
            return el==catVal;}).length)/catArr.length;

        var colScale = d3.scaleOrdinal(d3.schemeCategory10);

        var arc = d3.arc()
            .outerRadius(radius-120)
            .innerRadius(0);

        var labelArc = d3.arc()
            .outerRadius(radius-40)
            .innerRadius(radius-40);

        var pie = d3.pie()
            .sort(null)
            .value(function(d){return d[val];})

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
            .style("fill", function(d){return colScale(d.data[val]);});


        var arcRad = d3.arc()
            .outerRadius(radius - 90)
            .innerRadius(radius - 115)
            .startAngle(tau/2)
            .cornerRadius(12)

        var background = overAllG.append("g")
            .append("path")
            .attr("class","category2 arc")
            .datum({endAngle:tau/2 + tau})
            .attr("d", arcRad)


        var foreground = overAllG.append("g")
            .append("path")
            .attr("class","category1 arc")
            .datum({endAngle: tau/2 + categoryVal * tau})
            .attr("d", arcRad)


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
    chart.piefield = function(value) {
        if(!arguments.length){
            return alert("A value function needs to be provided");
        }
        val = value
        return chart;
    }
    chart.radialfieldval = function(cate, cateVal){
        if(!arguments.length){
            return alert("A category field needs to be provided!")
        }
        cat = cate
        catVal = cateVal
        return chart;
    }

    return chart;
}
