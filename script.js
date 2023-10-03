$(document).ready(function () {
    var barcodeData = [];

    $("#add-barcode").click(function () {
        var barcodeValue = $("#barcode-input").val();
        if (barcodeValue !== "") {
            barcodeData.push(barcodeValue);
            $("#barcode-input").val("").focus();
            updateBarcodeList();
        }
    });

    $("#barcode-form").submit(function (e) {
        e.preventDefault();
        createTable();
    });

    function updateBarcodeList() {
        $("#barcode-list").html("");
        for (var i = 0; i < barcodeData.length; i++) {
            $("#barcode-list").append('<div class="input-group mb-2"><input type="text" class="form-control" value="' + barcodeData[i] + '" disabled><div class="input-group-append"><button type="button" class="btn btn-success edit-button">Editar</button></div></div>');
        }
    }

    function createTable() {
        var tableHTML = '<table class="table"><thead><tr><th>Código de Barras</th><th>Ação</th></tr></thead><tbody>';
        for (var i = 0; i < barcodeData.length; i++) {
            tableHTML += '<tr><td>' + barcodeData[i] + '</td><td><button type="button" class="btn btn-success confirm-button">Confirmar</button></td></tr>';
        }
        tableHTML += '</tbody></table>';
        $("#barcode-list").html(tableHTML);
    }

    $(document).on("click", ".edit-button", function () {
        var index = $(this).closest(".input-group").index();
        $("#barcode-input").val(barcodeData[index]).focus();
        barcodeData.splice(index, 1);
        updateBarcodeList();
    });

    $(document).on("click", ".confirm-button", function () {
        var index = $(this).closest("tr").index();
        // Enviar os dados para o servidor PHP e MySQL aqui
        alert("Dado confirmado: " + barcodeData[index]);
        barcodeData.splice(index, 1);
        createTable();
    });
});
