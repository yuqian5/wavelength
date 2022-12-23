import React, {useEffect} from "react";
import {useAppSelector} from "../../redux/hooks";
import {Button, Card} from "react-bootstrap";

function SpectrumPrompt() {
    const spectrumCards = useAppSelector(state => state.spectrumCards.value);
    const hard = useAppSelector(state => state.difficulty.value);

    const [card, setCard] = React.useState(["Word", "Word"]);

    function randomPick() {
        setCard(spectrumCards[hard ? "hard" : "easy"][Math.floor(Math.random() * spectrumCards[hard ? "hard" : "easy"].length)]);
    }

    useEffect(() => {
        randomPick();
    }, [hard]);

    useEffect(() => {
        randomPick();
    }, [spectrumCards]);

    return (
        <>
            <Card className={"mt-3"}>
                <Card.Body>
                    <div className="d-flex flex-row justify-content-center align-items-center"
                         style={{minWidth: "80%"}}>
                        <div className="p-2 text-center">
                            <h1 className="display-4 text-wrap">{card?.[0]}</h1>
                        </div>
                        <h1 className="h1">&gt;&gt;&gt;</h1>
                        <div className="p-2 text-center">
                            <h1 className="display-4 text-wrap">{card?.[1]}</h1>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" onClick={randomPick} style={{width: 350}}>New Card</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default SpectrumPrompt;