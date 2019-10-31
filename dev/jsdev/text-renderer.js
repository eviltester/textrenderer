
function TextRenderer(){
    var config;

    this.setStyle = function(aStyleConfig){
        config=aStyleConfig;
        return this;
    };

    this.render = function(ctx, text, x, y){

        if(config.getStyle()==1){
            textEffectOutline(ctx, text, x, y,
                config.getFontColour(),
                config.getEffectColour(),
                config.getEffectWidth());
            return;
        }

        if(config.getStyle()==2){
            textEffectShadow(ctx, text, x, y,
                config.getFontColour(),
                config.getEffectColour(),
                config.getEffectWidth());
            return;
        }

        if(config.getStyle()==3){
            textEffectGlow(ctx, text, x, y,
                config.getFontColour(),
                config.getEffectColour(),
                config.getEffectWidth());
            return;
        }

        // default normal
        //if(style==0){
        textEffectNormal(ctx, text, x, y,
            config.getFontColour());
        //}
    };

    function textEffectOutline(ctx, text, x, y, theTextColour, theOutlineColour='black', theOutlineWidth=4){
        ctx.fillStyle = theTextColour;
        ctx.save();
        ctx.strokeStyle = theOutlineColour;
        ctx.lineWidth = theOutlineWidth;
        ctx.lineJoin="round";
        ctx.miterLimit=2;
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
        ctx.restore();
    }

    function textEffectNormal(ctx, text, x, y, theTextColour){
        ctx.fillStyle = theTextColour;
        ctx.fillText(text, x, y);
    }

    function textEffectShadow(ctx, text, x, y, theTextColour, theShadowColour='black', theShadow = 4)
    {
        ctx.fillStyle = theTextColour;
        ctx.save();
        ctx.shadowBlur = 0;
        ctx.shadowColor = theShadowColour;
        ctx.shadowOffsetX = theShadow;
        ctx.shadowOffsetY = theShadow;
        ctx.fillText(text, x, y);
        ctx.restore();
    }

    function textEffectGlow(ctx, text, x, y, theTextColour, theGlowColour='red', theGlowSize = 10)
    {
        ctx.fillStyle = theTextColour;
        ctx.save();
        ctx.shadowBlur = theGlowSize;
        ctx.shadowColor = theGlowColour;
        ctx.strokeText(text, x, y);

        for(let i = 0; i < 3; i++) {
            ctx.fillText(text, x, y);
        }
        ctx.restore();
    }
}



