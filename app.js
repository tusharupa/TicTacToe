const boarddiv=document.querySelector('#gameboard')
const playBtn=document.querySelector('#playBtn');
const buttons=document.querySelector('.buttons');
const Player =(name,marker,turn)=>{
    
    return {name,marker,turn};
} 
const game = (()=>{
   
    //declare players
    const playerOne=Player('player 1','O',true);
    const playerTwo=Player('player 2','X',false);
    //starting point
    let board=[];
    let winnerDeclared=false;
    let remainingSpots=9;
    let turns=null;
    let winner=null;

     //winning conditions
     const winningCondition =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    const createBoard=()=>{
        for(let i=0;i<9;i++)
        board[i]="";

        board.forEach((item)=>{
            const squares=document.createElement('div');
                 squares.classList.add('cell');
                 boarddiv.append(squares);
        });

        let cell=document.querySelectorAll('.cell');
         //add event listeners on each cell
    let cells=Array.from(cell);
    cells.forEach((cell,index)=>{
        
        cell.addEventListener('click',(e)=>{
            //display active player marker
            cell.classList.add('bold');

            // if(game.playerOne.turn==true && game.winnerDeclared==false && e.target.textContent=='')
            if(playerOne.turn==true && winnerDeclared==false)
            {
                cell.innerHTML=playerOne.marker;
                board[index]=playerOne.marker;
                cell.style.pointerEvents='none';
                remainingSpots-=1;
                playerOne.turn=false;
                playerTwo.turn=true;
            }
            else if(playerTwo.turn==true && game.winnerDeclared==false)
            {
                cell.innerHTML=playerTwo.marker;
                board[index]=playerTwo.marker;
                cell.style.pointerEvents='none';
                remainingSpots-=1;
                playerOne.turn=true;
                playerTwo.turn=false;
            }
            else
            return;
            console.log(board);
            checkWinner();
            if(remainingSpots==0 && winnerDeclared==false)
            {
            winnerDeclared=true;
            winner="tie";
            console.log("tie game");
            displayGame.startMsg(winner);
    
            }

        });
    });

    }
    const checkWinner =()=>{
        turns++;
        console.log(turns);
        winningCondition.forEach((item,index)=>{
        if(board[item[0]]===playerOne.marker && board[item[1]]===playerOne.marker && board[item[2]]===playerOne.marker)
        {
            console.log(`${playerOne.name} wins!`);
            winnerDeclared=true;
            winner=playerOne.name+" "+"wins";
            displayGame.startMsg(winner);
            // displayGame.displaytxt.innerHTML="player 1 wins"
            // displayGame.startMsg();
        }
        else if(board[item[0]]===playerTwo.marker && board[item[1]]===playerTwo.marker && board[item[2]]===playerTwo.marker)
        {
            console.log(`${playerTwo.name} wins!`);
            winnerDeclared=true;
            winner=playerTwo.name+" "+"wins" ;
            displayGame.startMsg(winner);
            // displayGame.displaytxt.innerHTML="player 2 wins"
            // displayGame.startMsg();
        }
        });
    }
    const resetBoard=()=>{
            playerOne.turn=true;
            playerTwo.turn=false;
            board.length=0;
            remainingSpots=9;
            turns=0;
            winner=null;
            winnerDeclared=false;
    }
    return{
        remainingSpots,
        checkWinner,
        createBoard,
        resetBoard,
        winnerDeclared,
        playerOne,
        playerTwo,
        turns,
        winner,
        board
    };
})();
const displayGame =(()=>{
    const displaytxt=document.querySelector('.winningMsg');
    const startMsg =(winner)=>{
        boarddiv.disabled=true;
        buttons.classList.add('active');
        document.body.style.backgroundColor="rgba(0,0,0,0.9)";
        if(winner)
        displaytxt.innerHTML=`${winner} game`;
        playBtn.addEventListener('click',()=>{
            endMsg();
        });
    }
    const endMsg =()=>{
        boarddiv.disabled=false;
        buttons.classList.remove('active');
        document.body.style.backgroundColor="rgb(235, 213, 186)";
        boarddiv.innerHTML="";
        game.resetBoard();
        game.createBoard();
    }
// startMsg();
return{
    startMsg,
    endMsg,
    displaytxt
}
}
)();
displayGame.startMsg();