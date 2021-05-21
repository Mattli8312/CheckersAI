/**
 * Utility class used to hold the parameters and properties of all the checkers pieces
 * 
 */

let moves = [];

class Piece{
    /**
     * Custom constructor for pieces
     * @param {*} color Represents which side the piece in question is on
     * @param {*} direction Direction the piece can travel
     * @param {*} is_king Boolean representing if it is a king or note
     * @param {*} x_ x location
     * @param {*} y_ y location
     */
    constructor(color, direction, is_king, x_, y_, tile_width){
        this.color = color;
        this.direction = direction;
        this.is_king = is_king;
        this.x = x_;
        this.y = y_;
        this.width = tile_width;
        //
    }
    render_piece(){
        let curr_tile = document.getElementById(this.y + ',' + this.x);
        let piece = document.createElement("div");
        piece.style.background = this.color;
        piece.style.width = this.width;
        piece.style.height = this.width;
        piece.style.borderRadius = "50%";

        //piece selected
        piece.addEventListener("mouseover", () =>{
            piece.style.border = "solid 5px white";
        })
        piece.addEventListener("mouseleave", () =>{
            piece.style.border = "none";
        })
        piece.addEventListener("click", () =>{
            this.Calculate_moves();
            //Render the possible moves\
        })
        curr_tile.appendChild(piece);
    }
    Calculate_moves(){
        //Clear original arrays
        while(moves.length){
            let curr_move = moves.pop();
            let tile = document.getElementById(curr_move.cur_y + ',' + curr_move.cur_x);
            tile.removeChild(tile.lastChild);
        }

        let stack = []; //Using a stack to DFS through the grid
        if(this.color == "red"){ //Red's turn
            stack.push([this.y, this.x]);
            while(stack.length > 0){
                let curr_ = stack.pop();
                let x_ = curr_[1], y_ = curr_[0];
                if(y_ + 1 < board_height){
                    if(x_ + 1 < board_width){//If not reserved
                        if(game_board[y_+1][x_+1] == ' ')
                            moves.push({
                                cur_x: x_ + 1,
                                cur_y: y_ + 1,
                                mas_x: x_,
                                mas_y: y_,
                                cap_x: -1,
                                cap_y: -1 //-1 indicates no capture
                            });
                        else if(game_board[y_+1][x_+1] == 'B'){
                            if(y_+2 < board_height && x_ + 1 < board_width && grid[y_+2][x_+2] == ' '){
                                moves.push({
                                    cur_x: x_ + 2,
                                    cur_y: y_ + 2,
                                    mas_x: x_,
                                    mas_y: y_,
                                    cap_x: x_ + 1,
                                    cap_y: y_ + 1
                                });
                                stack.push([y_ + 2, x_ + 2]);
                            }
                        }
                    }
                    if(x_ - 1 > -1){//If not reserved
                        if(game_board[y_+1][x_-1] == ' ')
                            moves.push({
                                cur_x: x_ - 1,
                                cur_y: y_ + 1,
                                mas_x: x_,
                                mas_y: y_,
                                cap_x: -1,
                                cap_y: -1 //-1 indicates no capture
                            });
                        else if(game_board[y_+1][x_-1] == 'B'){
                            if(y_+2 < board_height && x_ - 1 < board_width && grid[y_+2][x_-2] == ' '){
                                moves.push({
                                    cur_x: x_ - 2,
                                    cur_y: y_ + 2,
                                    mas_x: x_,
                                    mas_y: y_,
                                    cap_x: x_ - 1,
                                    cap_y: y_ + 1
                                });
                                stack.push([y_ + 2, x_ - 2]);
                            }
                        }
                    }
                }
            }
        }
        //render the pseudo nodes
        for(var a = 0; a < moves.length; a++){
            console.log(moves[a])
            let pseudopiece = new PseudoNodes(moves[a].cur_x, moves[a].cur_y, moves[a].mas_x, moves[a].mas_y, this.color, this.width, this.direction);
            pseudopiece.render();
        }
        console.log(moves);
    }
}

class PseudoNodes{
    constructor(x_, y_, prevx, prevy,  color, tile_width, direction){
        this.x_ = x_;
        this.y_ = y_;
        this.prev_x = prevx;
        this.prev_y = prevy;
        this.tile_width = tile_width;
        this.color = color;
        this.direction = direction
    }
    render(){
        let tile = document.getElementById(this.y_ + ',' + this.x_);
        let placeholder = document.createElement('div');
        placeholder.style.width = this.tile_width * 0.5;
        placeholder.style.height = this.tile_width * 0.5;
        placeholder.style.background = this.color == "red" ? "rgba(255,0,0,0.8)" : "rgba(0,0,0,0.5)"
        placeholder.style.borderRadius = "50%";
        placeholder.addEventListener('click', () => 
        {
            let tile = document.getElementById(this.prev_y + ',' + this.prev_x);
            if(tile.firstChild)
                tile.removeChild(tile.firstChild);
            while(moves.length){
                let curr_ = moves.pop();
                let pseudo_ = document.getElementById(curr_.cur_y + ',' + curr_.cur_x);
                if(pseudo_.firstChild)
                    pseudo_.removeChild(pseudo_.firstChild);
            }
            let new_piece = new Piece(this.color, this.direction, false, this.x_, this.y_, this.tile_width)
            new_piece.render_piece();
        });
        tile.appendChild(placeholder);
    }
}