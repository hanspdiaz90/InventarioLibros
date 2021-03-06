package pe.edu.unprg.javaee.inventariolibros.dao.query;

public class BookQuery {

    private BookQuery() {}

    public static final String SP_INSERT_BOOK = "call sp_insert_book(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    public static final String SP_UPDATE_BOOK = "call sp_update_book(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    public static final String SP_FIND_BOOK_BY_ID = "call sp_find_book_by_id(?)";
    public static final String SP_FIND_ALL_BOOKS = "call sp_find_all_books()";
    public static final String SP_SEARCH_ACTIVE_AUTHORS = "call sp_search_active_authors(?)";
    public static final String SP_SEARCH_ACTIVE_PUBLISHERS = "call sp_search_active_publishers(?)";
    public static final String SP_SEARCH_ACTIVE_GENRES = "call sp_search_active_genres(?)";
    public static final String SP_DISABLE_BOOK_BY_ID = "call sp_disable_book_by_id(?)";

}