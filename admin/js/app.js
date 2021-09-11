function listRegisters() {
    $('#files').empty();
    $('#content').html(`
        <tr>
            <td colspan="4">--- Muestre resultados aquí ---</td>
        </tr>
    `);
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
                ondblclick="dataByRegister(this)">
                    <div class="img"></div>
                    ${file}
                </div>
                `;
                $('#files').append(template);
            });
        }
    })
}

function selectFile(file){
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
    var fileName = $(file).text().trim();
    $.ajax({
        url: 'http://localhost/facebook/admin/php/funcs.php',
        type: 'POST',
        data: {
            'function': 'dataByRegister',
            'data': fileName
        }
    }).done(res => {
        if(res.status == 200) {
            $('#content').empty();
            res.data.forEach(user => {
                var id = user.id;
                var email = user.username.email;
                var time = moment(user.date).fromNow();
                var ip = user.client.ip;
                template = `
                <tr>
                    <td>${id}</td>
                    <td>${email}</td>
                    <td>${time}</td>
                    <td>
                        <button>👁</button>
                        <button>X</button>
                    </td>
                </tr>
                `;
                $('#content').append(template);
            })
        }
    })
}

listRegisters();