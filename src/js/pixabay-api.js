import axios from 'axios';

const API_KEY = '46773750-2567d69edc75d4703fc28c418';
const BASE_URL = 'https://pixabay.com/api/';

export default async function fetchData(param, page =1, per_page = 15) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: param,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: per_page,
  });
  
  return axios
    .get(`${BASE_URL}?${params}`)
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log(e.message);
    });
}
