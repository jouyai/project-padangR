import { Link, NavLink } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { cartItems } = useCart();
  const { session, signOut } = useAuth();

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const user = session?.user;
  const username = user?.user_metadata?.username || "User";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          SecondStyle
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-medium" : "text-gray-600 hover:text-primary"}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "text-primary font-medium" : "text-gray-600 hover:text-primary"}>
            Shop
          </NavLink>

          <Link to="/cart" className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.8} stroke="currentColor"
              className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M6 21h.01M18 21h.01" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {!session ? (
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem disabled>Hello, {username}</DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
