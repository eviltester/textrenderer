function TextRenderStyleConfig(){

    var style=0; // 0 - normal, 1 - outline
    var textColour="black";
    var effectColour="white";
    var effectWidth=4;

    this.setStyle = function(styleId){
        // 0 - normal
        // 1 - outline
        // 2 - shadow
        // 3 - glow

        if(isNaN(Number(styleId))){
            style=0;
        }else{
            style=Number(styleId);
        }
        if(style>3){
            style=3;
        }
        return this;
    };

    this.getStyle = function(){
        return style;
    };

    this.setFontColour = function(aColour){
        textColour = aColour;
        return this;
    };

    this.getFontColour = function(){
        return textColour;
    };

    this.setEffectColour = function(aColour){
        effectColour = aColour;
        return this;
    };

    this.getEffectColour = function(){
        return effectColour;
    };

    this.setEffectWidth = function(aNumber){
        effectWidth = aNumber;
        return this;
    };

    this.getEffectWidth = function(){
        return effectWidth;
    };
}
