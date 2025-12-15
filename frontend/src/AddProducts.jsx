import React, { useState } from "react";
import axios from "axios";

const AddProducts = () => {
  const Detail = {
    name: "",
    description: "",
    price: "",
    category: "",
  };
  const [newProduct, setnewProduct] = useState(Detail);
  const [images, setImages] = useState([]);
  const fileHandler = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        form.append(key, value);
      });
      images?.forEach((img) => form.append("images", img));
      await axios.post("http://localhost:8080/api/create", form, {
        headers: { "Content-type": "multipart/form-data" },
      });
      alert("Prdoduct Added succesfully");
      setnewProduct(Detail);
      setImages([]);
    } catch (error) {}
  };
  const inputhandler = (e) => {
    setnewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  return (
    <div className=" container d-flex align-item-center">
      <form action="" onSubmit={submithandler}>
        <h1>Add New Prodcut</h1>
        <input
          type="text"
          name="name"
          id=""
          placeholder="Name"
          onChange={inputhandler}
        />{" "} 
        <br />
        <br />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={inputhandler}
        />{" "}
        <br />
        <br />
        <input
          type="text"
          name="price"
          placeholder="Price"
          onChange={inputhandler}
        />{" "}
        <br />
        <br />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={inputhandler}
        />{" "}
        <br />
        <br />
        <input type="file" name="images" multiple onChange={fileHandler} />{" "}
        <br />
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddProducts;
