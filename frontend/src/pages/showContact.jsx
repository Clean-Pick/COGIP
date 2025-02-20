function ShowContact({contact}) {

    return (

        <section className={"px-30 py-10 grid grid-cols-2 w-full overflow-hidden"}>

            <div className="col-auto w-full">
                <h2 className="font-black font-cogip-inter text-5xl capitalize mb-20">{contact.name}</h2>

                <span className="relative block h-7 w-100 bg-cogip-yellow top-[-100px] left-10 z-[-1]"></span>

                <div className="relative top-[-30px] font-black font-cogip-roboto">
                    <p>Contact : <span className="font-semibold">{contact.name}</span></p>
                    <p>Phone : <span className="font-semibold">{contact.phone}</span></p>
                    <p>Mail : <span className="font-semibold">{contact.email}</span></p>
                    <p>Company : <span className="font-semibold">{contact.company}</span></p>
                </div>
            </  div>

            <div className="flex justify-end col-auto w-full pr-[200px]">
                <img src="../../public/show_contact/default_profile.png" alt="default profile picture"
                     className="relative right-0  w-70 h-auto"/>
            </div>

        </section>

    )
}

export default ShowContact;