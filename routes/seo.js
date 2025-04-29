import express from 'express';
import axios from 'axios';
import fb from '../config/firebase.config'; // Ensure the path is correct and the file is an ES module
import { Firestore } from '@google-cloud/firestore'; // If you're using Firestore
import distance from 'google-distance-matrix';

const router = express.Router();
const db = new Firestore(); // Initialize Firestore
distance.key('AIzaSyBzKJ9azZXIY6omjVVxoxwwwiO_qKbwawc');
distance.units('metric');

router.get('/', (req, res) => res.render('404'));

router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    return res.render('404', { route: "" });
  }

  console.log(req.params.id);
  const cities = req.params.id.split('-');
  const p = cities[0].charAt(0).toUpperCase() + cities[0].substring(1);
  const dr = cities[2].charAt(0).toUpperCase() + cities[2].substring(1);

  const pick = p;
  const drop = dr;

  let origins = [`${p}`];
  let destinations = [`${dr}`];
  console.log(origins);
  console.log(destinations);

  if (p === "Salem") {
    origins = ["Salem, Tamil Nadu, India"];
  }
  if (dr === "Salem") {
    destinations = ["Salem, Tamil Nadu, India"];
  }

  distance.matrix(origins, destinations, (err, distances) => {
    if (err) {
      return console.log(err);
    }
    if (!distances) {
      return console.log('no distances');
    }
    if (distances.status === 'OK') {
      for (let i = 0; i < origins.length; i++) {
        for (let j = 0; j < destinations.length; j++) {
          const origin = distances.origin_addresses[i];
          const destination = distances.destination_addresses[j];
          if (distances.rows[0].elements[j].status === 'OK') {
            const distanceText = distances.rows[i].elements[j].distance.text;
            const duration = distances.rows[i].elements[j].duration.text;

            console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distanceText);
            const km = parseFloat((distanceText.split(' ')[0]).replace(/,/g, ''));

            const cars = {
              from: p,
              to: dr,
              pick: pick,
              drop: drop,
              km: km,
              dur: duration,
            };

            console.log("[BOOKJS GET]", cars);
            return res.render('seo', { data: cars, route: "" });
          } else {
            console.log(destination + ' is not reachable by land from ' + origin);
          }
        }
      }
    } else {
      console.log("Hey");
    }
  });
});

export default router;