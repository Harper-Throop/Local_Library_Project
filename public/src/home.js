function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let totalBorrowed = 0;

  for(let book in books){
    if(!books[book].borrows[0].returned)
      totalBorrowed++;
  }

  return totalBorrowed;
}

function getMostCommonGenres(books) {
  const genres = [];
  const allGenres = [];
  for(let book in books){
    const genre = books[book].genre;

    allGenres.push(genre);

    if(!genres.includes(genre))
      genres.push(genre);
  }

  const popularGenres = [];

  for(let genreName in genres){
    const genreA = genres[genreName];
    let genreCount = 0;

    for(let genreName in allGenres){
      const genreB = allGenres[genreName];
      if(genreA === genreB)
        genreCount++;
    }

    popularGenres.push({name: `${genreA}`, count: genreCount});
  }

  return popularGenres.sort((genre1, genre2) => genre1.count < genre2.count ? 1 : -1).splice(0,5);
}

function getMostPopularBooks(books) {
  const popularBooks = [];

  for(let bookname in books){
    const book = books[bookname];
    const borrows = book.borrows.length;

    popularBooks.push({"name": `${book.title}`, count: borrows});
  }

  return popularBooks.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1).splice(0,5);
}

function getMostPopularAuthors(books, authors) {
  const authorIDs = [];
  
  for(let book in books){
    const authorId = books[book].authorId;
    if(!authorIDs.includes(authorId))
      authorIDs.push(authorId);
  }

  const mostPopularAuthors = [];

  for(let id in authorIDs){
    const authorId = authorIDs[id];

    let authorBorrows = 0;
    for(let book in books){
      const bookAuthorId = books[book].authorId;
      if(bookAuthorId === authorId) //use filter for author id instead
        authorBorrows += books[book].borrows.length;
    }

    mostPopularAuthors.push({"name": authorName(authorId, authors), "count": authorBorrows});
  }
  return mostPopularAuthors.sort((authorA, authorB) => authorA.count < authorB.count ? 1 : -1).splice(0,5);
}

function authorName(authorId, authors){ //helper function
  const author = authors.find((author) => author.id === authorId);
  return `${author.name.first} ${author.name.last}`;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
