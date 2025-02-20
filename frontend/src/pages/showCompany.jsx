import InvoicesList from "../components/queries/invoicesGet.jsx";
import {Link} from "react-router-dom";

function ShowCompany({company}) {
    return (
        <section className="px-30 py-10 w-full overflow-hidden">
            <section>
                {/* BDD */}
                <h2 className="font-black font-cogip-inter text-5xl capitalize mb-20">{company.name}</h2>

                <span className="relative block h-7 w-100 bg-cogip-yellow top-[-100px] left-10 z-[-1]"></span>


                <div className="relative top-[-30px] font-black font-cogip-roboto">
                    <p>Name : <span className="font-semibold">{company.name}</span></p>
                    <p>TVA : <span className="font-semibold">{company.tva}</span></p>
                    <p>Country : <span className="font-semibold">{company.country}</span></p>
                    <p>Type : <span className="font-semibold">{company.type}</span></p>
                </div>

                <hr className="w-full bg-gray-300 border-none h-[1px] mb-[50px] mt-5"/>
            </section>


            <section>
                <h2 className="font-black font-cogip-inter text-5xl capitalize mb-20">Contact people</h2>
                <div className="container grid grid-cols-3 gap-[53px] w-[100%]">
                    {/*    TODO: Module affichant tous les contacts reliés à cette company dans une grid à 3 columns */}

                    <RelatedContactsCards
                        contacts={company.contacts}
                    />


                </div>

                <hr className="w-full bg-gray-300 border-none h-[1px] mb-[50px] mt-5"/>
            </section>

            <section>
                {/* TODO: Adapter le fetch pour n'afficher que les invoices reliés à l'entreprise */}
                <InvoicesList
                    title="last invoices"
                />
            </section>
        </section>
    )
}

function RelatedContactsCards({contacts}) {
    // Vérifiez si contacts est défini et est un tableau
    if (!contacts || contacts.length === 0) {
        return <div>No contacts found.</div>;
    }

    console.log(JSON.stringify(contacts))

    return (
        <>
            {contacts.map((contact, index) => (
                <Link to={`/contacts/${contact.contact_id}`} key={index}>
                    <div key={index}
                         className="contact-card flex flex-wrap items-center justify-between rounded-lg text-center bg-gray-50 h-[200px] w-120">

                        <div className="w-1/3 flex items-center justify-center">
                            <img src="../../public/show_contact/default_profile.png" alt="default contact picture"
                                 className="object-contain pl-6"/>
                        </div>

                        <h1 className="w-2/3 h-full flex items-center justify-center pr-6 font-cogip-roboto font-black capitalize text-3xl">{contact.contact_name}</h1>

                    </div>
                </Link>
            ))}
        </>
    );
}

export default ShowCompany;