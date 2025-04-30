"use strict";
class MemoryGame {
    constructor() {
        this.currentPlayer = 0;
        this.gameArray = new Array(16).fill('');
        this.generateGameArray();
        this.initEventlistner();
        this.firstCard = null;
        this.secondCard = null;
        this.playerScore = [0, 0];
    }
    initEventlistner() {
        var _a, _b;
        (_a = document.querySelector('.gamecontainer')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const btnElement = event.target;
                this.handleButtonclick(btnElement);
            }
        });
        (_b = document.querySelector('.resetgame')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (event) => {
            this.resetGame();
        });
    }
    generateGameArray() {
        let len = this.gameArray.length;
        for (let i = 0; i < len / 2; i++) {
            this.gameArray[i] = i.toString();
        }
        for (let i = len / 2; i < len; i++) {
            this.gameArray[i] = (i - len / 2).toString();
        }
        // this.suffleArray();
        console.log(this.gameArray);
        this.generateGrid();
    }
    suffleArray() {
        let len = this.gameArray.length;
        for (let i = len - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            let temp = this.gameArray[i];
            this.gameArray[i] = this.gameArray[j];
            this.gameArray[j] = temp;
        }
    }
    generateGrid() {
        const gamecontainer = document.querySelector('.gamecontainer');
        gamecontainer.innerHTML = '';
        for (let i = 0; i < this.gameArray.length; i++) {
            const btnElement = document.createElement('button');
            btnElement.value = this.gameArray[i];
            gamecontainer.appendChild(btnElement);
        }
    }
    handleButtonclick(element) {
        if (this.firstCard == null) {
            this.firstCard = element;
            element.textContent = element.value;
            element.disabled = true;
        }
        else if (this.firstCard !== null && this.secondCard === null) {
            this.secondCard = element;
            element.textContent = element.value;
            element.disabled = true;
            this.handleWinning();
        }
    }
    handleWinning() {
        if (this.firstCard !== null && this.secondCard !== null) {
            if (this.firstCard.value === this.secondCard.value) {
                this.playerScore[this.currentPlayer] = this.playerScore[this.currentPlayer] + 1;
                const currPlayerScore = document.getElementById(`scoreplayer${this.currentPlayer + 1}`);
                currPlayerScore.textContent = `Score: ${this.playerScore[this.currentPlayer]}`;
                this.firstCard = null;
                this.secondCard = null;
            }
            else {
                this.togglePlayer();
                setTimeout(() => {
                    this.firstCard.textContent = '';
                    this.firstCard.disabled = false;
                    this.secondCard.textContent = '';
                    this.secondCard.disabled = false;
                    this.firstCard = null;
                    this.secondCard = null;
                }, 500);
            }
        }
    }
    togglePlayer() {
        const currPlayer = document.getElementById(`player${this.currentPlayer + 1}`);
        currPlayer.classList.remove('playerActive');
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
        const nextPlayer = document.getElementById(`player${this.currentPlayer + 1}`);
        nextPlayer.classList.add('playerActive');
    }
    resetGame() {
        this.generateGameArray();
        this.firstCard = null;
        this.secondCard = null;
        this.playerScore = [0, 0];
        const scorePlayer1 = document.getElementById('scoreplayer1');
        scorePlayer1.textContent = `Score: ${0}`;
        const scorePlayer2 = document.getElementById('scoreplayer2');
        scorePlayer2.textContent = `Score: ${0}`;
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    new MemoryGame();
});
