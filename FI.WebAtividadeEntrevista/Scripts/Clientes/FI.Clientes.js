
$(document).ready(function () {

    let cpfField = $(this).find("#CPF");

    let rawCPF = "";

    cpfField.keyup(
        (e) => {

            if (e.key == "Backspace") {

                cpfField.val("");

                return true;

            }

            var cpf = cpfField.val();

            if (!e.key.match(/[0-9]/)) {

                //if (e.key.match(/(\.|\-)/)) cpfField.val(cpfField.val());

                //alert("Formato inválido do CPF");

                cpfField.val(cpf.substring(0, cpf.length - 1));

            } else {

                if (cpf.length == 3) {
                    cpfField.val(cpf + ".");
                } else if (cpf.length == 7) {
                    cpfField.val(cpf + ".");
                } else if (cpf.length == 11) {
                    cpfField.val(cpf + "-");
                }

            }

        }
    );

    function validadorCPF(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
        strCPF = strCPF.replaceAll(".", "").replaceAll("-", "");
        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

       

        if (!validadorCPF($(this).find("#CPF").val())) {
            alert("CPF inválido");
        } else {
            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $(this).find("#Nome").val(),
                    "CEP": $(this).find("#CEP").val(),
                    "Email": $(this).find("#Email").val(),
                    "Sobrenome": $(this).find("#Sobrenome").val(),
                    "Nacionalidade": $(this).find("#Nacionalidade").val(),
                    "Estado": $(this).find("#Estado").val(),
                    "Cidade": $(this).find("#Cidade").val(),
                    "Logradouro": $(this).find("#Logradouro").val(),
                    "Telefone": $(this).find("#Telefone").val(),
                    "CPF": $(this).find("#CPF").val()
                },
                error:
                    function (r) {
                        if (r.status == 400)
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        else if (r.status == 500)
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                    },
                success:
                    function (r) {
                        ModalDialog("Sucesso!", r)
                        $("#formCadastro")[0].reset();
                    }
            });
        }


    })

    $('#Beneficiarios').click(function (e) {

        var random = Math.random().toString().replace('.', '');
        var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
            '        <div class="modal-dialog">                                                                                 ' +
            '            <div class="modal-content">                                                                            ' +
            '                <div class="modal-header">                                                                         ' +
            '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
            '                    <h4 class="modal-title">' +"Beneficiários"+'</h4>                                                    ' +
            '                </div>                                                                                             ' +
            '                <div class="modal-body">                                                                           ' +
            `
                                <form id="formCadastro" action = "/Beneficiario/insert" method="post">

                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="CPF">CPF:</label>
                                                <input required="required" type="text" class="form-control" id="cpfb" name="cpfb" placeholder="Ex.: 999.999.999-99" maxlength="14">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="nameb">Nome:</label>
                                                <input required="required" type="text" class="form-control" id="nameb" name="nameb" placeholder="Rafael José">
                                            </div>
                                        </div>

                                       <div class="col-md-2">
                                            
                                                <label for="Logra">Incluir</label>
                                                <button type="button" class="btn btn-sm btn-success" onclick="myFunction()" >Salvar</button>
                                            
                                        </div>
                                            
                                       
                                    </div>
                                </form>
                                <script>
                                function myFunction() {
                                    console.log("")
                                    $.ajax({
                                        url: "Beneficiario",
                                        method: "POST",
                                        data: {
                                            "NOME": $(this).find("#nameb").val(),
                                            "CPF": $(this).find("#cpfb").val()
                                        },
                                        error:
                                            function (r) {
                                                if (r.status == 400)
                                                    ModalDialog("Ocorreu um erro", r.responseJSON);
                                                else if (r.status == 500)
                                                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                                            },
                                        success:
                                            function (r) {
                                                ModalDialog("Sucesso!", r)
                                            }
                                        });
                                    

                                    }


                                </script>



`+

            '                <div class="modal-footer">                                                                         ' +
            '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
            '                                                                                                                   ' +
            '                </div>                                                                                             ' +
            '            </div><!-- /.modal-content -->                                                                         ' +
            '  </div><!-- /.modal-dialog -->                                                                                    ' +
            '</div> <!-- /.modal -->                                                                                        ';

        $('body').append(texto);
        $('#' + random).modal('show');
    
    })
})



function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
