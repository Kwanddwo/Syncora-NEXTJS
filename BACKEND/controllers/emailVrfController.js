import {generateVerificationCode,sendVerificationEmail} from "../services/emailService.js"

const users = {}; 

export const SendEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const code = generateVerificationCode();
        users[email] = code; 
        await sendVerificationEmail(email, code);
        res.status(200).json({ message: "Verification code sent!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const VerifCode = async(req, res) => {
    const { email, code } = req.body;
    if (users[email] && users[email] === code) {
        delete users[email]; 
        res.json({ message: "Email verified successfully!" });
    } else {
        res.status(400).json({ error: "Invalid or expired verification code." });
    }
};

