var API_SERVER = 'http://elections.huffingtonpost.com',
    API_BASE = '/pollster/api/',
    API_FILE = 'polls.json',
    callback = '?callback=pollsterPoll',
    params = '&state=US&topic=2016-president&page=3',
    latest_data;

var first = 0,
    second = 1,
    third = 2,
    fifth = 5,
    sixth = 6,
    seventh = 7;

window.pollsterPoll = function (incoming_data) {
    latest_data = incoming_data;
    visualize(latest_data);


    pollName(1, 'Poll One');
    pollName(2, "Poll Two");
    pollName(3, "Poll Three");

    questionName(latest_data, first, first, 'poll0Question0');
    questionName(latest_data, first, second, 'poll0Question1');
    questionName(latest_data, first, third, 'poll0Question2');
    info(latest_data, first, 'specs1');

    questionName(latest_data, second, first, 'poll1Question0');
    questionName(latest_data, second, second, 'poll1Question1');
    questionName(latest_data, second, third, 'poll1Question2');
    info(latest_data, second, 'specs2');


    questionName(latest_data, third, first, 'poll2Question0');
    questionName(latest_data, third, second, 'poll2Question1');
    questionName(latest_data, third, third, 'poll2Question2');
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
        var pic = getpictures(data.questions[i].name);

        if (pic !== undefined) {
            var mydiv = document.getElementById(adiv + i.toString());
            mydiv.appendChild(pic);
        }

        makeGraph(data.questions[i].subpopulations[0].responses, adiv + i.toString());
    }
}

function pickcolor(party) {

    if (party === null || party === undefined) {
        return 'black';
    }

    if (party.toString().toLowerCase() === 'rep') {
        return 'red';

    }

    if (party.toString().toLowerCase() === 'dem') {
        return 'blue';
    }
}

function getpictures(person) {

    console.log(person);
    var picture = document.createElement('img');

    switch (person) {
    case person.includes('Bush'):
        picture.setAttribute('src', 'images/bush.jpg');
        break;

    case person.includes('Clinton'):
        picture.setAttribute('src', 'images/clinton.jpg');
        break;
    case person.includes('Cruz'):
        picture.setAttribute('src', 'images/cruz.jpg')
        break;
    case person.includes('Sanders'):
        picture.setAttribute('src', 'images/sanders.jpg')
        break;
    case person.includes('Trump'):
        picture.setAttribute('src', 'images/trump.jpg');
        break;

    case person.includes('Republican'):
        picture.setAttribute('src', 'images/rep.png');
        break;

    case person.includes('Democratic'):
        picture.setAttribute('src', 'images/dem.jpg');
        break;

    default:
        picture.setAttribute('src', 'images/none.svg');
        break;
    }

    return picture;
}

function makeGraph(a, divi) {
    var graph = document.createElement('canvas');
    var barwidth = 20;
    var space = 25;
    graph.width = (barwidth * (a.length + 2)) + (space * (a.length + 2));
    graph.height = 200;

    var x = 0;

    for (var i = 0; i < a.length; i++) {
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
    context.fillStyle = party;
    context.rect(x, -votes * 2, width, votes * 2);

    context.font = "12px Arial";

    context.fillText(vote, x, -votes * 2 - 10);

    context.fill();
    context.restore();
}