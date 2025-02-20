import { useLocation } from "react-router-dom";

import Dashboard from "./dashboard.jsx";
import ContactsDash from "./contactsDash.jsx";
import CompaniesDash from "./companiesDash.jsx";
import InvoicesDash from "./invoicesDash.jsx";

function HeaderDash() {
    const location = useLocation();
    const name = "Henry"; // BDD

    //pour switch de page
    const subPath = location.pathname.replace("/dashboard", "") || "/";
    let content;
    let pageName = "";

    switch (subPath) {
        case "/contactsDash":
            content = <ContactsDash />;
            pageName = "Contacts";
            break;
        case "/companiesDash":
            content = <CompaniesDash />;
            pageName = "Companies";
            break;
        case "/invoicesDash":
            content = <InvoicesDash />;
            pageName = "Invoices";
            break;
        default: // Page par défaut
            content = <Dashboard />; 
    }

    return (
        <div className="flex-1 p-8 bg-indigo-100 relative">
            <h3 className="text-2xl ml-8 font-bold">Dashboard</h3>
            <p className="text-gray-500 ml-8 ">dashboard/{pageName}</p>

            <section className="m-8 bg-cogip-blue text-white rounded-lg p-15 relative">
                <img 
                    src="/index/dashboard/work.svg" 
                    alt="Illustration"
                    className="absolute top-[-150px] scale-90 right-50"
                />
                <h2 className="text-4xl font-bold">Welcome back, {name}!</h2>
                <p className="text-base">You can add an invoice, a company <br />
                and some contacts.</p>
            </section>

            {content}
        </div>
    );
}

export default HeaderDash;
