import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/themes';
import { GlobalStyles } from '../styles/global';
import SearchBar from '../components/searchBar';
import Toggle from '../components/toggle';
import Cards from '../components/cards';
import { getGeo } from '../services/getLocation';
import { getWeather } from '../services/getWeather';

const Home = () => {

    // States
    const [colorTheme, setColorTheme] = useState(true);
    const [timeIntervals, setTimeIntervals] = useState();
    const [location, setLocation] = useState();

    // Functions
    const handleColorTheme = () => {
        setColorTheme(!colorTheme);
    }

    const showLocation = async (locationQuery) => {
        
        const { data, response } = await getGeo(locationQuery);

        if(response) {
            toast.error(response.data.error.message);
            return
        }

        if(!data[0]) {
            setLocation('');
            setTimeIntervals('');
            return;
        };


        setLocation(data[0]);
        await showWeather(data[0]);
    }

    const showWeather = async ({ latitude, longitude }) => {

        const location = [latitude, longitude];

        const { data, response } = await getWeather(location);

        if(response) {
            toast.error(response.data.message);
            setLocation('');
            setTimeIntervals('');
            return
        };

        const { timelines } = data;
        const { intervals } = timelines[0];

        setTimeIntervals(intervals);
    };
        
    return (
        <React.Fragment>
            <ThemeProvider theme={colorTheme ? lightTheme : darkTheme}>
                <GlobalStyles />
                <div className='l-header__home'>
                    <div className='l-header__home__left'>
                        <img src="icons/logo.svg" alt="" />
                        <SearchBar
                            showLocation={showLocation}
                        />
                    </div>
                    <div className='l-header__home__right'>
                        <div className='toggle-wrapper'>
                            <Toggle 
                                theme={colorTheme}
                                handleColorTheme={handleColorTheme}
                            />
                        </div>
                    </div>
                </div>
                <div className='l-main__home'>
                    <Cards 
                        intervals={timeIntervals}
                        location={location}
                    />
                </div>
                <div className='l-footer__home'>
                </div>
            </ThemeProvider>
        </React.Fragment>
    )
};

export default Home;