const getProfile = (req,res)=>{

    const email =
    req.user.email;

    const role =
    email ===
    "bhawnanotiyal25@gmail.com"
    ?
    "admin"
    :
    "user";

    res.json({
        email,
        role
    });

};

module.exports = {
    getProfile
};