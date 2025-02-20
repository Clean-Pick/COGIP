import CompaniesList from "../components/queries/CompaniesGet.jsx";

function Companies() {
    return (
        <div>
            <CompaniesList
                decorationBar={true}
                hidePagination={false}
                hideSearchBar={false}
            />
        </div>
    );
}

export default Companies