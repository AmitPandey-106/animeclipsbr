const bcrypt = require('bcryptjs'); // Import bcrypt
const USER = require('../model/auth');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../keys');

exports.signup = async (req, res) => {
    if (req.method === 'POST') {
        const { Full_name, email, password } = req.body;
        if (!Full_name || !email || !password) {
            return res.status(422).json({ error: 'Please fill in all fields' });
        }
        try {
            const exitUser = await USER.findOne({ email });
            if (exitUser) {
                return res.status(422).json({ error: "Email already exists" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt

            const newUser = new USER({
                Full_name,
                email,
                password: hashedPassword, // Save the hashed password
            });
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
