import { useState, useEffect } from "react";
import { updateProduct } from "../services/productService";

function EditProductModal({ product, onClose, onProductUpdated }) {
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });
      setError(null);
    }
  }, [product]);

  if (!product) return null;

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
      await updateProduct(product.id, {
        name: form.name.trim(),
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity, 10),
      });
      onProductUpdated();
      onClose();
    } catch (err) {
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="bsc-modal-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div
        className="bsc-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
      >
        <div className="bsc-modal-header">
          <h5 id="edit-modal-title" className="bsc-modal-title">
            Edit Product
          </h5>
          <button
            className="bsc-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="bsc-modal-body">
          {error && (
            <div className="bsc-alert" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="edit-name" className="bsc-label">
                Product Name
              </label>
              <input
                id="edit-name"
                name="name"
                type="text"
                className="bsc-input"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="edit-price" className="bsc-label">
                Price ($)
              </label>
              <input
                id="edit-price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                className="bsc-input"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="edit-quantity" className="bsc-label">
                Quantity
              </label>
              <input
                id="edit-quantity"
                name="quantity"
                type="number"
                min="0"
                className="bsc-input"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="bsc-btn bsc-btn-ghost"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bsc-btn bsc-btn-primary"
                disabled={loading}
              >
                {loading ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProductModal;
