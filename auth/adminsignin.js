const ADMIN = require('../model/admin');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../keys');

exports.adminsignin = async (req, res) => {
    if (req.method === "POST") { 
        const { email, password } = req.body; 
        if (!email || !password) { 
            return res.status(422).json({ error: 'Please fill in all fields' });
        }

        try {
            // Check if the admin user exists
            const adminUser = await ADMIN.findOne({ email: email });
            if (!adminUser) {
                return res.status(500).json({ err: "Admin not found!" });
            }

            // Directly compare plain text password
            if (adminUser.password !== password) {
                return res.status(500).json({ err: "Incorrect admin password!" });
            }

            // Generate JWT token
            const token = jwt.sign({
                id: adminUser._id,
                email: adminUser.email,
                Full_name: "Elite",
                role: 'admin',
            }, jwt_secret);

            // console.log(adminUser._id)

            return res.status(200).json({
                msg: 'Admin login successful',
                role: 'admin',
                token, // Return token to authenticate further requests
            });
        } catch (error) {
            console.error("Error in admin signin:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(404).json({ message: 'Method not allowed' });
    }
};
