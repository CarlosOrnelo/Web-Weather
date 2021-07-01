import SlideShow from "./slideShow";

const Cards = ({ intervals, location }) => {

    const items = intervals ? intervals.length : 0;

    return (
        <div className='weather-container'>
            <div className='location-container'>
                {location ? <h2>{location.label}</h2> : <h2>Please, insert a valid location!</h2>}
            </div>
            <SlideShow
                intervals={intervals}
                items={items}
            />
        </div>
    )
};

export default Cards;