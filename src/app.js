/**
 * Main js component used to render the application
 */
let game_board = [];
const tile_width = (innerHeight * 0.8 * 0.125);
const board_width = 8;
const board_height = 8;
/**
 * Simple Utility method used for rendering the game board
 * @param {*} game_board 2d array representing the location of every piece on the board and storing for AI analysis
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
 * @param {*} game_board 2d array with game pieces
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

function main(){
    game_board = Initialize_grid(board_width, board_height);
    InitializeGamePieces();
}

main();