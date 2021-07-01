import http from './httpService';

export const getGeo = async (query) => {

    const geoApiKey = process.env.REACT_APP_GEO_API_KEY;
    const geoUrl = `http://api.positionstack.com/v1/forward?access_key=${geoApiKey}&query=${query}&limit=1`;

    try {
        const { data } = await http.get(geoUrl);
        return data
    } catch(err) {
        return err
    };
};