import { Heart, HelpCircle, MapPinned, MessageCircle, PackageCheck, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const accountSections = {
  profile: { title: "My profile", icon: UserRound, text: "Manage your name, email, role, and marketplace preferences." },
  addresses: { title: "Addresses", icon: MapPinned, text: "Save delivery addresses for faster checkout." },
  orders: { title: "My orders", icon: PackageCheck, text: "Track placed orders, vendor confirmations, and delivery status." },
  messages: { title: "Message center", icon: MessageCircle, text: "Buyer and vendor conversations will appear here." },
  wishlist: { title: "My wishlist", icon: Heart, text: "Saved products for future purchases." },
  help: { title: "Help center", icon: HelpCircle, text: "Support tickets, marketplace help, and order assistance." },
  faq: { title: "FAQ", icon: HelpCircle, text: "Common questions about buying, selling, payments, and delivery." },
};

export default function Account() {
  const { section = "profile" } = useParams();
  const { user } = useAuth();
  const active = accountSections[section] || accountSections.profile;
  const Icon = active.icon;

  if (!user) {
    return (
      <div className="page not-found">
        <h1>Please login first</h1>
        <p>Your account pages are available after successful login.</p>
        <Link className="primary-button" to="/login">Go to login</Link>
      </div>
    );
  }

  return (
    <div className="page account-layout">
      <aside className="account-sidebar">
        <div className="profile-summary large">
          <span>{user.avatar}</span>
          <div>
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </div>
        </div>
        {Object.entries(accountSections).map(([key, item]) => {
          const NavIcon = item.icon;
          return (
            <Link className={key === section ? "active" : ""} to={`/account/${key}`} key={key}>
              <NavIcon size={17} />
              {item.title}
            </Link>
          );
        })}
      </aside>
      <section className="account-panel">
        <Icon size={34} />
        <span className="eyebrow">Account</span>
        <h1>{active.title}</h1>
        <p>{active.text}</p>
        <div className="empty-state">
          <strong>{active.title}</strong>
          <p>Your marketplace information will appear here as you continue buying and selling.</p>
        </div>
      </section>
    </div>
  );
}
