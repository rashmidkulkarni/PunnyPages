package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.CustomerDao;
import business.customer.CustomerForm;
import business.customer.Customer;


import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
//import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.sql.Date;



public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private OrderDao orderDao;

	private LineItemDao lineItemDao;

	private CustomerDao customerDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}
	public void setOrderDao(OrderDao orderDao){this.orderDao = orderDao;}

	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}

	public void setCustomerDao(CustomerDao customerDao) {this.customerDao = customerDao;}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);
		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}



	}
	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, customerOrderId,
						item.getBookId(), item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}


	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();
		String address = customerForm.getAddress();
		String phone = customerForm.getPhone();
		String email = customerForm.getEmail();
		String ccNumber = customerForm.getCcNumber();

		if(name == null || name.equals("") ){
			throw new ApiException.ValidationFailure("name","Missing name field.Please add a valid name");
		}

		if (name.length() < 4 || name.length() > 45) {
			throw new ApiException.ValidationFailure("name","Invalid name field.Please add a valid name");
		}
		if(address  == null || address.equals("")){
			throw new ApiException.ValidationFailure("name","Missing name field.Please add a valid address");
		}

		if(address.length() < 4 || address.length() > 45){
			throw new ApiException.ValidationFailure("address","Invalid address field.Please add a valid address");
		}

		if(phone == null || phone.equals("")){
			throw new ApiException.ValidationFailure("phone","Missing phone field.");

		}
		String phoneDigits = phone.replaceAll("\\D", "");
		if(phoneDigits.length() != 10){
			throw new ApiException.ValidationFailure("phone","Invalid phone field.");

		}
		if(email == null || email.equals("")){
			throw new ApiException.ValidationFailure("email","Missing email field.");

		}


		if (email.contains(" ") || !email.contains("@") || email.endsWith(".")) {
			throw new ApiException.ValidationFailure("email","Invalid email field.");
		}

		if(ccNumber == null || ccNumber.equals("")){
			throw new ApiException.ValidationFailure("ccNumber","Missing credit card field.");

		}



		String creditCard = ccNumber.replaceAll("\\D", "");
		if(creditCard.length() < 14 || creditCard.length()>16) {
			throw new ApiException.ValidationFailure("ccNumber", "Invalid credit card number field.");
		}




		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Please enter a valid expiration date");

		}
	}



	// TODO: Validation checks for address, phone, email, ccNumber

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		try {

			int expiryYear = Integer.parseInt(ccExpiryYear);
			int expiryMonth = Integer.parseInt(ccExpiryMonth);

			YearMonth expiryDate = YearMonth.of(expiryYear, expiryMonth);

			YearMonth currentDate = YearMonth.now();

			return expiryDate.isBefore(currentDate);
		} catch (NumberFormatException | DateTimeException e) {
			return true;
		}


	}

	private Date getCardExpirationDate(String ccExpiryMonth, String ccExpiryYear) {
		int expiryYear = Integer.parseInt(ccExpiryYear);
		int expiryMonth = Integer.parseInt(ccExpiryMonth);
		String expDate = String.format("%d-%02d-01",expiryYear,expiryMonth);

		return Date.valueOf(expDate);
	}

	private int generateConfirmationNumber(){
		return ThreadLocalRandom.current().nextInt(999999999);

	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 0 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (databaseBook == null) {
				throw new ApiException.ValidationFailure("Did not find book with the requested ID: " + item.getBookId());
			}

			if (item.getBookForm().getPrice() != databaseBook.price()) {
				throw new ApiException.ValidationFailure("Price does not match for the requested ID: " + item.getBookId());
			}

			if (item.getBookForm().getCategoryId() != databaseBook.categoryId()) {
				throw new ApiException.ValidationFailure("Category does not match for the requested ID: " + item.getBookId());
			}
		});
	}

}
