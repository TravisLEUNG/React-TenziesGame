import "../styles/views/GameView.scss";
import { useEffect, useState } from "react";
import { OptionalProps, defaultOptionalProps } from "../common/CommonProps";
import { randomValueFromZero } from "../common/CommonFunctions";
import Dice from "../components/Dice";

// Required props
interface RequiredProps { }

function GameView({ className }: RequiredProps & OptionalProps) {
    const [diceList, setDiceList] = useState<number[]>([]);
    const [diceLockedList, setDiceLockedList] = useState<boolean[]>([]);

    useEffect(() => {
        const newDiceList = [];
        for (let i = 0; i < 10; i++) {
            newDiceList.push(randomValueFromZero(6));
        }
        setDiceList(newDiceList)
        setDiceLockedList(newDiceList.map(dice => false));
    }, [])

    const displayDiceList = diceList.map((dice, index) => (<Dice key={index} value={dice} locked={diceLockedList[index]} />))
    return (
        <div className={`${className} Game_View`}>
            {displayDiceList}
        </div>
    );
}

// Set default props
GameView.defaultProps = defaultOptionalProps;
export default GameView;
