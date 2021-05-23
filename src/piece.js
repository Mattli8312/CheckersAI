/**
 * Utility class used to hold the parameters and properties of all the checkers pieces
 * 
 */

let moves = [];
let captures = [];

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
        if(color == "red" && y_== board_height - 1)
            this.is_king = true;
        if(color == "black" && y_ == 0)
            this.is_king = true;
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
        piece.setAttribute("class", "piece");
        if(this.is_king){
            let img_ = document.createElement('i');
            img_.setAttribute("class", "fas fa-crown");
            img_.style.zIndex = "front";
            img_.style.background = this.color;
            piece.appendChild(img_);
        }
        //piece selected
        piece.addEventListener("mouseover", () =>{
            if(this.color == "black" && current_player == current_pl.Player_Black)
                piece.style.border = "solid white 5px";
            else if(this.color == "red" && current_player == current_pl.Player_Red)
                piece.style.border = "solid white 5px";
        })
        piece.addEventListener("mouseleave", () =>{
            piece.style.border = "none";
        })
        piece.addEventListener("click", () =>{
            if(this.color == "black" && current_player == current_pl.Player_Black){
                this.Calculate_moves();
                this.CalculateAttacks();
            }
            else if(this.color == "red" && current_player == current_pl.Player_Red){
                this.Calculate_moves();
                this.CalculateAttacks();
            }
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
        let x_ = this.x, y_ = this.y;
        if((this.color == "red" || this.is_king) && y_ + 1 < board_height){
            if(x_ + 1 < board_width){//If not reserved
                if(game_board[y_+1][x_+1] == ' ')
                    moves.push({
                        cur_x: x_ + 1,
                        cur_y: y_ + 1,
                        mas_x: x_,
                        mas_y: y_
                    });
            }
            if(x_ - 1 > -1){//check left side
                if(game_board[y_+1][x_-1] == ' ')
                    moves.push({
                        cur_x: x_ - 1,
                        cur_y: y_ + 1,
                        mas_x: x_,
                        mas_y: y_
                    });
            }
        }
        if((this.color == "black" || this.is_king) && y_ - 1 > -1){
            if(x_ + 1 < board_width){//If not reserved
                if(game_board[y_-1][x_+1] == ' ')
                    moves.push({
                        cur_x: x_ + 1,
                        cur_y: y_ - 1,
                        mas_x: x_,
                        mas_y: y_
                    });
            }
            if(x_ - 1 > -1){//If not reserved
                if(game_board[y_-1][x_-1] == ' ')
                    moves.push({
                        cur_x: x_ - 1,
                        cur_y: y_ - 1,
                        mas_x: x_,
                        mas_y: y_
                    });
            }
        }
        //render the pseudo nodes
        for(var a = 0; a < moves.length; a++){
            //console.log(moves[a])
            let pseudopiece = new PseudoNodes(moves[a].cur_x, moves[a].cur_y, this.x, this.y, this.color, this.width, this.direction, false, this.is_king);
            pseudopiece.render();
        }
        //console.log(moves);
    }

    CalculateAttacks(){

        while(captures.length){
            let curr_move = captures.pop();
            let tile = document.getElementById(curr_move.cur_y + ',' + curr_move.cur_x);
            tile.removeChild(tile.lastChild);
        }
        let stack = []; //Using a stack to DFS through the game_board
        stack.push([this.y, this.x]);
        //console.log("here")
        let targets = this.color == "red" ? 'B' : 'R';
        while(stack.length > 0){
            let curr_ = stack.pop();
            let x_ = curr_[1], y_ = curr_[0];
            if((this.color == "red" || this.is_king) && y_ + 2 < board_height){
                if(x_ + 2 < board_width){//If not reserved
                    if(game_board[y_+1][x_+1] == targets && game_board[y_+2][x_+2] == ' '){
                        if(!this.Visited(x_+2, y_+2)){
                            captures.push({
                                cur_x: x_ + 2,
                                cur_y: y_ + 2,
                                mas_x: x_,
                                mas_y: y_,
                                cap_x: x_+1,
                                cap_y: y_+1 //-1 indicates no capture
                            });
                            //Push to the stack
                            stack.push([y_ + 2, x_ + 2]);
                        }
                    }
                }
                if(x_ - 2 > -1){//check left side
                    if(game_board[y_+1][x_-1] == targets && game_board[y_+2][x_-2] == ' '){
                        if(!this.Visited(x_-2, y_+2)){
                            captures.push({
                                cur_x: x_ - 2,
                                cur_y: y_ + 2,
                                mas_x: x_,
                                mas_y: y_,
                                cap_x: x_-1,
                                cap_y: y_+1 //-1 indicates no capture
                            });
                            stack.push([y_ + 2, x_ - 2]);
                        }
                    }
                }
            }
            if((this.color == "black" || this.is_king) && y_ - 2 > -1){
                if(x_ + 2 < board_width){//If not reserved
                    if(game_board[y_-1][x_+1] == targets && game_board[y_-2][x_+2] == ' '){
                        if(!this.Visited(x_+2, y_-2)){
                            captures.push({
                                cur_x: x_ + 2,
                                cur_y: y_ - 2,
                                mas_x: x_,
                                mas_y: y_,
                                cap_x: x_+1,
                                cap_y: y_-1 //-1 indicates no capture
                            });
                            stack.push([y_ - 2, x_ + 2]);
                        }
                    }
                }
                if(x_ - 2 > -1){//If not reserved
                    if(game_board[y_-1][x_-1] == targets && game_board[y_-2][x_-2] == ' '){
                        if(!this.Visited(x_-2, y_-2)){
                            captures.push({
                                cur_x: x_ - 2,
                                cur_y: y_ - 2,
                                mas_x: x_,
                                mas_y: y_,
                                cap_x: x_-1,
                                cap_y: y_-1 //-1 indicates no capture
                            });
                            stack.push([y_ - 2, x_ - 2]);
                        }
                    }
                }
            }
        }
        //render the pseudo nodes
        for(var a = 0; a < captures.length; a++){
            //console.log(captures[a])
            let pseudopiece = new PseudoNodes(captures[a].cur_x, captures[a].cur_y, this.x, this.y, this.color, this.width, this.direction, true, this.is_king);
            pseudopiece.render();
        }
        //console.log(captures);
    }
    Visited(x_, y_){
        for(var a = 0; a < captures.length; a++){
            if(x_ == captures[a].cur_x && y_ == captures[a].cur_y)
                return true;
        }
        return false;
    }
}

