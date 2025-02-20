import ContactsList from "../components/queries/contactsGet.jsx";

function Companies() {
    return (
        <ContactsList
            decorationBar={true}
            hidePagination={false}
            hideSearchBar={false}
        />
    );
}

export default Companies;
  