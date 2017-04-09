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
        svg = div.select("svg")
            .attr("width", width)
            .attr("height", height);

        var chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom;

        var tooltip = svg.append("div")
                .attr("class", "tooltip")
                .attr("width", 100);

        var xAxis = d3.scaleBand()
            .domain(data.map(function(el, i){ return el.key;}))
            .rangeRound([0, chartWidth])
            .paddingInner(0.1);

        var grpAxis = d3.scaleBand()
            .domain(data.map(function(el) {return el.values.map(function(ele,i){return ele[columnGrp];})})[0])
            .rangeRound([0, xAxis.bandwidth()])
            .padding(0.05)

        var yAxis = d3.scaleLinear()
            .domain([0,10604510]).nice()
            .rangeRound([chartHeight, 0]);

        var colorAxis = d3.scaleOrdinal()
            .domain(data.map(function(el) {return el.values.map(function(ele,i){return ele[columnGrp];})})[0])
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var overallG = svg .append("g")
            .attr("id", "overallG")
            .attr("width", chartWidth)
            .attr("height", chartHeight)
            .attr("transform", "translate("+margin.left+", "+margin.top+")")

        var grpG = overallG .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("id",function(d){return "grp"+d.key;})
            .attr("transform", function(d){
                return "translate("+ xAxis(d.key) + ", 0)";
            });
    var bar = grpG  .selectAll("rect")
            .data(function(d){return d.values;})
            .enter()
            .append("rect")
            .attr("id", function(d){return "bar"+ d[columnGrp];})
            .attr("x", function(d,i){
                return grpAxis(d[columnGrp]);
            })
            .attr("y", function(d){
                return yAxis(d[columnY]);
            })
            .attr("width", grpAxis.bandwidth())
            .attr("height", function(d,i){
                return chartHeight - yAxis(d[columnY]);
            })
            .attr("fill", function(d,i) {
                return colorAxis(d[columnGrp]);
            });

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
