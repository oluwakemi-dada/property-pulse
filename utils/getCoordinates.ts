import axios from 'axios';

const getCoordinatesFromAddress = async (address: string) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  const res = await axios.get(url);

  if (res.data.status === 'OK') {
    return res.data.results[0].geometry.location;
  } else {
    throw new Error(res.data.status);
  }
};

export default getCoordinatesFromAddress;
