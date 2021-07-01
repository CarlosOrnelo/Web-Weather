import { useRef, useState } from "react";
import { Search } from '../styles/search-style';


const SearchBar = ({ showLocation }) => {

    // States
    const [location, setLocation] = useState();

    // Refs
    const searchRef = useRef();
    const timerRef = useRef();

    // Functions
    const handleSearch = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => triggerChange(), 2000);
    };

    const triggerChange = async () => {
        if(!searchRef.current.value) return;
        showLocation(searchRef.current.value);
    };

    return (
        <div className='search-container'>
            <div className='search-bar'>
                <Search 
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search..."
                    ref={searchRef}
                />
            </div>
        </div>
    )
};

export default SearchBar;