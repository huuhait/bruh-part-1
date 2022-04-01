import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Book from './pages/Book';
import Books from './pages/Books';
import Categories from './pages/Categories'
import Category from './pages/Category';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/categories">
          <Route path="" element={<Categories />} />
          <Route path=":id" element={<Category type="update" />} />
          <Route path="create" element={<Category type="create" />} />
        </Route>
        <Route path="/books">
          <Route path="" element={<Books />} />
          <Route path=":id" element={<Book type="update" />} />
          <Route path="create" element={<Book type="create" />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
