import "../styles/views/GameView.scss";
import { useEffect, useState } from "react";
import { OptionalProps, defaultOptionalProps } from "../common/CommonProps";
import { randomValueFromZero } from "../common/CommonFunctions";
import Dice from "../components/Dice";
import Confetti from "react-confetti";
import Slider from "@mui/material/Slider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import GameSettings from "../components/GameSettings";

// Required props
interface RequiredProps { }

// Dice
type DiceObject = {
    id: number;
    isLocked: boolean;
    value: number;
};

// Game Index
const settings = {
    quantity: {
        min: 2,
        max: 10,
        default: 10,
    },
    digit: {
        min: 2,
        max: 99,
        default: 6
    },
};

function GameView({ className }: RequiredProps & OptionalProps) {
    const [numOfDice, setNumOfDice] = useState(settings.quantity.default);
    const [numOnDice, setNumOnDice] = useState(settings.digit.default);
    const [bestScore, setBestScore] = useState(() => JSON.parse(
        localStorage.getItem("bestScore") || "-1")
    );
    const [rollCount, setRollCount] = useState<number>(0);
    const [diceList, setDiceList] = useState<DiceObject[]>([]);
    const [tenzies, setTenzies] = useState<Boolean>(false);

    // Init the game
    useEffect(() => {
        handleInit();
    }, [numOfDice, numOnDice]);

    // Check tenzies state
    useEffect(() => {
        if (diceList.length === numOfDice) {
            const firstDice = diceList[0];
            setTenzies(!diceList.find((dice) => dice.value !== firstDice.value));
        }
    }, [diceList]);

    // Update the score
    useEffect(() => {
        if (tenzies) {
            resetLocalStorage(
                Math.min(bestScore > -1 ? bestScore : rollCount, rollCount)
            );
        }
    }, [tenzies]);

    const resetLocalStorage = (score: number = -1) => {
        // Update the localStorage
        localStorage.setItem("bestScore", JSON.stringify(score));
        setBestScore(score);
    };

    const handleInit = () => {
        // Init the dice and the tenzies state
        const newDiceList = [];
        for (let i = 0; i < numOfDice; i++) {
            newDiceList.push({
                id: i,
                isLocked: false,
                value: randomValueFromZero(numOnDice),
            });
        }
        setDiceList(newDiceList);
        setRollCount(0);
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
                            value: randomValueFromZero(numOnDice),
                        };
                    }
                });
                return newDiceList;
            });
        }
        setRollCount((prevCount) => prevCount + 1);
    };

    const bestScoreText = bestScore > -1
        ? `Best Score: only ${bestScore} time${bestScore > 1 ? "s" : ""},`
        : "";
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
                <GameSettings
                    minmaxQuantity={Object.values(settings.quantity)}
                    minmaxDigit={Object.values(settings.digit)}
                    quantity={numOfDice}
                    digit={numOnDice}
                    handleQuantityChange={setNumOfDice}
                    handleDigitChange={setNumOnDice}
                />
                <div className="Dice_List">{displayDiceList}</div>
                <div className="Roll_Count">
                    <span>
                        {bestScoreText && <button
                            className="Clear_Record"
                            onClick={() => resetLocalStorage()}
                        >
                            clear
                        </button>}
                        {bestScoreText}
                    </span>
                    Roll {rollCount} time{rollCount > 1 ? "s" : ""}
                </div>
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
