$(function () {

    getBooks();

    $("#cbxAutores").select2({
        ajax: {
            url: "/biblioteca/libros?accion=listarAutoresActivos",
            dataType: "JSON",
            delay: 250,
            data: function (params) {
                return { filtro: params.term };
            },
            processResults: function (response) {
                let results = $.map(response.result, function (item) {
                    return {
                        id: item.id,
                        text: item.nombres + " " + item.apellidos
                    };
                });
                return {
                    results: results
                };
            },
            cache: true
        },
        placeholder: {
            id: "-1",
            text: "[ Seleccionar autor ]"
        },
        theme: "bootstrap4",
        allowClear: true
    });
    $("#cbxEditoriales").select2({
        ajax: {
            url: "/biblioteca/libros?accion=listarEditorialesActivos",
            dataType: "JSON",
            delay: 250,
            data: function (params) {
                return { filtro: params.term };
            },
            processResults: function (response) {
                console.log(response.result);
                let results = $.map(response.result, function (item) {
                    return {
                        id: item.id,
                        text: item.nombre
                    };
                });
                return {
                    results: results
                };
            },
            cache: true
        },
        placeholder: {
            id: "-1",
            text: "[ Seleccionar editorial ]"
        },
        theme: "bootstrap4",
        allowClear: true
    });
    $("#cbxGeneros").select2({
        ajax: {
            url: "/biblioteca/libros?accion=listarGenerosActivos",
            dataType: "JSON",
            delay: 250,
            data: function (params) {
                return { filtro: params.term };
            },
            processResults: function (response) {
                let results = $.map(response.result, function (item) {
                    return {
                        id: item.id,
                        text: item.nombre
                    };
                });
                return {
                    results: results
                };
            },
            cache: true
        },
        placeholder: {
            id: "-1",
            text: "[ Seleccionar g??nero ]"
        },
        theme: "bootstrap4",
        allowClear: true
    });

    $("#bookAddForm").submit(function (event) {
        event.preventDefault();
    });

    $("#btnAdd").click(function () {
        $("#bookAddForm").validate({
            rules: {
                titulo: { required: true },
                isbn: { required: true, minlength: 13, maxlength:13, digits: true },
                anioEdicion: { required: true },
                portada: { required: true },
                autor: {required: true },
                editorial: {required: true },
                genero: {required: true },
                nroPaginas: { required: true },
                ejemplares: { required: true },
                precio: { required: true },
                resenha: { required: true }
            },
            submitHandler: function (form) {
                let url = "/biblioteca/libros?accion=crear";
                let formData = $(form).serialize();
                $.ajax({
                    url: url,
                    type: "POST",
                    data: formData,
                    dataType: "JSON",
                    success: function (response) {
                        if (response.status == "success") {
                            $(form).trigger("reset");
                            $("#authorAddModal").modal("hide");
                            $("#authorsDataTable").DataTable().ajax.reload(null, false);
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
        resetInvalidForm(this, "#bookAddForm");
    });

});

function resetInvalidForm(button, validatedForm) {
    let form = $(button).closest(validatedForm);
    let validator = form.validate();
    validator.resetForm();
    form.find(".form-control").removeClass("is-invalid");
    $(validatedForm).trigger("reset");
}

function viewDetailsBook(button) {
    let url = "/biblioteca/libros?accion=verDetalles";
    let bookId = $(button).data("bookId");
    $.ajax({
        url: url,
        method: "GET",
        data: { id: bookId },
        dataType: "JSON",
        success: function (response) {
            if (response.status == "success") {
                let objBook = response.result;
                let classNameBadge = objBook.activo ? "success" : "danger";
                let classNameIcon = objBook.activo ? "check" : "times";
                let statusText = objBook.activo ? "ACTIVO" : "INACTIVO";
                let modalBody = $("#bookViewModal .modal-body");
                modalBody.empty();
                let regex = /(\d{3})?(\d{3})?(\d{5})?(\d)?(\d)/;
                let elementHTML = "<dl>";
                    elementHTML += "<dt>ISBN</dt>";
                    elementHTML += "<dd>" + objBook.isbn.replace(regex, "$1-$2-$3-$4-$5") + "</dd>";
                    elementHTML += "<dt>T??tulo</dt>";
                    elementHTML += "<dd>" + objBook.titulo + "</dd>";
                    elementHTML += "<dt>Rese??a</dt>";
                    elementHTML += "<dd>" + objBook.resenia + "</dd>";
                    elementHTML += "<dt>Autor</dt>";
                    elementHTML += "<dd>" + objBook.autor.nombres + " " + objBook.autor.apellidos + "</dd>";
                    elementHTML += "<dt>Editorial</dt>";
                    elementHTML += "<dd>" + objBook.editorial.nombre + "</dd>";
                    elementHTML += "<dt>G??nero Literario</dt>";
                    elementHTML += "<dd>" + objBook.genero.nombre + "</dd>";
                    elementHTML += "<dt>Precio</dt>";
                    elementHTML += "<dd>" + objBook.precio + "</dd>";
                    elementHTML += "<dt>Activo?</dt>";
                    elementHTML += "<dd><span class='badge badge-" + classNameBadge + "'><i class='fas fa-" + classNameIcon + "'></i> " + statusText+ "</span></dd>";
                    elementHTML += "</dl>";
                modalBody.append(elementHTML);
                $("#bookViewModal").modal("show");
            }
        }
    });
}

function disableBook(button) {
    let book = $(button).data("bookTitle");
    Swal.fire({
        title: "??Est??s seguro que quieres deshabilitar el libro: " + book + " ?",
        text: "No podr??s revertir esta operaci??n!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, realizar operaci??n"
    }).then((result) => {
        if (result.isConfirmed) {
            let url = "/biblioteca/libros?accion=deshabilitar";
            let bookId = $(button).data("bookId");
            $.ajax({
                url: url,
                method: "GET",
                data: { id: bookId },
                dataType: "JSON",
                success: function (response) {
                    if (response.status == "success") {
                        $("#gendersDataTable").DataTable().ajax.reload(null, false);
                        Swal.fire("Deshabilitado!", response.message, "success");
                    }
                }
            });
        }
    });
}

// function loadActiveAuthors() {
//     let url = "/biblioteca/libros";
//     $.ajax({
//         url: url,
//         method: "GET",
//         data: { accion: "cargarAutores" },
//         dataType: "JSON",
//         success: function (response) {
//             if (response.ok) {
//                 let objAuthors = response.result;
//                 let select = $("#cbxAutores");
//                 // select.find("option").remove();
//                 $.each(objAuthors, function (key, value) {
//                     select.append("<option value='" + value.id + "'>" + value.nombres + " " + value.apellidos + " </option>");
//                     // $("<option>").val(value.id).text(value.nombres + " " + value.apellidos).appendTo(select);
//                 })
//             }
//         }
//     });
// }

function getBooks() {
    let url = "/biblioteca/libros?accion=listar";
    let table = $("#booksDataTable").DataTable({
        destroy: true,
        ajax: {
            url: url,
            dataSrc: "result"
        },
        columns: [
            {
                data: null,
                render: function (data, type, row) {
                    let regex = /(\d{3})?(\d{3})?(\d{5})?(\d)?(\d)/;
                    return row.isbn.replace(regex, "$1-$2-$3-$4-$5");
                }
            },
            { data: "titulo" },
            {
                data: null,
                render: function (data, type, row) {
                    return row.autor.nombres + " " + row.autor.apellidos;
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return row.editorial.nombre;
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return row.genero.nombre;
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
                    elementHTML += "<button type='button' onclick='viewDetailsBook(this)' class='btn btn-info' data-toggle='modal' data-target='#bookViewModal' data-tooltip='tooltip' data-placement='left' title='M??s informaci??n' data-book-id='" + row.id + "'><i class='fas fa-eye'></i></button>";
                    if (row.activo) {
                        elementHTML += "<button type='button' onclick='editBook(this)' class='btn btn-warning' data-toggle='modal' data-target='#bookEditModal' data-tooltip='tooltip' data-placement='bottom' title='Editar' data-book-id='" + row.id + "'><i class='fas fa-pen'></i></button>"
                        elementHTML += "<button type='button' onclick='disableBook(this)' class='btn btn-danger' data-tooltip='tooltip' data-placement='top' title='Desactivar'  data-book-id='" + row.id + "' data-book-title='" + row.titulo + "'><i class='fas fa-flag'></i></button>"
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