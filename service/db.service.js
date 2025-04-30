import admin from "../config/firebase.config.js";

const db = admin.firestore();
export async function getPriceByService(service) {
    console.log("DB-->Data")
    try {
        const snapshot = await db.collection('trip').doc('cars').get();
        let carsInfo = snapshot.data();
        carsInfo = Array.from(carsInfo.price).filter(item => item.trip == service);
        return carsInfo; // Directly returning data
        
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function getPriceForTariff() {
    try {
        const snapshot = await db.collection('trip').doc('cars').get();
        let carsInfo = snapshot.data();
        carsInfo = Array.from(carsInfo.price);
        return carsInfo; // Directly returning data
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function saveEquiry(data) {
    try {
        await db.collection('enquiry').doc().set({
            id: data?.bookID,
            type: data?.service,
            pick: data?.pick,
            name: data?.name,
            mobile: data?.mobile,
            drop: data?.drop,
            createdAt: admin.firestore.Timestamp.now()
        });
    } catch (e) {
        console.log(e);
    }
}

export async function saveBooking(data) {
    try {
        console.log(data);
        console.log(data?.pickupDateTime);
        await db.collection('booking').doc().set({
            bill: "0",
            name: data?.name,
            id: data?.bookID,
            phone: data?.mobile,
            pick: data?.pick,
            email: data?.email,
            drop: data?.drop,
            pDate: new Date(data?.pickupDateTime).toISOString().slice(0, 10),
            pTime: new Date(data?.pickupDateTime).toTimeString().slice(0, 5),
            service: data?.estimatedData?.trip == "0" ? "one way" : "round trip",
            carType: data?.estimatedData?.cName,
            price: data?.estimatedData?.price,
            km: data?.distance,
            createdAt: admin.firestore.Timestamp.now()
        });
    } catch (e) {
        console.log(e);
    }
}