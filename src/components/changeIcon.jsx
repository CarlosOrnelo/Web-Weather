import { useTheme } from "styled-components";
import { ReactComponent as NextIcon } from "../styles/icons/next-icon.svg";

export const ChangeIcon = ({ orientation, changeElements }) => {

    const theme = useTheme();

    return (

        <NextIcon className={orientation ? "change-cards-reverse" : "change-cards"}
            width='5%'
            fill={theme.text}
            onClick={() => changeElements(orientation)}
        />

    )
};