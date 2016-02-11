var API_SERVER = 'http://elections.huffingtonpost.com',
    API_BASE = '/pollster/api/',
    API_FILE = 'polls.json',
    callback = '?callback=pollsterPoll',
    params = '&state=US&topic=2016-president',
    latest_data;

window.pollsterPoll = function (incoming_data) {
    latest_data = incoming_data;
    visualize(latest_data);
};

$(document).ready(function () {
    $.ajax({
        url: API_SERVER + API_BASE + API_FILE + callback + params,
        dataType: 'script',
        type: 'GET',
        cache: true
    });
});

function visualize(d) {
    console.log(d);
}

function makeGraph(a) {
    var graph = document.createElement('canvas');
    graph.width = 500;
    graph.height = 500;

    var barwidth = 20;
    var x = 0;

    a.forEach(function () {
        this.subpopulations.responses.forEach(function () {
            drawBars(graph, this.value, x, barwidth);
            x += 40;
        });
    });
}

function drawBars(canvas, votes, x, width) {
    var context = canvas.getContext('2d');
    context.rect(x, x, width, votes);
    context.strokeStyle('green');
    contect.stroke();
}