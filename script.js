/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function (w, d, $) {

}(window, document, jQuery));
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
var cnt = 150;
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
    var classname;
    if (n <= 4) {
        classname = 'greenyellow';
    } else if (n == 5 || n == 6 || n == 7) {
        classname = 'yellow';
    } else if (n == 8) {
        classname = 'red';
    }
    $('#samplemeter' + i).find('.a' + n).addClass(classname);
}
function callthis(i) {
    interval[i] = setInterval(function () {
        var n = Math.floor(Math.random() * ((8 - 1) + 1) + 1);
        render(n, i);
    }, 100);
}
function startBlinking() {
    for (var i = 1; i <= cnt; i++) {
        var l = i;
        callthis(i);
    }
}