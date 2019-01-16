import apiRequest from '../utils/apiRequest';

const getGraphData = (url, auth, params = {}) => apiRequest('get', url, auth, params);

export default getGraphData;
