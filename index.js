var $ = require('jquery')
import 'bootstrap'


function image(src, alt) {
    var img = document.createElement("IMG");
    img.src = src;
    img.alt = alt;
    $('#image')
        .html(img)
        .css('display', 'block');
}

function resultCard(data) {
    var cards = ''
    $('#resultsDiv').html('')
    $.each(data[1], function (key, val) {
        cards += "<div class='col-12 data-box shadow mb-2' id='" + key + "'>\n" +
            "<a href='" + data[3][key] + "' target='_blank' class=\"data-link\">\n" +
            "<h2 class='data-title'>" + val + "</h2>\n" +
            "<p class=\"data-desc\">" + data[2][key] + "</p>\n" +
            "</a>\n" +
            "</div>"
    })
    $('#resultsDiv').append(cards)
}

function getData(val) {
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + val + "&format=json&origin=*",
        success: function (res) {
            resultCard(res)
        },
        cache: !1
    })
}

$(document).ready(function () {
    $('#search-form').on('submit', function (e) {
        e.preventDefault()
        var searchin = $('#search-input').val()
        if (searchin) {
            getData(searchin)
        }
        $('#searchDiv').addClass('top-container');
        $('#resultsDiv')
            .removeClass('hide')
            .addClass('show');
    })
});
