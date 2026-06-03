import { ChevronRight, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../data/marketplace.js";

export default function CategorySidebar({ activeCategoryId }) {
  return (
    <aside className="category-sidebar">
      <div className="panel-title">
        <Store size={18} />
        <span>Categories</span>
      </div>
      <ul className="category-hover-list">
        {categories.map((category) => (
          <li className={activeCategoryId === category.id ? "active" : ""} key={category.id}>
            <Link className="category-hover-link" to={`/category/${category.id}`}>
              <span>{category.name}</span>
              <ChevronRight size={16} />
            </Link>
            <div className="subcategory-flyout">
              <div className="flyout-head">
                <strong>{category.name}</strong>
                <Link to={`/category/${category.id}`}>View all</Link>
              </div>
              <div className="flyout-grid">
                {category.subcategories.map((subcategory) => (
                  <div className="flyout-group" key={subcategory.id}>
                    <Link to={`/category/${category.id}?sub=${subcategory.id}`}>{subcategory.name}</Link>
                    <div>
                      {subcategory.children.map((child) => (
                        <Link to={`/category/${category.id}?sub=${subcategory.id}`} key={child}>{child}</Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
