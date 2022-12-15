import "../styles/components/Dice.scss";
import { OptionalProps, defaultOptionalProps } from '../common/CommonProps';

// Required props
interface RequiredProps {
    value: number;
    locked: boolean;
}

const Dice = ({ className, value, locked }: RequiredProps & OptionalProps) => {
    return (<div className={`${className} Dice ${locked ? 'locked' : ''}`}>
        {value}
    </div>)
};

// Set default props
Dice.defaultProps = defaultOptionalProps;
export default Dice;