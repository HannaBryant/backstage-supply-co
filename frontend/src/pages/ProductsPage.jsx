import { useState, useEffect, useCallback } from "react";
import { getProducts } from "../services/productService";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import EditProductModal from "../components/EditProductModal";
import Chatbot from "../components/Chatbot";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      setError("Could not load products. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="bsc-page">
      {/* Header */}
      <header className="bsc-header">
        <div className="bsc-header-inner">
          <div className="bsc-logo-mark" aria-hidden="true">✝</div>
          
          <div>
            <h1 className="bsc-brand">Backstage Supply Co.</h1>
            <p className="bsc-tagline">
              Everything a rock legend needs — and then some.
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="bsc-main container-fluid">
        <ProductForm onProductCreated={fetchProducts} />
        <ProductTable
          products={products}
          loading={loading}
          error={error}
          onEdit={setEditingProduct}
          onRefresh={fetchProducts}
        />
      </main>

      {/* Footer */}
      <footer className="bsc-footer">
        <span>© {new Date().getFullYear()} Backstage Supply Co.</span>
        <span className="bsc-footer-divider" aria-hidden="true">✝</span>
        <span>All rights reserved.</span>
      </footer>

      {/* Edit Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={fetchProducts}
        />
      )}

      {/* Chatbot widget */}
      <Chatbot />
    </div>
  );
}

export default ProductsPage;
