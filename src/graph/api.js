
import axios from 'axios';

export default async function getGraphData(param) {
  return axios.get(param.ApiURL);
}
