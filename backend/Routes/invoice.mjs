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

//get all invoices
router.get("/", (req, res) => {
    const selectAllInvoicesQuery = `
        SELECT invoices.id,
               invoices.ref,
               invoices.price,
               companies.name,
               invoices.created_at
        FROM invoices
                 JOIN companies ON invoices.company_id = companies.id
        ORDER BY invoices.id DESC
    `;
    connection.query(selectAllInvoicesQuery, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: "Error occurred while retrieving invoices.",
            });
        }
        res.status(200).json(results);
    });
});

//get a invoice by Id

router.get("/:id", (req, res) => {
    const {id} = req.params;
    const selectInvoiceByIdQuery = "SELECT * FROM invoices WHERE id = ?";
    connection.query(selectInvoiceByIdQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Error occurred while retrieving the invoice.",
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                error: "Invoice not found.",
            });
        }
        return res.status(200).json(results[0]);
    });
});

// Create a contact
router.post("/", (req, res) => {
    const {ref, price, company_id} = req.body;

    //Verify required fields
    if (!ref || !price || !company_id) {
        return res.status(400).json({
            error: "reference, price and company are required !",
        });
    }

    //verify if the invoice already exist
    const checkReferenceQuery = "SELECT ref FROM invoices WHERE ref = ?";
    connection.query(checkReferenceQuery, [ref], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: "Error occurred while verifying the reference.",
            });
        }
        if (result.length > 0) {
            return res.status(409).json({
                error: "Conflict, the reference already exist in the database",
            });
        }

        //if the reference doesn't exist insert the invoice
        const insertInvoiceQuery =
            "INSERT INTO invoices (ref, price, company_id) VALUES (?,?,?)";
        connection.query(
            insertInvoiceQuery,
            [ref, price, company_id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: "Error occurred while creating the invoice.",
                    });
                }
                res.status(200).json({
                    message: "The invoice has been successfully created",
                    contactId: result.insertId,
                });
            }
        );
    });
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {ref, price, company_id} = req.body;

    //Verify required fields
    if (!ref || !price || !company_id) {
        return res.status(400).json({
            error: "reference, price and company are required !",
        });
    }

    //Very if the id exists in the database
    const selectIdQuery = "SELECT id FROM invoices WHERE id= ?";
    connection.query(selectIdQuery, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Error during searching the id in the database",
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                error: "Invoice not found",
            });
        }
    });

    //Very if the reference already attribute to another contact
    const selectReferenceQuery =
        "SELECT ref FROM invoices WHERE ref=? AND id != ?";
    connection.query(selectReferenceQuery, [ref, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Error occured while verifying reference",
            });
        }
        if (result.length > 0) {
            return res.status(409).json({
                error: "The reference is already exist",
            });
        }
        //if the reference doesn't attribute to another invoice, the invoice can be updated
        const updateInvoiceQuery = `UPDATE
                                        invoices
                                    SET ref        = ?,
                                        price      = ?,
                                        company_id = ?,
                                        updated_at= ?
                                    WHERE id = ?`;
        connection.query(
            updateInvoiceQuery,
            [ref, price, company_id, convertToMySqlDate(), id],
            (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: "Error occured during updating the invoice",
                    });
                }

                res.status(200).json({
                    message: "The invoice has been successfully updated",
                    updatedId: id,
                });
            }
        );
    });
});

//Delete a invoice
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    //Very if the id exists in the database
    const selectIdQuery = "SELECT id FROM invoices WHERE id= ?";
    connection.query(selectIdQuery, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Error during searching the id in the database",
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                error: "invoice not found",
            });
        }
    });

    const deleteInvoiceQuery = "DELETE FROM invoices WHERE id= ?";

    connection.query(deleteInvoiceQuery, [id], (err) => {
        if (err) {
            return res.status(500).json({
                error: "Error occured while deleting the invoice",
            });
        } else {
            res.status(200).json({
                message: "The invoice has been delete successfully",
            });
        }
    });
});

export default router;
