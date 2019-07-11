var movestart = 0;
var piece1;
var piece2;
var i;
var coords;
var select;
var blackKingMoved;
var whiteKingMoved;
var turn='white';
var leftBorder=['0','8','16','24','32','40','48','56'];
var rightBorder=['7','16','23','31','39','47','55','63'];


DivObject = function(type,order,colour){ //Piece spawner.
    var div = document.createElement('div');
    if (type != "tile"){
    div.innerHTML = "<img src=\"Pieces/"+colour+type+".png\" alt=\"R\">";
    }
    div.setAttribute("class", type);
    div.className += colour;
    div.setAttribute("order" , order);
    div.setAttribute("style", "order: "+order+";");
    document.querySelector(".wrap").appendChild(div);
}

class Piece { 
    constructor(type,order,colour){
        DivObject(type,order,colour)
    }
}

function PieceGenerator (){ //Starts piece generation process.
    var pieceorder = ["rook","knight","bishop","queen","king","bishop","knight","rook"];
    var order = 0;
    for(i=0;i<8;i++,order++){
        var piece = new Piece(pieceorder[i],order,"black");
    }  
    for(i=0;i<48;i++,order++){
        if (i<8){var pawn = new Piece("pawn",order,"black");}
        else if (i<40&&i>7){var tile = new Piece("tile",order,"");}
        else if (i<48&&i>39){var pawn = new Piece("pawn",order,"white");}
    }
        for(i=0;i<8;i++,order++){
        var piece = new Piece(pieceorder[i],order,"white");
    } 
}

function PieceMover(){ //Moves pieces.
    document.getElementById("turn").innerHTML=turn;
    select = document.querySelectorAll("[order]") //Selecting all pawns.
    if(coords==null){coords = Array.prototype.slice.call(select);}
    for (i=0;i<select.length;i++){
        MoverEnabler(i, select);
    }
    if (movestart == 2)
        {
        var temp, temp2;
        temp = piece1.getAttribute("order");
        temp2 = piece2.getAttribute("order");
        if(piece1.getAttribute('class').endsWith(turn)==true){
            if((piece1.getAttribute('class').endsWith("white")==true&&piece2.getAttribute('class').endsWith("black"))==true||(piece1.getAttribute('class').endsWith("black")==true&&piece2.getAttribute('class').endsWith("white")==true||piece2.getAttribute('class').endsWith("tile")==true)){
                if(KingMover()==true||PawnMover()==true||QueenMover()==true||RookMover()==true||BishopMover()==true||KnightMover()==true){
                    var swap1 = document.querySelector("div[order='"+temp+"']").style.order = temp2;
                    var swap2 = document.querySelector("div[order='"+temp2+"']").style.order = temp;
                    var order1 = document.querySelector("[style=\"order: "+temp2+";\"]").setAttribute("order" , temp2);
                    var order2 = document.querySelector("[style=\"order: "+temp+";\"]").setAttribute("order" , temp);    
                    coords [temp] = piece2;
                    coords [temp2] = piece1;
                    PieceRemover(temp);
                    var pos = document.getElementsByClassName("king"+turn)[0].getAttribute("order");
                        if(IsInCheck(coords, pos)==true){
                            temp = piece1.getAttribute("order");
                            temp2 = piece2.getAttribute("order");
                            var swap1 = document.querySelector("div[order='"+temp+"']").style.order = temp2;
                            var swap2 = document.querySelector("div[order='"+temp2+"']").style.order = temp;
                            var order1 = document.querySelector("[style=\"order: "+temp2+";\"]").setAttribute("order" , temp2);
                            var order2 = document.querySelector("[style=\"order: "+temp+";\"]").setAttribute("order" , temp);    
                            coords [temp] = piece2;
                            coords [temp2] = piece1;
                            PieceRestorer(temp2)
                        }
                        else{
                            if (turn=="white"){turn="black";}
                            else {turn="white";}
                        }
                }
            }
        }
        PawnMover();
        movestart = 0;
        piece1 = 0;
        piece2 = 0;
        i=0;
        temp = 0;
        temp2 = 0;    
        PieceMover();
    }    
    if (movestart == 3){
        var temp, temp2;
        temp = piece1.getAttribute("order");
        temp2 = piece2.getAttribute("order");
        var swap1 = document.querySelector("div[order='"+temp+"']").style.order = temp2;
        var swap2 = document.querySelector("div[order='"+temp2+"']").style.order = temp;
        var order1 = document.querySelector("[style=\"order: "+temp2+";\"]").setAttribute("order" , temp2);
        var order2 = document.querySelector("[style=\"order: "+temp+";\"]").setAttribute("order" , temp);    
        coords [temp] = piece2;
        coords [temp2] = piece1;
    }    
}

