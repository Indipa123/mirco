import { Check, Eye, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { categories, vendors } from "../data/marketplace.js";
import { money } from "../utils/format.js";

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const vendor = vendors.find((item) => item.id === product.vendorId);
  const category = categories.find((item) => item.id === product.categoryId);

  const handleAdd = () => {
    addItem(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="product-card" data-reveal style={{ "--i": index }}>
      <Link className="product-media" to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-badge">{category?.name}</span>
      </Link>
      <div className="product-content">
        <Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link>
        <div className="vendor-row">
          <span>{vendor?.name}</span>
          <span><Star size={14} fill="currentColor" /> {vendor?.rating}</span>
        </div>
        <div className="price-row">
          <strong>{money(product.price)}</strong>
          <small>Min. {product.minOrder}</small>
        </div>
        <div className="card-actions">
          <button className={added ? "added" : ""} onClick={handleAdd}>
            {added
              ? <><Check size={16} style={{ animation: "check-spin 0.3s ease both" }} /> Added!</>
              : <><ShoppingCart size={16} /> Add to Cart</>
            }
          </button>
          <Link to={`/product/${product.id}`} aria-label="View product details">
            <Eye size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}
