let spectrum = null;
let hard = false;

// fetch the spectrum data
fetch("./spectrum.json")
    .then(response => {
        spectrum = response.json();
    });

function init() {
    // register controls
    registerScoreButtons();
    registerSpectrumDisplayControl();

    // start the game
    let canvasDimension = document.getElementById("canvas").getBoundingClientRect();
    new CenterRadialSlider(canvasDimension.width, canvasDimension.height, 12);
}

function registerScoreButtons() {
    let score1 = document.getElementById("score1");
    let scoreButton = document.getElementById("add-score1");
    scoreButton.addEventListener("click", function () {
        score1.innerText = (parseInt(score1.innerText) + 1).toString();
    });
    scoreButton = document.getElementById("subtract-score1");
    scoreButton.addEventListener("click", function () {
        score1.innerText = Math.max(parseInt(score1.innerText) - 1, 0).toString();
    });

    let score2 = document.getElementById("score2");
    scoreButton = document.getElementById("add-score2");
    scoreButton.addEventListener("click", function () {
        score2.innerText = (parseInt(score2.innerText) + 1).toString();
    });
    scoreButton = document.getElementById("subtract-score2");
    scoreButton.addEventListener("click", function () {
        score2.innerText = Math.max(parseInt(score2.innerText) - 1, 0).toString();
    });
}

function registerSpectrumDisplayControl() {
    let spectrumLeft = document.getElementById("spectrum-left");
    let spectrumRight = document.getElementById("spectrum-right");
    let newCards = document.getElementById("new-cards");
    let hardModeSelect = document.getElementById("hard-mode-select");

    newCards.addEventListener("click", function () {
        // randomly select a card from the spectrum
        if (hard) {
            let card = spectrum["hard"][Math.floor(Math.random() * spectrum["hard"].length)];
            spectrumLeft.innerText = card[0];
            spectrumRight.innerText = card[1];
        } else {
            let card = spectrum["hard"][Math.floor(Math.random() * spectrum["hard"].length)];
            spectrumLeft.innerText = card[0];
            spectrumRight.innerText = card[1];
        }
    });

    hardModeSelect.addEventListener("change", function () {
        hard = hardModeSelect.checked;
        newCards.click();
    });

    newCards.click();
}

const GameDisplayMode = {
    Prompt: 0,
    Guess: 1
};

class CenterRadialSlider {
    constructor(width, height, scale = 10) {
        this.scale = scale;
        this.trueWidth = width;
        this.trueHeight = height;

        this.canvas = document.getElementById("canvas");
        this.canvas.width = this.trueWidth * this.scale;
        this.canvas.height = this.trueHeight * this.scale;

        this.centerX = 0;
        this.centerY = 0;
        this.radius = 0;

        this.calculateGameConstants()

        this.centerRedArmWidth = this.radius / 35;

        // range for the random spin dial
        this.rangeMax = 155;
        this.rangeMin = 25;

        // game values
        this.trueValue = 90;
        this.guessValue = 90;

        this.mode = GameDisplayMode.Prompt;

        this.registerControls();
        this.draw();

        window.onresize = () => {
            this.calculateGameConstants();
            this.draw();
        }
    }

    calculateGameConstants() {
        let r = (Math.min(this.trueWidth, this.trueHeight) / 1.64)
        this.centerX = (this.trueWidth / 2) * this.scale;
        this.centerY = (r + 30) * this.scale;
        this.radius = r * this.scale;
    }

    // region draw methods
    draw() {
        if (this.mode === GameDisplayMode.Prompt) {
            this.clearDrawings();
            this.drawMainDial();
            this.drawDialSections(this.trueValue);
            this.drawBottomWhiteOut();
            this.drawCurrentSliderThumbPosition(this.guessValue);
        } else if (this.mode === GameDisplayMode.Guess) {
            this.clearDrawings();
            this.drawMainDial();
            this.drawBottomWhiteOut();
            this.drawCurrentSliderThumbPosition(this.guessValue);
        }

    }

