import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mailtrscbe@gmail.com",
        pass: "jkdkseaqrzsgduao",
    },
});

export function sendEnquiryInvoice() {
    return {
        // Send enquiry mail to admin
        sendEnquiry: async (data) => {
            try {
                const enquiryData = {
                    name: data?.name,
                    email: data?.email,
                    phone: data?.mobile,
                    from: data?.from,
                    to: data?.to,
                    trip: parseInt(data?.service),
                    pDate: data?.pickupDateTime,
                    createdAt: {
                        date: new Date().toLocaleDateString("en-GB", { timeZone: "IST" }),
                        time: new Date().toLocaleTimeString("en-GB", { timeZone: "IST" }),
                    },
                };

                ejs.renderFile(
                    path.join(__dirname, "mail/enquiry.mail.ejs"),
                    { data: enquiryData },
                    (err, htmlFile) => {
                        if (err) {
                            console.error("Mail Render Error:", err.message);
                            return;
                        }

                        const mailOptions = {
                            from: "mailtrscbe@gmail.com",
                            to: "msreeharan084@gmail.com", // Admin
                            subject: `Metro Cabs Enquiry : ${enquiryData.createdAt.date} ${enquiryData.createdAt.time}`,
                            html: htmlFile,
                        };

                        transporter.sendMail(mailOptions, (err, info) => {
                            if (err) {
                                console.error("Enquiry Mail Error:", err.message);
                            } else {
                                console.log("Enquiry Mail Sent:", info.response);
                            }
                        });
                    }
                );
            } catch (err) {
                console.error("SendEnquiry Error:", err.message);
            }
        },

        // Send booking confirmation to customer
        sendSuccess: async (data) => {
            try {
                const bookingData = {
                    name: data?.name,
                    email: data?.email,
                    phone: data?.mobile,
                    from: data?.from,
                    to: data?.to,
                    trip: parseInt(data?.service),
                    pDate: data?.pickupDateTime,
                    createdAt: {
                        date: new Date().toLocaleDateString("en-GB", { timeZone: "IST" }),
                        time: new Date().toLocaleTimeString("en-GB", { timeZone: "IST" }),
                    },
                };

                ejs.renderFile(
                    path.join(__dirname, "mail/booking.mail.ejs"),
                    { data: bookingData },
                    (err, htmlFile) => {
                        if (err) {
                            console.error("Booking Mail Render Error:", err.message);
                            return;
                        }

                        const mailOptions = {
                            from: "msreeharan084@gmail.com",
                            to: bookingData.email, // Customer
                            subject: "Booking Confirmation - Metro Cabs",
                            html: htmlFile,
                        };

                        transporter.sendMail(mailOptions, (err, info) => {
                            if (err) {
                                console.error("Booking Mail Send Error:", err.message);
                            } else {
                                console.log("Booking Confirmation Sent:", info.response);
                            }
                        });
                    }
                );
            } catch (err) {
                console.error("SendSuccess Error:", err.message);
            }
        }
    };
}

export default sendEnquiryInvoice;
