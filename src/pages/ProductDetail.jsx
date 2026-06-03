import { CheckCircle2, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { Badge } from "flowbite-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { categories, products, vendors } from "../data/marketplace.js";
import { money } from "../utils/format.js";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find((item) => item.id === productId) || products[0];
  const vendor = vendors.find((item) => item.id === product.vendorId);
  const category = categories.find((item) => item.id === product.categoryId);
  const [image, setImage] = useState(product.gallery[0]);
  const [quantity, setQuantity] = useState(product.minOrder);
  const [tab, setTab] = useState("description");

  const tabContent = useMemo(() => ({
    description: <p>{product.description}</p>,
    specs: <ul>{product.specs.map((item) => <li key={item}>{item}</li>)}</ul>,
    vendor: <p>{vendor.name} is a verified vendor in {vendor.location}, responding in around {vendor.responseTime}. {vendor.description}</p>,
  }), [product, vendor]);

  const buyNow = () => {
    addItem(product.id, quantity);
    navigate("/checkout");
  };

  return (
    <div className="page product-detail">
      <section className="gallery">
        <div className="thumbs">
          {product.gallery.map((item) => (
            <button className={image === item ? "active" : ""} onClick={() => setImage(item)} key={item}>
              <img src={item} alt={product.name} />
            </button>
          ))}
        </div>
        <img className="main-product-image" src={image} alt={product.name} />
      </section>

      <section className="purchase-panel">
        <Badge color="warning" className="mb-3 w-fit">{category.name}</Badge>
        <h1>{product.name}</h1>
        <div className="detail-meta">
          <span><Star size={16} fill="currentColor" /> {vendor.rating} vendor rating</span>
          <span><ShieldCheck size={16} /> Verified seller</span>
          <span>{product.stock} in stock</span>
        </div>
        <div className="detail-price">{money(product.price)}</div>
        <p>{product.description}</p>

        <div className="qty-box">
          <span>Quantity</span>
          <div className="quantity-control">
            <button onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}><Minus size={14} /></button>
            <strong>{quantity}</strong>
            <button onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button>
          </div>
        </div>

        <div className="detail-actions">
          <button className="secondary-button dark" onClick={() => addItem(product.id, quantity)}><ShoppingBag size={18} /> Add to cart</button>
          <button className="primary-button" onClick={buyNow}>Buy now</button>
          <button className="icon-save" aria-label="Save product"><Heart size={19} /></button>
        </div>

        <div className="assurance-grid">
          <span><Truck /> Delivery estimate at checkout</span>
          <span><CheckCircle2 /> Buyer order confirmation</span>
        </div>

        <div className="tab-card">
          <div className="tabs">
            {["description", "specs", "vendor"].map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}
          </div>
          <div className="tab-content">{tabContent[tab]}</div>
        </div>

        <div className="vendor-profile">
          <img src={vendor.image} alt={vendor.name} />
          <div>
            <strong>{vendor.name}</strong>
            <span>{vendor.location} · Joined {vendor.joined}</span>
            <p>{vendor.description}</p>
            <Link to={`/vendor/${vendor.id}`}>Visit {vendor.name} store</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
