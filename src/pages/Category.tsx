import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface Props {
  type: "create" | "update"
}

type Category = {
  id?: number;
  name?: string;
}

const Category = (props: Props) => {
  const [category, setCategory] = useState<Category>({});
  const isUpdate = () => props.type === "update"
  const { id } = useParams()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const getCategory = async() => {
    try {
      const { data } = await axios.get(`http://localhost:3001/categories/${id}`);
      setCategory(data);
    } catch (error) {
      return error
    }
  }

  const updateCategory = async(payload: Category) => {
    try {
      const { data } = await axios.put(`http://localhost:3001/categories/${id}`, payload);
      setCategory(data);
      alert("Category updated successfully")
    } catch (error) {
      return error
    }
  }

  const createCategory = async(payload: Category) => {
    try {
      const { data } = await axios.post(`http://localhost:3001/categories`, payload);
      setCategory(data);
      alert("Category created successfully");
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if (isUpdate()) getCategory();
  }, [])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit = (data: any) => {
    if (isUpdate()) {
      updateCategory(data);
    } else {
      createCategory(data);
    }
  }

  return (
    <div>
      <h1>{ isUpdate() ? "Update" : "Create" } Category</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          Name:
        </div>
        <input defaultValue={category?.name} {...register("name", { required: true, minLength: 6 })} />
        {errors.name && <span>min length is 6</span>}

        <div>
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Category
