import "../styles/components/Dice.scss";
import { OptionalProps, defaultOptionalProps } from "../common/CommonProps";

// Required props
interface RequiredProps {
    value: number;
    locked: boolean;
    onClick: () => void;
}

const Dice = ({
    className,
    value,
    locked,
    onClick,
}: RequiredProps & OptionalProps) => {
    return (
        <div
            className={`${className} Dice ${locked ? "locked" : ""}`}
            onClick={onClick}
        >
            {value}
        </div>
    );
};

// Set default props
Dice.defaultProps = defaultOptionalProps;
export default Dice;
