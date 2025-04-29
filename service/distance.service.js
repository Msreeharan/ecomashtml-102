import axios from "axios";

async function findDistanceAndTime(origin, destination) {
  try {
    console.log("form to ",origin, destination)
    const response = await axios.get(`https://maps.thereciprocalsolutions.com/distance-matrix?origin=${origin}&destination=${destination}`);
    const data = { 
        ...response?.data?.trip,
        origin,
        destination
    };
    return data;
  } catch (err) {
    return err.message;
  }
}

export default findDistanceAndTime;