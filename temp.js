var API_SERVER = 'http://elections.huffingtonpost.com',
    API_BASE = '/pollster/api/',
    API_FILE = 'polls.json',
    callback = '?callback=pollsterPoll',
    params = '&state=US&topic=2016-president',
    latest_data;


$(document).ready(function () {
    $.ajax({
        url: API_SERVER + API_BASE + API_FILE + callback + params,
        dataType: 'script',
        type: 'GET',
        cache: true
    });
});


window.pollsterPoll = function (incoming_data) {
    latest_data = incoming_data;
    visualize(latest_data);

    for (var i = 0; i < 3; i++) {
        getquestions(latest_data[i]);
    }
};

function getquestions(data) {
    for (var i = 0; i < 3; i++) {
        makeGraph(data.questions[i].subpopulations[0].responses);
    }
}

function visualize(d) {
    console.log(d);
}

function pickcolor(party) {

    if (party === null) {
        return 'black';
    } else {

        if (party.toString().toLowerCase() === 'rep') {
            return 'red';

        }

        if (party.toString().toLowerCase() === 'dem') {
            return 'blue';
        }
    }
}

function makeGraph(a) {
    var graph = document.createElement('canvas');
    var barwidth = 20;
    var space = 25;
    graph.width = (barwidth * (a.length + 2)) + (space * a.length);
    graph.height = 200;


    var x = 0;

    for (var i = 0; i < a.length - 1; i++) {
        drawBars(graph, a[i].value, x, barwidth, pickcolor(a[i].party), a[i].choice);
        x += space;

        // var appendtome = document.getElementById();
    }
}

function drawBars(canvas, votes, x, width, party, vote) {
    var context = canvas.getContext('2d');

    context.save();
    context.translate(x, 200);

    context.rect(x, -votes * 2, width, votes * 2);

    context.font = "12px Arial";
    context.fillStyle = party;

    context.fillText(vote, x, -votes * 2 - 10);

    context.fillStyle = party;
    context.fill();
    context.restore();
}