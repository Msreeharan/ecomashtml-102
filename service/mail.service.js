
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mailtrscbe@gmail.com",
    pass: "jkdkseaqrzsgduao",
  },
});

const mailOptions = (data) => ({
  from: "mailtrscbe@gmail.com",
  to: "msreeharan084@gmail.com",
  subject: "Metro cab Enquiry",
  html: `
        <h1>Metro cab</h1>   
        Name: ${data?.name}<br>
        Email: ${data?.email}<br>
        Mobile: ${data?.mobile}<br>
        Message: ${data?.message}`,
});

// Package enquiry
const packageMailOptions = (data) => ({
  from: "mailtrscbe@gmail.com",
  to: "msreeharan084@gmail.com",
  subject: "Package Enquiry - Metro cab",
  html: `
   <div style="max-width: 600px; margin: 20px auto; padding: 20px; font-family: Arial, poppins; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
  <h1 style="color: #2b2b2b; text-align: center;">Package Enquiry</h1>
  <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
  
  <p style="font-size: 16px; margin: 10px 0;"><strong>From:</strong> <span style="color: #333;">${data?.pickUpLocation}</span></p>
  <p style="font-size: 16px; margin: 10px 0;"><strong>To:</strong> <span style="color: #333;">${data?.dropLocation}</span></p>
  ${data?.stops > 0 && `<p style="font-size: 16px; margin: 10px 0;"><strong>Stops:</strong> <span style="color: #333;">${data?.pickupLocation && data?.dropLocation ? `${data?.pickUpLocation} ➔ ${Array.isArray(data?.stops) ? data.stops.join(" ➔ ") : "None"} ➔ ${data?.dropLocation}` : "None"}</span></p>`}
  <p style="font-size: 16px; margin: 10px 0;"><strong>Pickup Date:</strong> <span style="color: #333;">${data?.pickupDate}</span></p>
  <p style="font-size: 16px; margin: 10px 0;"><strong>Pickup Time:</strong> <span style="color: #333;">${data?.pickupTime}</span></p>
  <p style="font-size: 16px; margin: 10px 0;"><strong>Mobile:</strong> <span style="color: #333;">+91${data?.mobile}</span></p>
  <p style="font-size: 16px; margin: 10px 0;"><strong>Estimated Distance:</strong> <span style="color: #333;">+91${data?.distance}</span></p>
</div>

  `,
});

const sendMail = (data) => {
  const options = mailOptions(data);
  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
 const sendPackageEnquiryMail = (data) => {
  const options = packageMailOptions(data);
  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.error("Error sending package enquiry:", error);
    } else {
      console.log("Package enquiry email sent:", info.response);
    }
  });
};

export { sendMail, sendPackageEnquiryMail };  
