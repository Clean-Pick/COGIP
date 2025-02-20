import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header.jsx";
import Nav from "./components/nav.jsx";
import Footer from "./components/footer.jsx";

function Layout() {
  const location = useLocation();

  // Vérifier si l'URL actuelle est dans le dashboard
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Header />}
      <Nav />
      {!isDashboard && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
