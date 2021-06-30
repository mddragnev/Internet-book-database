export const ENDPOINT_BASE = "http://localhost:4000/api/books/";

class BooksService {

    async addBook(book) {
        const bookResp = await fetch(
            ENDPOINT_BASE,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book)
            }
        );
        const createdBook = await bookResp.json();
        if (bookResp.status >= 400) {
            console.log("Error creating book", createdBook);
        }
        const { name, description, imageURL, rating, comments } = createdBook.result;
        return { name, description, imageURL, rating, comments };
    }

    async getAllBooks() {
        const booksResp = await fetch(
            ENDPOINT_BASE
        );
        const resp = await booksResp.json();
        return resp.books;
    }

    async getBook(name) {
        const bookResp = await fetch(ENDPOINT_BASE + encodeURIComponent(name));
        const resp = await bookResp.json();
        if (resp.message) {
            alert(resp.message);
            return;
        }
        return resp;
    }

    async updateBook(book) {
        const bookResp = await fetch(
            ENDPOINT_BASE + encodeURIComponent(book._id),
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            }
        )
        const updatedBook = await bookResp.json();
        return updatedBook;
    }
}

export default new BooksService();