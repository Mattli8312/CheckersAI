/**
 * Main js component used to render the application
 */
let game_board = [];
let current_player, current_winner;
let red_pieces, black_pieces;
const tile_width = (innerHeight * 0.8 * 0.125);
const board_width = 8;
const board_height = 8;
/**
 * Simple Utility method used for rendering the game board
 * @param {*} width_  8 tiles
 * @param {*} height_ 8 tiles
 */
function Initialize_grid(width_, height_){
    let body = document.getElementById('grid');
    let pieces = {
        R: 'R',
        B: 'B',
        O: ' '
    }

    let current_piece = pieces.R;
    let current_color = "white";

    body.style.width = tile_width * 8;
    body.style.height = tile_width * 8;

    for(var a = 0; a < width_; a++){

        game_board.push([]);

        current_color  = current_color == "white" ? "red" : "white";

        if(a < 3){
            if(current_piece == pieces.O)
                current_piece = pieces.R;
            else 
                current_piece = pieces.O;
        }
        else if(a > 4){
            if(current_piece == pieces.O)
                current_piece = pieces.B;
            else 
                current_piece = pieces.O;
        }
        else current_piece = pieces.O;

        for(var b = 0; b < height_; b++){
            //Update 2d grid array used for minimax algorithm
            game_board[a].push(current_piece);
            //Condition for determining what to set current piece to
            if(a < 3){
                if(current_piece == pieces.O)
                    current_piece = pieces.R;
                else 
                    current_piece = pieces.O;
            }
            else if(a > 4){
                if(current_piece == pieces.O)
                    current_piece = pieces.B;
                else 
                    current_piece = pieces.O;
            }
            

            //Change the color
            current_color  = current_color == "white" ? "brown" : "white";

            //Initialize the grid div
            let tile_ = document.createElement('div');
            tile_.setAttribute("id", a + ',' + b);
            tile_.style.background = current_color;
            tile_.style.top = a * tile_width;
            tile_.style.left = b * tile_width
            tile_.style.width = tile_.style.height = tile_width;
            body.appendChild(tile_);
        }
    }
    return game_board;
}

/**
 * Utility function used to render the pieces
 */
function InitializeGamePieces(){
    for(var a = 0; a < 8; a++){
        for(var b = 0; b < 8; b++){
            if(game_board[a][b] == 'R'){
                let piece = new Piece("red", 1, false, b, a, tile_width * 0.75);
                piece.render_piece();
            }
            if(game_board[a][b] == 'B'){
                let piece = new Piece("black", -1, false, b, a, tile_width * 0.75);
                piece.render_piece();
            }
        }
    }
}

/**
 * Utility function reset the grid. Mainly for starting a new game
 */
function ResetGrid(){
    let body = document.getElementById("grid");
    while(body.firstChild){
        body.removeChild(body.firstChild);
    }
    if(game_board.length > 0){
        for(var a = 7; a > -1; a--){
            while(game_board[a].length)
                game_board[a].pop();
            game_board.pop();
        }
    }
}

function winner(color){
    let winner_screen = document.createElement("div");
    winner_screen.setAttribute("id", "winner_screen");
    winner_screen.style.background = color;
    winner_screen.style.width = board_width * tile_width;
    winner_screen.style.height = board_height * tile_width;
    winner_screen.style.position = "absolute";
    winner_screen.style.margin = "auto";
    winner_screen.innerHTML = current_winner;
    winner_screen.style.fontSize = "10vh";
    document.getElementById("grid").appendChild(winner_screen);
}

function main(){
    current_player = current_pl.Player_Black;
    current_winner = current_w.NuLL;
    red_pieces = black_pieces = 12;
    let list = document.getElementsByClassName("main_page_enabled");
    for(var i = 0; i < list.length; i++)
        list[i].setAttribute("class", "main_page_disabled")
    ResetGrid();
    game_board = Initialize_grid(board_width, board_height);
    InitializeGamePieces();
}

/**
 * Implement the state machine i.e. which player goes first && what happend when a player loses all their checkers
 * In checkers, black goes first
 */

let current_pl = {
    Player_Red: "p2_red",
    Player_Black: "p1_black"
}

let current_w = {
    Red_won: "Red Won!",
    Black_won: "Black Won!",
    NuLL: "Null"
}