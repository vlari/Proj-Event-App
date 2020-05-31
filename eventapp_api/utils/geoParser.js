import nodeGeocoder from 'node-geocoder'; 

import env from '../src/config/env';

const options = {
    provider: env.GEOCODE_PROVIDER,
    httpAdapter: 'https',
    apiKey: env.GEOCODE_API_KEY,
    formatter: null
};

export default nodeGeocoder(options);
