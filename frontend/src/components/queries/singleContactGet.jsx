import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ShowContact from "../../pages/showContact.jsx";

const ContactDetails = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/cogip/api/contact/${id}`); // Correction ici
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }

                const contact = await response.json();
                setData(contact);
                console.log(contact);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContactData();
    }, [id]);

    // Rendu conditionnel
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>No contact found.</div>;
    }

    return (
        <ShowContact
            contact={data}
        />
    );
};

export default ContactDetails;