// Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
var chart;

nv.addGraph(function() {
    chart = nv.models.lineChart()
        .options({
            transitionDuration: 300,
            useInteractiveGuideline: true
        })
    ;

    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
        .axisLabel("Time (s)")
        .tickFormat(d3.format(',.1f'))
        .staggerLabels(true)
    ;

    chart.yAxis
        .axisLabel('Price ($)')
        .tickFormat(d3.format(',.2f'))
    ;

    d3.select('#chart1').append('svg')
        .datum(sinAndCos())
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
});

function sinAndCos() {
    var //sin = [],
        cos = [],
        rand = [],
        rand2 = []
        ;

    for (var i = 0; i < 100; i++) {
        // sin.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) }); //the nulls are to show how defined works
        cos.push({x: i, y: .5 * Math.cos(i/10)});
        rand.push({x:i, y: Math.random() / 10});
        rand2.push({x: i, y: Math.cos(i/10) + Math.random() / 10 })
    }

    return [
        {
            values: cos,
            key: "Cosine Wave",
            color: "#1f77b4"
        },
        {
            values: rand,
            key: "Random Points",
            color: "#ff7f0e"
        }
        ,
        {
            values: rand2,
            key: "Random Cosine",
            color: "#2ca02c"
        }
    ];
}
