import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-700">BizSolutions</div>
      <nav className="space-x-6">        
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >Home</NavLink>
        <NavLink
          to="/mycrud"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >Thoughts</NavLink>        
        <NavLink
          to="/services"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >Services</NavLink>        
        <NavLink
          to="/about"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >About</NavLink>    
        <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
      </nav>
    </header>
  )
}

export default Header;