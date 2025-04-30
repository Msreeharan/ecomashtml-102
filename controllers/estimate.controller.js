import { getPriceByService, saveEquiry } from "../service/db.service.js"; 
import findDistanceAndTime from "../service/distance.service.js"; 
import TelegramService from "../service/telegram.service.js"; 
import { sendEnquiryInvoice } from "../service/enquiry.service.js"; 

const telegramService = TelegramService();
const sendEnquiry = sendEnquiryInvoice();

const estimateHandler = async (req, res) => {
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // const ipCountry = geoip.lookup(ip);

    // if (!ipCountry || ipCountry.country !== 'IN') {
    //     return res.status(403).send("Access Denied: This service is only available in India.");
    // }
   
    console.log("[ESTIMATE POST]", req.body);
    const {
        from,
        to,
        service,
        pickupDateTime,
        dropDate
    } = req.body;
   
    const bookID = Math.floor((Math.random() * 1000000) + 1);

    // Telegram
    // await Promise.all([
    //     telegramService.sendEnquiry({ ...req.body, bookID }),
    //     sendEnquiry.sendEnquiry({ ...req.body, bookID })// Use mailService.sendEnquiry
    // ]);

    let origins = [`${from}`];
    let destinations = [`${to}`];
    //console.log("d --b ")
    let fetchLocationData = await findDistanceAndTime(origins, destinations)
    let { distance , duration} = fetchLocationData

    //console.log("d --f ")
    //console.log("f-data",fetchLocationData)
    const priceDetails = await getPriceByService(service);

    if (!priceDetails) {
        return res.status(500).send("Error: Unable to retrieve price details.");
    }

    let days = (new Date(dropDate).getTime() - new Date(pickupDateTime.split('T')[0]).getTime()) / (1000 * 3600 * 24) + 1 || 1;
    //console.log("No. of Days: " + days);
    //console.log("Distance: " + distance);
    const estimatedData = priceDetails.map(info => {
        let km = parseInt(distance);
        let rate = parseInt(info.rate);
        console.log("rate ----- ",rate)
        let batta = parseInt(info.batta);
        let result = 0;
         console.log("Batta",batta);
        // Calculation
        if (service == "0" || service == 0) {
            // Oneway Trip
            km = km < 130 ? 130 : km;
            result += km;
            result *= rate;
            result += batta * days;
        } else if (service == "1" || service == 1) {
            // Round Trip  
            km = km * 2;
            km = km <= 300 * days ? 300 * days : km;
            result += km;
            result *= rate;
            result += batta * days;
        }
        return {
            price: result,
            ...info
        };
    });

    if (service == "1" || service == 1) {
        distance = distance * 2;
        distance = distance <= 300 * days ? 300 * days : distance;
    }

    const pick = from.split(',')[0];
    const drop = to.split(',')[0];
    const data = {
        ...req.body,
        distance,
        days,
        duration,
        estimatedData,
        bookID,
        pick,
        drop
    };
    console.log("[ESTIMATED DATA]", data);

    // Firebase
    await saveEquiry(data);

    // Mail
    await sendEnquiryInvoice(data);

    res.render('estimation', { data: data });
};

export default estimateHandler;