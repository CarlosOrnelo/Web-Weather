import { func } from 'prop-types';
import { ToggleContainer, ToggleInput } from '../styles/toggle';

const Toggle = ({handleColorTheme}) => {

    return (
        <div className='theme-button'>
            <ToggleInput id="ToggleInput" type="checkbox" />
            <ToggleContainer onClick={handleColorTheme} htmlFor="ToggleInput" />
        </div>
    )
};

Toggle.propTypes = {
    handleColorTheme: func.isRequired,
};

export default Toggle;