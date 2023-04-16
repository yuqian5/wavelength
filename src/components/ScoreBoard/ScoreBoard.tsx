import React, {useEffect, useState} from "react";
import {Button, Card, FloatingLabel, Modal, Form, Toast, ToastContainer} from "react-bootstrap";

class Team {
    team: string;
    score: number;

    constructor(team: string, score: number) {
        this.team = team;
        this.score = score;
    }
}

function ScoreBoard() {
    const [teams, setTeams] = useState<Team[]>(getSavedTeams());

    const [teamName, setTeamName] = useState("");

    const [showToast, setShowToast] = useState(false);

    function getSavedTeams() {
        const teams = localStorage.getItem("teams");
        if (teams) {
            return JSON.parse(teams);
        }
        return [new Team("Team 1", 0), new Team("Team 2", 0)];
    }

    // on teams change, save to local storage
    useEffect(() => {
        localStorage.setItem("teams", JSON.stringify(teams));
    }, [teams]);

    // region team creation modal
    const [showModal, setShowModal] = useState(false);

    function handleModalClose() {
        setShowModal(false);
    }

    function handleCreateNewTeam() {
        if (teamName === "") {
            return;
        }

        addTeam(teamName);
        setTeamName("");
        setShowModal(false);
    }

    function handleModalShow() {
        setShowModal(true);
    }
    // endregion

    // region increment/decrement score
    function incrementScore(index: number) {
        const newScores = [...teams];
        newScores[index].score += 1;
        setTeams(newScores);
    }

    function decrementScore(index: number) {
        const newScores = [...teams];
        newScores[index].score = Math.max(newScores[index].score - 1, 0);
        setTeams(newScores);
    }
    // endregion

    // region add/remove team
    function addTeam(name: string) {
        if (!checkUniqueName(name)) {
            setShowToast(true);
            return;
        }

        const newScores = [...teams];
        newScores.push(new Team(name, 0));
        setTeams(newScores);
    }

    function removeTeam(index: number) {
        const newScores = [...teams];
        newScores.splice(index, 1);
        setTeams(newScores);
    }

    function checkUniqueName(name: string) {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].team === name) {
                return false;
            }
        }
        return true;
    }
    // endregion

    return (
        <>
            <Card className={"mt-3"}>
                <Card.Body className="d-flex justify-content-around flex-md-row flex-wrap">
                    {
                        teams.map((score, index) => {
                            return (
                                <Card key={index} style={{width: 200, height: 140}} className="m-2">
                                    <Card.Body>
                                        <Card.Title className="text-center">{score.team}</Card.Title>
                                        <div className="d-flex flex-row justify-content-center">
                                            <div>
                                                <Button variant="primary" onClick={() => decrementScore(index)}>-</Button>
                                            </div>
                                            <div className="display-5 ps-2 pe-2">
                                                {score.score}
                                            </div>
                                            <div>
                                                <Button variant="primary" onClick={() => incrementScore(index)}>+</Button>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <i className="bi bi-trash-fill hover-pointer"
                                               style={{fontSize: 20}}
                                               onClick={() => removeTeam(index)}
                                            >
                                            </i>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                    <Card style={{width: 200, height: 140}} className="m-2" onClick={handleModalShow}>
                        <div className="m-auto" style={{fontSize: 50}}>+</div>
                    </Card>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel label="Team Name">
                        <Form.Control type="text"
                                      placeholder="Team Name"
                                      value={teamName} onChange={e => setTeamName(e.target.value)}
                                      autoFocus/>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreateNewTeam}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer className="bottom-0 start-50 translate-middle-x position-fixed mb-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} autohide={true} delay={2000}>
                    <Toast.Header closeButton={false}>
                        <strong className="me-auto">Error Creating New Team</strong>
                        <small>Just Now</small>
                    </Toast.Header>
                    <Toast.Body>Team Name Not Unique</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default ScoreBoard;
