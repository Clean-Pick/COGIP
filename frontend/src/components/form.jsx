import { useState } from "react";

export default function Form({ title, apiEndpoint }) {
  // Déterminer l'API utilisée
  const isCompanyAPI = apiEndpoint.includes("company");
  const isContactAPI = apiEndpoint.includes("contact");

  // Définition des champs en fonction de l'API
  const [formData, setFormData] = useState(
    isCompanyAPI
      ? { name: "", type_id: "", country: "", tva: "" } // Champs pour les entreprises
      : isContactAPI
      ? { name: "", company_id: "", email: "", phone: "" } // Champs pour les contacts
      : { ref: "", price: "", company_id: "" } // Champs pour les factures
  );

  const [message, setMessage] = useState("");

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que tous les champs sont remplis
    if (Object.values(formData).some((value) => !value.trim())) {
      setMessage("Tous les champs sont obligatoires !");
      return;
    }

    try {
      console.log("Données envoyées :", JSON.stringify(formData)); // Debug
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }

      setMessage("Données enregistrées avec succès !");
      setFormData(
        isCompanyAPI
          ? { name: "", type_id: "", country: "", tva: "" }
          : isContactAPI
          ? { name: "", company_id: "", email: "", phone: "" }
          : { ref: "", price: "", company_id: "" }
      );

    } catch (error) {
      setMessage("Erreur : " + error.message);
    }
  };

  return (
    <section className="p-8 m-8 rounded-lg bg-white">
      <h2 className="font-bold text-2xl pt-8">{title}</h2>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <form onSubmit={handleSubmit} className="flex-wrap">
        {/* Formulaire pour Company */}
        {isCompanyAPI ? (
          <>
            <input type="text" name="name" placeholder="Nom de l'entreprise"
              value={formData.name} onChange={handleChange} className="w-full h-[60px] bg-gray-100 ps-8 mb-[45px]" />

            <input type="number" name="type_id" placeholder="Type ID"
              value={formData.type_id} onChange={handleChange} className="w-full h-[60px] bg-gray-100 ps-8 mb-[45px]" />

            <input type="text" name="country" placeholder="Country"
              value={formData.country} onChange={handleChange} className="w-full h-[60px] bg-gray-100 ps-8 mb-[45px]" />

            <input type="text" name="tva" placeholder="TVA"
              value={formData.tva} onChange={handleChange} className="w-full h-[60px] bg-gray-100 ps-8 mb-[45px]" />
          </>
        ) : isContactAPI ? (
          // Formulaire pour Contact
          <>
            <input type="text" name="name" placeholder="Contact"
              value={formData.name} onChange={handleChange} className="w-full h-[60px] bg-gray-100 ps-8 mb-[45px]" />

            <input type="text" name="company_id" placeholder="Entreprise"
              value={formData.company_id} onChange={handleChange} className="w-full h-[60px] bg-gray-100 ps-8 mb-[45px]" />

            <input type="email" name="email" placeholder="Email"
              value={formData.email} onChange={handleChange} className="w-full h-[60px] bg-gray-100 ps-8 mb-[45px]" />

            <input type="text" name="phone" placeholder="Phone Number"
              value={formData.phone} onChange={handleChange} className="w-full h-[60px] bg-gray-100 ps-8 mb-[45px]" />
          </>
        ) : (
          // Formulaire pour Invoice
          <>
            <input type="text" name="ref" placeholder="Reference"
              value={formData.ref} onChange={handleChange} className="w-full h-[60px] bg-gray-100 ps-8 mb-[45px]" />

            <input type="number" name="price" placeholder="Price"
              value={formData.price} onChange={handleChange} className="w-full h-[60px] bg-gray-100 ps-8 mb-[45px]" />

            <input type="text" name="company_id" placeholder="Entreprise"
              value={formData.company_id} onChange={handleChange} className="w-full h-[60px] bg-gray-100 ps-8 mb-[45px]" />
          </>
        )}

        <input type="submit" value="Save"
          className="w-full h-[60px] bg-cogip-blue  ps-8 capitalize text-left text-white  font-cogip-inter font-normal" />

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </section>
  );
}
