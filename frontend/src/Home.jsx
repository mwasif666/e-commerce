import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/usergetAll");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!currentUser?.isAdmin) return; // Only admin can delete

    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/remove/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("Deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const getImageUrl = (product) => {
    if (!product?.images || product.images.length === 0) return null;
    const first = product.images[0];
    if (first.startsWith("/uploads")) return `http://localhost:8080${first}`;
    return first;
  };

  return (
    <div className="container mt-4">
      {currentUser?.isAdmin && (
        <Link to="/addProduct" className="btn btn-success mb-3">
          Add New Product
        </Link>
      )}

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            {currentUser?.isAdmin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  {getImageUrl(item) ? (
                    <img
                      src={getImageUrl(item)}
                      alt="product"
                      width="80"
                      height="80"
                      style={{ objectFit: "cover", borderRadius: "5px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{item.price}</td>
                <td>{item.category}</td>

                {currentUser?.isAdmin && (
                  <td>
                    <Link
                      to={`/updateProduct/${item._id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={currentUser?.isAdmin ? 6 : 5}
                className="text-center"
              >
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
