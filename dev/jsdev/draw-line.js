
function DrawLine(){

    this.x;
    this.y;
    this.text;

    this.set = function(anX, aY, theText){
        this.x = anX;
        this.y = aY;
        this.text = theText;
        return this;
    };
}

