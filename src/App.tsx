import React, {useEffect} from "react";

import "./App.css";

import {useAppDispatch} from "./redux/hooks";
import {set as setSpectrumCard} from "./redux/slices/spectrumCards";

import Slider from "./components/Slider/Slider";

import spectrum from "./res/spectrum";

import {Container} from "react-bootstrap";

import TopNavbar from "./components/TopNavbar/TopNavbar";
import SpectrumPrompt from "./components/SpectrumPrompt/SpectrumPrompt";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";

function App() {
    // region redux
    const dispatch = useAppDispatch();
    // endregion redux

    // region init
    useEffect(() => {
        dispatch(setSpectrumCard(spectrum));
    }, []);
    // endregion init

    return (
        <>
            <Container style={{maxWidth: 1000}}>
                <TopNavbar/>
                <div className={"d-flex flex-column"}>
                    <SpectrumPrompt/>
                    <Slider/>
                    <ScoreBoard/>
                </div>
            </Container>
        </>

    );
}

export default App;
