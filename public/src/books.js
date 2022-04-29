function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = [];
  const nonBorrowedBooks = [];

  for(let bookname in books){
    const book = books[bookname];
    const borrowedStatus = book.borrows[0].returned;

    if(borrowedStatus)
      nonBorrowedBooks.push(book);
    else if(!borrowedStatus)
      borrowedBooks.push(book);
  }

  const partitionedBooks = [];
  partitionedBooks.push(borrowedBooks);
  partitionedBooks.push(nonBorrowedBooks);

  return partitionedBooks;
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows;
  const borrowerList = [];
  
  for(let borrower in borrowers){
    const borrowerId = borrowers[borrower].id;
    const borrowerAccount = accounts.find((account) => borrowerId === account.id);

    borrowerAccount["returned"] = borrowers[borrower].returned;
    borrowerList.push(borrowerAccount);
  }
  return borrowerList.splice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
