import { ChevronDown, ChevronRight, Heart, HelpCircle, LogOut, MapPinned, Menu, MessageCircle, PackagePlus, Search, ShoppingBag, ShoppingCart, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { categories, locations } from "../data/marketplace.js";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { totals, setCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  const submitSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location) params.set("location", location);
    navigate(`/?${params.toString()}`);
  };

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="market-strip" aria-label="Marketplace highlights">
        <div className="strip-track" aria-hidden="true">
          <span>Largest business micro &amp; small marketplace in Sri Lanka</span>
          <span>✦</span>
          <span>Verified vendors</span>
          <span>✦</span>
          <span>Buyer protection</span>
          <span>✦</span>
          <span>Island wide delivery</span>
          <span>✦</span>
          <span>Largest business micro &amp; small marketplace in Sri Lanka</span>
          <span>✦</span>
          <span>Verified vendors</span>
          <span>✦</span>
          <span>Buyer protection</span>
          <span>✦</span>
          <span>Island wide delivery</span>
          <span>✦</span>
        </div>
      </div>
      <header className="app-header">
        <Link className="brand" to="/" aria-label="MicroMart home">
          <span className="brand-mark">M</span>
          <span>
            <strong>MicroMart</strong>
            <small>Micro & Small Marketplace</small>
          </span>
        </Link>

        <form className="command-search" onSubmit={submitSearch}>
          <Search size={20} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, shops..." />
          <select value={location} onChange={(event) => setLocation(event.target.value)} aria-label="Location filter">
            <option value="">Island wide</option>
            {locations.map((item) => <option key={item}>{item}</option>)}
          </select>
          <button type="submit" aria-label="Search marketplace">
            <Search className="search-submit-icon" size={18} />
            <span>Search</span>
          </button>
        </form>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/vendors">All Vendors</NavLink>
          <NavLink to="/vendor/dashboard">Vendor Zone</NavLink>
          {!user && <NavLink to="/login">Login</NavLink>}
        </nav>

        <div className="header-actions">
          <Link className="icon-action" to="/vendor/dashboard" aria-label="Vendor dashboard"><PackagePlus size={20} /></Link>
          <button className="icon-action" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <ShoppingCart size={20} />
            <span>{totals.count}</span>
          </button>
          {user ? (
            <div className="profile-menu">
              <button className="profile-trigger" aria-label="Open user profile menu">
                <span>{user.avatar}</span>
                <strong>{user.name}</strong>
                <ChevronDown size={16} />
              </button>
              <div className="profile-dropdown">
                <div className="profile-summary">
                  <span>{user.avatar}</span>
                  <div>
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                </div>
                <Link to="/account/profile"><UserRound size={17} /> My profile</Link>
                <Link to="/account/addresses"><MapPinned size={17} /> Addresses</Link>
                <Link to="/account/orders"><ShoppingBag size={17} /> My orders</Link>
                <Link to="/account/messages"><MessageCircle size={17} /> Message center</Link>
                <Link to="/account/wishlist"><Heart size={17} /> My wishlist</Link>
                <Link to="/account/help"><HelpCircle size={17} /> Help center</Link>
                <Link to="/account/faq"><HelpCircle size={17} /> FAQ</Link>
                <button onClick={() => { logout(); navigate("/"); }}><LogOut size={17} /> Logout</button>
              </div>
            </div>
          ) : (
            <Link className="icon-action" to="/login" aria-label="Login"><UserRound size={20} /></Link>
          )}
          <button className="icon-action menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
        </div>
      </header>

      <aside className={isOpen ? "mobile-menu open" : "mobile-menu"} aria-hidden={!isOpen}>
        <button className="mobile-menu-backdrop" onClick={closeMenu} aria-label="Close menu" />
        <section className="mobile-menu-panel">
          <div className="mobile-menu-head">
            <Link className="brand" to="/" onClick={closeMenu}>
              <span className="brand-mark">M</span>
              <span>
                <strong>MicroMart</strong>
                <small>Marketplace</small>
              </span>
            </Link>
            <button onClick={closeMenu} aria-label="Close menu"><X size={21} /></button>
          </div>

          <nav className="mobile-nav">
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/vendors" onClick={closeMenu}>All Vendors</NavLink>
            <NavLink to="/vendor/dashboard" onClick={closeMenu}>Vendor Zone</NavLink>
            {!user && <NavLink to="/login" onClick={closeMenu}>Login</NavLink>}
          </nav>

          <div className="mobile-category-menu">
            <strong>Categories</strong>
            {categories.map((category) => (
              <details key={category.id}>
                <summary>
                  <Link to={`/category/${category.id}`} onClick={closeMenu}>{category.name}</Link>
                  <ChevronRight size={16} />
                </summary>
                <div>
                  {category.subcategories.map((subcategory) => (
                    <section key={subcategory.id}>
                      <Link to={`/category/${category.id}?sub=${subcategory.id}`} onClick={closeMenu}>{subcategory.name}</Link>
                      <div>
                        {subcategory.children.map((child) => (
                          <Link to={`/category/${category.id}?sub=${subcategory.id}`} onClick={closeMenu} key={child}>{child}</Link>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
}
