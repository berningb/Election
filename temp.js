var API_SERVER = 'http://elections.huffingtonpost.com',
    API_BASE = '/pollster/api/',
    API_FILE = 'polls.json',
    callback = '?callback=pollsterPoll',
    params = '&state=US&topic=2016-president',
    latest_data;

window.pollsterPoll = function (incoming_data) {
    latest_data = incoming_data;
    visualize(latest_data);
    makeGraph(latest_data[0].questions[0].subpopulations[0].responses);
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

function check(sentence, id) {
    var rep = 'Republican';
    var demo = 'Democrat';

    if (sentence.indexOf(rep) > -1) {
        document.getElementById(id).style.color = "red"
            //        document.getElementById(id).style.backgroundImage = "url(images/download.jpg)"

    }
    if (sentence.indexOf(demo) > -1) {
        document.getElementById(id).style.color = "blue"
            //        document.getElementById(id).style.backgroundImage = "url(images/download.png)"
    }
    }

function makeGraph(a) {
    var graph = document.createElement('canvas');
    var barwidth = 20;
    var space = 25;
    graph.width = (barwidth * (a.length + 2)) + (space * a.length);
    graph.height = 500;


    var x = 0;

    for (var i = 0; i < a.length; i++) {
        drawBars(graph, a[i].value, x, barwidth);
        console.log(a[i].value);
        x += space;
    }

    $('body').append(graph);
}

function drawBars(canvas, votes, x, width) {
    var context = canvas.getContext('2d');

    context.save();
    context.translate(x, 400);

    context.rect(x, 0, width, votes * 2);
    context.fillStyle = 'green';

    context.fill();
    context.restore();
}