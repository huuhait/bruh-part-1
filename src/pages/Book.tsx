import axios from "axios";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

// Update the book
interface Props {
  type: "create" | "update"
}

type Book = {
  id?: number;
  categoryId?: number
  name?: string;
  price?: string;
}

type Category = {
  id: number;
  name: string;
}

const Book = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [book, setBook] = useState<Book>()
  const isUpdate = () => props.type === "update"
  const { id } = useParams()
  const { register, handleSubmit, formState: { errors } } = useForm();

  // fetch categories from api
  const getCategories = async() => {
    try {
      const { data } = await axios.get('http://localhost:3001/categories');
      setCategories(data);
    } catch (error) {
      return error
    }
  }

  // fetch book from api
  const getBook = async() => {
    try {
      const { data } = await axios.get(`http://localhost:3001/books/${id}`);
      setBook(data);
    } catch (error) {
      return error
    }
  }

  // create a new book
  const createBook = async(payload: Book) => {
    try {
      const { data } = await axios.post(`http://localhost:3001/books`, payload);
      setBook(data);
      alert("Book created successfully");
    } catch (error) {
      return error
    }
  }

  // update a new book
  const updateBook = async(payload: Book) => {
    try {
      const { data } = await axios.put(`http://localhost:3001/books/${id}`, payload);
      setBook(data);
      alert("Book updated successfully")
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    getCategories();
    if (isUpdate()) getBook();
  }, [])

  const onSubmit = (data: any) => {
    if (isUpdate()) {
      updateBook(data);
    } else {
      createBook(data);
    }
  }

  return (
    <div>
      {
        loading ? 'Loading ...': (
          <>
            <h1>{isUpdate() ? "Update" : "Create"} Category</h1><form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div>Category</div>
                {/* select the category */}
                <select defaultValue={book?.categoryId} {...register("categoryId", { required: true })}>
                  <option value="">Select a category</option>
                  {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
                </select>
                {errors.categoryId && <span>Category is required</span>}
              </div>
              <div>
                <div>Name</div>
                <input defaultValue={book?.name} {...register("name", { required: true })} />
                {errors.name && <span>Name is required</span>}
              </div>
              <div>
                <div>Price</div>
                <input defaultValue={book?.price} type="text" />
                {errors.price && <span>Price is required</span>}
              </div>

              <div>
                <button type="submit">
                  Submit
                </button>
              </div>
            </form>
          </>
        )
      }
    </div>
  )
}

export default Book
