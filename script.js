/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var isRendered = false, connection;
$(function () {
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    connection = new WebSocket('ws://127.0.0.1:1337');

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

        if (!isRendered) {
            renderMeters(json.length);
            isRendered = true
        }
        renderMetering(json);
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

var cnt = 20;
var fps = 30;
var interval1 = 1000 / fps;
var nosec = 300;
var orange = 'orange';
var blue = 'blue';
var greenyellow = 'greenyellow';
var red = 'red';
var yellow = 'yellow';

function renderMeters(len) {
    var cnt = len;
    $('#meters').html('');
    for (var i = 1; i <= len; i++) {
        var cl = $('.con').clone().show().removeClass('con').attr('id', 'samplemeter' + i);
        $('#meters').append(cl);
    }
}

setTimeout(function () {
    //   renderMeters(cnt);
}, 200);

var intervala = [];
var intervalrfa = [];
var intervalrfb = [];

function clearClass(cls, i) {
    $('#samplemeter' + i).find('.' + cls + ' .greenyellow').removeClass(greenyellow);
    $('#samplemeter' + i).find('.' + cls + ' .red').removeClass(red);
    $('#samplemeter' + i).find('.' + cls + ' .yellow').removeClass(yellow);
    $('#samplemeter' + i).find('.' + cls + ' .orange').removeClass(orange);
    $('#samplemeter' + i).find('.' + cls + ' .blue').removeClass(blue);
}
function renderAudio(n, i) {
    clearClass('audio', i);
    if (n) {
        if (n[7] == 1)
            $('#samplemeter' + i).find('.areplacelater').addClass(greenyellow);
        if (n[6] == 1)
            $('#samplemeter' + i).find('.areplacelater').addClass(greenyellow);
        if (n[5] == 1)
            $('#samplemeter' + i).find('.a1').addClass(greenyellow);
        if (n[4] == 1)
            $('#samplemeter' + i).find('.a2').addClass(greenyellow);
        if (n[3] == 1)
            $('#samplemeter' + i).find('.a3').addClass(greenyellow);
        if (n[2] == 1)
            $('#samplemeter' + i).find('.a4').addClass(yellow);
        if (n[1] == 1)
            $('#samplemeter' + i).find('.a5').addClass(yellow);
        if (n[0] == 1)
            $('#samplemeter' + i).find('.a6').addClass(red);
    }

}
function renderRFA(n, i, rfac) {
    var rfcls = 'rfa';
    clearClass('rfa', i);
    if (n) {
        if (n[7] == 1) {
            $('#samplemeter' + i).find('.rfa1replacelater').addClass(orange);
            renderUnderneeth(7, i, rfcls);
        }
        if (n[6] == 1) {
            $('#samplemeter' + i).find('.rfa1').addClass(orange);
            renderUnderneeth(6, i, rfcls);
        }
        if (n[5] == 1) {
            $('#samplemeter' + i).find('.rfa2').addClass(orange);
            renderUnderneeth(5, i, rfcls);
        }
        if (n[4] == 1) {
            $('#samplemeter' + i).find('.rfa3').addClass(orange);
            renderUnderneeth(4, i, rfcls);
        }
        if (n[3] == 1) {
            $('#samplemeter' + i).find('.rfa4').addClass(orange);
            renderUnderneeth(3, i, rfcls);
        }
        if (n[2] == 1) {
            $('#samplemeter' + i).find('.rfa5').addClass(yellow);
            renderUnderneeth(2, i, rfcls);
        }
        if (rfac.antenaLEDA == 1) {
            $('#samplemeter' + i).find('.rfa6').addClass(blue);
        }
    }
}
function renderRFB(n, i, rfbc) {
    var rfcls = 'rfb';
    clearClass('rfb', i);
    if (n) {
        if (n[7] == 1) {
            $('#samplemeter' + i).find('.rfb1replacelater').addClass(orange);
            renderUnderneeth(7, i, rfcls);
        }
        if (n[6] == 1) {
            $('#samplemeter' + i).find('.rfb1').addClass(orange);
            renderUnderneeth(6, i, rfcls);
        }
        if (n[5] == 1) {
            $('#samplemeter' + i).find('.rfb2').addClass(orange);
            renderUnderneeth(5, i, rfcls);
        }
        if (n[4] == 1) {
            $('#samplemeter' + i).find('.rfb3').addClass(orange);
            renderUnderneeth(4, i, rfcls);
        }
        if (n[3] == 1) {
            $('#samplemeter' + i).find('.rfb4').addClass(yellow);
            renderUnderneeth(3, i, rfcls);
        }
        if (n[2] == 1) {
            $('#samplemeter' + i).find('.rfb5').addClass(yellow);
            renderUnderneeth(2, i, rfcls);
        }
        if (rfbc.antenaLEDB == 1) {
            $('#samplemeter' + i).find('.rfb6').addClass(blue);
        }
    }
}
function renderUnderneeth(c, j, cls) {
    for (var o = 1; o < c; o++) {
        $('#samplemeter' + j).find('.' + cls + o).addClass(getColor(o));
    }
}
function getColor(v) {
    var clr = greenyellow;
    if (v < 5) {
        clr = orange;
    } else if (v == 5) {
        clr = yellow;
    } else if (v == 6) {
        clr = blue;
    }
    return clr;
}


function audio(ai, reg) {
    console.log(listBins);
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
function renderMetering(data) {
    for (var i = 0; i < data.length; i++) {
        const indx = i + 1;
        renderAudio(data[i].audio.bitpattern, indx);
        renderRFA(data[i].rf.bitpattern, indx, data[i].rf);
        renderRFB(data[i].rf.bitpattern, indx, data[i].rf);
    }
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