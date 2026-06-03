import { ArrowRight, BadgeCheck, Building2, Package, Truck } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import CategorySidebar from "../components/CategorySidebar.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import VendorCard from "../components/VendorCard.jsx";
import { categories, products, vendors } from "../data/marketplace.js";
import { slugText } from "../utils/format.js";

export default function Home() {
  const [params] = useSearchParams();
  const query = slugText(params.get("q") || "");
  const location = params.get("location") || "";

  const filteredProducts = products.filter((product) => {
    const vendor = vendors.find((item) => item.id === product.vendorId);
    const category = categories.find((item) => item.id === product.categoryId);
    const haystack = slugText(`${product.name} ${product.tags.join(" ")} ${vendor.name} ${vendor.location} ${category.name}`);
    return (!query || haystack.includes(query)) && (!location || vendor.location === location);
  });

  return (
    <div className="page app-grid">
      <CategorySidebar />
      <div className="stack">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Shop Local</span>
            <h1>Micro & Small Vendor Marketplace</h1>
            <p>Discover trusted local shops, compare products with clear prices, filter by location, and order from micro and small businesses across Sri Lanka.</p>
            <div className="hero-actions">
              <Link className="primary-button" to="/vendors">Explore vendors <ArrowRight size={18} /></Link>
              <Link className="secondary-button" to="/vendor/dashboard">List your shop</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div><Package /><strong>Products</strong><span>Live catalog with stock, min order, specs</span></div>
            <div><Building2 /><strong>Vendors</strong><span>Verified shop profiles and location filters</span></div>
            <div><Truck /><strong>Orders</strong><span>Cart, checkout, delivery estimate</span></div>
            <div><BadgeCheck /><strong>Trust</strong><span>Ratings, response time, vendor verification</span></div>
          </div>
        </section>

        <SectionHeader
          eyebrow="Catalog"
          title={query || location ? "Search Results" : "Top Selling Products"}
          description="Products are listed directly under the main banner and connected to vendor profiles."
          action={<Link className="text-link" to="/category/crafts">View all categories</Link>}
        />

        <div className="product-grid">
          {filteredProducts.length ? filteredProducts.map((product, i) => <ProductCard product={product} key={product.id} index={i} />) : <EmptyState />}
        </div>

        <SectionHeader eyebrow="Shops" title="Featured Vendors" description="Verified micro and small vendors across Sri Lanka." />
        <div className="vendor-grid compact">
          {vendors.slice(0, 3).map((vendor) => <VendorCard vendor={vendor} key={vendor.id} />)}
        </div>
      </div>
    </div>
  );
}
