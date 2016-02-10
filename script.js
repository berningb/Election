var API_SERVER = 'http://elections.huffingtonpost.com',
    API_BASE = '/pollster/api/',
    API_FILE = 'polls.json',
    callback = '?callback=pollsterPoll',
    params = '&state=US&topic=2016-president&page=3',
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

$(function () {
    $("#tabs").tabs();
});

$(function () {
    $("#tabs").tabs();
});