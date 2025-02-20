import {Route, Routes} from "react-router-dom";

import Home from "../pages/home.jsx";
import Invoices from "../pages/invoices.jsx";
import Contacts from "../pages/contacts.jsx";
import Companies from "../pages/companies.jsx";
import Login from "../pages/dashboard/loginDash.jsx";
import Register from "../pages/dashboard/registerDash.jsx";

import Sidebar from "../pages/dashboard/sidebar.jsx";
import HeaderDash from "../pages/dashboard/headerDash.jsx";
import ContactDetails from "./queries/singleContactGet.jsx";
import CompanyDetails from "./queries/singleCompanyGet.jsx";

function Nav() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/invoices" element={<Invoices/>}/>
            <Route path="/contacts" element={<Contacts/>}/>
            <Route path="/companies" element={<Companies/>}/>
            <Route path="/loginDash" element={<Login/>}/>
            <Route path="/registerDash" element={<Register/>}/>
            <Route path="/companies/:id" element={<CompanyDetails/>}/>
            <Route path="/contacts/:id" element={<ContactDetails/>}/>
            {/* Route Dashboard : Sidebar + HeaderDash */}
            <Route
                path="/dashboard/*"
                element={
                    <div className="flex">
                        <Sidebar/>
                        <HeaderDash/>
                    </div>
                }
            />
        </Routes>
    );
}

export default Nav;
