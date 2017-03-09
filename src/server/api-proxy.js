import axios from 'axios';
import { API_KEY } from '../constants/apiKey';
import { apiHost } from '../config';

export default function apiproxy(req, res) {
  axios({
    url: `${apiHost}/api/v2${req.path}`,
    method: req.method.toLowerCase(),
    data: req.body,
  }).then((response) => {
    res.status(200).json(response.data.data);
  }).catch((error) => {
    res.status(500).json(error.response.data);
  });

  res.status(200);
}
