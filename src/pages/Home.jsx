import { Link, useSearchParams } from "react-router-dom";
import CategorySidebar from "../components/CategorySidebar.jsx";
import EmptyState from "../components/EmptyState.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
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
        <HeroBanner />

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
