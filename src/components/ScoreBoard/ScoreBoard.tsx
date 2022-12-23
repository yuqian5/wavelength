import React, {useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";

function ScoreBoard() {
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);

    return (
        <>
            <Card className={"mt-3"}>
                <Card.Body>
                    <Row className="text-center">
                        <Col md={6} className="mb-1">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Team 1 Score</Card.Title>
                                    <div className="d-flex flex-row justify-content-center">
                                        <div>
                                            <Button variant="primary"
                                                    onClick={() => setScore1(Math.max(score1 - 1, 0))}>-</Button>
                                        </div>
                                        <div className="display-5 ps-2 pe-2">
                                            {score1}
                                        </div>
                                        <div>
                                            <Button variant="primary" onClick={() => setScore1(score1 + 1)}>+</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="mt-1">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Team 2 Score</Card.Title>
                                    <div className="d-flex flex-row justify-content-center">
                                        <div>
                                            <Button variant="primary"
                                                    onClick={() => setScore2(Math.max(score2 - 1, 0))}>-</Button>
                                        </div>
                                        <div className="display-5 ps-2 pe-2">
                                            {score2}
                                        </div>
                                        <div>
                                            <Button variant="primary" onClick={() => setScore2(score2 + 1)}>+</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}

export default ScoreBoard;
