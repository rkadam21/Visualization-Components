function barChart() {
    var width = 400,
        height = 600

    function chart(selections) {
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

    }
}
