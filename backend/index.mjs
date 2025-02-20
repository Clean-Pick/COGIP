import express from "express";
import cors from 'cors';
import compagnyRoute from "./Routes/company.mjs";
import contactRoute from "./Routes/contact.mjs";
import invoiceRoute from "./Routes/invoice.mjs";
import logInRoute from "./Routes/logIn.mjs";
import registerRoute from "./Routes/register.mjs";
import { connection } from './connectionDB.mjs';

connection.connect((err) => {
    if(err) {
        console.error('Erreur de connexion à la base de données');
        return;
    }
    console.log('Connecté à la base de données');
})

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors()); // Autorise le front à appeler l'API

app.use("/cogip/api/company",compagnyRoute);
app.use("/cogip/api/contact",contactRoute);
app.use("/cogip/api/invoice",invoiceRoute);
app.use("/cogip/api/login",logInRoute);
app.use("/cogip/api/register",registerRoute);

app.get('/', (req, res) => {
    res.send({ data: `Here is your data` });
    }
)

app.listen(PORT, () => console.log(`Server started: http://localhost:${PORT}/`))