class PseudoNodes{
    constructor(x_, y_, original_x, original_y, color, tile_width, direction, captured, is_king){
        this.x_ = x_;
        this.y_ = y_;
        this.o_x = original_x
        this.o_y = original_y
        this.captured = captured
        this.tile_width = tile_width;
        this.color = color;
        this.direction = direction;
        this.is_king = is_king;
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
            //we need to backtrack to actually capture pieces if necessary
            // console.log(this.captured)
            if(this.captured){
                for(var a = 0; a < captures.length; a++){
                    if(captures[a].cur_x == this.x_ && captures[a].cur_y == this.y_){
                        //Check if there are multiple jumps 
                        let curr_x = captures[a].cur_x;
                        let curr_y = captures[a].cur_y;
                        game_board[curr_y][curr_x] = this.color == "red" ? 'R' : 'B';
                        game_board[this.o_y][this.o_x] = ' ';
                        while(curr_x != this.o_x || curr_y != this.o_y){
                            for(var a = 0; a < captures.length; a++){
                                // console.log("flag")
                                if(curr_x == captures[a].cur_x && curr_y == captures[a].cur_y){
                                    // console.log("flag")
                                    // console.log(captures[a]);
                                    let tile = document.getElementById(captures[a].cap_y + ',' + captures[a].cap_x)
                                    game_board[captures[a].cap_y][captures[a].cap_x] = ' ';
                                    if(tile.firstChild)
                                        tile.removeChild(tile.firstChild);
                                    this.color == "black" ? red_pieces -- : black_pieces --;
                                    curr_x = captures[a].mas_x;
                                    curr_y = captures[a].mas_y;
                                }
                            }
                        }
                    }
                }
                //update new piece
                let old_tile = document.getElementById(this.o_y + ',' + this.o_x);
                // console.log(old_tile)
                if(old_tile.firstChild)
                    old_tile.removeChild(old_tile.firstChild);
                let new_checker = new Piece(this.color, this.direction, this.is_king, this.x_, this.y_, this.tile_width);
                new_checker.render_piece();
            }
            else{
                //Just move the current tile to it's new location
                // console.log("not captured");
                for(var a = 0; a < moves.length; a++){
                    if(moves[a].cur_x == this.x_ && moves[a].cur_y == this.y_){
                        let prev_tile = document.getElementById(moves[a].mas_y + ',' + moves[a].mas_x);
                        if(prev_tile.firstChild)
                            prev_tile.removeChild(prev_tile.firstChild);
                        let new_piece= new Piece(this.color, this.direction, this.is_king, this.x_, this.y_, this.tile_width);
                        new_piece.render_piece();
                        game_board[moves[a].mas_y][moves[a].mas_x] = ' ';
                        break;
                    }
                }
                //Update the grid
                game_board[this.y_][this.x_] = this.color == "red" ? 'R' : 'B';
            }
            //Delete all potential moves and captures
            while(moves.length){
                let curr_ = moves.pop();
                let tile = document.getElementById(curr_.cur_y + ',' + curr_.cur_x);
                if(tile.firstChild)
                    tile.removeChild(tile.firstChild);
            }
            while(captures.length){
                let curr_ = captures.pop();
                let tile = document.getElementById(curr_.cur_y + ',' + curr_.cur_x);
                if(tile.firstChild);
                    tile.removeChild(tile.firstChild);
            }
            current_player = this.color == "red" ? current_pl.Player_Black : current_pl.Player_Red;
            if(red_pieces < 1){
                current_winner = current_w.Black_won;
                winner("rgba(50,50,50,0.2)");
            }
            if(black_pieces < 1){
                current_winner = current_w.Red_won;
                winner("rgba(255,0,0,0.2)");
            }
        });
        tile.appendChild(placeholder);
    }
}