    clearDrawings() {
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMainDial() {
        let ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI, true);
        ctx.lineWidth = 10;
        if (this.mode === GameDisplayMode.Prompt) {
            ctx.fillStyle = "rgb(237, 233, 222)";
        } else if (this.mode === GameDisplayMode.Guess) {
            ctx.fillStyle = "rgb(138, 192, 204)";
        }

        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0)";
        ctx.stroke();
    }

    drawCurrentSliderThumbPosition(value) {
        this.drawCenterRedCircle();
        this.drawCenterRedArm(value);
    }

    drawCenterRedArm(value) {
        let ctx = this.canvas.getContext("2d");

        // calculate position vector for arm end point
        let {offset_x, offset_y} = this.calculateSliderThumbPosition(value);
        let norm = Math.sqrt(offset_x * offset_x + offset_y * offset_y);
        let unit_x = offset_x / norm;
        let unit_y = offset_y / norm;
        let positionX = this.centerX + (unit_x * this.radius) / 1.3;
        let positionY = this.centerY - (unit_y * this.radius) / 1.3;

        // draw arm
        ctx.beginPath();
        ctx.moveTo(this.centerX, this.centerY);
        ctx.lineTo(positionX, positionY);
        ctx.lineWidth = this.centerRedArmWidth;
        ctx.strokeStyle = "rgba(188, 67, 71, 1)";
        ctx.stroke();

        // draw arm end circle
        ctx.beginPath();
        ctx.arc(positionX, positionY, this.centerRedArmWidth / 2, 0, 2 * Math.PI, true);
        ctx.lineWidth = 0;
        ctx.strokeStyle = "rgba(188, 67, 71, 0)";
        ctx.fillStyle = "rgb(188, 67, 71)";
        ctx.fill();
        ctx.stroke();
    }

    drawCenterRedCircle() {
        let ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius / 3, 0, 2 * Math.PI, true);
        ctx.fillStyle = "rgb(188, 67, 71)";
        ctx.fill();
        ctx.lineWidth = 10;
        ctx.strokeStyle = "rgba(0, 0, 0, 0)";
        ctx.stroke();
    }

    drawDialSections(value) {
        let centerAngle = -Math.PI * 2 * value / 360;

        let angels = [
            centerAngle - Math.PI * 2 * 12.5 / 360,
            centerAngle - Math.PI * 2 * 7.5 / 360,
            centerAngle - Math.PI * 2 * 2.5 / 360,
            centerAngle + Math.PI * 2 * 2.5 / 360,
            centerAngle + Math.PI * 2 * 7.5 / 360,
            centerAngle + Math.PI * 2 * 12.5 / 360
        ];

        let colors = ["rgb(234, 187, 110)", "rgb(220, 116, 71)", "rgb(109, 162, 196)", "rgb(220, 116, 71)", "rgb(234, 187, 110)"];
        for (let i = 0; i < angels.length - 1; i++) {
            this.drawDialSection(angels[i], angels[i + 1], colors[i]);
        }
    }

    drawDialSection(startAngel, endAngel, color) {
        let ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius, startAngel, endAngel, false);
        ctx.lineTo(this.centerX, this.centerY);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 10;
        ctx.strokeStyle = "rgba(1, 1, 1, 0)";
        ctx.stroke();
    }

    drawBottomWhiteOut() {
        let ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(0, this.centerY, this.trueWidth * this.scale, this.trueHeight * this.scale);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.lineWidth = 0;
        ctx.strokeStyle = "rgba(1, 1, 1, 0)";
        ctx.stroke();
    }

    // endregion

    // region visual effects
    // spin wheel
    randomSpinWheel(enableControls) {
        let randomDegree = (Math.random() * (this.rangeMax - this.rangeMin) + this.rangeMin);


        let degreeTravelled = 0;
        let degreeTotal = (360 * 3 + (360 - this.trueValue)) + (randomDegree);
        let self = this;
        let spin = function () {
            let speed = Math.max(10 * (1 - (degreeTravelled / degreeTotal)), 0.1);

            let angle = self.trueValue + speed;
            self.trueValue = angle % 360;

            self.draw();

            degreeTravelled += speed;

            if (degreeTravelled / degreeTotal < 0.9999) {
                window.requestAnimationFrame(spin);
            } else {
                enableControls();
                self.trueValue = randomDegree;
                self.draw();
            }
        };

        window.requestAnimationFrame(spin);
    }

    // endregion

    // region drawing helper
    calculateSliderThumbPosition(value) {
        if (value < 0 || value > 180) {
            console.error("Slider thumb position value must be between 0 and 180");
        }

        let offset_x = Math.cos(Math.PI * 2 * value / 360) * this.radius;
        let offset_y = Math.sin(Math.PI * 2 * value / 360) * this.radius;
        return {offset_x, offset_y};
    }

    // endregion

    // region canvas helper
    toImageUrl() {
        return this.canvas.toDataURL();
    }

    // endregion

    // region control
    registerControls() {
        let range = document.getElementById("dial");
        range.addEventListener("input", (event) => {
            this.guessValue = 180 - event.target.value / 4;
            this.draw();
        });

        let modeButton = document.getElementById("mode-toggle");
        modeButton.addEventListener("click", (_) => {
            if (this.mode === GameDisplayMode.Prompt) {
                this.mode = GameDisplayMode.Guess;
                modeButton.innerText = "Show wheel";
            } else if (this.mode === GameDisplayMode.Guess) {
                this.mode = GameDisplayMode.Prompt;
                modeButton.innerText = "Hide wheel";
            }
            this.draw();
        });

        let spinButton = document.getElementById("spin-wheel");
        spinButton.addEventListener("click", (_) => {
            // disable other controls
            range.setAttribute("disabled", "disabled");
            modeButton.setAttribute("disabled", "disabled");
            spinButton.setAttribute("disabled", "disabled");

            let enableControls = function () {
                range.removeAttribute("disabled");
                modeButton.removeAttribute("disabled");
                spinButton.removeAttribute("disabled");
            };

            // spin wheel
            this.randomSpinWheel(enableControls);
        });
    }

    // endregion
}