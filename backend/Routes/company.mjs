import express from "express";
import { connection } from "../connectionDB.mjs";
import { convertToMySqlDate } from "../utils/convertDateToMySQLDate.mjs";

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données");
    return;
  }
  console.log("Connecté à la base de données");
});

const router = express.Router();

//get all Companies
router.get("/", (req, res) => {
  const selectAllCompaniesQuery = "SELECT * FROM companies";
  connection.query(selectAllCompaniesQuery, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error occurred while retrieving Companies.",
      });
    }
    res.status(200).json(results);
  });
});

//get a Company by Id

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const selectCompanyByIdQuery = `
  SELECT 
    companies.name AS Company_name,
    types.name AS Company_type,
    companies.country AS Company_country,
    companies.tva AS Company_tva, 
    contacts.id AS Contact_id,
    contacts.name AS Contact_name, 
    invoices.id AS Invoice_id,
    invoices.ref AS Invoice_ref,
    invoices.created_at AS Invoice_created
    FROM companies
    LEFT JOIN types ON companies.type_id=types.id
    LEFT JOIN contacts ON companies.id = contacts.company_id
    LEFT JOIN invoices ON companies.id = invoices.company_id
   WHERE companies.id = ?`;
  connection.query(selectCompanyByIdQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Error occurred while retrieving the company.",
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error: "Company not found.",
      });
    }

    const company = {
      company_id: id,
      name: results[0].Company_name,
      type: results[0].Company_type,
      country: results[0].Company_country,
      tva: results[0].Company_tva,
      contacts: [],
      invoices: [],
    };

    const contactsMap = new Map();
    const invoicesMap = new Map();

    results.forEach((row) => {
      contactsMap.set(row.Contact_id, {
        contact_id: row.Contact_id,
        contact_name: row.Contact_name,
      });
    });

    results.forEach((row) => {
      invoicesMap.set(row.Invoice_id, {
        invoice_id: row.Invoice_id,
        invoice_ref: row.Invoice_ref,
        invoice_created: row.Invoice_created,
      });
    });

    company.contacts = Array.from(contactsMap.values());
    company.invoices = Array.from(invoicesMap.values());

    res.json(company);
  });
});

// Create a company
router.post("/", (req, res) => {
  const { name, type_id, country, tva } = req.body;

  //Verify required fields
  if (!name || !type_id || !country || !tva) {
    return res.status(400).json({
      error: "name, type, country and tva are required !",
    });
  }

  //verify if the company already exist
  const checkCompanyQuery = `
  SELECT tva 
  FROM companies 
  WHERE tva = ? `;
  connection.query(checkCompanyQuery, [tva], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error occurred while checking the company.",
      });
    }
    if (result.length > 0) {
      return res.status(409).json({
        error:
          "Conflict, the tva number has been already attribute to another company",
      });
    }

    //if the company doesn't exist insert the company
    const insertCompanyQuery =
      "INSERT INTO companies (name, type_id, country, tva) VALUES (?,?,?,?)";
    connection.query(
      insertCompanyQuery,
      [name, type_id, country, tva],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            error: "Error occurred while creating the company.",
          });
        }
        return res.status(200).json({
          message: "The company has been successfully created",
          CompanyId: result.insertId,
        });
      }
    );
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, type_id, country, tva } = req.body;

  //Verify required fields
  if (!name || !type_id || !country || !tva) {
    return res.status(400).json({
      error: "name, type, country and tva are required !",
    });
  }

  //Verify if the company exist
  const checkCompanyQuery = "SELECT id FROM companies WHERE id= ?";
  connection.query(checkCompanyQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error during searching the company in the database",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error: "Company not found",
      });
    }
  });

  //Verify if tva are not attribute to another company

  const checkTvaCompanyQuery = `
  SELECT tva 
  FROM companies 
  WHERE tva = ? AND id != ? `;
  connection.query(checkTvaCompanyQuery, [tva, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error occurred while checking TVA.",
      });
    }
    if (result.length > 0) {
      return res.status(409).json({
        error: "Conflict, Another company has already exist with the same TVA",
      });
    }

    // Update the company
    const updateCompanyQuery = `UPDATE 
      companies 
      SET name = ?, type_id = ?, country = ?, tva = ?, updated_at= ? 
      WHERE id = ?`;
    connection.query(
      updateCompanyQuery,
      [name, type_id, country, tva, convertToMySqlDate(), id],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: "Error occured during updating the company",
          });
        }

        return res.status(200).json({
          message: "The company has been successfully updated",
          updatedId: id,
        });
      }
    );
  });
});

//Delete a company
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  //Very if the id exists in the database
  const selectIdQuery = "SELECT id FROM companies WHERE id= ?";
  connection.query(selectIdQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error during searching the id in the database",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error: "Company not found",
      });
    }
  });

  const deleteContactQuery = "DELETE FROM companies WHERE id= ?";
  
  connection.query(deleteContactQuery, [id], (err) => {
    if (err) {
      return res.status(500).json({
        error: "Error occured while deleting the company",
      });
    } else {
      res.status(200).json({
        message: "The company has been delete successfully",
      });
    }
  });
});

export default router;
