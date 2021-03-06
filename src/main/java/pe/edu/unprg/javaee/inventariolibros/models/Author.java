package pe.edu.unprg.javaee.inventariolibros.models;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Author {

    private int id;
    private String nombres;
    private String apellidos;
    private String ciudad;
    private LocalDate fechaNacimiento;
    private boolean activo;

}