// companiesDash.jsx
import Form from "../../components/form.jsx";

function CompaniesDash() {
  return (
    <Form
      title={"New Company"}
      option1={"name"}
      option2={"phone number"}
      option3={"email"}
      option1Type={"text"}
      option2Type={"number"}
      option3Type={"text"}
      apiEndpoint="http://localhost:3001/cogip/api/company" // API spécifique à Company
    />
  );
}

export default CompaniesDash;
