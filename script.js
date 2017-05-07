/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function (w, d, $) {

}(window, document, jQuery));
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



function initiateWebConnection() {
    var wuri = 'ws://127.0.0.1:3434';
    var socket = new WebSocket(wuri);
    socket.onopen = function (e) {
        console.log('Connection Opend', e);
        // socket.send('Hello Mr Webserver');
    };
    socket.onmessage = function (e) {
        console.log('Message received form Client', e);
    };
    socket.onclose = function (e) {
        console.log('Connection Closed', e);

    };
    socket.onerror = function (e) {
        console.log('Connection Onerror', e);
    };
}
// initiateWebConnection();

function renderMeters(cnt) {
    $('#meters').html('');
    for (var i = 1; i <= cnt; i++) {
        var cl = $('.con').clone().show().removeClass('con').attr('id', 'samplemeter' + i);
        console.log(cl);
        $('#meters').append(cl);
    }
}
var cnt = 200;
setTimeout(function () {
    renderMeters(cnt);
}, 1000);
var interval = [];
function stopBlinking() {
    for (var j = 0; j < interval.length; j++) {
        clearInterval(interval[j]);
    }
}
function render(n, i) {
    $('#samplemeter' + i).find('.greenyellow').removeClass('greenyellow')
    $('#samplemeter' + i).find('.red').removeClass('red')
    $('#samplemeter' + i).find('.yellow').removeClass('yellow')
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

var fps = 40;
var interval = 1000 / fps;

function usingSetInterval(i) {
    interval[i] = setInterval(function () {
        var n = Math.floor(Math.random() * ((256 - 1) + 1) + 1);
        render(listBins[n], i);
    }, 100);
}
function usingRequestAni(i) {

    setTimeout(function () {
        var n = Math.floor(Math.random() * ((256 - 1) + 1) + 1);
        render(listBins[n], i);
        window.requestAnimationFrame(blink.bind('a', i));
    }, interval);
}

function blink(i) {
    // usingSetInterval(i); 
    usingRequestAni(i);

}

function startBlinking() {
    for (var i = 1; i <= cnt; i++) {
        blink(i);
    }
}