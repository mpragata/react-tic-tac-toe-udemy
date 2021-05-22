import React , {useState} from 'react'
import "./game.scss"

// className = prop, so that you can use the className attribute in a css file
// value prop from render tile being called and displayed on square tile
// converted div element to button for clicking
// added onclick event handler
// added usestate hook to remember if tile has been clicked
// setVal for changing the values of the square
// moved the state component from per tile to the main board / lifting state up
const Tile = (props) => {
    return (
        //onclickEvent catch from the board component
        <button className="tile" onClick={props.onClickEvent}>
            {props.val}
        </button>
    );
};

// tile component inside the board component
// className = prop, so that you can use the className attribute in a css file
// 3 divs for 3 rows, 3 tile each row for 9 squares
// set the initial values of the board to null 
const Board = () => {
    // populate array with 9 null values
    const initialTiles = Array(9).fill(null);
    const [tiles, setTiles] = useState(initialTiles);
    //X player is always first
    const [x, setX] = useState(true);

    // creating a function that will be passed to the child Tile component so that we can change the use state of the board component
    const handleClick = (i) => {
        // make a copy of the board state array
        const newTiles = [...tiles];
        //check first if theres already a winner or tile is filled
        const gameWon = Boolean(decideWinner(newTiles));
        const tileFilled = Boolean(newTiles[i]);

        // if either is true, game done and return early
        if(gameWon || tileFilled) {
            return;
        }
        // mutate the copy, setting the i-th element to X
        //first player X, then O
        newTiles[i] = x ? 'X' : 'O';
        // changing the state to which player turn, x for x and !x for O
        setX(!x);
        // call the setTile function with the mutated copy
        setTiles(newTiles);
        // called immutable approach
    };
    //refactoring tiles
    const renderTile = (i) => {
        //add a prop to hold the X or O value of squares
        //index 0 for top left to index 8 for lower right tile
        // passing the handle click function to the tile component
        return(
            <Tile 
                val={tiles[i]}
                onClickEvent={() => handleClick(i)}
            />
        );
    };

    const winner = decideWinner(tiles);
    // displaying whos turn is it or who won
    const status = winner ? `Winner: ${winner}` : `Next Player: ${x ? 'X' : 'O'}`;
    // labeling tiles 0 to 8 to differentiate each tile
    // using the status to display whos turn is it
    return (
        <div className="board">
            <div className="status">
                {status}
            </div>
            <div className="board_row">
                {renderTile(0)}{renderTile(1)}{renderTile(2)}
            </div>
            <div className="board_row">
                {renderTile(3)}{renderTile(4)}{renderTile(5)}
            </div>
            <div className="board_row">
                {renderTile(6)}{renderTile(7)}{renderTile(8)}
            </div>
        </div>
    );
};

// board component inside the game component
// className = prop, so that you can use the className attribute in a css file
export default function Game() { 
    return (
        <div className="game"> 
            Tic-Tac-Toe
            <Board/>
        </div>
    )
}

// function to decide winner
function decideWinner(tiles){
    const winningLines = [
        [0,1,2],[3,4,5],[6,7,8], // horizontal win
        [0,3,6],[1,4,7],[2,5,8], // vertical win
        [0,4,8],[2,4,6], // diagonal win
    ];

    for (let winningLine of winningLines) {
        const [a,b,c] = winningLine;
        // comparing array indices for same values
        if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
            return tiles[a]; // winner 'X' or 'O'
        }
    }

    return null; // no winner
}
