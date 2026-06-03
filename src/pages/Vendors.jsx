import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import VendorCard from "../components/VendorCard.jsx";
import { categories, locations, vendors } from "../data/marketplace.js";
import { slugText } from "../utils/format.js";

export default function Vendors() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const filteredVendors = useMemo(() => vendors.filter((vendor) => {
    const vendorCategory = categories.find((item) => item.id === vendor.categoryId);
    const haystack = slugText(`${vendor.name} ${vendor.location} ${vendor.description} ${vendorCategory.name}`);
    return (!query || haystack.includes(slugText(query))) && (!location || vendor.location === location) && (!category || vendor.categoryId === category);
  }), [query, location, category]);

  return (
    <div className="page split-layout">
      <aside className="filter-card">
        <h2>Find Vendors</h2>
        <label>
          <span>Search</span>
          <div className="input-icon"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Shop, product, category" /></div>
        </label>
        <label>
          <span>Location</span>
          <select value={location} onChange={(event) => setLocation(event.target.value)}>
            <option value="">All locations</option>
            {locations.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">All categories</option>
            {categories.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
          </select>
        </label>
      </aside>
      <section>
        <SectionHeader eyebrow="Vendor Directory" title="All Vendors" description={`${filteredVendors.length} shops matched your filters.`} />
        <div className="vendor-grid">
          {filteredVendors.length ? filteredVendors.map((vendor) => <VendorCard vendor={vendor} key={vendor.id} />) : <EmptyState />}
        </div>
      </section>
    </div>
  );
}
