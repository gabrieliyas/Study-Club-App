import User from "../models/usermodel.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userid) {
        return res.status(401).json({msg: "Mohon masuk ke akun Anda."});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userid
        }
    });

    if (!user) return res.status(404).json({msg: "Pengguna tidak ditemukan."});
    req.userid = user.id;
    req.role = user.role;
    next();
}

export const adminOnly = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            uuid: req.session.userid
        }
    });

    if (!user) return res.status(404).json({msg: "Pengguna tidak ditemukan."});
    if (user.role !== "admin") return res.status(403).json({msg: "Akses dilarang."});
    next();
}