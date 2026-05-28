import { useState } from "react";
import { deleteProduct } from "../services/productService";

function ProductTable({ products, loading, error, onEdit, onRefresh }) {
  const [dissolvingId, setDissolvingId] = useState(null);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

    // Trigger smoke animation first
    setDissolvingId(id);

    // Wait for animation to finish, then delete and refresh
    setTimeout(async () => {
      try {
        await deleteProduct(id);
        onRefresh();
      } catch {
        alert("Failed to delete product. Please try again.");
      } finally {
        setDissolvingId(null);
      }
    }, 680); // matches animation duration
  };

  if (loading) {
    return (
      <div className="bsc-status-message" aria-live="polite">
        Loading inventory…
      </div>
    );
  }

  if (error) {
    return (
      <div className="bsc-alert" role="alert">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bsc-status-message">
        No products found. Add one above.
      </div>
    );
  }

  return (
    <div className="bsc-card">
      <h4 className="bsc-section-title">Inventory</h4>
      <div className="bsc-table-wrapper">
        <table className="bsc-table" aria-label="Product inventory table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className={dissolvingId === product.id ? "bsc-row-dissolve" : ""}
              >
                <td className="bsc-id-cell">{product.id}</td>
                <td>{product.name}</td>
                <td>${parseFloat(product.price).toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>
                  <div className="bsc-action-group">
                    <button
                      className="bsc-btn bsc-btn-sm bsc-btn-ghost"
                      onClick={() => onEdit(product)}
                      aria-label={`Edit ${product.name}`}
                      disabled={dissolvingId === product.id}
                    >
                      Edit
                    </button>
                    <button
                      className="bsc-btn bsc-btn-sm bsc-btn-danger"
                      onClick={() => handleDelete(product.id, product.name)}
                      aria-label={`Delete ${product.name}`}
                      disabled={dissolvingId !== null}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
