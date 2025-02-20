import express from "express";
import {connection} from "../connectionDB.mjs";
import {convertToMySqlDate} from "../utils/convertDateToMySQLDate.mjs";

connection.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données");
        return;
    }
    console.log("Connecté à la base de données");
});

const router = express.Router();

//get all contacts
router.get("/", (req, res) => {
    const selectAllContactsQuery = `
        SELECT contacts.id,
               contacts.name  AS contact_name, -- Alias the contact name
               companies.name AS company_name, -- Alias the company name
               contacts.email,
               contacts.phone,
               contacts.created_at
        FROM contacts
                 JOIN companies ON contacts.company_id = companies.id
        ORDER BY contacts.id DESC
    `;
    connection.query(selectAllContactsQuery, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Error occurred while retrieving contacts.",
            });
        }
        res.status(200).json(results);
    });
});

//get a contact by Id

router.get("/:id", (req, res) => {
    const {id} = req.params;
    const selectContactByIdQuery = "SELECT * FROM contacts WHERE id = ?";
    connection.query(selectContactByIdQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Error occurred while retrieving the contact.",
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                error: "Contact not found.",
            });
        }
        return res.status(200).json(results[0]);
    });
});

// Create a contact
router.post("/", (req, res) => {
    const {name, company_id, email, phone} = req.body;

    //Verify required fields
    if (!name || !company_id || !email || !phone) {
        return res.status(400).json({
            error: "name, company, email and phone are required !",
        });
    }

    //verify if the email already exist
    const checkEmailQuery = "SELECT email FROM contacts WHERE email = ?";
    connection.query(checkEmailQuery, [email], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Error occurred while select the email.",
            });
        }
        if (result.length > 0) {
            return res.status(409).json({
                error: "Conflict, the email already exist in the database",
            });
        }

        //if the email doesn't exist insert the contact
        const insertContactQuery =
            "INSERT INTO contacts (name, company_id, email, phone) VALUES (?,?,?,?)";
        connection.query(
            insertContactQuery,
            [name, company_id, email, phone],
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: "Error occurred while creating the contact.",
                    });
                }
                res.status(200).json({
                    message: "The contact has been successfully created",
                    contactId: result.insertId,
                });
            }
        );
    });
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {name, email, company_id, phone} = req.body;

    //Verify required fields
    if (!name || !email || !company_id || !phone) {
        return res.status(400).json({
            error: "name, email, company_id, phone are required!",
        });
    }

    //Very if the id exists in the database
    const selectIdQuery = "SELECT id FROM contacts WHERE id= ?";
    connection.query(selectIdQuery, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Error during searching the id in the database",
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                error: "Contact not found",
            });
        }
    });

    //Very if the email  already attribute to another contact
    const selectEmailQuery =
        "SELECT email FROM contacts WHERE email = ? and id != ?";
    connection.query(selectEmailQuery, [email, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Error occured while selecting the email",
            });
        }
        if (result.length > 0) {
            return res.status(409).json({
                error: "The email is already exist",
            });
        }
        //if the email doesn't attribute to another contact, the contact can be updated
        const updateContactQuery = `UPDATE
                                        contacts
                                    SET name       = ?,
                                        company_id = ?,
                                        email      = ?,
                                        phone      = ?,
                                        updated_at= ?
                                    WHERE id = ?`;
        connection.query(
            updateContactQuery,
            [name, company_id, email, phone, convertToMySqlDate(), id],
            (err) => {
                if (err) {
                    return res.status(500).json({
                        error: "Error occured during updating the contact",
                    });
                }

                res.status(200).json({
                    message: "The contact has been successfully updated",
                    updatedId: id,
                });
            }
        );
    });
});

//Delete a contact
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    //Very if the id exists in the database
    const selectIdQuery = "SELECT id FROM contacts WHERE id= ?";
    connection.query(selectIdQuery, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Error during searching the id in the database",
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                error: "Contact not found",
            });
        }
    });

    const deleteContactQuery = "DELETE FROM contacts WHERE id= ?";

    connection.query(deleteContactQuery, [id], (err) => {
        if (err) {
            return res.status(500).json({
                error: "Error occured while deleting the contact",
            });
        } else {
            res.status(200).json({
                message: "The contact has been delete successfully",
            });
        }
    });
});

export default router;
