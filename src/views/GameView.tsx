import "../styles/views/GameView.scss";
import { useEffect, useState } from "react";
import { OptionalProps, defaultOptionalProps } from "../common/CommonProps";
import { randomValueFromZero } from "../common/CommonFunctions";
import Dice from "../components/Dice";
import Confetti from "react-confetti";

// Required props
interface RequiredProps { }

// Dice
type DiceObject = {
    id: number;
    isLocked: boolean;
    value: number;
};

function GameView({ className }: RequiredProps & OptionalProps) {
    const totalNumOfDice = 10;
    const maxDigitOfDice = 6;
    const [diceList, setDiceList] = useState<DiceObject[]>([]);
    const [tenzies, setTenzies] = useState<Boolean>(false);

    // Init the game
    useEffect(() => {
        handleInit();
    }, []);

    // Check tenzies state
    useEffect(() => {
        const firstDice = diceList[0];
        setTenzies(!diceList.find((dice) => dice.value !== firstDice.value));
    }, [diceList]);

    const handleInit = () => {
        // Init the dice and the tenzies state
        const newDiceList = [];
        for (let i = 0; i < totalNumOfDice; i++) {
            newDiceList.push({
                id: i,
                isLocked: false,
                value: randomValueFromZero(maxDigitOfDice),
            });
        }
        setDiceList(newDiceList);
        setTenzies(false);
    };

    const handleDiceLock = (index: number) => {
        // Update the dice locked status
        if (!!diceList[index]) {
            setDiceList((prevList) => {
                const newList = [...prevList];
                newList[index] = {
                    ...newList[index],
                    isLocked: !newList[index].isLocked,
                };
                return newList;
            });
        }
    };

    const handleDiceRoll = () => {
        // Update the number of all unlocked dices
        if (!!diceList.find((dice) => !dice.isLocked)) {
            setDiceList((prevList) => {
                const newDiceList = prevList.map((dice) => {
                    if (dice.isLocked) {
                        return dice;
                    } else {
                        return {
                            ...dice,
                            value: randomValueFromZero(maxDigitOfDice),
                        };
                    }
                });
                return newDiceList;
            });
        }
    };

    const displayDiceList = diceList.map((dice) => (
        <Dice
            key={dice.id}
            value={dice.value}
            locked={dice.isLocked}
            onClick={() => handleDiceLock(dice.id)}
        />
    ));
    return (
        <div className={`${className} Game_View`}>
            {tenzies && <Confetti />}
            <div>
                <div className="Dice_List">{displayDiceList}</div>
                <div>
                    <button
                        className="Button"
                        onClick={tenzies ? handleInit : handleDiceRoll}
                    >
                        {tenzies ? "Reset Game" : "Roll"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Set default props
GameView.defaultProps = defaultOptionalProps;
export default GameView;
