import { MapPin, ShieldCheck, Star } from "lucide-react";
import { Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import { categories, products } from "../data/marketplace.js";

export default function VendorCard({ vendor }) {
  const category = categories.find((item) => item.id === vendor.categoryId);
  const productCount = products.filter((product) => product.vendorId === vendor.id).length;

  return (
    <article className="vendor-card">
      <img src={vendor.image} alt={vendor.name} loading="lazy" />
      <div className="vendor-card-body">
        <div className="vendor-card-title">
          <h3>{vendor.name}</h3>
          {vendor.verified && <ShieldCheck size={20} />}
        </div>
        {vendor.verified && <Badge color="success" className="mt-3 w-fit">Verified Vendor</Badge>}
        <p>{vendor.description}</p>
        <div className="vendor-metrics">
          <span><MapPin size={15} /> {vendor.location}</span>
          <span><Star size={15} fill="currentColor" /> {vendor.rating}</span>
          <span>{productCount} products</span>
        </div>
        <Link className="primary-button" to={`/vendor/${vendor.id}`}>Visit Store</Link>
      </div>
    </article>
  );
}
