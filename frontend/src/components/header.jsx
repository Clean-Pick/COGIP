import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <header className="w-screen font-cogip-roboto font-black bg-cogip-yellow pt-15 overflow-hidden">
      <div className="container mx-auto flex items-center justify-between pl-1">
        <h1>
          <NavLink to="/" className="text-5xl font-black">
            COGIP
          </NavLink>
        </h1>

        <nav>
          <ul className="flex gap-7 text-lg font-bold pr-60">
            <li>
              <NavLink to="/" className="p-2 border-2 border-transparent hover:border-black">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/invoices" className="p-2 border-2 border-transparent hover:border-black">
                Invoices
              </NavLink>
            </li>
            <li>
              <NavLink to="/companies" className="p-2 border-2 border-transparent hover:border-black">
                Companies
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts" className="p-2 border-2 border-transparent hover:border-black">
                Contacts
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* ATTENTION JUSTE EN TEST LE NAVLINK avec dashboard */}
        <div className="flex gap-3 items-center text-lg font-bold pr-7">
          <NavLink to="/registerDash" className="px-2 rounded-lg hover:bg-white text-black transition">
            Sign up
          </NavLink>

          <a href="#" className="px-2 rounded-lg hover:bg-white text-black transition">
            <NavLink to="/loginDash" className="px-2 rounded-lg hover:bg-white text-black transition">
              Login
            </NavLink>
          </a>
        </div>
      </div>

      {/* change header -> page home*/}
      {location.pathname === "/" && (
        <section className="bg-cogip-yellow h-130 w-screen">
          <div className="pl-23 flex items-center font-black font-cogip-inter align-middle">
            <div className="flex-1 text-7xl uppercase">MANAGE YOUR CUSTOMERS AND INVOICES EASILY</div>
            <img src="/index/index_illustration.png" className="flex-1 text-8xl" alt="coder hipster" />
          </div>
        </section>
      )}

      {/* Img */}
      <img src="/index/header_rectangle.svg" alt="white rectangle" className="relative scale-107 bottom-[-25px] pl-27" />
    </header>
  );
}

export default Header;
