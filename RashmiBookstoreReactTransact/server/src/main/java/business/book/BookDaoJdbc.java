package business.book;

import business.BookstoreDbException;
import business.JdbcUtils;
import business.category.Category;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import business.BookstoreDbException.BookstoreQueryDbException;

public class BookDaoJdbc implements BookDao {

    private static final String FIND_BY_BOOK_ID_SQL =
            "SELECT book_id, title, author, description, price, rating, is_public, is_featured, category_id " +
                    "FROM book " +
                    "WHERE book_id = ?";

    private static final String FIND_BY_CATEGORY_ID_SQL =
    // TODO Implement this constant to be used in the findByCategoryId method
    "SELECT book_id, title, author, description, price, rating, is_public, is_featured, category_id " +
            "FROM book " +
            "WHERE category_id = ?";
    private static final String FIND_RANDOM_BY_CATEGORY_ID_SQL =
            "SELECT book_id, title, author, description, price, rating, is_public, is_featured, category_id " +
                    "FROM book " +
                    "WHERE category_id = ? " +
                    "ORDER BY RAND() " +
                    "LIMIT ?";
    private static final String FIND_BY_CATEGORY_NAME_SQL =
            "SELECT book_id, title, author, description, price, rating, is_public, is_featured, category_id " +
                    "FROM book a inner join category b on a.categoryId  = b.categoryId  " +
                    "WHERE a.categoryName = ?";

//    private static final String FIND_BY_BOOK_ID_SQL =
//            "SELECT book_id, title, author, description, price, rating, is_public, is_featured, category_id " +
//                    "FROM book " +
//                    "WHERE book_id = ?";
//
//    private static final String FIND_BY_BOOK_ID_SQL =
//            "SELECT book_id, title, author, description, price, rating, is_public, is_featured, category_id " +
//                    "FROM book " +
//                    "WHERE book_id = ?";

    @Override
    public Book findByBookId(long bookId) {
        Book book = null;
        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_BY_BOOK_ID_SQL)) {
            statement.setLong(1, bookId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    book = readBook(resultSet);
                }
            }
        } catch (SQLException e) {
            throw new BookstoreQueryDbException("Encountered a problem finding book " + bookId, e);
        }
        return book;
    }

    @Override
    public List<Book> findByCategoryId(long categoryId) {
        Book book = null;
        List<Book> books = new ArrayList<>();

        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_BY_CATEGORY_ID_SQL)) {
             statement.setLong(1, categoryId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    book = readBook(resultSet);
                    books.add(book);
                }
            }
        } catch (SQLException e) {
            throw new BookstoreQueryDbException("Encountered a problem finding book " + categoryId, e);
        }

        return books;
    }

    @Override
    public List<Book> findRandomByCategoryId(long categoryId, int limit) {
        Book book = null;
        List<Book> books = new ArrayList<>();

        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_RANDOM_BY_CATEGORY_ID_SQL)) {
            statement.setLong(1, categoryId);
            statement.setInt(2, limit);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    book = readBook(resultSet);
                    books.add(book);

                }
            }
        } catch (SQLException e) {
            throw new BookstoreQueryDbException("Encountered a problem finding book " + categoryId, e);
        }

        return books;
    }
//    @Override
    public List<Book> booksByCategoryName(String categoryName) {
        Book book = null;
        List<Book> books = new ArrayList<>();

        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_BY_CATEGORY_NAME_SQL)) {
            statement.setString(1, categoryName);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    book = readBook(resultSet);
                    books.add(book);
                }
            }
        } catch (SQLException e) {
            throw new BookstoreQueryDbException("Encountered a problem finding book " + categoryName, e);
        }

        return books;

    }



    private Book readBook(ResultSet resultSet) throws SQLException {
        // TODO add description, isFeatured, rating to Book results
        long bookId = resultSet.getLong("book_id");
        String title = resultSet.getString("title");
        String author = resultSet.getString("author");
        String description = resultSet.getString("description");
        int price = resultSet.getInt("price");
        int rating = resultSet.getInt("rating");
        boolean isPublic = resultSet.getBoolean("is_public");
        boolean isFeatured = resultSet.getBoolean("is_featured");
        long categoryId = resultSet.getLong("category_id");
        return new Book(bookId, title, author,description, price, rating, isPublic,isFeatured, categoryId);
    }
}
