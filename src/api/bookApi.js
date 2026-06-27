import { books } from '../mocks/books'
export const getBooks=()=>books
export const getBookById=(id)=>books.find(b=>b.id===Number(id))
