const Gamecontainer=`<div class="memorygame">
            <h1 class="memorygame__title">Memory Game</h1>
            <div class="playerContainer">
                <div class="playerInfo playerActive" id="player1">
                    <p>Player 1</p>
                    <p id="scoreplayer1">Score: 0</p>
                </div>
                <div class="playerInfo" id="player2">
                    <p>Player 2</p>
                    <p id="scoreplayer2">Score: 0</p>
                </div>
            </div>
            <p id="playerTime">Time Remaining: 60</p>
            <div class="gamecontainer"></div>
    
            <button class="resetgame">Reset</button>
        </div>`

export {Gamecontainer};