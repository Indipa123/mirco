import { CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { money } from "../utils/format.js";

export default function Checkout() {
  const { detailedItems, totals, clearCart } = useCart();
  const navigate = useNavigate();

  const submitOrder = (event) => {
    event.preventDefault();
    if (!detailedItems.length) return;
    clearCart();
    navigate("/?order=success");
  };

  return (
    <div className="page checkout-layout">
      <section className="checkout-card">
        <span className="eyebrow">Secure order</span>
        <h1>Checkout</h1>
        <form className="checkout-form" onSubmit={submitOrder}>
          <label>First name<input required placeholder="First name" /></label>
          <label>Last name<input required placeholder="Last name" /></label>
          <label>Email<input required type="email" placeholder="buyer@example.com" /></label>
          <label>Phone<input required type="tel" placeholder="+94..." /></label>
          <label className="full">Delivery address<textarea required placeholder="Street, town, district" /></label>
          <label>Payment method<select><option>Cash on delivery</option><option>Bank transfer</option><option>Card payment</option></select></label>
          <label>Delivery speed<select><option>Standard delivery</option><option>Express delivery</option></select></label>
          <button className="primary-button full" disabled={!detailedItems.length}>Place order</button>
        </form>
      </section>

      <aside className="checkout-card order-summary">
        <h2>Order Summary</h2>
        {detailedItems.length ? detailedItems.map(({ product, quantity }) => (
          <div className="summary-line" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div><strong>{product.name}</strong><span>{quantity} x {money(product.price)}</span></div>
            <b>{money(product.price * quantity)}</b>
          </div>
        )) : <div className="empty-state">Your cart is empty.</div>}
        <div className="summary-totals">
          <div><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></div>
          <div><span>Delivery</span><strong>{money(totals.delivery)}</strong></div>
          <div><span>Total</span><strong>{money(totals.total)}</strong></div>
        </div>
        <div className="trust-list">
          <span><ShieldCheck /> Vendor confirmation before fulfilment</span>
          <span><MapPin /> Location-aware delivery estimate</span>
          <span><CreditCard /> COD, transfer, or card-ready flow</span>
        </div>
      </aside>
    </div>
  );
}
