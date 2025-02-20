import CompaniesList from "../../components/queries/companiesGet.jsx";
import ContactsList from "../../components/queries/contactsGet.jsx";
import InvoicesList from "../../components/queries/invoicesGet.jsx";

let nbre_invoices = 235
let nbre_contacts = 156
let nbre_companies = 987


function Dashboard() {
    return (
        <div className="grid grid-cols-2 gap-10 p-8 bg-indigo-100">

            <section className="flex-wrap w-full h-[232px] bg-zinc-50 rounded-lg row-span-1"> {/* BDD pour chiffre */}

                <h2 className="w-full p-[30px] font-bold text-xl">Statistics</h2>

                <div className="flex justify-around items-center">

                    <div
                        className="flex-wrap w-[85px] h-[85px] bg-indigo-700 rounded-full text-white text-center font-bold py-3">
                        <span className="flex-1/1">{nbre_invoices}</span> <span
                        className="flex-1/1">Invoices</span>
                    </div>

                    <div
                        className="flex-wrap w-[85px] h-[85px] bg-indigo-400 rounded-full text-white text-center font-bold py-3">
                        <span className="flex-1/1">{nbre_contacts}</span> <span
                        className="flex-1/1">Contacts</span>
                    </div>

                    <div
                        className="flex-wrap w-[85px] h-[85px] bg-rose-400 rounded-full text-white text-center font-bold py-3">
                        <span className="flex-1/1">{nbre_companies}</span> <span
                        className="flex-1/1">Companies</span>
                    </div>

                </div>


            </section>

            {/* Contacts BDD*/}
            <ContactsList
                title={"last contacts"}
                adminMode={true}
            />

            {/* Invoices BDD*/}
            <InvoicesList
                title={"last invoices"}
                adminMode={true}
            />


            {/* Companies BDD */}
            <CompaniesList
                title="last companies"
                adminMode={true}
            />

        </div>
    );
}

export default Dashboard;