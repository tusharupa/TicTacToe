const board=document.querySelector('#gameboard')
const resetbtn=document.querySelector('#restartbtn');
const createPlayer =(name,marker)=>{
    return {name,marker};
} 
const 
const Gameboard = (()=>{
    const playerOne=createPlayer('player 1','O');
    const playerTwo=createPlayer('player 2','X');
    let activePlayer=undefined;
    let isGameOver=undefined;
    let winner=undefined;
    let gameboard=[];
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
    const createGame=()=>{
       
        isGameOver=false;
        activePlayer=playerOne;
       for(let i=0;i<9;i++)
        {
            gameboard[i]="";
       }
       for(let i=0;i<9;i++)
         {
             const squares=document.createElement('div');
             squares.classList.add('cell');
             board.append(squares);
         }
    
    
       let cell=document.querySelectorAll('.cell');
       
    let cells=Array.from(cell);
    cells.forEach((cell,index)=>{
        cell.addEventListener('click',()=>{
            cell.classList.add('bold');
            cell.innerHTML=activePlayer.marker;
            gameboard[index]=activePlayer.marker;
            checkWinner();
            checkTie();
            cell.style.pointerEvents="none";
            changePlayer();
    
        });
    });
    }
    const checkTie=()=>{
        if(!gameboard.includes("") && isGameOver===false)
        {
            console.log('game is a tie');
            restartGame();
        }
    }
    const changePlayer = () =>{
        if(activePlayer===playerOne)
        activePlayer=playerTwo;
        else
        activePlayer=playerOne;
    }
    const checkWinner =()=>{
        winningCondition.forEach((item)=>{
            if(gameboard[item[0]]===activePlayer.marker && gameboard[item[1]]===activePlayer.marker && gameboard[item[2]]===activePlayer.marker)
            {
            isGameOver=true;
            winner=activePlayer.name;
            console.log(`winner is ${winner}`);
            console.log(gameboard);
        }
        });
        if(!isGameOver)
        console.log('no winner yet');
        else
        {
            restartGame();
        }
    }
       
    const restartGame=()=>{
      board.style.pointerEvents="auto";
      board.innerHTML="";
      console.log('game is restarted');
      gameboard.length=0;
      createGame();

    }
    
    createGame();
return{createGame,checkTie,checkWinner,restartGame,gameboard};
})();

