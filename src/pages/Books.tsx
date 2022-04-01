import axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

type Book = {
  id: number;
  categoryId: number
  name: string;
  price: string;
  category: {
    name: string
  }
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([])

  const getBooks = async() => {
    try {
      const { data } = await axios.get('http://localhost:3001/books?_expand=category');
      setBooks(data);
    } catch (error) {
      return error
    }
  }

  const deleteBook = async(id: number) => {
    try {
      await axios.delete(`http://localhost:3001/books/${id}`);
      setBooks(books.filter(book => book.id !== id))
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    getBooks();
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              ID
            </th>
            <th>
              Category
            </th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.id}>
                <td>
                  {book.id}
                </td>
                <td>
                  {book.category.name}
                </td>
                <td>
                  {book.name}
                </td>
                <td>
                  {book.price}
                </td>
                <td>
                  <Link to={`/books/${book.id}`}>
                    <button>
                      Update
                    </button>
                  </Link>
                  <button onClick={() => deleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Link to="/books/create">
        <button>Create book</button>
      </Link>
    </div>
  )
}

export default Books