function Mover1(){  //Saves first piece info.
    if (this.getAttribute('class').endsWith(turn)){
        this.style.background="blue";
        piece1 = this;
        movestart = 1;
        console.log(piece1);    
        if (this.getAttribute('class')=="tile"){
            movestart = 0;
            piece1 = 0;
            this.style="\"order:"+piece1.getAttribute('order')+";\"";
        }
        PieceMover();
    }
}

function Mover2(){  //Saves second piece info.
        piece2 = this;
        if (piece2.getAttribute('class').endsWith(turn)==piece2.getAttribute('class').endsWith(turn)){
            document.querySelector("div[order='"+piece1.getAttribute('order')+"']").setAttribute("style", "order: "+piece1.getAttribute('order')+";");
            movestart=0;
            PieceMover();
        }
        movestart = 2;
    console.log(piece2);
    PieceMover();
}

function MoverEnabler(i, select){  //Adds Event Listeners.
    if (movestart == 0){
        select[i].removeEventListener('click', Mover2);
        select[i].addEventListener('click', Mover1);
    }
    else if (movestart == 1){
        select[i].removeEventListener('click', Mover1);
        select[i].addEventListener('click', Mover2);
    }
}

/**
 *
 *
 * @param {String} temp2 Coordinates of the deleted piece.
 */
function PieceRemover(temp2){   //Deletes pieces after capture.
var class1=piece1.getAttribute('class')
var class2=piece2.getAttribute('class')

    if((class1.endsWith("white")==true&&class2.endsWith("black"))==true||(class1.endsWith("black")==true&&class2.endsWith("white")==true)){
        document.querySelector("div[order='"+temp2+"']").setAttribute("class" , "tile")
        var destroy = document.querySelector("div[order='"+temp2+"']").innerHTML = "";
    }
}

/**
 *
 *
 * @param {String} temp2 Coordinates of the deleted piece.
 */
function PieceRestorer(temp2){  //Restores pieces after illegal capture.
    var notturn;
    if (turn=="white"){notturn="black";}
    else {notturn="white";}
    var pieceorder = ["rook","knight","bishop","queen","king"];
    for (i=0;i<5;i++){
        if (piece2.getAttribute("class")==pieceorder[i]){
            document.querySelector("div[order='"+temp2+"']").setAttribute("class" , [pieceorder[i]]);
            var create = document.querySelector("div[order='"+temp2+"']").innerHTML = "<img src=\"Pieces/"+notturn+pieceorder1+".png\" alt=\"R\">";;
        }
    }
}

/**
 *
 *
 * @param {Int} pos position of piece.
 * @param {String} x direction in which piece moves.
 * @returns if piece can move further.
 */
function BorderChecker(pos,x){  //Checks if piece reached the border. Prevents illegal moves.
    
    if ([0,8,16,24,32,40,48,56].includes(pos)&&x=='left'){
        return true; //Left
    }
    if ([7,15,23,31,39,47,55,63].includes(pos)&&x=='right'){
        return true; //Right
    }
    if ([0,8,16,24,32,40,48,56].includes(pos)&&x!='left'){
        return false; //Left
    }
    if ([7,15,23,31,39,47,55,63].includes(pos)&&x!='right'){
        return false; //Right
    }
    else{
        return false;
    }
}

function MoveDiagonally(){ //Manages Diagonal moving of Queen and Bishops.
    var piecetype=["queen","bishop"]
    pos = parseInt(piece1.getAttribute('order'));
    tile = parseInt(piece2.getAttribute('order'));
    var length = pos - tile;
    if (length < 0){length=-length}
    length/=9;
    if (pos>tile){
        for (var f=0;f<=length;f++){
            if (IfPieceChecker(coords,pos,piecetype)==false||f==length){
                if(tile==pos){
                    return true;
                }
                break;
            }   
            else{pos-=9;}
        }
        pos = parseInt(piece1.getAttribute('order'));
        tile = parseInt(piece2.getAttribute('order'));
        length = pos - tile;
        if (length < 0){length=-length}
        length/=7;
        for (var f=0;f<=length;f++){
            if (IfPieceChecker(coords,pos,piecetype)==false||f==length){
                if(tile==pos){
                    return true;
                }
                break;
            }   
            else{pos-=7;}
        }
    }
        pos = parseInt(piece1.getAttribute('order'));
        tile = parseInt(piece2.getAttribute('order'));
        length = pos - tile;
        if (length < 0){length=-length}
        length/=9;
    if (pos<tile){
        for (var f=0;f<=length;f++){
            if (IfPieceChecker(coords,pos,piecetype)==false||f==length){
                if(tile==pos){
                    return true;
                }
                break;
            }   
            else{pos+=9;}
        }
        pos = parseInt(piece1.getAttribute('order'));
        tile = parseInt(piece2.getAttribute('order'));
        length = pos - tile;
        if (length < 0){length=-length}
        length/=7;
        for (var f=0;f<=length;f++){
            if (IfPieceChecker(coords,pos,piecetype)==false||f==length){
                if(tile==pos){
                    return true;
                }
                break;
            }   
            else{pos+=7;}
        }
    }
}

