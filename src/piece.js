/**
 * Utility class used to hold the parameters and properties of all the checkers pieces
 * 
 */
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
        curr_tile.appendChild(piece);
    }

}