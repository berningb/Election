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


    //    check(string, id);

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

//function check(sentence, id) {
//    var rep = 'Republican';
//    var demo = 'Democrat';
//
//    if (sentence.indexOf(rep) > -1) {
//        document.getElementById(id).style.color = "red"
////        document.getElementById(id).style.backgroundImage = "url(images/download.jpg)"
//
//    }
//    if (sentence.indexOf(demo) > -1) {
//        document.getElementById(id).style.color = "blue"
////        document.getElementById(id).style.backgroundImage = "url(images/download.png)"
//    }
//}

function pollName(id, name) {
    $('#' + id).append(name);

}