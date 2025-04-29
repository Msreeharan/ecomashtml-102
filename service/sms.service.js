import axios from 'axios';
import CryptoJS from 'crypto-js';

const SMS_TOKEN = "tXGFnAr4LNYZM8Q9jwPVHxWdvs6eahl2qk5of7SzpRbOUEumITTnoiOFHqdCLhzJPgaxer2mpZ8UNEyf";
const OTP_SECERT = "mailtrscbe@gmail.com";
const WEBSITE_NAME = "jkdkseaqrzsgduao";

export default function SMSService() {
    return { 
        sendOtp: async (mobile) => {
            const otp = Math.floor(Math.random() * 1000000 + 1);
            console.log("OTP To Check");
            console.log(otp);
            const token = CryptoJS.AES.encrypt(otp.toString(), OTP_SECERT).toString();
            const otpData = await axios.get(
                `https://www.fast2sms.com/dev/bulkV2?authorization=${SMS_TOKEN}&route=dlt&sender_id=SMSTRS&message=154911&variables_values=${otp}%7CFor%20${WEBSITE_NAME}%7C&flash=0&numbers=${mobile}`
            )
            .catch((err) => {                                                       
                console.log(err);
            });
            console.log("OTP DATA", otpData.data);
            // console.log("{OTP RESPONSE}", otpData);
            return token;
        },
        sendSucess: () => {
            // Implement success logic if needed
        },
        verifyOTP: ({ otp, token }) => {
            const bytes = CryptoJS.AES.decrypt(token, OTP_SECERT);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            return originalText == otp;
        }
    }
}

// export default SMSService