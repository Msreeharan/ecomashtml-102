import express from 'express';
const route = express.Router();

import getSMSServices from './../service/sms.service.js';
import getTelegramSerives from './../service/telegram.service.js';
import axios from 'axios';
import { saveBooking } from './../service/db.service.js'; // Assuming it's an ES module

// using fast2api sms services
const SMSService = getSMSServices();
const TelegramService = getTelegramSerives();

// get for otp verification
route.post('/verify', (req, res) => {
    const token = decodeURIComponent(req.body.token);
    const otp = req.body.otp;
    const isValid = SMSService.verifyOTP({ token, otp });
    if (!isValid) {
        res.status(401).json({ msg: "Otp failed", status: 401 });
        return;
    }
    res.status(200).json({ status: "Verified", status: 200 });
});

// POST
route.post('/send', async (req, res) => {
    console.log("[Req BODY]", req.body.mobile);
    const token = await SMSService.sendOtp(req.body.mobile);
    console.log("{TOKEN}", token);
    res.json({ token: token });
});

export default route; 