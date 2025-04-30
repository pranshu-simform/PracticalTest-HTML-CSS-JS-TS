import { Gamecontainer } from "./component/Gamecontainer.js";
import { Resultcontainer } from "./component/Resultcontainer.js";

class MemoryGame{
    gameArray: string[];
    revelArray: string[];
    currentPlayer: number;
    firstCard: HTMLButtonElement|null;
    secondCard: HTMLButtonElement|null;
    playerScore: [number,number];
    counter: number;
    timer: number|null;

    constructor(){
        this.currentPlayer=0;
        this.gameArray=new Array(16).fill('');
        this.generateGameArray();
        this.initEventlistner();
        this.firstCard=null;
        this.secondCard=null;
        this.playerScore=[0,0];
        this.counter=60;
        this.timer=null;
        this.showTime(document.getElementById(`playerTime`) as HTMLParagraphElement);
    }

    initEventlistner(){
        document.querySelector('.gamecontainer')?.addEventListener('click',(event: Event)=>{
            if((event.target as HTMLElement).tagName==='BUTTON'){
                const btnElement=event.target as HTMLButtonElement;
                this.handleButtonclick(btnElement);
            }
        })

        document.querySelector('.resetgame')?.addEventListener('click',(event: Event)=>{
            this.resetGame();
        })

        document.querySelector('.btn__rematch')?.addEventListener('click',(event: Event)=>{
            this.resetGame();
            const resultContainer=document.querySelector('.modalcontainer') as HTMLElement;     
            this.closeElement(resultContainer);
        })
    }

    showTime(element: HTMLParagraphElement){
        if(this.timer&&this.counter<0){
            this.resetCard();
            this.togglePlayer();
            return;
        }
        
        if(!this.timer){
            this.timer=setInterval(()=>{
                element.textContent=`Time Remaining: ${this.counter}`;
                this.counter--;
                this.showTime(element);
            },1000)
        }
    }


    generateGameArray(){
        let len=this.gameArray.length;

        for(let i=0;i<len/2;i++){
            this.gameArray[i]=i.toString();
        }

        for(let i=len/2;i<len;i++){
            this.gameArray[i]=(i-len/2).toString();
        }

        this.suffleArray();

        // console.log(this.gameArray);
        this.generateGrid();
    }

    suffleArray(){
        let len=this.gameArray.length;

        for(let i=len-1;i>0;i--){
            const j=Math.floor(Math.random()*(i+1));
            let temp=this.gameArray[i];
            this.gameArray[i]=this.gameArray[j];
            this.gameArray[j]=temp;
        }
    }

    generateGrid(){
        const gamecontainer=document.querySelector('.gamecontainer');
        const fragment=document.createDocumentFragment();
        gamecontainer!.innerHTML='';
        for(let i=0;i<this.gameArray.length;i++){
            const btnElement=document.createElement('button');
            btnElement.role='button';
            btnElement.ariaLabel='game button';
            btnElement.value=this.gameArray[i];
            fragment.append(btnElement);
        }

        gamecontainer?.append(fragment);
    }

    handleButtonclick(element: HTMLButtonElement){
        if(this.firstCard==null){
            this.firstCard=element;
            element.textContent=element.value;
            element.disabled=true;
        }
        else if(this.firstCard!==null&&this.secondCard===null){            
            this.secondCard=element;
            element.textContent=element.value;
            element.disabled=true;
            this.handleWinning();
        }
    }

    handleWinning(){
        if(this.firstCard!==null&&this.secondCard!==null){
            if(this.firstCard.value===this.secondCard.value){
                this.playerScore[this.currentPlayer]=this.playerScore[this.currentPlayer]+1;
                const currPlayerScore=document.getElementById(`scoreplayer${this.currentPlayer+1}`);
                currPlayerScore!.textContent=`Score: ${this.playerScore[this.currentPlayer]}`;

                if(this.checkWining()){
                    this.showWinner();
                }

                this.firstCard=null;
                this.secondCard=null;
                this.resetTimer();
            }
            else{
                this.togglePlayer();
                setTimeout(()=>{
                    this.resetCard();
                },500)
            }

        }
    }

    checkWining(){
        return this.playerScore[0]+this.playerScore[1]===this.gameArray.length/2;
    }

    showWinner(){
        const player1Score=this.playerScore[0];
        const player2Score=this.playerScore[1];

        const resultElement=document.querySelector('.gameresult');

        if(player1Score===player2Score){
            resultElement!.textContent='Match Tie.';
        }
        else if(player1Score>player2Score){
            resultElement!.textContent='Player 1 Wins.'
        }
        else{
            resultElement!.textContent='Player 2 Wins.'
        }

        const resultContainer=document.querySelector('.modalcontainer') as HTMLElement;     
        this.openElement(resultContainer);
    }

    togglePlayer(){
        const currPlayer=document.getElementById(`player${this.currentPlayer+1}`);
        currPlayer!.classList.remove('playerActive');

        this.currentPlayer=this.currentPlayer===0?1:0;

        const nextPlayer=document.getElementById(`player${this.currentPlayer+1}`);
        nextPlayer!.classList.add('playerActive');

        this.resetTimer();
    }

    resetCard(){
        if(this.firstCard){
            this.firstCard!.textContent='';
            this.firstCard!.disabled=false;
            this.firstCard=null;
        }

        if(this.secondCard){
            this.secondCard!.textContent='';
            this.secondCard!.disabled=false;
            this.secondCard=null;
        }
    }

    resetTimer(){
        this.counter=60;
    }

    resetGame(){
        this.generateGameArray();
        this.firstCard=null;
        this.secondCard=null;
        this.playerScore=[0,0];
        this.resetTimer();
        const scorePlayer1=document.getElementById('scoreplayer1');
        scorePlayer1!.textContent=`Score: ${0}`;

        const scorePlayer2=document.getElementById('scoreplayer2');
        scorePlayer2!.textContent=`Score: ${0}`;
    }

    openElement(element: HTMLElement){
        element.style.display='flex';
    }

    closeElement(element: HTMLElement){
        element.style.display='none';
    }
}

document.addEventListener('DOMContentLoaded',(event: Event)=>{
    const rootContainer=document.getElementById('root');
    console.log(rootContainer);
    
    rootContainer!.innerHTML+=Gamecontainer;
    rootContainer!.innerHTML+=Resultcontainer;
    
    new MemoryGame();
})