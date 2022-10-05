const boarddiv=document.querySelector('#gameboard')
const resetbtn=document.querySelector('#restartbtn');
const Player =(name,marker,turn)=>{
    
    return {name,marker,turn};
} 
const gameBoard =(()=>{
    //generate board array
    let board=[];

    const createBoard =()=>{

    for(let i=0;i<9;i++)
    board.push('');

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

            if(game.playerOne.turn==true && game.winner==null && e.target.textContent=='')
            {
                cell.innerHTML=game.playerOne.marker;
                board[index]=game.playerOne.marker;
                cell.style.pointerEvents='none';
                game.remainingSpots-=1;
                game.playerOne.turn=false;
                game.playerTwo.turn=true;
                console.log(board);
            }
            else if(game.playerTwo.turn==true && game.winner==null && e.target.textContent=='')
            {
                cell.innerHTML=game.playerTwo.marker;
                board[index]=game.playerTwo.marker;
                cell.style.pointerEvents='none';
                game.remainingSpots-=1;
                game.playerOne.turn=true;
                game.playerTwo.turn=false;
                console.log(board);
            }
            else
            return;

            game.checkWinner();
            
        });
    });
}
createBoard();

    return{
        createBoard,
        board
    };
})()

const game = (()=>{
   
    //declare players
    const playerOne=Player('player 1','O',true);
    const playerTwo=Player('player 2','X',false);
    //starting point
    
    let winnerDeclared=false;
    let remainingSpots=9;
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
    const resetBoard =()=>{
        boarddiv.innerHTML="";
        gameBoard.board.length=0;
        winner=null;
        remainingSpots=9;
        winnerDeclared=false;
        playerOne.turn=true;
        playerTwo.turn=false;
        gameBoard.createBoard();
    }

    const checkWinner =()=>{
        
        winningCondition.forEach((item,index)=>{
        if(gameBoard.board[item[0]]===playerOne.marker && gameBoard.board[item[1]]===playerOne.marker && gameBoard.board[item[2]]===playerOne.marker)
        {
            console.log(`${playerOne.name} wins!`);
            winnerDeclared=true;
            winner=playerOne;
            resetBoard();
        }
        else if(gameBoard.board[item[0]]===playerTwo.marker && gameBoard.board[item[1]]===playerTwo.marker && gameBoard.board[item[2]]===playerTwo.marker)
        {
            console.log(`${playerTwo.name} wins!`);
            winnerDeclared=true;
            winner=playerTwo;
            resetBoard();
        }
        });
        if(game.remainingSpots==0 && game.winner==null)
        {
            console.log('tie game');
        resetBoard();
        }
        
    }
    return{
        remainingSpots,
        checkWinner,
        winnerDeclared,
        playerOne,
        playerTwo,
        winner,
        resetBoard
    };
})();
