import { useState } from "react";
import { createProduct } from "../services/productService";

function ProductForm({ onProductCreated }) {
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || form.price === "" || form.quantity === "") {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await createProduct({
        name: form.name.trim(),
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity, 10),
      });
      setForm({ name: "", price: "", quantity: "" });
      onProductCreated();
    } catch (err) {
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bsc-card mb-4">
      <h4 className="bsc-section-title">Add New Product</h4>

      {error && (
        <div className="bsc-alert" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-12 col-md-5">
            <label htmlFor="name" className="bsc-label">
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="bsc-input"
              placeholder="e.g. Guitar Strings"
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-6 col-md-3">
            <label htmlFor="price" className="bsc-label">
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              className="bsc-input"
              placeholder="0.00"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-6 col-md-2">
            <label htmlFor="quantity" className="bsc-label">
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              className="bsc-input"
              placeholder="0"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-2 d-flex align-items-end" style={{ paddingTop: "0.5rem" }}>
            <button
              type="submit"
              className="bsc-btn bsc-btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Adding…" : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
