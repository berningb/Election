var API_SERVER = 'http://elections.huffingtonpost.com',
    API_BASE = '/pollster/api/',
    API_FILE = 'polls.json',
    callback = '?callback=pollsterPoll',
    params = '&state=US&topic=2016-president&page=3',
    latest_data;

var first = 0,
    second = 1,
    third = 3,
    fifth = 5,
    sixth = 6,
    seventh = 7;

window.pollsterPoll = function (incoming_data) {
    latest_data = incoming_data;
    visualize(latest_data);


    pollName(1, 'Poll1');
    pollName(2, "poll2");
    pollName(3, "poll3");

    questionName(latest_data, first, first, 'poll1Question1');
    questionName(latest_data, first, second, 'poll1Question2');
    questionName(latest_data, first, third, 'poll1Question3');
    info(latest_data, first, 'specs1');

    questionName(latest_data, second, fifth, 'poll2Question1');
    questionName(latest_data, second, sixth, 'poll2Question2');
    questionName(latest_data, second, seventh, 'poll2Question3');
    info(latest_data, second, 'specs2');


    questionName(latest_data, third, first, 'poll3Question1');
    questionName(latest_data, third, second, 'poll3Question2');
    questionName(latest_data, third, third, 'poll3Question3');
    info(latest_data, third, 'specs3');

    for (var i = 0; i < 3; i++) {
        var adiv = "poll" + i.toString() + "Question";
        getquestions(adiv, latest_data[i]);
    }

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

$(function () {
    $("#tabs").tabs();
});

function questionName(data, start, num, id) {
    var string = data[start].questions[num].name;


    var h3 = document.createElement("h4");
    var t = document.createTextNode(string);
    h3.appendChild(t);
    document.getElementById(id).appendChild(h3);
    var h4 = document.createElement("h4");
    var t = document.createTextNode(string);


}

function info(data, start, id) {
    var method = data[start].method;
    var pollster = data[start].pollster;
    var partisan = data[start].partisan;

    var h3 = document.createElement("p");
    var t = document.createTextNode("The method of this poll is: " + method);
    h3.appendChild(t);
    document.getElementById(id).appendChild(h3);

    var h3 = document.createElement("p");
    var t = document.createTextNode("The pollster of this poll is: " + pollster);
    h3.appendChild(t);
    document.getElementById(id).appendChild(h3);

    var h3 = document.createElement("p");
    var t = document.createTextNode("The partisian is: " + partisan);
    h3.appendChild(t);
    document.getElementById(id).appendChild(h3);


}

function pollName(id, name) {
    $('#' + id).append(name);

}

// flksjflkjdsfkfdsjdsjflkdsjfldsjfldsjfkdslkf

function getquestions(adiv, data) {
    for (var i = 0; i < 3; i++) {
        makeGraph(data.questions[i].subpopulations[0].responses, adiv + i.toString());
    }
}

function pickcolor(party) {

    if (party === null || party === undefined) {
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

function makeGraph(a, divi) {
    var graph = document.createElement('canvas');
    var barwidth = 20;
    var space = 25;
    graph.width = (barwidth * (a.length + 2)) + (space * a.length);
    graph.height = 200;


    var x = 0;

    for (var i = 0; i < a.length - 1; i++) {
        drawBars(graph, a[i].value, x, barwidth, pickcolor(a[i].party), a[i].choice);
        x += space;

        var test = document.getElementById(divi);
        test.appendChild(graph);
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