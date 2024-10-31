const USER = require('../model/auth')
const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../keys')
const bcrypt = require('bcryptjs'); // To hash the password securely

exports.signin = async (req, res) => {
    if (req.method === "POST") {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: 'Please fill in all fields' });
        }
        try {

            const savedUser = await USER.findOne({ email: email });
            if (!savedUser) {
                return res.status(500).json({ err: "Incorrect email!" });
            }
            
            // Check if password matches
            const isMatch = await bcrypt.compare(password, savedUser.password);
            if (!isMatch) {
                return res.status(500).json({ err: "Incorrect password!" });
            }

            // Create token with Full_name included
            const token = jwt.sign({
                id: savedUser._id,
                Full_name: savedUser.Full_name,
                email: savedUser.email
            }, jwt_secret);

            res.status(200).json({
                msg: 'Sign in successful',
                token,
            });
            // console.log(savedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(404).json({ message: 'Method not allowed' });
    }
};