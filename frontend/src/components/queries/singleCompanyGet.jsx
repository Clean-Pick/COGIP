import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ShowCompany from "../../pages/showCompany.jsx";

const CompanyDetails = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/cogip/api/company/${id}`); // Correction ici
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }

                const company = await response.json();
                setData(company);
                console.log(company);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [id]);

    // Rendu conditionnel
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>No company found.</div>;
    }

    return (
        <ShowCompany
            company={data}
        />
    );
};

export default CompanyDetails;