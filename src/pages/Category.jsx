import { Link, useParams, useSearchParams } from "react-router-dom";
import CategorySidebar from "../components/CategorySidebar.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { categories, products } from "../data/marketplace.js";

export default function Category() {
  const { categoryId } = useParams();
  const [params] = useSearchParams();
  const subcategoryId = params.get("sub") || "";
  const category = categories.find((item) => item.id === categoryId) || categories[0];
  const categoryProducts = products.filter((product) => product.categoryId === category.id && (!subcategoryId || product.subcategoryId === subcategoryId));

  return (
    <div className="page app-grid">
      <CategorySidebar activeCategoryId={category.id} />
      <section className="stack">
        <div className="category-hero" style={{ backgroundImage: `linear-gradient(110deg, rgba(20, 33, 61, .94), rgba(20, 33, 61, .42)), url(${category.image})` }}>
          <span className="eyebrow">Category</span>
          <h1>{category.name}</h1>
          <p>Browse relevant category products with subcategory navigation on the left and refined product cards below.</p>
        </div>
        <div className="chip-row">
          <Link className={!subcategoryId ? "active" : ""} to={`/category/${category.id}`}>All</Link>
          {category.subcategories.map((subcategory) => (
            <Link className={subcategoryId === subcategory.id ? "active" : ""} to={`/category/${category.id}?sub=${subcategory.id}`} key={subcategory.id}>{subcategory.name}</Link>
          ))}
        </div>
        <SectionHeader eyebrow="Products" title={`${category.name} Products`} description={`${categoryProducts.length} products ready for ordering.`} />
        <div className="product-grid">
          {categoryProducts.length ? categoryProducts.map((product, i) => <ProductCard product={product} key={product.id} index={i} />) : <EmptyState />}
        </div>
      </section>
    </div>
  );
}
