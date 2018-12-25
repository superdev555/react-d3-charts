
import axios from 'axios';

export default async function getGraphData(param) {
  return axios.get(param.ApiURL)
    .then(response => ({ type: 'FETCH_GRAPHDATA_SUCCESSED', payload: response.data }))
    .catch(err => ({ type: 'FETCH_GRAPHDATA_REJECTED', payload: err }));
}
