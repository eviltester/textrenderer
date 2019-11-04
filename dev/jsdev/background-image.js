function BackgroundImage(){

    this.enabled = false;
    this.url = "";

    this.setImageUrl = function(aUrl){
        this.url = aUrl;
        this.enabled = true;
        return aUrl;
    }

    this.renderImageIn = function(ctx, afterRendering, onFailToLoad){

        if(!this.url || this.url.length==0){console.log("No URL set"); onFailToLoad()}

        var background = new Image();
        background.crossOrigin = "Anonymous";   // requires header from server Access-Control-Allow-Origin "*"

        background.onload = function(){

            // actual size
            // ctx.drawImage(background,0,0);

            // scaled to canvas
            // could be done using scaling code scale ratio of 100, 100 and y offset, x offset of 0
            ctx.drawImage(background,0,0, background.width, background.height, 0,0, ctx.canvas.width, ctx.canvas.height);

            // scale image
            var initialxratio = 75;
            var initialyratio = 75;
            var xratio = initialxratio / 100;
            var yratio = initialyratio / 100;

            var imagexOffset=0;
            var imageyOffset=0;

            // center image
            imagexOffset = (ctx.canvas.width - (ctx.canvas.width*xratio))/2;
            imageyOffset = (ctx.canvas.height - (ctx.canvas.height*yratio))/2;


            // centered with custom scale
            //ctx.drawImage(background,0,0, background.width, background.height, 0+imagexOffset,0+imageyOffset, ctx.canvas.width*xratio, ctx.canvas.height*yratio);

            afterRendering();
        }

        background.onerror = function(){
            // TODO: create a GUI control for error reporting
            console.log("could not load image, rendering with background instead");
            onFailToLoad();
        }

        background.src = this.url;

    }


}