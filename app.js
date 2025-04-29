import express from 'express';
import path from 'path';
import fs from 'fs'; // For file existence checking

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');
// Serve static files from the public directory
app.use(express.static(path.join(process.cwd(), 'public')));

app.use("*",(req,res,next)=>{
    console.log("req.url",req.originalUrl)
    next()
})

// Define a route for the home page
app.get('/', (req, res) => {
    res.render('index'); // Ensure you have an index.ejs file in the views directory
});

// AtoB Routes (seo)
import atobRouter from './routes/atob.routes.js'; // Ensure to include the .js extension
app.use("/one-way-taxi", atobRouter);

import estimateRouter from './routes/estimates.routes.js'; // Ensure to include the .js extension
app.use("/estimation", estimateRouter);

import otpRouter from './routes/otp.route.js';
app.use('/otp', otpRouter);

import sendMail from './service/enquiry.service.js';
app.use('/send',sendMail);

// app.get("/success"(req,res) => {
//     res.render("success");
// })

// Define the pages
const pages = [
    "about",
    "Booking", // Changed from "Booking" to "booking"
    "service",
    "cities",
    "contact",
    "tariff",
    "cars",
    "seo",
    "success",
    "verification",
    "estimation",
    "pricing",
    "privacy",
    "vehicle",
];

// Dynamic route for each page
pages.forEach((page) => {
    app.get(`/${page}`, async (req, res) => {
        try {
            const pagePath = path.join('views', `${page}.ejs`);
            // Check if the file exists before rendering
            fs.access(pagePath, fs.constants.F_OK, (err) => {
                if (err) {
                    res.status(404).send(`Page ${page} not found.`);
                } else {
                    const { origin, destination } = req.query; // Extract origin and destination from query parameters
                    res.render(page, { origin, destination }); // Pass origin and destination to the EJS page
                }
            });
        } catch (error) {
            res.status(500).send(`Error rendering ${page}: ${error.message}`);
        }
    });
});

// Catch-all error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
