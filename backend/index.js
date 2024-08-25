const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS for all origins
app.use(cors());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    console.log("request received");
    // Placeholder user details
    const userId = "aditya_pandey_12122002";
    const email = "adityakumar.pandey2021@vitstudent.ac.in";
    const rollNumber = "21BCI0280";

    let numbers = [];
    let alphabets = [];
    let highestLowercase = '';

    for (let item of data) {
        if (!isNaN(item)) {
            // Check if item is a number
            numbers.push(item);
        } else if (typeof item === 'string') {
            // If the item is a string, check if it's alphabetic
            alphabets.push(item);
            if (item >= 'a' && item <= 'z' && item > highestLowercase) {
                highestLowercase = item;
            }
        }
    }

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
});

app.get('/bfhl', (req, res) => {
    console.log("request received");
    res.status(200).json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
