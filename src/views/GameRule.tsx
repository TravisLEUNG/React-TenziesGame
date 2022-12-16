import "../styles/views/GameRule.scss";
import { OptionalProps, defaultOptionalProps } from "../common/CommonProps";

// Required props
interface RequiredProps { }

function GameRule({ className }: RequiredProps & OptionalProps) {
    return (
        <div className={`${className} Game_Rule`}>
            <h1>Tenzies</h1>
            <p>
                Roll until all dice are the same. Click each die to freeze it at its
                current value between rolls.
            </p>
        </div>
    );
}

// Set default props
GameRule.defaultProps = defaultOptionalProps;
export default GameRule;