function MoveHorizontally(){   //Manages Vertical and Horizontal moving of Queen and Rooks.
    var piecetype=["queen","rook"]
        pos = parseInt(piece1.getAttribute('order'));
        tile = parseInt(piece2.getAttribute('order'));
    var length = pos - tile;
    if (length < 0){length=-length}
    if (pos>tile){      //Moving Horizontally.
        for (var f=0;f<=length;f++){
            if (IfPieceChecker(coords,pos,piecetype)==false||f==length||BorderChecker(pos,'left')){
                if(tile==pos){
                    return true;
                }
                break;
            }
            else{pos-=1;}
        }
        pos = parseInt(piece1.getAttribute('order'));
        tile = parseInt(piece2.getAttribute('order'));
        if (length < 0){length=-length}
        length/=8;
        for (var f=0;f<8;f++){
            if (IfPieceChecker(coords,pos,piecetype)==false||f==length){
                if (tile==pos){
                    return true;
                }
                break;
            }
            else{pos-=8;}
        }
    }
        pos = parseInt(piece1.getAttribute('order'));
        tile = parseInt(piece2.getAttribute('order'));
        length = tile - pos;
        if (length < 0){length=-length}
    if (pos<tile){
        for (var f=0;f<8;f++){
            if (IfPieceChecker(coords,pos,piecetype)==false||f==length||BorderChecker(pos,'right')){
                if (tile==pos){
                    return true;
                }
                break;
            }
            else{pos+=1;}
        }
        pos = parseInt(piece1.getAttribute('order'));
        tile = parseInt(piece2.getAttribute('order'));
        length = tile - pos;
        if (length < 0){length=-length}
        length/=8;
        for (var f=0;f<8;f++){
            if (IfPieceChecker(coords,pos,piecetype)==false||f==length){
                if (tile==pos){
                    return true;
                }
                break;
            }
            else{pos+=8;}
        }
    }
}

/**
 *  Initializers are MoveHorizontally and MoveDiagonally.
 *
 * @param {Object Array} coords array that contains the actual state of the board.
 * @param {Int} pos position of piece.
 * @param {String Array} piecetype type of piece.
 * @returns if the path is cleared of any other pieces.
 */
function IfPieceChecker(coords,pos,piecetype){    //Essential piece of Rook, Bishop and Queen movement.
    if (pos<0&&pos>63){return false;}
        for(i=0;i<2;i++){
            if (coords[pos].getAttribute('class').startsWith(piecetype[i])==true){
                return true;
            }
        if(coords[pos].getAttribute('class').startsWith('tile')==true){
            return true;
        }
    }
    return false;
}

function PawnMover(){   //Manages the movement of Pawns.
    if(piece1.getAttribute('class').startsWith("pawn")==true){
        var class1 = piece1.getAttribute('class')
        var class2 = piece2.getAttribute('class')
        var pos = piece1.getAttribute('order');
        var tile = piece2.getAttribute('order');
        if(class1.endsWith("white")){
            if (tile==(pos-8)&&class2.startsWith('tile')) {
                return true; //Up
            }
            if ((tile==(pos-7)||tile==(pos-9))&&class2.endsWith('black')) {
                return true; //Up
            }
            if ((['48','49','50','51','52','53','54','55'].includes(pos))&&tile==(pos-16)) {
                return true; //Up2
            }
            if(['0','1','2','3','4','5','6','7'].includes(pos)){
                piece1.setAttribute('class', 'queenwhite')
                piece1.innerHTML = "<img src=\"Pieces/WhiteQueen.png\" alt=\"Q\">";
            }
        }
        if(class1.endsWith("black")){
            if (pos==(tile-8)&&class2.startsWith('tile')) {
                return true; //Down
            }
            if ((pos==(tile-7)||pos==(tile-9))&&class2.endsWith('white')) {
                return true; //Up
            }
            if ((['8','9','10','11','12','13','14','15'].includes(pos))&&pos==(tile-16)) {
                return true; //Down2
            }
            if(['56','57','58','59','60','61','62','63'].includes(pos)){
                piece1.setAttribute('class', 'queenblack')
                piece1.innerHTML = "<img src=\"Pieces/BlackQueen.png\" alt=\"Q\">";
            }
        }
    }
}

