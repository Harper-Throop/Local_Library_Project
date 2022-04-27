function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  let sortedAccounts = accounts;
  return sortedAccounts.sort((account1, account2) => account1.name.last > account2.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  const id = account.id;
  let totalBorrows = 0;

  for(let book in books){
    const borrows = books[book].borrows;
    for(let borrow in borrows){
      const borrower = borrows[borrow].id;
      if(id === borrower)
      totalBorrows++;
    }
  }
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let borrowedBooks = [];

  for(let bookname in books){
    const book = books[bookname];

    if(book.borrows.find((borrower) => borrower.id === account.id && !borrower.returned)){
      book["author"] = authors.find(author => author.id === book.authorId);
      borrowedBooks.push(book);
    }
  }

  return borrowedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
