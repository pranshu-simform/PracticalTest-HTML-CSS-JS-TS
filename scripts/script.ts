class MemoryGame{
    gameArray: string[];
    currentPlayer: string;

    constructor(){
        this.gameArray=new Array(16).fill('');
        this.generateGameArray();
        this.initEventlistner();
    }

    initEventlistner(){
        document.querySelector('.gamecontainer')?.addEventListener('click',(event: Event)=>{
            if((event.target as HTMLElement).tagName==='BUTTON'){
                const btnElement=event.target as HTMLButtonElement;
                btnElement.textContent=btnElement.value;
                btnElement.disabled=true;
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
}

document.addEventListener('DOMContentLoaded',(event: Event)=>{
    new MemoryGame();
})