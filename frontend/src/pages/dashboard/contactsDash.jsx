// contactsDash.jsx
import Form from "../../components/form.jsx";

function ContactsDash() {
  return (
    <Form
      title={"New Contact"}
      option1={"name"}
      option2={"tva"}
      option3={"country"}
      option1Type={"text"}
      option2Type={"number"}
      option3Type={"text"}
      apiEndpoint="http://localhost:3001/cogip/api/contact" // API spécifique à Contact
    />
  );
}

export default ContactsDash;
