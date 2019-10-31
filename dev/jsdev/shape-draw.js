function ShapeDraw(){

    this.x=0;
    this.y=0;

    // rect
    // ellipse
    this.shape = "rect";

    this.width=0;
    this.height=0;

    this.angle=0;

    this.fillcolour="black";
    this.fillOpacity=1;

    this.lineColour;
    this.lineWidth;

    this.defineRect = function(anX, anY, aWidth, aHeight, anAngle, aColour, anOpacity){
        this.x = anX;
        this.y = anY;
        this.width = aWidth;
        this.height = aHeight;
        this.angle = anAngle;
        this.fillcolour = aColour;
        this.fillOpacity = anOpacity;
        return this;
    }

    this.drawShape = function(ctx){
        ctx.save();
        ctx.fillStyle = new ColourConvertor().hexToRgb(this.fillcolour, this.fillOpacity);
        if(this.angle > 0){
            xoffset = this.x + this.width /2; // center x
            yoffset = this.y + this.height /2; // center y
            ctx.translate(xoffset, yoffset);
            ctx.rotate(this.angle * Math.PI / 180); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
            ctx.translate(-xoffset, -yoffset);
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

