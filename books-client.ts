import * as readline from "readline/promises";

interface Book {
  id: string;
  title: string;
  author: string;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getBook(): Promise<Book> {
  const bookID = await rl.question("Enter book ID: ", {
    signal: AbortSignal.timeout(20_000),
  });
  const bookTitle = await rl.question("Enter book title: ", {
    signal: AbortSignal.timeout(20_000),
  });
  const bookAuthor = await rl.question("Enter author name: ", {
    signal: AbortSignal.timeout(20_000),
  });
  const book = { id: bookID, title: bookTitle, author: bookAuthor };
  return book;
}

async function postBook(book: Book) {
  await fetch(
    "https://7f25-2607-fb90-ec02-c197-4464-441d-109c-e067.ngrok-free.app/books",
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    }
  );
}

async function getBookID(): Promise<string> {
  const bookID = await rl.question("Enter book ID: ", {
    signal: AbortSignal.timeout(20_000),
  });
  return bookID;
}

async function deleteBook(bookID: string) {
  await fetch(
    `https://7f25-2607-fb90-ec02-c197-4464-441d-109c-e067.ngrok-free.app/books/${bookID}`,
    {
      method: "delete",
    }
  );
}

async function putBook(book: Book) {
  await fetch(
    `https://7f25-2607-fb90-ec02-c197-4464-441d-109c-e067.ngrok-free.app/books/${book.id}`,
    {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    }
  );
}

async function seeBooks() {
  var data = await fetch(
    "https://7f25-2607-fb90-ec02-c197-4464-441d-109c-e067.ngrok-free.app/books"
  );
  data = await data.json();
  console.log(data);
}

async function choiceMenu() {
  const prompt: string =
    "Enter VIEW to view all books, \nPOST to add a new book, \nPUT to edit a book's information, \nDELETE to delete a book, \nor anything else to exit. ";
  var answer = "VIEW";
  while (
    answer === "VIEW" ||
    answer === "POST" ||
    answer === "PUT" ||
    answer === "DELETE"
  ) {
    answer = (await rl.question(prompt)).toUpperCase();
    switch (answer) {
      case "VIEW":
        await seeBooks();
        break;
      case "POST":
        var book = await getBook();
        await postBook(book);
        break;
      case "PUT":
        book = await getBook();
        await putBook(book);
        break;
      case "DELETE":
        const bookID = await getBookID();
        await deleteBook(bookID);
        break;
      default:
        break;
    }
  }
}

async function clientMain() {
  await choiceMenu();
}

clientMain();
