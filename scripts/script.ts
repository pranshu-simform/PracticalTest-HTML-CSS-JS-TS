class MemoryGame{
    gameArray: string[];
    currentPlayer: number;
    firstCard: HTMLButtonElement|null;
    secondCard: HTMLButtonElement|null;
    playerScore: [number,number]

    constructor(){
        this.currentPlayer=0;
        this.gameArray=new Array(16).fill('');
        this.generateGameArray();
        this.initEventlistner();
        this.firstCard=null;
        this.secondCard=null;
        this.playerScore=[0,0];
    }

    initEventlistner(){
        document.querySelector('.gamecontainer')?.addEventListener('click',(event: Event)=>{
            if((event.target as HTMLElement).tagName==='BUTTON'){
                const btnElement=event.target as HTMLButtonElement;
                this.handleButtonclick(btnElement);
            }
        })
    }

    generateGameArray(){
        let len=this.gameArray.length;

        for(let i=0;i<len/2;i++){
            this.gameArray[i]=i.toString();
        }

        for(let i=len/2;i<len;i++){
            this.gameArray[i]=(i-len/2).toString();
        }

        console.log(this.gameArray);
        this.generateGrid();
    }

    generateGrid(){
        const gamecontainer=document.querySelector('.gamecontainer');
        for(let i=0;i<this.gameArray.length;i++){
            const btnElement=document.createElement('button');
            btnElement.value=this.gameArray[i];
            gamecontainer!.appendChild(btnElement);
        }
    }

    handleButtonclick(element: HTMLButtonElement){
        if(this.firstCard==null){
            this.firstCard=element;
            element.textContent=element.value;
            element.disabled=true;
        }
        else if(this.firstCard!==null&&this.secondCard===null){
            console.log(element);
            
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
            }
            else{
                this.firstCard.textContent='';
                this.firstCard.disabled=false;
                this.secondCard.textContent='';
                this.secondCard.disabled=false;
                this.currentPlayer=this.currentPlayer===0?1:0;
            }

            this.firstCard=null;
            this.secondCard=null;
        }
    }
}

document.addEventListener('DOMContentLoaded',(event: Event)=>{
    new MemoryGame();
})