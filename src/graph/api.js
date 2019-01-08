import apiRequest from '../utils/apiRequest';

const getGraphData = (url, params = {}) => apiRequest('get', url, params);

export default getGraphData;
