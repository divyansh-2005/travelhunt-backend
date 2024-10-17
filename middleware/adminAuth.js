//middleware/adminAuth.js

require('dotenv').config();

const adminAuth = (req, res, next) => {
    const adminPassword = req.headers['admin-password']; // The password should be sent in the request headers
    const validAdminPassword = process.env.ADMIN_PASSWORD; // The valid password is stored in the environment variables

    if (!validAdminPassword) {
        return res.status(500).json({ message: 'Server error: Admin password not set' });
    }

    if (adminPassword === validAdminPassword) {
        next(); // Password matches, proceed to the next middleware/route handler
    } else {
        return res.status(403).json({ message: 'Forbidden: Invalid admin password' });
    }
}

module.exports = adminAuth;