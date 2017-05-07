/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function (c) {
        console.log('Connection On open', c);
        // connection is opened and ready to use
        connection.send(JSON.stringify('Hello Mr Server'));
    };

    connection.onerror = function (error) {
        console.log('Connection On Error', error);
        // an error occurred when sending/receiving data
    };

    connection.onmessage = function (message) {
        // try to decode json (I assume that each message from server is json)
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }
        console.log('Message from Server ');
        console.log(json.length); 
                // handle incoming message
    };
    connection.onclose = function (message) {
        console.log('Connection onclose::');
    }


});
var listBins = [];
for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
        for (var k = 0; k < 2; k++) {
            for (var l = 0; l < 2; l++) {
                for (var m = 0; m < 2; m++) {
                    for (var n = 0; n < 2; n++) {
                        for (var o = 0; o < 2; o++) {
                            for (var p = 0; p < 2; p++) {
                                listBins.push("" + i + j + k + l + m + n + o + p);
                            }
                        }
                    }
                }
            }
        }
    }
}




function renderMeters(cnt) {
    $('#meters').html('');
    for (var i = 1; i <= cnt; i++) {
        var cl = $('.con').clone().show().removeClass('con').attr('id', 'samplemeter' + i);
        $('#meters').append(cl);
    }
}
var cnt = 150;
setTimeout(function () {
    renderMeters(cnt);
}, 200);
var intervala = [];
var intervalrfa = [];
var intervalrfb = [];

function clearClass(cls, i) {
    $('#samplemeter' + i).find('.' + cls + ' .greenyellow').removeClass('greenyellow')
    $('#samplemeter' + i).find('.' + cls + ' .red').removeClass('red')
    $('#samplemeter' + i).find('.' + cls + ' .yellow').removeClass('yellow')
}
function renderAudio(n, i) {
    clearClass('audio', i);
    if (n) {
        if (n[7] == 1)
            $('#samplemeter' + i).find('.a1').addClass('greenyellow');
        if (n[6] == 1)
            $('#samplemeter' + i).find('.a2').addClass('greenyellow');
        if (n[5] == 1)
            $('#samplemeter' + i).find('.a3').addClass('greenyellow');
        if (n[4] == 1)
            $('#samplemeter' + i).find('.a4').addClass('greenyellow');
        if (n[3] == 1)
            $('#samplemeter' + i).find('.a5').addClass('yellow');
        if (n[2] == 1)
            $('#samplemeter' + i).find('.a6').addClass('yellow');
        if (n[1] == 1)
            $('#samplemeter' + i).find('.a7').addClass('yellow');
        if (n[0] == 1)
            $('#samplemeter' + i).find('.a8').addClass('red');
    }

}
function renderRFA(n, i) {
    clearClass('rfa', i);
    if (n) {
        if (n[7] == 1)
            $('#samplemeter' + i).find('.rfa1').addClass('greenyellow');
        if (n[6] == 1)
            $('#samplemeter' + i).find('.rfa2').addClass('greenyellow');
        if (n[5] == 1)
            $('#samplemeter' + i).find('.rfa3').addClass('greenyellow');
        if (n[4] == 1)
            $('#samplemeter' + i).find('.rfa4').addClass('greenyellow');
        if (n[3] == 1)
            $('#samplemeter' + i).find('.rfa5').addClass('yellow');
        if (n[2] == 1)
            $('#samplemeter' + i).find('.rfa6').addClass('yellow');
        if (n[1] == 1)
            $('#samplemeter' + i).find('.rfa7').addClass('red');
        if (n[0] == 1)
            $('#samplemeter' + i).find('.rfa8').addClass('red');
    }
}
function renderRFB(n, i) {
    clearClass('rfb', i);
    if (n) {
        if (n[7] == 1)
            $('#samplemeter' + i).find('.rfb1').addClass('greenyellow');
        if (n[6] == 1)
            $('#samplemeter' + i).find('.rfb2').addClass('greenyellow');
        if (n[5] == 1)
            $('#samplemeter' + i).find('.rfb3').addClass('greenyellow');
        if (n[4] == 1)
            $('#samplemeter' + i).find('.rfb4').addClass('greenyellow');
        if (n[3] == 1)
            $('#samplemeter' + i).find('.rfb5').addClass('yellow');
        if (n[2] == 1)
            $('#samplemeter' + i).find('.rfb6').addClass('yellow');
        if (n[1] == 1)
            $('#samplemeter' + i).find('.rfb7').addClass('red');
        if (n[0] == 1)
            $('#samplemeter' + i).find('.rfb8').addClass('red');
    }
}

var fps = 30;
var interval1 = 1000 / fps;
var nosec = 100;

function audio(ai, reg) {
    if (!reg) {
        intervala[ai] = setInterval(function () {
            var audio = Math.floor(Math.random() * ((256 - 1) + 1) + 1);
            renderAudio(listBins[audio], ai);
        }, nosec);
    } else {
        var audio = Math.floor(Math.random() * ((256 - 1) + 1) + 1);
        renderAudio(listBins[audio], i);
        window.requestAnimationFrame(blink.bind('a', i));
    }
}
function rfa(bi, reg) {
    if (!reg) {
        intervalrfa[bi] = setInterval(function () {
            var rfa = Math.floor(Math.random() * ((256 - 1) + 1) + 1);
            renderRFA(listBins[rfa], bi);
        }, nosec);
    } else {
        var rfa = Math.floor(Math.random() * ((256 - 1) + 1) + 1);
        renderRFA(listBins[rfa], i);
        window.requestAnimationFrame(blink.bind('a', i));
    }
}
function rfb(ci, reg) {
    if (!reg) {
        intervalrfb[ci] = setInterval(function () {
            var rfb = Math.floor(Math.random() * ((256 - 1) + 1) + 1);
            renderRFB(listBins[rfb], ci);
        }, nosec);
    } else {
        var rfb = Math.floor(Math.random() * ((256 - 1) + 1) + 1);
        renderRFB(listBins[rfb], i);
        window.requestAnimationFrame(blink.bind('a', i));
    }

}
function usingSetInterval(i) {

    audio(i, false);
    rfa(i, false);
    rfb(i, false);

}
function usingRequestAni(i) {

    setTimeout(function () {
        audio(i, true);
    }, interval1);
    setTimeout(function () {
        rfa(i, true);

    }, interval1);
    setTimeout(function () {
        rfb(i, true);

    }, interval1);
}

function blink(i) {
    usingSetInterval(i);
    //  usingRequestAni(i);

}

function startBlinking() {
    for (var i = 1; i <= cnt; i++) {
        blink(i);
    }
}
function stopBlinking() {
    for (var j = 0; j < intervala.length; j++) {
        clearInterval(intervala[j]);
        clearInterval(intervalrfa[j]);
        clearInterval(intervalrfb[j]);
    }
}