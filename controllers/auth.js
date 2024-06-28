import User from "../models/usermodel.js";
import argon2 from "argon2";

export const login = async(req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({msg: "Pengguna tidak ditemukan."});
    const match = await argon2.verify(user.password, req.body.password);

    if (!match) return res.status(400).json({msg: "Kata Sandi salah."});
    req.session.userid = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}

export const me = async(req, res) => {
    if (!req.session.userid) {
        return res.status(401).json({msg: "Mohon masuk ke akun Anda."});
    }
    const user = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userid
        }
    });
    if (!user) return res.status(404).json({msg: "Pengguna tidak ditemukan."});
    res.status(200).json(user);
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({msg: "Tidak dapat keluar."});
        res.status(200).json({msg: "Anda telah keluar."});
    });
}

// const express = require("express");
// const register = require("./register");
// const login = require("./login");
// const logout = require("./logout");

// const router = express.Router();

// router.post("/register", register)
// router.post("/login", login)
// // router.get("/logout", logout)

// module.exports = router;