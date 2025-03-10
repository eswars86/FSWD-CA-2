const express = require('express');

const app = express();
const router = express.Router();

const Users = [
    { Username: "Alice", age: 25, email: "alice@gmail.com" },
    { Username: "Bob", age: 19, email: "bob@gmail.com" },
    
];

             
const PORT = 5000;

app.use(express.json());

router.get('/', (req, res) => {
    res.send("user found");
});

router.get('/find', (req, res) => {
    try {
        let { Username } = req.query;

        if (!Username || Username.trim() === '') {
            return res.status(400).json({ message: "Username cannot be empty!" });
        }

        const user = Users.find(user => user.Username === Username);

        if (!user) {
            return res.status(404).json({ message: "User Details Not Found" });
        }

        res.status(200).json({ message: "User Details found", data: user });
    } catch (error) {
        console.error("Error occurred in /find route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});