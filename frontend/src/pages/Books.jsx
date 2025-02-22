import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


export const Books = () => {
    const [books,setBooks] = useState([])

        useEffect(()=>{
            const fetchAllBooks = async ()=>{
                try{
                    const res = await axios.get("http://localhost:8080/books")
                    console.log(res)
                    setBooks(res.data)
                }catch(err){
                    console.log(err)
                }
            }
            fetchAllBooks()
        },[])

const handleDelete = async (id)=>{
  try{
    await axios.delete("http://localhost:8080/books/"+id)
    window.location.reload()
  }catch(err){
    console.log(err)
  }
}

return (
  <div>
    <h1 className='title'>GenHagi Book Shop</h1>
    <div className="books">
      {books.map((book) => (
        <div className="book" key={book.id}>
          {book.cover && <img src={book.cover} alt="Book Cover" />}
          <h2>{book.title}</h2>
          <p>{book.desc}</p>
          <span>{book.price}</span>
          <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
          <button className='update'>Update</button>
        </div>
      ))}
    </div>
    <button className='add'>
        <Link to="/add">Add new book</Link>
    </button>
  </div>
);
};
