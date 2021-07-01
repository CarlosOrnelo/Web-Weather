import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { ChangeIcon } from './changeIcon';
import { ReactComponent as SunIcon } from "../styles/icons/sun.svg";
import { ReactComponent as MoonIcon } from '../styles/icons/moon.svg';
import { ReactComponent as WindIcon } from "../styles/icons/windIcon.svg";
import { ReactComponent as RainIcon } from '../styles/icons/rain.svg';
import { ReactComponent as CloudMoonIcon } from '../styles/icons/cloudMoon.svg';
import { ReactComponent as CloudSunIcon } from '../styles/icons/cloudSun.svg';
import { useTheme } from 'styled-components';


const SlideShow = ({ intervals }) => {

    // States
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, SetPageSize] = useState(6);
    
    // Refs
    const cardsRef = useRef();
    const cardsInfo = useRef();
    const touchStart = useRef();
    const touchEnd = useRef();

    // Theme
    const theme = useTheme();

    useEffect(() => {
        let timeout = null;

        const handlePageSize = () => {
            const windowSize = window.innerWidth;

            if(windowSize <= 425) {
                SetPageSize(1);
            }
            else if(windowSize <= 768) {
                SetPageSize(2);
            }
            else if(windowSize <= 1024) {
                SetPageSize(4);
            }
            else if(windowSize <= 1440) {
                SetPageSize(5);
            } else {
                SetPageSize(6);
            };

            setPageNumber(1);
        };

        const resizeListener = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => handlePageSize(), 150)
        };
        window.addEventListener('resize', resizeListener);
        return() => window.removeEventListener('resize', resizeListener);
    }, []);

    const changeElements = (orientation) => {
        orientation ? handlePage(pageNumber-1) : handlePage(pageNumber+1)
    };

    const convertDate = (date) => {

        let newDate = new Date(date);
        let year = newDate.getFullYear();
        let month = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
        let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
        let hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
        let minutes = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();

        newDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes
        return newDate
    };

    const checkIcons = (cloudCover, startTime) => {
        let period = null;
        let icon = null;
        const cloudy = cloudCover > 50 ? true : false;

        const date = new Date(startTime);
        const hour = date.getHours();
        period = hour >= 6 && hour <= 17 ? 'day' : 'night'

        if(period === 'day') {
            icon = cloudy ? CloudSunIcon : SunIcon
        } else {
            icon = cloudy ? CloudMoonIcon : MoonIcon
        }

        return icon

    };

    const paginate = (elements) => {
        const startIndex = (pageNumber - 1) * pageSize;
        return(_(elements).slice(startIndex).take(pageSize).value());
    };

    const handlePage = (page) => {
        const pageLimit = Math.ceil(intervals.length / pageSize)
        if(page < 1 || page > pageLimit) return;
        
        setPageNumber(page);
    };

    const handleTouchStart = (event) => {
        touchStart.current = event.touches[0].screenX;
    };

    const handleTouchEnd = (event) => {
        touchEnd.current = event.changedTouches[0].screenX
        const halfCardWidth = cardsInfo.current.scrollWidth / 2;
        const offset = touchEnd.current - touchStart.current;
        if(offset < 0 && Math.abs(offset) > halfCardWidth) {
            handlePage(pageNumber+1);
        } else if(offset > 0 && offset > halfCardWidth) {
            handlePage(pageNumber-1)
        }
    };

    const handleScroll = (event) => {

        if(event.deltaY > 0) {
            handlePage(pageNumber+1);
        } else {
            handlePage(pageNumber-1);
        }
    };

    const elements = intervals ? paginate(intervals) : null;

    return (

        <div className='cards-wrapper'>
            
            {!elements ? null : (
                <ChangeIcon 
                    orientation={'180deg'}
                    changeElements={changeElements}
                />
            )}

            <ul className='cards-container' ref={cardsRef} onWheel={(e) => handleScroll(e)} onTouchStart={(e) => handleTouchStart(e)} onTouchEnd={(e) => handleTouchEnd(e)}>
                {!elements ? null : (
                    elements.map((element, range) => {
                        
                        const Icon = checkIcons(element.values.cloudCover, element.startTime, element.values.precipitationIntensity);
                        
                        return (
                            <li key={range} className='card-informations' ref={cardsInfo}>
                                <Icon className="weather-icon"
                                    width={"75px"}
                                    height={"75px"}
                                    fill={theme.text}
                                />
                                <p>{convertDate(element.startTime)}</p>
                                <p>{Math.round(element.values.temperature)}ºC</p>
                                <RainIcon 
                                    width={"10px"}
                                    height={"10px"}
                                    fill={theme.text}
                                />
                                {' ' + element.values.precipitationIntensity}%
                                <p></p>
                                <WindIcon 
                                    width={"10px"}
                                    height={"10px"}
                                    fill={theme.text}
                                    style={{"transform": `rotate(${element.values.windDirection}deg)`}}
                                />
                                {' ' + element.values.windSpeed} km/h
                            </li>
                        )
                    })
                    )}

            </ul>

            {!elements ? null : (
                <ChangeIcon
                    changeElements={changeElements}
                />  
            )}

        </div>
    );
};

export default SlideShow