function KingMover(){   //Manages the movement of King.
    if(piece1.getAttribute('class').startsWith("king")==true){
        var pos = parseInt(piece1.getAttribute('order'));
        var tile = parseInt(piece2.getAttribute('order'));
        if (tile==(pos+2)&&window[turn+'KingMoved']!=1){
            CastlingKingside(coords,pos);
        }
        else if (tile==(pos-2)&&window[turn+'KingMoved']!=1){
            CastlingQueenside(coords,pos);
        }
        else if (tile==(pos-8)||tile==(pos+8)){
            window[turn+'KingMoved']=1;
            return true; //Up and Down
        }
        else if ((!leftBorder.includes(pos))&&(tile==(pos-9)||tile==(pos-1)||pos==(tile-7))) {
            window[turn+'KingMoved']=1;
            return true; //Left
        }
        else if ((!rightBorder.includes(pos))&&(tile==(pos-7)||pos==(tile-9)||pos==(tile-1))) {
            window[turn+'KingMoved']=1;
            return true; //Right
        }
    }
}

function QueenMover(){  //Manages the movement of Queen.
    if(piece1.getAttribute('class').startsWith("queen")==true){
        var pos = piece1.getAttribute('order');
        var tile = piece2.getAttribute('order');
        if (MoveHorizontally()==true||MoveDiagonally()==true){
            return true;
        }
    }
}

function RookMover(){   //Manages the movement of Rooks.
    if(piece1.getAttribute('class').startsWith("rook")==true){
        var pos = piece1.getAttribute('order');
        var tile = piece2.getAttribute('order');
        if (MoveHorizontally()==true){
            return true;
        }
    }
}

function BishopMover(){ //Manages the movement of Bishops.
    if(piece1.getAttribute('class').startsWith("bishop")==true){
        var pos = piece1.getAttribute('order');
        var tile = piece2.getAttribute('order');
        if (MoveDiagonally()==true){
            return true;
        }
    }
}

function KnightMover(){ //Manages the movement of Knights.
    if(piece1.getAttribute('class').startsWith("knight")==true){
        var leftBorder2 = [1,9,17,25,33,41,49,57];
        var rightBorder2 = [6,15,22,30,38,46,54,62];
        pos = parseInt(piece1.getAttribute('order'));
        tile = parseInt(piece2.getAttribute('order'));
        if (leftBorder.includes(pos)&&(tile==(pos-15)||tile==(pos-6)||tile==(pos+17)||tile==(pos+10))){
            return true; //Left1
        }
        else if (rightBorder.includes(pos)&&(tile==(pos-17)||tile==(pos-10)||tile==(pos+15)||tile==(pos+6))){
            return true; //Right1
        }
        else if (leftBorder2.includes(pos)&&(tile==(pos+15)||tile==(pos-17)||tile==(pos-15)||tile==(pos-6)||tile==(pos+17)||tile==(pos+10))){
            return true; //Left2
        }
        else if (rightBorder2.includes(pos)&&(tile==(pos+17)||tile==(pos-15)||tile==(pos-17)||tile==(pos-10)||tile==(pos+15)||tile==(pos+6))){
            return true; //Right2
        }
        else if(![leftBorder,rightBorder,leftBorder2,rightBorder2].includes(pos)){
            if (tile==(pos-17)||tile==(pos-15)||tile==(pos-10)||tile==(pos-6)){
                return true; //Up
            }
            else if (tile==(pos+17)||tile==(pos+15)||tile==(pos+10)||tile==(pos+6)){
               return true; //Down
            }
        }
    }
}

/**
 *
 *
 * @param {Object Array} coords array that contains the actual state of the board.
 * @param {Int} pos position of piece.
 */
