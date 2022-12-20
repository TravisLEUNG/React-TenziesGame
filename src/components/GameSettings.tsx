import "../styles/components/GameSettings.scss";
import Slider from "@mui/material/Slider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { OptionalProps, defaultOptionalProps } from "../common/CommonProps";

// Required props
interface RequiredProps {
    minmaxQuantity: number[];
    minmaxDigit: number[];
    quantity: number;
    digit: number;
    handleQuantityChange: (value: number) => void;
    handleDigitChange: (value: number) => void;
}

const GameSettings = ({
    className,
    minmaxQuantity,
    minmaxDigit,
    quantity,
    digit,
    handleQuantityChange,
    handleDigitChange,
}: RequiredProps & OptionalProps) => {
    const onQuantityChange = (_: any, value: number | number[]) => {
        handleQuantityChange(value as number);
    };
    const onDigitChange = (event: SelectChangeEvent) => {
        handleDigitChange(Number.parseInt(event.target.value));
    };

    return (
        <div className={`${className} Game_Setting`}>
            <div>
                <div>Number of Dices</div>
                <Slider
                    aria-label="Small steps"
                    valueLabelDisplay="auto"
                    marks
                    value={quantity}
                    min={minmaxQuantity[0]}
                    max={minmaxQuantity[1]}
                    onChange={onQuantityChange}
                />
            </div>
            <div>
                <div>Number on Dice</div>
                <Select value={digit.toString()} onChange={onDigitChange} size="small">
                    {Array.from(
                        { length: minmaxDigit[1] - minmaxDigit[0] + 1 },
                        (_, i) => (
                            <MenuItem key={minmaxDigit[0] + i} value={minmaxDigit[0] + i}>
                                {minmaxDigit[0] + i}
                            </MenuItem>
                        )
                    )}
                </Select>
            </div>
        </div>
    );
};

// Set default props
GameSettings.defaultProps = defaultOptionalProps;
export default GameSettings;
