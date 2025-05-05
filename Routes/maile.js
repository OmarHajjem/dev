const express = require("express");
const router = express.Router({ mergeParams: true });
const MaileService = require("../Services/maile");


router.get("/sendemail",MaileService.sendMail);


module.exports = router;