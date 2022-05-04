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
    
    totalBorrows += borrows.reduce((accumulator, currVal) => {
      const borrower = currVal.id;
      if(id === borrower){
        accumulator++;
      }

      return accumulator;
    }, 0);
  }
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.filter((book) => {
    const borrowerList = book.borrows;
    book["author"] = authors.find((author) => author.id === book.authorId);

    return borrowerList.find((borrower) => borrower.id === account.id && !borrower.returned);
  });

}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
