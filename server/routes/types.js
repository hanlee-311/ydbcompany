import { Router } from "express";

export default function typesRoutes(db) {
    const router = Router();

    // GET all types
    router.get("/", async (req, res) => {
        try {
            const types = await db.all("SELECT * FROM types");
            res.json(types);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch types" });
        }
    });

    // CREATE type
    router.post("/", async (req, res) => {
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ error: "Type is required" });
        }

        try {
            const result = await db.run(
                "INSERT INTO types (type) VALUES (?)",
                [type]
            );

            res.status(201).json({
                id: result.lastID,
                type
            });
        } catch (err) {
            res.status(500).json({ error: "Failed to create type" });
        }
    });

    // UPDATE type
    router.put("/:id", async (req, res) => {
        const { id } = req.params;
        const { type } = req.body;

        try {
            const result = await db.run(
                "UPDATE types SET type = ? WHERE id = ?",
                [type, id]
            );

            if (result.changes === 0) {
                return res.status(404).json({ error: "Type not found" });
            }

            res.json({ message: "Updated successfully" });
        } catch (err) {
            res.status(500).json({ error: "Failed to update type" });
        }
    });

    // DELETE type
    router.delete("/:id", async (req, res) => {
        const { id } = req.params;

        try {
            const result = await db.run(
                "DELETE FROM types WHERE id = ?",
                [id]
            );

            if (result.changes === 0) {
                return res.status(404).json({ error: "Type not found" });
            }

            res.json({ message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: "Failed to delete type" });
        }
    });

    return router;
};