import { Minus, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { money } from "../utils/format.js";

export default function CartDrawer() {
  const { detailedItems, totals, isCartOpen, setCartOpen, updateQuantity } = useCart();

  return (
    <aside className={isCartOpen ? "cart-shell open" : "cart-shell"} aria-hidden={!isCartOpen}>
      <button className="cart-backdrop" onClick={() => setCartOpen(false)} aria-label="Close cart" />
      <section className="cart-drawer">
        <div className="drawer-head">
          <div>
            <strong>Marketplace Cart</strong>
            <small>{totals.count} selected items</small>
          </div>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={20} /></button>
        </div>
        <div className="drawer-items">
          {detailedItems.length === 0 ? (
            <div className="empty-state">Your cart is empty. Add products from verified vendors to begin.</div>
          ) : detailedItems.map(({ product, quantity }) => (
            <article className="drawer-item" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>
                <h4>{product.name}</h4>
                <span>{money(product.price)}</span>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)}><Minus size={14} /></button>
                  <strong>{quantity}</strong>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)}><Plus size={14} /></button>
                </div>
              </div>
              <strong>{money(product.price * quantity)}</strong>
            </article>
          ))}
        </div>
        <div className="drawer-total">
          <div><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></div>
          <div><span>Delivery estimate</span><strong>{money(totals.delivery)}</strong></div>
          <Link className="primary-button" to="/checkout" onClick={() => setCartOpen(false)}>Continue checkout</Link>
        </div>
      </section>
    </aside>
  );
}
