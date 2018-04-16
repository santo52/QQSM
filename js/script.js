var respondido = '';
var iteraciones = 20;
var timerId;

function changeQuestion() {
    var preguntas = localStorage.getItem('preguntas');
    var iteracion = $('#iteracion').val();
    $('#next').hide();

    if ($('#cincuenta').val() == 1) {
        $('.ayudas').show();
    }

    if (preguntas == undefined || iteracion > iteraciones) {
        preguntas = '[]';
        iteracion = 0;
        reiniciar();
    }

    $.getJSON("/json/preguntas.json", function(data) {


        var x = parseInt(Math.random(1, iteraciones) * (iteraciones - 1) + 1);
        var array = JSON.parse(localStorage.getItem('preguntas'));
        array = Object.values(array);

        while (array.indexOf(x) != -1) {
            x = parseInt(Math.random() * (iteraciones - 1) + 1);
        }

        iteracion++;
        $('#iteracion').val(iteracion);

        array.push(x);
        preguntas = localStorage.setItem('preguntas', JSON.stringify(array));

        let info = data[x];
        let html = '';
        html += `<input type="hidden" id="respondido" value="0">
                <input type="hidden" id="respuesta" value="` + info.resp + `">
                <div class="input col-sm-12" style="text-align:center">
                    <span class="text" style="margin:10px; ">` + info.pregunta + `</span>
                </div>`

        html += `<div class="row col-sm-12">
                    <div class="input  between basis-50"  onclick="response(this)" data-value="a" data-resp="` + info.resp + `">
                        <span class="option">a.</span>
                        <span class="text">` + info.respuestas.a + `</span>
                    </div>
                    <div class="input  between basis-50"  onclick="response(this)" data-value="b" data-resp="` + info.resp + `">
                        <span class="option">b.</span>
                        <span class="text">` + info.respuestas.b + `</span>
                    </div>
                </div>`

        html += `<div class="row col-sm-12">
                    <div class="input  between basis-50" onclick="response(this)" data-value="c" data-resp="` + info.resp + `">
                        <span class="option">c.</span>
                        <span class="text">` + info.respuestas.c + `</span>
                    </div>
                    <div class="input  between basis-50" onclick="response(this)" data-value="d" data-resp="` + info.resp + `">
                        <span class="option">d.</span>
                        <span class="text">` + info.respuestas.d + `</span>
                    </div>
                </div>`


        $('#contador').show();
        $('#container').html(html);
        iniciarContador();
    });



}

function response(self) {
    let val = $(self).data('value');
    $('#respondido').val(val);
    $('.input').removeClass('orange');
    $(self).addClass('orange');
    $('#next').show();
}

function enviar() {
    let respondido = $('#respondido').val();
    let respuesta = $('#respuesta').val();

    if (respuesta == 0) {
        alert('seleccione una opción');
    } else if (respuesta == respondido) {
        $(document).find('.orange').removeClass('orange').addClass('green');
        clearInterval(timerId);
        setTimeout(function() {
            changeQuestion();
        }, 2000);
    } else {
        alert('HA PERDIDO');
        reiniciar();
    }
}

function iniciarContador() {
    var tiempo = 60;
    clearInterval(timerId);
    timerId = setInterval(function() {
        tiempo--;
        $('#contador').text(tiempo);
        if (tiempo <= 0) {
            clearInterval(timerId);
            alert("ha acabado su tiempo");
            reiniciar();
        }
    }, 1000);
}

function reiniciar() {
    localStorage.setItem('preguntas', '[]');
    $('#iteracion').val(0);
    $('#respondido').val(0);
    clearInterval(timerId);
    let html = `
    <div class="input-primary col-sm-6" style="text-align: center; padding: 10px; background: green" id="start" onclick="changeQuestion()">
        <span class="text">CLICK PARA EMPEZAR</span>
    </div>
    `;
    $('#contador').hide();
    $('#container').html(html);
    $('#next').hide();
    $('.ayudas').hide();
    $('#cincuenta').val(1);
}

function cincuenta() {
    var respuesta = $('#respuesta').val();
    let array = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
    let x = parseInt(Math.random() * (4 - 1) + 1);
    $.each(array, function(i, v) {
        if (!(v == x || i == respuesta)) {
            $('[data-value=' + i + ']').addClass('disabled');
        }
    });

    $('.ayudas').hide();
    $('#cincuenta').val(0);
}