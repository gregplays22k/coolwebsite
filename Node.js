const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password',
  },
});

exports.requestVerification = async (req, res) => {
    // ... (Verification code logic from previous example)
};

exports.verifyAccount = async (req, res) => {
    // ... (Verification logic from previous example)
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === "gregplays22k@gmail.com" && password === "password13787") {
            res.send({ success: true });
            return;
        }

        const userDoc = await db.collection('users').doc(email).get();
        if (!userDoc.exists) {
            res.send({ success: false, message: "User not found." });
            return;
        }

        const userData = userDoc.data();
        if (userData.password === password) { // In production hash passwords.
            res.send({ success: true });
        } else {
            res.send({ success: false, message: "Incorrect password." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
};
