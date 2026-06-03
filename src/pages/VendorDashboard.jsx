import { BarChart3, PackagePlus, ReceiptText, Store } from "lucide-react";
import { Badge } from "flowbite-react";
import { orders, products, vendors } from "../data/marketplace.js";
import { money } from "../utils/format.js";

export default function VendorDashboard() {
  const vendor = vendors[0];
  const vendorProducts = products.filter((product) => product.vendorId === vendor.id);

  return (
    <div className="page dashboard">
      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">Vendor Zone</span>
          <h1>Manage shop, products, and orders.</h1>
          <p>Keep your shop profile updated, list products with prices, review buyer orders, and track your marketplace sales.</p>
        </div>
        <button className="primary-button"><PackagePlus size={18} /> Add product</button>
      </section>

      <div className="metric-grid">
        <div><Store /><span>Shop</span><strong>{vendor.name}</strong></div>
        <div><PackagePlus /><span>Products</span><strong>{vendorProducts.length}</strong></div>
        <div><ReceiptText /><span>Open Orders</span><strong>{orders.length}</strong></div>
        <div><BarChart3 /><span>Revenue</span><strong>{money(23400)}</strong></div>
      </div>

      <section className="management-grid">
        <div className="manager-card">
          <h2>Product Listings</h2>
          {vendorProducts.map((product) => (
            <div className="manager-row" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div><strong>{product.name}</strong><span>{product.stock} stock · {money(product.price)}</span></div>
              <button>Edit</button>
            </div>
          ))}
        </div>
        <div className="manager-card">
          <h2>Order Queue</h2>
          {orders.map((order) => (
            <div className="order-row" key={order.id}>
              <div><strong>{order.id}</strong><span>{order.customer} · {order.items} items</span></div>
              <b>{money(order.value)}</b>
              <Badge color={order.status === "Delivered" ? "success" : "warning"} className="order-badge">{order.status}</Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
