<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="mt" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}" />
<mt:template _tittle="AdminCRUD | Dashboard">
    <jsp:attribute name="_head">
        <jsp:include page="../../partials/_head.jsp"/>
    </jsp:attribute>
    <jsp:attribute name="_breadcrumb">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Dashboard</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="${path}/biblioteca/dashboard">Inicio</a></li>
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                </div>
            </div>
        </div>
        <!-- /.container-fluid -->
    </jsp:attribute>
    <jsp:attribute name="_content">
        <div class="container-fluid">
            <!-- Small Box (Stat card) -->
            <h5 class="mb-2 mt-4">Resumen General</h5>
            <div class="row">
                <div class="col-lg-3 col-6">
                    <!-- small card -->
                    <div class="small-box bg-info">
                        <div class="inner">
                            <h3>150</h3>
                            <p>Autores</p>
                        </div>
                        <div class="icon">
                            <i class="fas fa-glasses"></i>
                        </div>
                        <a href="${path}/biblioteca/autores" class="small-box-footer">
                            Más información <i class="fas fa-arrow-circle-right"></i>
                        </a>
                    </div>
                </div>
                <!-- ./col -->
                <div class="col-lg-3 col-6">
                    <!-- small card -->
                    <div class="small-box bg-danger">
                        <div class="inner">
                            <h3>30</h3>
                            <p>Editoriales</p>
                        </div>
                        <div class="icon">
                            <i class="fas fa-copyright"></i>
                        </div>
                        <a href="${path}/biblioteca/editoriales" class="small-box-footer">
                            Más información <i class="fas fa-arrow-circle-right"></i>
                        </a>
                    </div>
                </div>
                <!-- ./col -->
                <div class="col-lg-3 col-6">
                    <!-- small card -->
                    <div class="small-box bg-warning">
                        <div class="inner">
                            <h3>40</h3>
                            <p>Géneros</p>
                        </div>
                        <div class="icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <a href="${path}/biblioteca/generos" class="small-box-footer">
                            Más información <i class="fas fa-arrow-circle-right"></i>
                        </a>
                    </div>
                </div>
                <!-- ./col -->
                <div class="col-lg-3 col-6">
                    <!-- small card -->
                    <div class="small-box bg-success">
                        <div class="inner">
                            <h3>180</h3>
                            <p>Libros</p>
                        </div>
                        <div class="icon">
                            <i class="fas fa-book"></i>
                        </div>
                        <a href="${path}/biblioteca/libros" class="small-box-footer">
                            Más información <i class="fas fa-arrow-circle-right"></i>
                        </a>
                    </div>
                </div>
                <!-- ./col -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
    </jsp:attribute>
    <jsp:attribute name="_scripts">
        <jsp:include page="../../partials/_scripts.jsp"/>
    </jsp:attribute>
</mt:template>