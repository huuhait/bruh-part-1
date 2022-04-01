import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Category = {
  id: number;
  name: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const getCategories = async() => {
    try {
      const { data } = await axios.get('http://localhost:3001/categories');
      setCategories(data);
    } catch (error) {
      return error
    }
  }

  const deleteCategory = async(id: number) => {
    try {
      await axios.delete(`http://localhost:3001/categories/${id}`);
      setCategories(categories.filter(category => category.id !== id))
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    getCategories();
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
              Name
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => {
            return (
              <tr key={category.id}>
                <td>
                  {category.id}
                </td>
                <td>
                  {category.name}
                </td>
                <td>
                  <Link to={`/categories/${category.id}`}>
                    <button>Update</button>
                  </Link>
                  <button onClick={() => deleteCategory(category.id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Link to="/categories/create">
        <button>Add Category</button>
      </Link>
    </div>
  )
}

export default Categories
