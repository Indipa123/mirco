import { Facebook, Instagram, Mail, MapPin, Phone, Store, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const footerGroups = [
  {
    title: "Marketplace",
    links: [
      ["All vendors", "/vendors"],
      ["Categories", "/category/crafts"],
      ["Top products", "/"],
      ["Vendor zone", "/vendor/dashboard"],
    ],
  },
  {
    title: "Customer Care",
    links: [
      ["Help center", "/account/help"],
      ["FAQ", "/account/faq"],
      ["My orders", "/account/orders"],
      ["Message center", "/account/messages"],
    ],
  },
  {
    title: "Sell With Us",
    links: [
      ["List your shop", "/vendor/dashboard"],
      ["Add products", "/vendor/dashboard"],
      ["Vendor login", "/login"],
      ["Seller support", "/account/help"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section className="footer-brand">
          <Link className="brand" to="/">
            <span className="brand-mark">M</span>
            <span>
              <strong>MicroMart</strong>
              <small>Micro & Small Marketplace</small>
            </span>
          </Link>
          <p>Connecting Sri Lankan micro and small businesses with buyers looking for local products, fair prices, and trusted vendors.</p>
          <div className="footer-contact">
            <span><MapPin size={17} /> Colombo, Sri Lanka</span>
            <span><Phone size={17} /> +94 77 000 0000</span>
            <span><Mail size={17} /> hello@micromart.lk</span>
          </div>
        </section>

        {footerGroups.map((group) => (
          <section className="footer-links" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([label, href]) => <Link to={href} key={label}>{label}</Link>)}
          </section>
        ))}

        <section className="footer-cta">
          <Store size={28} />
          <h3>Grow your local business</h3>
          <p>Create a shop profile, list products with prices, and receive buyer orders from one marketplace.</p>
          <Link className="primary-button" to="/vendor/dashboard">Start selling</Link>
        </section>
      </div>
      <div className="footer-bottom">
        <span>© 2026 MicroMart. All rights reserved.</span>
        <div>
          <Link to="/account/help">Terms</Link>
          <Link to="/account/help">Privacy</Link>
          <a href="https://facebook.com" aria-label="Facebook"><Facebook size={17} /></a>
          <a href="https://instagram.com" aria-label="Instagram"><Instagram size={17} /></a>
          <a href="https://youtube.com" aria-label="YouTube"><Youtube size={17} /></a>
        </div>
      </div>
    </footer>
  );
}
