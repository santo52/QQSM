$('#start').on('click', function() {

    var preguntas = localStorage.getItem('preguntas');
    if (preguntas == undefined) {
        preguntas = localStorage.setItem('preguntas', '[]');
    }


    $.getJSON("/json/preguntas.json", function(data) {


        var x = parseInt(Math.random(1, 20) * (20 - 1) + 1);
        var array = JSON.parse(localStorage.getItem('preguntas'));
        array = Object.values(array);

        while (array.indexOf(x) != -1) {
            x = parseInt(Math.random() * (20 - 1) + 1);
        }


        array.push(x);
        preguntas = localStorage.setItem('preguntas', JSON.stringify(array));

        let info = data[x];
        let html = '';
        html += `<div class="input col-sm-12" style="text-align:center">
                    <span class="text" style="margin:10px; ">` + info.pregunta + `</span>
                </div>`

        html += `<div class="row col-sm-12">
                    <div class="input  between basis-50">
                        <span class="option">a.</span>
                        <span class="text">` + info.respuestas.a + `</span>
                    </div>
                    <div class="input  between basis-50">
                        <span class="option">b.</span>
                        <span class="text">` + info.respuestas.b + `</span>
                    </div>
                </div>`

        html += `<div class="row col-sm-12">
                    <div class="input  between basis-50">
                        <span class="option">c.</span>
                        <span class="text">` + info.respuestas.c + `</span>
                    </div>
                    <div class="input  between basis-50">
                        <span class="option">d.</span>
                        <span class="text">` + info.respuestas.d + `</span>
                    </div>
                </div>`


        $('#container').html(html);
    });


});