package pe.edu.unprg.javaee.inventariolibros.services;

import pe.edu.unprg.javaee.inventariolibros.models.Author;
import pe.edu.unprg.javaee.inventariolibros.models.Genre;
import pe.edu.unprg.javaee.inventariolibros.models.Publisher;
import pe.edu.unprg.javaee.inventariolibros.models.Book;
import pe.edu.unprg.javaee.inventariolibros.exception.ServiceException;

import java.util.List;

public interface IBookService {

    boolean insert(Book book) throws ServiceException;
    boolean update(Book book) throws ServiceException;
    Book findById(int id) throws ServiceException;
    List<Book> findAll() throws ServiceException;
    List<Author> findActiveAuthors(String filter) throws ServiceException;
    List<Publisher> findActivePublishers(String filter) throws ServiceException;
    List<Genre> findActiveGenres(String filter) throws ServiceException;
    boolean disableById(int id) throws ServiceException;

}