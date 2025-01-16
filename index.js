// Import necessary dependencies
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

// Create a MySQL connection
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Initialize Express app
const app = express();
const port = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints

// Get all users
app.get("/users", async (req, res) => {
    const [result] = await connection.query("SELECT * FROM user");
    res.json(result);
});

// Get a single user by ID
app.get("/user/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!isNaN(id)) {
        try {
            const [result] = await connection.query("SELECT * FROM user WHERE id=?", [id]);
            if (result.length) {
                res.json(result);
            } else {
                res.send("no user found");
            }
        } catch (e) {
            res.status(500).send("Something went wrong");
        }
    } else {
        res.status(400).send("ID is not a valid number");
    }
});

// Create a new post
app.post("/post", async (req, res) => {
    const { id, title, content } = req.body;
    const [result] = await connection.query(`
        INSERT INTO post(title, content, user_id)
        VALUES('${title}', '${content}', ${id});
    `);
    res.json(result);
});

// Query params example
app.get("/query", (req, res) => {
    res.send(req.query);
});

// Get all posts
app.get("/post", async (req, res) => {
    const [result] = await connection.query("SELECT * FROM post");
    res.json(result);
});

// Get comments
app.get('/post/:id', async (req, res) => {

    const id = Number (req.params.id);
    const [post] = await connection.query(`
    SELECT * FROM post
    WHERE id = ${id};
    `);

    const [comments] = await connection.query(`
    SELECT comment.content, user.name 
    FROM comment
    JOIN user on comment.user_id = user.id
    WHERE comment.post_id=${id}
    `)

    res.json({post, comments});
});

// Sort posts
app.get("/test", async (req, res) => {
    const sort = req.query.sort || "id";
    const sortOrder = req.query.sortOrder || "ASC";
    const [result] = await connection.query(
        `SELECT * FROM test ORDER BY ${sort} ${sortOrder}`
    );
    res.json(result);
});

// Get a test post by ID
app.get("/test/:id", async (req, res) => {
    const { id } = req.params;
    const [result] = await connection.query("SELECT * FROM test WHERE id=?", [id]);
    res.json(result);
});

// Create a new test post
app.post("/test", async (req, res) => {
    const { content } = req.body;
    const [result] = await connection.query(
        `INSERT INTO test(content) VALUES (?);`, [content]
    );
    res.json({ status: "success" });
});

// Start the server
app.listen(port, () => {
    console.log("Server started on port: ", port);
});
