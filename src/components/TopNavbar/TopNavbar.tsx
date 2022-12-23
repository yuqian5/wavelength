import React, {useEffect, useState} from "react";
import {Container, Form, Navbar, Offcanvas} from "react-bootstrap";

import "./TopNavBar.css";

import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {DifficultyMode, set as setDifficulty} from "../../redux/slices/difficultyMode";
import {set as setSpinSpeed, SpinSpeed} from "../../redux/slices/spinSpeed";

function TopNavbar() {
    const difficulty = useAppSelector(state => state.difficulty.value);
    const spinSpeed = useAppSelector(state => state.spinSpeed.value);
    const dispatch = useAppDispatch();

    const [showSetting, setShowSetting] = useState(false);
    const [hard, setHard] = useState(false);
    const [fast, setFast] = useState(false);

    useEffect(() => {
        dispatch(setDifficulty(hard ? DifficultyMode.HARD : DifficultyMode.EASY));
    }, [hard]);

    useEffect(() => {
        dispatch(setSpinSpeed(fast ? SpinSpeed.FAST : SpinSpeed.SLOW));
    }, [fast]);

    useEffect(() => {
        setHard(difficulty === DifficultyMode.HARD);
        setFast(spinSpeed === SpinSpeed.FAST);
    }, []);

    return (
        <>
            <Navbar bg="light" className={"mt-3"}>
                <Container>
                    <Navbar.Brand>Wavelength :)</Navbar.Brand>
                    <div className="navbar-icon me-2">
                        <i className="d-inline-block bi bi-gear-fill h4 navbar-icon align-bottom rotate-on-hover-90 hover-pointer"
                           onClick={() => setShowSetting(true)}/>
                    </div>
                </Container>
            </Navbar>
            <Offcanvas show={showSetting} onHide={() => {
                setShowSetting(false);
            }}>
                <Offcanvas.Header closeButton>
                    <h1 className="display-1">Settings</h1>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="row pe-3 text-end">
                        <a href="https://cdn.kerrycao.com/misc/WavelengthRules.pdf" target="_blank"
                           className="float-end display-2" rel="noreferrer">Rules</a><br/><br/>
                        <a href="https://kerrycao.com" target="_blank" className="float-end display-2"
                           rel="noreferrer">Creator</a>
                    </div>
                    <div className="pe-3 float-end d-block">
                        <Form>
                            <Form.Switch
                                label="Make it harder"
                                onChange={(e) => setHard(e.target.checked)}
                                checked={hard}
                                className={"mt-3"}
                            />
                            <Form.Switch
                                label="Fast Animation"
                                onChange={(e) => setFast(e.target.checked)}
                                checked={fast}
                                className={"mt-3"}
                                disabled
                            />
                        </Form>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default TopNavbar;
