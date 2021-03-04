function buduj() {
    zostalo = liczbaKart / 2;

    for (i = 1; i <= liczbaKart; i++) {
        divy = divy + '<div class="card" id="k' + i + '"></div>';
    }

    divy = divy + '<div class="score">Tura: 0</div>'

    $('.board').html(divy);

    if (liczbaKart == 16) { cardss = ["chryzantema.png", "irys.png", "krokus.png", "narcyz.png", "przebisnieg.png", "róża.png", "stokrotka.png", "tulipan.png", "chryzantema.png", "irys.png", "krokus.png", "narcyz.png", "przebisnieg.png", "róża.png", "stokrotka.png", "tulipan.png"]; }

    if (liczbaKart == 24) { cardss = ["chryzantema.png", "irys.png", "krokus.png", "narcyz.png", "przebisnieg.png", "róża.png", "stokrotka.png", "tulipan.png", "bratek.png", "hiacynt.png", "krokus.png", "piwonia.png", "chryzantema.png", "irys.png", "krokus.png", "narcyz.png", "przebisnieg.png", "róża.png", "stokrotka.png", "tulipan.png", "bratek.png", "hiacynt.png", "krokus.png", "piwonia.png"]; }

    if (liczbaKart == 30) { cardss = ["chryzantema.png", "irys.png", "krokus.png", "narcyz.png", "przebisnieg.png", "róża.png", "stokrotka.png", "tulipan.png", "bratek.png", "hiacynt.png", "krokus.png", "piwonia.png", "dalia.png", "orchidea.png", "pelargonia.png", "chryzantema.png", "irys.png", "krokus.png", "narcyz.png", "przebisnieg.png", "róża.png", "stokrotka.png", "tulipan.png", "bratek.png", "hiacynt.png", "krokus.png", "piwonia.png", "dalia.png", "orchidea.png", "pelargonia.png"]; }
    losuj();
}

var liczbaKart;
var divy = "";
var img;
var lvl;
var tortory;

//karty po kolei
var cardss = [];

//karty polosowane(zaraz beda)
var cards = [];

//losowanie
function losuj() {
    var ileJeszcze = liczbaKart;

    for (i = 0; i <= liczbaKart - 1; i++) {
        var los = Math.floor(Math.random() * ileJeszcze);
        cards.push(cardss[los]);
        cardss.splice(los, 1,);
        ileJeszcze--;
    }
    for (i = 1; i <= liczbaKart; i++) {
        document.getElementById('k' + i).setAttribute("onclick", "odslon(" + i + ")");
        //document.getElementById('k'+i).addEventListener("click", function() {proba(i);});
    }
}

var oneVisible = false;
var turn = 0;
var widoczna;
var lock = false;
var zostalo;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
var win = new Audio("win.wav");

function odslon(nr) {
    if (($('#k' + nr).css('opacity')) != 0 && lock == false && (widoczna == nr)) { }
    else if (($('#k' + nr).css('opacity')) != 0 && lock == false) {
        //blokujemy mozliwosc odkrycia nastepnej karty
        lock = true;

        var obraz = "url(" + img + "/" + cards[nr - 1] + ")";

        $('#k' + nr).css('background-image', obraz);
        $('#k' + nr).addClass('cardA');

        //pierwsza karta
        if (oneVisible == false) {
            oneVisible = true;
            widoczna = nr;
            lock = false;
        }

        //druga karta
        else {
            //para
            if (cards[widoczna - 1] == cards[nr - 1]) {
                yes.play()
                setTimeout(function () { schowaj(widoczna, nr) }, 700);
            }
            //pudło
            else {
                no.play()
                setTimeout(function () { odwroc(widoczna, nr) }, 1200);
            }
            turn++;
            $('.score').html("Tura: " + turn);
            oneVisible = false;
        }
    }
}

function schowaj(nr1, nr2) {
    $("#k" + nr1).css("opacity", "0");
    $("#k" + nr2).css("opacity", "0");
    lock = false;

    zostalo--;


    //Game Over
    if (zostalo == 0) {
        if (turn == 22 || turn == 23 || turn == 24 || turn == 32 || turn == 33 || turn == 34 || turn == 42 || turn == 43 || turn == 44 || turn == 52 | turn == 53 || turn == 54 || turn == 62 || turn == 63 || turn == 64 || turn == 72 || turn == 73 || turn == 74 || turn == 82 || turn == 83) tortory = "tury";
        else tortory = "tur";

        $('h1').css('margin-bottom', 'auto')

        $('.board').html('<h2>Ukończyłeś poziom ' + lvl + ' w ' + turn + " " + tortory + '</h2> </br> <h1 class="jr" onClick="window.location.reload();">Jeszcze raz?</h1>')

        win.play()
    }
}

function odwroc(nr1, nr2) {
    $('#k' + nr1).css('background-image', 'url(img/kk2.jpg)');
    $('#k' + nr1).removeClass('cardA');

    $('#k' + nr2).css('background-image', 'url(img/kk2.jpg)');
    $('#k' + nr2).removeClass('cardA');
    lock = false;
    widoczna=null;
}

//wybor poziomu trudnosci
$("#wybor #p1").click(function () {
    lvl = "łatwy";
    schowajDiva();
    liczbaKart = 16;
    img = 'img';
    buduj();
    pokazDiva();
});

$("#wybor #p2").click(function () {
    lvl = "średni";
    schowajDiva();
    liczbaKart = 24;
    img = 'img2';
    buduj();
    $('.board').css('width', '900px')
    pokazDiva();

});

$("#wybor #p3").click(function () {
    lvl = "trudny";
    schowajDiva();
    liczbaKart = 30;
    img = 'img3';
    buduj();
    $('.board').css('width', '900px')
    $('h1').css('margin-bottom', '0')
    pokazDiva();
});

function schowajDiva() {
    $('#wybor').html("");
}

function pokazDiva() {
    $('.board').css('visibility', 'visible');
}
