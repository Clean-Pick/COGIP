import { useState } from "react";

export default function Form({
  title = "Ajouter une entrée",
  option1 = "Référence",
  option1Type = "text",
  option2 = "Prix",
  option2Type = "number",
  option3 = "Entreprise",
  option3Type = "text",
  apiEndpoint = "/api/companies", // API par défaut
}) {
  const [formData, setFormData] = useState({
    reference: "",
    price: "",
    companyName: "",
  });

  const [message, setMessage] = useState(""); // Gérer les messages de succès ou d'erreur

  // Gestion du changement des inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.reference || !formData.price || !formData.companyName) {
      setMessage("Tous les champs sont obligatoires !");
      return;
    }
  
    try {
        const endpoints = [
            "https://localhost:3001/cogip/api/company",
            "https://localhost:3001/cogip/api/contact",
            "https://localhost:3001/cogip/api/invoice"
          ];
          
      const responses = await Promise.all(
        endpoints.map((endpoint) =>
          fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          })
        )
      );
  
      // Vérifier chaque réponse avant d'appeler .json()
      const results = await Promise.all(
        responses.map(async (res) => {
          if (!res.ok) {
            throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
          }
  
          const text = await res.text(); // Lire la réponse sous forme de texte
          return text ? JSON.parse(text) : {}; // Convertir en JSON si ce n'est pas vide
        })
      );
  
      setMessage("Données enregistrées avec succès !");
      setFormData({ reference: "", price: "", companyName: "" });
  
    } catch (error) {
      setMessage("Erreur : " + error.message);
    }
  };
  
  
  return (
    <section className="p-8 m-8 rounded-lg bg-white">
      <h2 className="font-bold text-2xl pt-8">{title}</h2>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <form onSubmit={handleSubmit} className="flex-wrap">
        <input
          type={option1Type}
          name="reference"
          id="reference"
          placeholder={option1}
          value={formData.reference}
          onChange={handleChange}
          className="w-full h-[60px] bg-gray-100 ps-8 capitalize mb-[45px] font-thin"
        />

        <input
          type={option2Type}
          name="price"
          id="price"
          placeholder={option2}
          value={formData.price}
          onChange={handleChange}
          className="w-full h-[60px] bg-gray-100 ps-8 capitalize mb-[45px] font-thin"
        />

        <input
          type={option3Type}
          name="companyName"
          id="companyName"
          placeholder={option3}
          value={formData.companyName}
          onChange={handleChange}
          className="w-full h-[60px] bg-gray-100 ps-8 capitalize mb-[45px] font-thin"
        />

        <input
          type="submit"
          value="Enregistrer"
          className="w-full h-[60px] bg-blue-500 text-white capitalize font-normal cursor-pointer"
        />

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </section>
  );
}
