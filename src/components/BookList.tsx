import React, { useEffect, useState } from 'react';
import styles from './BookList.module.css';
import { getBooks, deleteBook, updateBook } from './services/bookService';
import { Book } from './models/Books';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së librave:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (error) {
      console.error('Gabim gjatë fshirjes:', error);
    }
  };

  const handleToggle = async (book: Book) => {
    try {
      const updatedBook = { ...book, available: !book.available };
      await updateBook(book.id, updatedBook);
      setBooks(prev =>
        prev.map(b => (b.id === book.id ? updatedBook : b))
      );
    } catch (error) {
      console.error('Gabim gjatë përditësimit:', error);
    }
  };

  return (
    <div>
      {books.map(book => (
        <div key={book.id} className={`${styles.bookCard} ${!book.available ? styles.unavailable : ''}`}>
          <p><strong>Titulli:</strong> {book.title}</p>
          <p><strong>Autori:</strong> {book.author}</p>
          <p><strong>Zhanri:</strong> {book.genre}</p>
          <button onClick={() => handleDelete(book.id)}>Fshi Librin</button>
          <button onClick={() => handleToggle(book)}>Ndrysho Gjendjen</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
