import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
const Navbar = () => {
  const { totalItems } = useContext(CartContext);
  return (
    <nav className="flex justify-between p-4 bg-white shadow-sm px-10">
      <Link to="/" className="font-bold text-orange-500 text-xl">
        TRENDYOL LIGHT test
      </Link>

      <Link to="/cart" className="relative">
        🛒{" "}
        <span className="absolute -top-2 -right-3 bg-orange-600 text-white text-[10px] rounded-full px-1.5 font-bold">
          {totalItems}
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