function CastlingKingside(coords,pos){ //Manages kingside castling.
    var king = piece1.getAttribute("class")
    if (window[turn+'KingMoved']!=1&&
    coords[pos+1].getAttribute('class')=="tile"&&
    coords[pos+2].getAttribute('class')=="tile"&&
    coords[pos+3].getAttribute('class').startsWith("rook")){
        piece1=coords[pos+3];
        piece2=coords[pos+1];
        movestart = 3;
        PieceMover();
        piece1=coords[pos];
        piece2=coords[pos+2];
        movestart = 3;
        PieceMover();
        movestart = 2;
        window[turn+'KingMoved']=1;
        if (turn=="white"){turn="black";}
        else {turn="white";}
        PieceMover();
    }
}

/**
 *
 *
 * @param {Object Array} coords array that contains the actual state of the board.
 * @param {Int} pos position of piece.
 */
function CastlingQueenside(coords,pos){ //Manages queenside castling.
    var king = piece1.getAttribute("class")
    if (window[turn+'KingMoved']!=1&&
    coords[pos-1].getAttribute('class')=="tile"&&
    coords[pos-2].getAttribute('class')=="tile"&&
    coords[pos-3].getAttribute('class')=="tile"&&
    coords[pos-4].getAttribute('class').startsWith("rook")){
        piece1=coords[pos-4];
        piece2=coords[pos-1];
        movestart = 3;
        PieceMover();
        piece1=coords[pos];
        piece2=coords[pos-2];
        movestart = 3;
        PieceMover();
        movestart = 2;
        window[turn+'KingMoved']=1;
        if (turn=="white"){turn="black";}
        else {turn="white";}
        PieceMover();
    }
}

/**
 *
 *
 * @param {Object Array} coords array that contains the actual state of the board.
 * @param {Int} pos position of piece.
 * @returns true if king is in check.
 */
function IsInCheck(coords,pos){ //Checks if king is in danger.
    pos = parseInt(pos);
    var notturn;
    var l = 0;
    var knightmovement = [pos-17,pos-15,pos-10,pos-6,pos+17,pos+15,pos+10,pos+6];
    var parameters;

    if (turn=="white"){notturn="black";}
    else {notturn="white";}

for (var i=0;i<8;i++){
    parameters = [pos+i,pos+i-l,pos-i,pos-i+l,pos+(i*8),pos+(i*8)-(l*8),pos-(i*8),pos-(i*8)+(l*8),pos+(i*9),pos+(i*9)-(l*9),pos+(i*7),pos+(i*7)-(l*7),pos-(i*9),pos-(i*9)+(l*9),pos-(i*7),pos-(i*7)+(l*7)];
    if([leftBorder,rightBorder].includes(pos+i)){
        if (coords[pos+i].getAttribute('class')=='tile'){
            return false;
        }
    }
    if([leftBorder,rightBorder].includes(pos-i)){
        if (coords[pos-i].getAttribute('class')=='tile'){
            return false;
        }
    }
    for(var c=0;c<16;c+=2){
        if (c>=8){type="bishop"}
        else{type="rook"}
            if(parameters[c]<=63&&parameters[c]>=0&&(coords[parameters[c]].getAttribute('class').endsWith(type+notturn)||coords[parameters[c]].getAttribute('class').endsWith("queen"+notturn))){
                do{
                    l++;
                    parameters = [pos+i,pos+i-l,pos-i,pos-i+l,pos+(i*8),pos+(i*8)-(l*8),pos-(i*8),pos-(i*8)+(l*8),pos+(i*9),pos+(i*9)-(l*9),pos+(i*7),pos+(i*7)-(l*7),pos-(i*9),pos-(i*9)+(l*9),pos-(i*7),pos-(i*7)+(l*7)];
                    if (coords[parameters[c+1]].getAttribute('class').startsWith("tile")==false&&coords[parameters[c+1]].getAttribute('class').startsWith("king"+turn)==false){
                        return false;
                    }
                    else if([leftBorder,rightBorder].includes(parameters[c+1])){
                        break;
                    }
                }while(coords[parameters[c+1]].getAttribute('class').startsWith("king"+turn)==false)
                if (coords[parameters[c+1]].getAttribute('class').startsWith("king"+turn)==true)
                {
                    return true;
                }
            }
        }
    }
    if (pos-9>=0&&pos-7>=0){
        if(coords[pos-9].getAttribute('class').endsWith("pawn"+notturn)||coords[pos-7].getAttribute('class').endsWith("pawn"+notturn)){
            return true;
        }
    }
    for(c=0;c<8;c++){
        if (knightmovement[c]>=0&&knightmovement[c]<=63){
            if(coords[knightmovement[c]].getAttribute('class').endsWith("knight"+notturn)){
                return true;
            }
        }
    }
}

PieceGenerator();   //Initialization.
PieceMover();