import React, {useEffect} from "react";

import RadialSlider from "./RadialSlider";

function Slider() {
    useEffect(() => {
        const canvasDimension = document.getElementById("canvas")?.getBoundingClientRect();
        new RadialSlider(canvasDimension?.width, canvasDimension?.height, 5);
    }, []);

    return (
        <div className="card mt-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <canvas id="canvas" style={{width: "100%", height: "100%"}}></canvas>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="mb-1">
                            <label className="form-label d-block" htmlFor="dial">Guess: </label>
                            <input className="form-range"
                                   id="dial" max="720"
                                   min="0" type="range"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 d-grid gap-2">
                        <button className="btn btn-primary" id="mode-toggle">Hide wheel</button>
                    </div>
                    <div className="col-6 d-grid gap-2">
                        <button className="btn btn-primary" id="spin-wheel">Spin Wheel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;
