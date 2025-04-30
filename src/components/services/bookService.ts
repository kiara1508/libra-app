import axios from 'axios';
import { Book } from '../models/Books'; // kontrollo që emri të jetë saktë: Books.ts

const API_URL = 'http://localhost:5000/books';

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get<Book[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Gabim gjatë marrjes së librave:', error);
    return [];
  }
};

export const addBook = async (newBook: Omit<Book, 'id'>): Promise<void> => {
  try {
    await axios.post(API_URL, newBook);
  } catch (error) {
    console.error('Gabim gjatë shtimit të librit:', error);
  }
};

export const deleteBook = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Gabim gjatë fshirjes së librit:', error);
  }
};

export const updateBook = async (id: number, updatedBook: Book): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${id}`, updatedBook);
  } catch (error) {
    console.error('Gabim gjatë përditësimit të librit:', error);
  }
};

export const getBookById = async (id: number): Promise<Book | null> => {
  try {
    const response = await axios.get<Book>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Gabim gjatë marrjes së librit me ID:', error);
    return null;
  }
};
