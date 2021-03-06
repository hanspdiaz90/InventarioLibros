$(function () {

    getPublishers();

    $("#publisherAddForm").submit(function (event) {
        event.preventDefault();
    });

    $("#btnAdd").click(function () {
        $("#publisherAddForm").validate({
            rules: {
                nombre: { required: true, minlength: 5 },
                direccion: { required: true },
                email: { required: true, email: true  },
                nroTelefono: { required: true, digits: true },
                paginaWeb: { required: true }
            },
            submitHandler: function (form) {
                let url = "/biblioteca/editoriales?accion=crear";
                let formData = $(form).serialize();
                $.ajax({
                    url: url,
                    type: "POST",
                    data: formData,
                    dataType: "JSON",
                    success: function (response) {
                        if (response.status == "success") {
                            $(form).trigger("reset");
                            $("#publisherAddModal").modal("hide");
                            $("#publishersDataTable").DataTable().ajax.reload(null, false);
                            Swal.fire("Registrado!", response.message, "success");
                        }
                    },
                    processData: false,
                    cache: false,
                });
            }
        });

    });

    $("#btnResetAdd").click(function () {
        resetInvalidForm(this, "#publisherAddForm");
    });

});

function resetInvalidForm(button, validatedForm) {
    let form = $(button).closest(validatedForm);
    let validator = form.validate();
    validator.resetForm();
    form.find(".form-control").removeClass("is-invalid");
    $(validatedForm).trigger("reset");
}

function viewDetailsPublisher(button) {
    let publisherId = $(button).data("publisherId");
    let url = "/biblioteca/editoriales?accion=verDetalles";
    $.ajax({
        url: url,
        method: "GET",
        data: { id: publisherId },
        dataType: "JSON",
        success: function (response) {
            if (response.status == "success") {
                let objPublisher = response.result;
                let classNameBadge = objPublisher.activo ? "success" : "danger";
                let classNameIcon = objPublisher.activo ? "check" : "times";
                let statusText = objPublisher.activo ? "ACTIVO" : "INACTIVO";
                let modalBody = $("#publisherViewModal .modal-body");
                modalBody.empty();
                let elementHTML = "<dl>";
                    elementHTML += "<dt>Editorial</dt>";
                    elementHTML += "<dd>" + objPublisher.nombre + "</dd>";
                    elementHTML += "<dt>Direcci??n</dt>";
                    elementHTML += "<dd>" + objPublisher.direccion + "</dd>";
                    elementHTML += "<dt>P??gina Web</dt>";
                    elementHTML += "<dd><a href='https://" + objPublisher.paginaWeb + "' target='_blank'>" + objPublisher.paginaWeb + "</a></dd>";
                    elementHTML += "<dt>E-mail</dt>";
                    elementHTML += "<dd>" + objPublisher.email + "</dd>";
                    elementHTML += "<dt>Tel??fono</dt>";
                    elementHTML += "<dd>" + objPublisher.nroTelefono + "</dd>";
                    elementHTML += "<dt>Activo?</dt>";
                    elementHTML += "<dd><span class='badge badge-"+ classNameBadge + "'><i class='fas fa-"+ classNameIcon + "'></i> " + statusText+ "</span></dd>";
                    elementHTML += "</dl>";
                modalBody.append(elementHTML);
                $("#publisherViewModal").modal("show");
            }
        }
    });
}

function disablePublisher(button) {
    let publisherName = $(button).data("publisherName");
    Swal.fire({
        title: "??Est??s seguro que quieres deshabilitar la editorial: " + publisherName + " ?",
        text: "No podr??s revertir esta operaci??n!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, realizar operaci??n"
    }).then((result) => {
        if (result.isConfirmed) {
            let url = "/biblioteca/editoriales?accion=deshabilitar";
            let publisherId = $(button).data("publisherId");
            $.ajax({
                url: url,
                method: "GET",
                data: { id: publisherId },
                dataType: "JSON",
                success: function (response) {
                    if (response.status == "success") {
                        $("#publishersDataTable").DataTable().ajax.reload(null, false);
                        Swal.fire("Deshabilitado!", response.message, "success");
                    }
                }
            });
        }
    });
}

function getPublishers() {
    let url = "/biblioteca/editoriales?accion=listar";
    let table = $("#publishersDataTable").DataTable({
        destroy: true,
        ajax: {
            url: url,
            dataSrc: "result"
        },
        columns: [
            { data: "nombre" },
            { data: "email" },
            {
                data: null,
                render: function (data, type, row) {
                    let regex = row.nroTelefono.length == 7 ? /(\d{3})?(\d{4})/ : /(\d{3})?(\d{3})?(\d{3})/;
                    let format = row.nroTelefono.length == 7 ? "$1-$2" : "$1-$2-$3";
                    return row.nroTelefono.replace(regex, format);
                }
            },
            {
                data: null,
                className: "text-center",
                render: function(data, type, row) {
                    let classNameBadge = row.activo ? "success" : "danger";
                    let classNameIcon = row.activo ? "check" : "times";
                    let statusText = row.activo ? "ACTIVO" : "INACTIVO";
                    let elementHTML = "<span class='badge badge-" + classNameBadge + "'>";
                        elementHTML += "<i class='fas fa-" + classNameIcon + "'></i> <span>" + statusText + "</span>";
                        elementHTML += "</span>";
                    return elementHTML;
                }
            },
            {
                data: null,
                className: "text-center",
                render: function (data, type, row) {
                    let elementHTML = "<div class='btn-group btn-group-sm'>";
                    elementHTML += "<button type='button' onclick='viewDetailsPublisher(this)' class='btn btn-info' data-toggle='modal' data-target='#publisherViewModal' data-tooltip='tooltip' data-placement='left' title='M??s informaci??n' data-publisher-id='" + row.id + "'><i class='fas fa-eye'></i></button>";
                    if (row.activo) {
                        elementHTML += "<button type='button' onclick='editPublisher(this)' class='btn btn-warning' data-toggle='modal' data-target='#publisherEditModal' data-tooltip='tooltip' data-placement='bottom' title='Editar' data-publisher-id='" + row.id + "'><i class='fas fa-pen'></i></button>"
                        elementHTML += "<button type='button' onclick='disablePublisher(this)' class='btn btn-danger' data-tooltip='tooltip' data-placement='top' title='Desactivar'  data-publisher-id='" + row.id + "' data-publisher-name='" + row.nombre + "'><i class='fas fa-flag'></i></button>"
                    }
                    elementHTML += "</div>"
                    return elementHTML;
                }
            }
        ]
    });
    table.on("draw", function () {
        $("[data-tooltip='tooltip']").tooltip();
    });

}