import { BadgeCheck, MapPin, Package, ShieldCheck, Star, Timer } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import NotFound from "./NotFound.jsx";
import { categories, products, vendors } from "../data/marketplace.js";

export default function VendorStore() {
  const { vendorId } = useParams();
  const [params, setParams] = useSearchParams();
  const activeCat = params.get("cat") || "";

  const vendor = vendors.find((v) => v.id === vendorId);

  const vendorProducts = useMemo(
    () => products.filter((p) => p.vendorId === vendorId),
    [vendorId]
  );

  // Only the categories this vendor actually sells in
  const vendorCategories = useMemo(() => {
    const catIds = [...new Set(vendorProducts.map((p) => p.categoryId))];
    return catIds.map((id) => categories.find((c) => c.id === id)).filter(Boolean);
  }, [vendorProducts]);

  const displayedProducts = useMemo(
    () => activeCat ? vendorProducts.filter((p) => p.categoryId === activeCat) : vendorProducts,
    [vendorProducts, activeCat]
  );

  if (!vendor) return <NotFound />;

  const selectCat = (id) => {
    const next = new URLSearchParams(params);
    if (id) next.set("cat", id);
    else next.delete("cat");
    setParams(next);
  };

  return (
    <div className="page">
      {/* Vendor hero */}
      <div className="vendor-store-hero" style={{ backgroundImage: `linear-gradient(110deg, rgba(20,33,61,0.96), rgba(20,33,61,0.45)), url(${vendor.image})` }}>
        <div className="vendor-store-hero-body">
          <div className="vendor-store-meta">
            {vendor.verified && (
              <span className="eyebrow" style={{ gap: "0.35rem" }}>
                <ShieldCheck size={14} /> Verified Store
              </span>
            )}
            <h1>{vendor.name}</h1>
            <p>{vendor.description}</p>
          </div>
          <div className="vendor-store-stats">
            <div>
              <MapPin size={20} />
              <strong>{vendor.location}</strong>
              <span>Location</span>
            </div>
            <div>
              <Star size={20} fill="currentColor" />
              <strong>{vendor.rating}</strong>
              <span>Rating</span>
            </div>
            <div>
              <Package size={20} />
              <strong>{vendorProducts.length}</strong>
              <span>Products</span>
            </div>
            <div>
              <Timer size={20} />
              <strong>{vendor.responseTime}</strong>
              <span>Response</span>
            </div>
            <div>
              <BadgeCheck size={20} />
              <strong>Since {vendor.joined}</strong>
              <span>Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category filter — only this vendor's categories */}
      {vendorCategories.length > 1 && (
        <div className="vendor-cat-filter">
          <button
            className={!activeCat ? "active" : ""}
            onClick={() => selectCat("")}
          >
            All Products
          </button>
          {vendorCategories.map((cat) => (
            <button
              key={cat.id}
              className={activeCat === cat.id ? "active" : ""}
              onClick={() => selectCat(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      <SectionHeader
        eyebrow={activeCat ? vendorCategories.find((c) => c.id === activeCat)?.name : "All Products"}
        title={`${vendor.name} Catalog`}
        description={`${displayedProducts.length} product${displayedProducts.length !== 1 ? "s" : ""} available`}
      />

      <div className="product-grid">
        {displayedProducts.length
          ? displayedProducts.map((product, i) => (
              <ProductCard product={product} key={product.id} index={i} />
            ))
          : <EmptyState />}
      </div>

      <div className="vendor-store-footer">
        <Link className="secondary-button" to="/vendors">← Back to all vendors</Link>
      </div>
    </div>
  );
}
