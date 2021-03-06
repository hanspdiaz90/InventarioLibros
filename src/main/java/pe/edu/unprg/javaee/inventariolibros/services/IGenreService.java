package pe.edu.unprg.javaee.inventariolibros.services;

import pe.edu.unprg.javaee.inventariolibros.models.Genre;
import pe.edu.unprg.javaee.inventariolibros.exception.ServiceException;

import java.util.List;

public interface IGenreService {

    boolean insert(Genre genre) throws ServiceException;
    boolean update(Genre genre) throws ServiceException;
    Genre findById(int id) throws ServiceException;
    List<Genre> findAll() throws ServiceException;
    boolean disableById(int id) throws ServiceException;

}
