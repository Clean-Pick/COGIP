import { NavLink } from "react-router-dom";

function Sidebar() {
    const firstname = "Henry"; //changer avec id BDD
    const lastname = "George"; //changer avec id BDD

  return (
    <div className="flex sticky top-0 h-screen">
      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-md flex flex-col justify-between p-6">
        {/* Profil - BDD connexion */}
        <div className="text-center">
          <img
            src="../../public/show_contact/default_profile.png" 
            alt="Profile"
            className="w-22 h-22 rounded-full mx-auto text-base bg-cogip-blue"
          />
          <h2 className="mt-2 font-bold font-cogip-roboto text-2xl pb-3 border-b-1">{firstname}<br />{lastname}</h2>
        </div>

        {/* Navigation */}
        <nav className="font-cogip-inter mt-4 ml-4 text-xl">
          <ul className="space-y-5 -translate-y-30">
            <li>
              <NavLink to="/dashboard" end className={({ isActive }) =>
                    `flex items-center gap-3 -px-10 -ml-4 border-r-4 translate-x-6  ${
                    isActive ? "border-cogip-blue text-black font-bold" : "border-transparent text-gray-600"}`}>
                <img className="scale-85" src="/index/dashboard/dashboard.svg" alt="Dashboard" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/invoicesDash" className={({ isActive }) =>
                    `flex items-center gap-3 -px-10 -ml-4 border-r-4 translate-x-6  ${
                    isActive ? "border-cogip-blue text-black font-bold" : "border-transparent text-gray-600"}`}>
                <img className="scale-85" src="/index/dashboard/invoicesDash.svg" alt="Invoices" />
                <span>Invoices</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/companiesDash" className={({ isActive }) =>
                    `flex items-center gap-3 -px-10 -ml-4 border-r-4 translate-x-6  ${
                    isActive ? "border-cogip-blue text-black font-bold" : "border-transparent text-gray-600"}`}>
                <img className="scale-85" src="/index/dashboard/companiesDash.svg" alt="Companies" />
                <span>Companies</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/contactsDash" className={({ isActive }) =>
                    `flex items-center gap-3 -px-10 -ml-4 border-r-4 translate-x-6  ${
                    isActive ? "border-cogip-blue text-black font-bold" : "border-transparent text-gray-600"}`}>
                <img className="scale-85" src="/index/dashboard/contactDash.svg" alt="Contacts" />
                <span>Contacts</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout - BDD */}
        <div className="flex items-center justify-between text-xl border-t-1 pt-3 font-cogip-inter">
          <img
            src="../../public/show_contact/default_profile.png" 
            alt="Profile"
            className="w-10 h-10 text-xs rounded-full bg-cogip-blue"
          />
          <NavLink to="/" className="flex items-center gap-2 text-cogip-blue hover:text-black">
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
