import express from "express";
import cors from "cors";
import { initDatabase } from "./initDatabase.js";
import typesRoutes from "./routes/types.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let db;

const startServer = async () => {
    db = await initDatabase();

    // inject DB into routes
    app.use("/api/types", typesRoutes(db));

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer();