import http from './httpService';


const convertDate = (date) => {
    let newDate = date.toISOString();
    return newDate
}

export const getWeather = async (location) => {

    const timezone = "Brazil/East";
    const timeSteps = "1h";

    let timestamp = Date.now();
    let startTime = new Date(timestamp);

    startTime = convertDate(startTime);
    
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature,temperatureApparent,cloudCover,precipitationType,precipitationIntensity,windSpeed,windDirection&timesteps=${timeSteps}&startTime=${startTime}&timezone=${timezone}&units=metric&apikey=${apiKey}`
    
    try {
        const { data } = await http.get(url);
        return data;
    } catch(err) {
        return err
    }

};

