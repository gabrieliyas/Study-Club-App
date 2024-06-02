const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const {email, password:Npassword} = req.body

    if (!email || !Npassword) return res.json({status:"error", error: "Tolong masukkan pos-el dan kata sandi Anda"});
    else {
        console.log(email);
        db.query('SELECT email FROM users WHERE email = ?', [email], async(err, result) => {
            if (err) throw err;
            if (result[0]) return res.json({status: "error", error: "Pos-el sudah terdaftar"});
            else {
                const password = bcrypt.hash(Npassword, 8);
                console.log(password);
                db.query('INSERT INTO users SET ?', {email:email, password:password}, (error, results) => {
                    if (error) throw error;
                    return res.json({status: "success", success: "Anda telah terdaftar"});
                })
            }
        })
    }
}
module.exports = register;