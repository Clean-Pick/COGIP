import React, {useEffect, useState} from 'react';
import Datalist from "../datalist.jsx";

const ContactsList = (props) => {
    const [columnsLarge, setColumnsLarge] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:3001/cogip/api/contact'); // Modifiez l'URL ici
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des contacts');
                }
                const contacts = await response.json();

                console.log(contacts);

                if (!Array.isArray(contacts)) {
                    throw new Error('La réponse de l\'API n\'est pas un tableau');
                }

                const transformedData = [
                    {
                        name: "Name",
                        id: contacts.map((contact) => contact.id),
                        data: contacts.map((contact) => contact.contact_name)
                    },
                    {
                        name: "phone",
                        data: contacts.map((contact) => contact.phone)
                    },
                    {
                        name: "mail",
                        data: contacts.map((contact) => contact.email)
                    },
                    {
                        name: "company",
                        data: contacts.map((contact) => contact.company_name)
                    },
                    {
                        name: "Created_at",
                        data: contacts.map((contact) => {
                            const date = new Date(contact.created_at);
                            return date.toLocaleDateString('fr-FR');
                        })
                    }
                ];

                setColumnsLarge(transformedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</ div>;
    }

    return (

        <Datalist
            title={props.title || "All contacts"}
            columns={columnsLarge}
            dataType={props.dataType || "contacts"}
            decorationBar={props.decorationBar !== undefined ? props.decorationBar : false}
            hidePagination={props.hidePagination !== undefined ? props.hidePagination : true}
            hideSearchBar={props.hideSearchBar !== undefined ? props.hideSearchBar : true}
            adminMode={props.adminMode !== undefined ? props.adminMode : false}
        />


    );
};

export default ContactsList;