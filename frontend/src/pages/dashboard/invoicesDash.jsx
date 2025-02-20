// invoicesDash.jsx
import Form from "../../components/form.jsx";

function InvoicesDash() {
  return (
    <Form
      title={"New Invoice"}
      option1={"reference"}
      option2={"price"}
      option3={"company"}
      option1Type={"text"}
      option2Type={"number"}
      option3Type={"text"}
      apiEndpoint="http://localhost:3001/cogip/api/invoice" // API spécifique à Invoice
    />
  );
}

export default InvoicesDash;
