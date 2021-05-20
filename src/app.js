/**
 * Main js component used to render the application
 */



/**
 * Simple Utility method used for rendering the game board
 * @param {*} game_board 
 * @param {*} width_ 
 * @param {*} height_ 
 */
function Initialize_grid(game_board, width_, height_){
    let body = document.getElementById('grid');
    let pieces = {
        R: 'R',
        B: 'B',
        O: ' '
    }

    let current_piece = pieces.R;
    let current_color = "white";
    let tile_width = (innerHeight * 0.8 * 0.125);

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
            current_color  = current_color == "white" ? "red" : "white";

            //Initialize the grid div
            let tile_ = document.createElement('div');
            tile_.style.background = current_color;
            tile_.style.top = a * tile_width;
            tile_.style.left = b * tile_width
            tile_.style.width = tile_.style.height = tile_width;
            body.appendChild(tile_);
        }
    }
    return game_board;
}

function main(){
    const board_width = 8;
    const board_height = 8;
    
    let game_board = [];
    game_board = Initialize_grid(game_board, board_width, board_height);
    console.log(game_board);
}

main();