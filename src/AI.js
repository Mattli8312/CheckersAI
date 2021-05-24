/**
 * Decision Algorithm used by CPU
 * Based on iconic minimax algorithm
 */

class Minimax{
    /**
     * Custom constructor
     * @param {*} identity contains which side we are on: either 'R' or 'B'
     */
    constructor(identity, enemy, depth){
        this.identity = identity;
        this.enemy = enemy;
        this.depth = depth;
        this.best_move = {
            init_x: -1,
            init_y: -1,
            finl_x: -1,
            finl_y: -1
        }
        //Best move will return an object containing the initial x coordinate of a piece and the final x and y coordinate of the piece
    }
    Minimax(maximizing, depth){
        //Traverse the graph
        if(maximizing){
            let best_score = -100;
            if(!depth)
                return best_score;
            for(var a = 0; a < board_width; a++){
                for(var b = 0; b < board_height; b++){
                    if(game_board[a][b] == this.identity){
                        continue;
                    }
                }
            }
        }
    }
    CalculateGridMoves(){

    }
}