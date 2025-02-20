import InvoicesList from "../components/queries/invoicesGet.jsx";

function Invoices() {
    return (
        <InvoicesList
            decorationBar={true}
            hidePagination={false}
            hideSearchBar={false}
        />
    );
}


export default Invoices;
  