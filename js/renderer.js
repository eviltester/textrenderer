/*
    Informal version tracking

    20191109 - added simple copy to clipboad button
    20191107 - footer auto config now added to GUI
    20191106 - split out text formatting, wrap code to a class, allows autosize of footer to have different size if too large, fixed bug where footer vertical adjust slider did not adjust y value
    20191031 - split into multiple files to make js easier to edit, side-effect html validation easier added background shape
    20191029 - all html code events added by js, and config controlled by js min, max, value, defaults, changed label to number and  hooked slider to number, text alignment
    20191026 - added basic font effect control - normal, outline, shadow, glow
    20191020 - added dom subtree hook to getFooterTextFrom
    20191020 - started tracking

    Renderer is open source and available from: https://github.com/eviltester/textrenderer

*/
function ClipboardIntegrator(){

    this.addCopyToGUIAfter = function(aQuerySelector){

        var buttonId = new Date().getTime().toString() + Math.floor(Math.random()*100).toString();
        const clipboard_copy_gui = `
            <button id="copy${buttonId}" class="copyclipboardbutton" onclick="document.querySelector('${aQuerySelector}').select();document.execCommand('copy');"
            >
                Copy to Clipboard
            </button>
        `;

        myHtml = clipboard_copy_gui;
        document.querySelector(aQuerySelector).insertAdjacentHTML('afterend', myHtml);
        return this;
    }
}function GuiHtml(){

    const rendering_gui_html = `
    <div id="rendering">

        <button id="renderfromguibutton">RENDER</button>
        <br/>

        <div>
            <div class="canvasdisplay">
                <button id="render1080x1080">1080x1080 (square, instagram)</button>
                <button id="render1024x512">1024x512 (rectangle, twitter)</button>
                <canvas id="renderslogan" class="rendercanvas" width="1080px" height="1080px"/>
            </div>
            <div id="renderingcontrols" class="renderingcontrols">
                <div class="defaultcontrol">
                    <button id="resetdefaults">Reset Defaults</button>
                </div>
                <div><button id="show-hide-text-config" class="showhidebutton" value="Text Config">Show Text Config</button></div>
                <div class="textbodyconfig">
                    <div class="textbodyfontconfig">
                        <div class="textbodyfontnameconfig">
                            <select id="textfontselector">
                                <!-- https://www.w3schools.com/cssref/css_websafe_fonts.asp -->
                                <option value="serif">serif</option>
                                <option value="georgia">Georgia</option>
                                <option value="palatino">Palatino</option>
                                <option value="palatino linotype">Palatino Linotype</option>
                                <option value="book antiqua">Book Antiqua</option>
                                <option value="times new roman">Times New Roman</option>
                                <option value="times">Times</option>
            
                                <option value="sans serif">---</option>
                                <option value="sans serif">sans serif</option>
                                <option value="arial">Arial</option>
                                <option value="helvetica">Helvetica</option>
                                <option value="arial black">Arial Black</option>
                                <option value="gadget">Gadget</option>
                                <option value="comic sans ms">Comic Sans MS</option>
                                <option value="cursive">Cursive</option>
                                <option value="impact">Impact</option>
                                <option value="charcoal">Charcoal</option>
                                <option value="lucida sans unicode">Lucida Sans Unicode</option>
                                <option value="lucida grande">Lucida Grande</option>
                                <option value="tahoma">Tahoma</option>
                                <option value="geneva">Geneva</option>
                                <option value="trebuchet ms">Trebuchet MS</option>
                                <option value="verdana">Verdana</option>
            
                                <option value="monospace">---</option>
                                <option value="monospace">monospace</option>
                                <option value="courier new">Courier New</option>
                                <option value="courier">Courier</option>
                                <option value="monaco">Monaco</option>
                                <option value="lucida console">Lucida Console</option>
            
                                <option value="roboto">---</option>
                                <option value="roboto">Roboto</option>
                                <option value="garamond">Garamond</option>
                                <option value="bookman">Bookman</option>
                                <option value="candara">Candara</option>
                                <option value="calibri">Calibri</option>
            
                            </select>
                        </div>
                    
                        <div class="textbodyfontsizeconfig">
                            <div class="textbodyfontsizeautocontrol">
                                <input type="checkbox" id="autofontsize" checked>Auto Size
                            </div>
                            <div class="textbodyfontsizecontrol">
                                <label for="fontsize">Font Size <input type="number" id="fontsizedisplay"/></label>
                                <input type="range" class="slider" id="fontsize">
                            </div>

                         </div>        
        
                        <div class="textalignconfig">
                            <div class="textaligncenterconfig">
                                  <input id="textalignleft" type="radio" name="textalign" value="left">Left
                                  <input id="textaligncenterleft" type="radio" name="textalign" value="centerleft" checked>Center Left
                                  <input id="textaligncenter" type="radio" name="textalign" value="center">Center
                                  <input id="textaligncenterright" type="radio" name="textalign" value="centerright">Center Right
                                  <input id="textalignright" type="radio" name="textalign" value="right">Right
                            </div>
                        </div>

                        <div class="splitInNewLineConfig">
                            <input type="checkbox" id="splitonnewline" checked/> Split On New Line
                        </div>

                        <div class="maxcharsperlineconfig">
                            <label for="maxcharsperline">Max Chars Per Line <input type="number" id="maxcharsperlinedisplay"/></label>
                            <input type="range" class="slider" id="maxcharsperline">
                        </div>
                        
                        <div class="sloganyadjustconfig">
                            <label for="sloganyadjust">Slogan Vertical Adjust <input type="number"  id="sloganyadjustdisplay" /></label>
                            <input type="range" class="slider" id="sloganyadjust">
                        </div>  
                                               
                        <div class="textlinespacingconfig">
                            <label for="textlinespacing">Line Spacing <input type="number"  id="textlinespacingdisplay"/></label>
                            <input type="range" class="slider" id="textlinespacing">
                        </div>                        
                        
                        <div class="textborderconfig">
                            <label for="textborder">Text Border <input type="number"  id="textborderdisplay"/></label>
                            <input type="range" class="slider" id="textborder">
                        </div>
                    </div>
                </div>
                
                <div><button id="show-hide-footer-config" class="showhidebutton" value="Footer Config">Show Footer Config</button></div>
                
                <div class="textfooterconfig">
                    <div class="displayFooterConfig">
                        <input type="checkbox" id="displayFooter" checked>Display Footer
                    </div>
                    <div class="footertextsizeauto">
                        <input id="footertextsizeautoslogan" type="radio" name="footertextsizeauto" value="slogan" checked>Slogan Size
                        <input id="footertextsizeautoself" type="radio" name="footertextsizeauto" value="self">Auto Size
                        <!--
                        <input id="footertextsizeautocustom" type="radio" name="footertextsizeauto" value="custom">Custom Size
                        -->
                    </div>
                    <div class="footerVerticalAdjustConfig">
                        <label for="footerborder">Footer Vertical Adjust <input type="number"  id="footerborderdisplay"/></label>
                        <input type="range" class="slider" id="footerborder">
                    </div>
                </div>
                
                <div><button id="show-hide-colourpickers" class="showhidebutton" value="Colour Pickers">Show Colour Pickers</button></div>
                
                <div class="colourpickers">
                    <div class="backgroundcolourpicker">
                        <label for="backcolorpicker" class="colourpickerlabel">BackGround Colour</label>
                        <input type="color" id="backcolorpicker"  class="colourpicker" value="#ff0000">
                    </div>
                    <div class="textcolourpicker">
                        <label for="textcolorpicker" class="colourpickerlabel">Text Colour</label>
                        <input type="color" id="textcolorpicker" value="#000000" class="colourpicker">
                    </div>
                </div>
                
                <div><button id="show-hide-texteffects" class="showhidebutton" value="Text Effects"></button></div>

                 <div class="textEffects">
                    <div class="texteffectstyleconfig">
                        <select id="texteffectstyleselector">
                            <option value="0" selected>Normal</option>
                            <option value="1">Outline</option>
                            <option value="2">Shadow</option>
                            <option value="3">Glow</option>
                        </select>
                    </div>
                   <div class="applyeffecttofooterconfig">
                        <input type="checkbox" id="applyeffecttofooter">Apply Effect To Footer?
                    </div>
                    <div class="textEffectColourPicker">
                        <label for="effectColourPicker" class="colourpickerlabel">Text Effect Colour</label>
                        <input type="color" id="effectColourPicker"  class="colourpicker" value="#ffffff">
                    </div>
                     <div class="texteffectsizeconfig">
                            <label for="texteffectsize">Text Effect Size <input type="number"  id="texteffectsizedisplay"/></label>
                            <input type="range" class="slider" id="texteffectsize">
                     </div>
                </div>

                <div><button id="show-hide-background-shape" class="showhidebutton" value="Background Shapes Config"></button></div>

                <div class="backgroundshapes">
                    <div class="ashapeconfig">
                        <div class="ashapeconfigdisplayshape">
                            <input type="checkbox" id="shapeConfigShape1RenderIt">Display Background Shape?
                        </div>
                        <div class="shapestyle">
                            <!--
                            <select class="shapestyleselect">
                                <option value="rect" selected>Rectangle</option>
                                <option value="circle">Circle</option>
                            </select>
                            -->
                        </div>
                        <div class="shapeConfigColourPicker">
                            <label for="shapeColourPickerShape1" class="colourpickerlabel">Shape Fill Colour</label>
                            <input type="color" id="shapeColourPickerShape1"  class="colourpicker" value="#ffffff">
                        </div>
                        <div class="shapeConfigXPos">
                            <label for="shapeConfigXShape1">X <input type="number"  id="shapeConfigXShape1Display"/></label>
                            <input type="range" class="slider" id="shapeConfigXShape1">
                        </div>
                        <div class="shapeConfigYPos">
                            <label for="shapeConfigYShape1">Y <input type="number"  id="shapeConfigYShape1Display"/></label>
                            <input type="range" class="slider" id="shapeConfigYShape1">
                        </div>
                        <div class="shapeConfigWidthPos">
                            <label for="shapeConfigWidthShape1">Width <input type="number"  id="shapeConfigWidthShape1Display"/></label>
                            <input type="range" class="slider" id="shapeConfigWidthShape1">
                        </div>
                        <div class="shapeConfigHeightPos">
                            <label for="shapeConfigHeightShape1">Height <input type="number"  id="shapeConfigHeightShape1Display"/></label>
                            <input type="range" class="slider" id="shapeConfigHeightShape1">
                        </div>
                        <div class="shapeConfigOpacity">
                            <label for="shapeConfigOpacityShape1">Opacity <input type="number"  id="shapeConfigOpacityShape1Display"/></label>
                            <input type="range" class="slider" id="shapeConfigOpacityShape1">
                        </div>
                        <div class="shapeConfigAngle">
                            <label for="shapeConfigAngleShape1">Angle <input type="number"  id="shapeConfigAngleShape1Display"/></label>
                            <input type="range" class="slider" id="shapeConfigAngleShape1">
                        </div>
                    </div>
                </div>

                
                <!-- prototype as not always going to work so don't want to confuse users -->
                <div class="backgroundimageconfig" style="display:none">
                    <div><button id="show-hide-background-image-config" class="showhidebutton" value="Background Image Config"></button></div>

                    <div class="backgroundimageconfigform">
                        <div class="backgroundimageurlinput">
                            <label for="backgroundimageurlinput">Background Image Url</label>
                            <input type="text" id="backgroundimageurlinput">
                        </div>
                        <div class="backgroundcolouropacity">
                            <label for="backgroundcolouropacity">Background Colour Opacity 0 - 1</label>
                            <input type="text" id="backgroundcolouropacity">
                        </div>
                    </div>
                </div>
                
                <div><button id="show-hide-jpgpreview" class="showhidebutton" value=".JPG Saving"></button></div>
                
                <div class="jpgimagepreview">
                    <p>for .jpg right click and save as below:</p>
                    <img id="renderjpg" crossorigin="anonymous" width="50px" height="50px"/>
                </div>
            </div>
        </div>
    </div>
    <div style="clear:both"></div>
`;

    this.html = function(){
        return rendering_gui_html;
    };
}
    

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

function TextFormatter(){

    this.configure = function(ctx, text, maxWidth, maxHeight, maxCharsPerLine, splitOnNewLine){

        this.ctx = ctx;
        this.text = text;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.maxCharsPerLine = maxCharsPerLine;
        this.splitOnNewLine = splitOnNewLine;
        return this;
    };

    this.calculateFontSizeFor = function(startFontSize, fontFamily) {

        var validFontSize = startFontSize;

        // remember current font size so we don't change it here
        var oldFontSize = this.ctx.font;

        this.ctx.font = validFontSize + "px " + fontFamily;

        var lineLength = this.ctx.measureText("X").width * this.maxCharsPerLine;

        var testFontSize = validFontSize;

        while (lineLength < this.maxWidth) {
            testFontSize++;
            this.ctx.font = testFontSize + "px " + fontFamily;
            lineLength = this.ctx.measureText("X").width * this.maxCharsPerLine;
            if (lineLength < this.maxWidth) {
                validFontSize = testFontSize;
            }
        }

        // restore old font size
        this.ctx.font = oldFontSize;

        return validFontSize;
    }

    this.calculateFontSizeForActualText = function(startFontSize, fontFamily, actualText) {

        var validFontSize = startFontSize;

        // remember current font size so we don't change it here
        var oldFontSize = this.ctx.font;

        this.ctx.font = validFontSize + "px " + fontFamily;

        var lineLength = this.ctx.measureText(actualText).width;

        var testFontSize = validFontSize;

        while (lineLength < this.maxWidth) {
            testFontSize++;
            this.ctx.font = testFontSize + "px " + fontFamily;
            lineLength = this.ctx.measureText(actualText).width;
            if (lineLength < this.maxWidth) {
                validFontSize = testFontSize;
            }
        }

        // restore old font size
        this.ctx.font = oldFontSize;

        return validFontSize;
    }

    this.getFontConfigString = function(thesize, thefamily){
        return thesize + "px " + thefamily;
    }

    this.wrapText = function(forWidth) {
        var lines = [];
        if(!this.splitOnNewLine){
            this.text = this.text.replace(/\n/g," ")
        }
        var words = this.text.split(' ');
        var line = '';

        // add words until the length of the string is greater than maxWidth
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.ctx.measureText(testLine);
            var testWidth = metrics.width;
            var endLineWithWord = false;

            if (this.splitOnNewLine && words[n].includes("\n")) {
                splitWord = words[n].split("\n");
                line = line + splitWord[0];
                lines.push(line);
                for(var extraindex=1;extraindex<splitWord.length; extraindex++){
                    line = splitWord[extraindex];
                    if(extraindex==splitWord.length-1){
                        line = line + " ";
                    }else{
                        lines.push(line);
                    }
                }

            } else {
                if (words[n].endsWith("\n") && this.splitOnNewLine) {
                    endLineWithWord = true;
                }
                if (testWidth > forWidth && n > 0) {
                    endLineWithWord = true;
                }

                if (endLineWithWord) {
                    lines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
        }
        lines.push(line);

        return lines;
    }

    this.formatTextFor = function(linespacing, textAlign, yoffset, xoffset, verticalCentering){

        lineHeight = this.ctx.measureText("X").actualBoundingBoxAscent + linespacing;

        maxLineWidth = this.ctx.measureText("X").width * this.maxCharsPerLine;

        lines = this.wrapText(maxLineWidth);

        drawLines = [];

        // center text vertically
        y=0;
        if(verticalCentering) {
            y = (this.maxHeight - (lines.length * lineHeight)) / 2;
        }
        y += yoffset;

        //
        // ALIGN SLOGAN TEXT HORIZONTALLY
        //
        // center text horizontally
        longestLength = 0;
        longestLine = 0;

        // left align by default
        for (x = 0; x < lines.length; x++) {
            var lineLength = this.ctx.measureText(lines[x]).width;
            if (lineLength > longestLength) {
                longestLength = lineLength;
                longestLine = x;
            }
        }

        x = (this.maxWidth - longestLength) / 2;
        if (x < 0) {
            x = 0;
        }
        x += xoffset;


        // apply x,y to lines
        liney=y;
        for (var n = 0; n < lines.length; n++) {
            switch(textAlign) {
                case "centerleft":
                    // centered on longest line and shorter lines are on the left of this
                    drawLines.push(new DrawLine().set(x, liney, lines[n]));
                    break;
                case "center":
                    // all lines individually centered
                    x = (this.ctx.canvas.width / 2) - (this.ctx.measureText(lines[n]).width / 2);
                    drawLines.push(new DrawLine().set(x, liney, lines[n]));
                    break;
                case "centerright":
                    // centered on longest line and shorter lines are on the right of this
                    myx = x + (longestLength - this.ctx.measureText(lines[n]).width);
                    drawLines.push(new DrawLine().set(myx, liney, lines[n]));
                    break;
                case "right":
                    // right align with border
                    x = xoffset + this.maxWidth - this.ctx.measureText(lines[n]).width;
                    drawLines.push(new DrawLine().set(x, liney, lines[n]));
                    break;
                case "left":
                default:
                    // left align with border
                    drawLines.push(new DrawLine().set(xoffset, liney, lines[n]));
            }
            liney += lineHeight;
        }

        return drawLines;

    }
}function BackgroundImage(){

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

        if(this.url.length>0) {
            background.src = this.url;
        }

    }


}function ColourConvertor(){

    this.hexToRgb = function (hex, alpha) {
        hex   = hex.replace('#', '');
        var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
        var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
        var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
        if ( alpha ) {
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
        }
        else {
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
    }
}
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

function GuiConfigurator(){

    function showHideButtonConfigure(buttonSelector, hideSelector, shownbydefault){

        var buttonElem = document.querySelector(buttonSelector);
        var prefixText = "[-] Hide";
        if(!shownbydefault){
            prefixText = "[+] Show";
            document.querySelector(hideSelector).style.display = "none";
        }
        buttonElem.innerText = prefixText + buttonElem.value;


        document.querySelector(buttonSelector).addEventListener("click", function(){
            var buttonElem = document.querySelector(buttonSelector);
            var showHideElem=document.querySelector(hideSelector);
            if(showHideElem.style.display=="none") {
                showHideElem.style.display = "block";
                buttonElem.innerText = "[-] Hide " + buttonElem.value;
            } else {
                showHideElem.style.display = "none";
                buttonElem.innerText = "[+] Show " + buttonElem.value;
            }
        });
    }

    this.displayIn = function(anId, renderAppText, renderImages, changerendersize, backgroundImageFunctionality, setTextAlign) {

        // add the HTML to the page
        if (!document.getElementById("rendering")) {
            document.getElementById(anId).insertAdjacentHTML(
                'beforeend', new GuiHtml().html());
        }

        // setup all the events and defaults

        showHideButtonConfigure("#show-hide-text-config", ".textbodyconfig", true);
        showHideButtonConfigure("#show-hide-footer-config", ".textfooterconfig", true);
        showHideButtonConfigure("#show-hide-colourpickers", ".colourpickers", true);
        showHideButtonConfigure("#show-hide-texteffects", ".textEffects", false);
        showHideButtonConfigure("#show-hide-jpgpreview", ".jpgimagepreview", false);
        showHideButtonConfigure("#show-hide-background-image-config", ".backgroundimageconfigform", false);


        document.getElementById("renderfromguibutton").addEventListener("click", renderAppText);


        document.getElementById("resetdefaults").addEventListener("click", function(){
            setDefaultSliderValues(); renderImages();
        });

        document.getElementById("textfontselector").addEventListener("change", renderImages);
        document.getElementById("autofontsize").addEventListener("change", renderImages);
        document.getElementById("splitonnewline").addEventListener("change", renderImages);

        var elems = document.querySelectorAll(".textaligncenterconfig input")
        for(elemindex=0; elemindex<elems.length; elemindex++){
            elems[elemindex].addEventListener("change", function(){
                setTextAlign();
                renderImages()
            });
        }

        var elems = document.querySelectorAll(".footertextsizeauto input")
        for(elemindex=0; elemindex<elems.length; elemindex++){
            elems[elemindex].addEventListener("change", function(){
                // set footer auto
                renderImages()
            });
        }

        document.getElementById("autofontsize").addEventListener("change", renderImages);
        document.getElementById("displayFooter").addEventListener("change", renderImages);

        document.getElementById("backcolorpicker").addEventListener("change", renderImages);
        document.getElementById("textcolorpicker").addEventListener("change", renderImages);

        document.getElementById("texteffectstyleselector").addEventListener("change", renderImages);
        document.getElementById("applyeffecttofooter").addEventListener("change", renderImages);
        document.getElementById("effectColourPicker").addEventListener("change", renderImages);

        if(backgroundImageFunctionality){
            document.querySelector(".backgroundimageconfig").style.display = "block"; // show controls
            document.getElementById("backgroundimageurlinput").addEventListener("change", renderImages);
            // opacity of background colour
            document.getElementById("backgroundcolouropacity").addEventListener("change", renderImages);
            // todo: border of background colour
            // todo: yoffset of background colour
            // todo: center image (which would also use image padding)
        }

        document.getElementById("render1024x512").addEventListener("click", function(){changerendersize(1024,512)})
        document.getElementById("render1080x1080").addEventListener("click", function(){changerendersize(1080,1080)})

        // Slider Number Hookups and defaults

        setDefaultSliderValues();

        adjustCheckStatusWhenElementId("fontsize", "change", "autofontsize", false);
        adjustCheckStatusWhenElementId("fontsizedisplay", "change", "autofontsize", false);
        adjustCheckStatusWhenElementId("fontsizedisplay", "input", "autofontsize", false);

        setMinMaxValueHook(1, 200, 80, 'fontsize', 'fontsizedisplay', renderImages);
        setMinMaxValueHook(1, 50, 15, 'maxcharsperline', 'maxcharsperlinedisplay', renderImages);
        setMinMaxValueHook(-300, 300, 0, 'sloganyadjust', 'sloganyadjustdisplay', renderImages);
        setMinMaxValueHook(1, 200, 30, 'textlinespacing', 'textlinespacingdisplay', renderImages);
        setMinMaxValueHook(1, 400, 100, 'textborder', 'textborderdisplay', renderImages);
        setMinMaxValueHook(-400, 500, 30, 'footerborder', 'footerborderdisplay', renderImages);
        setMinMaxValueHook(0, 200, 6, 'texteffectsize', 'texteffectsizedisplay', renderImages);

        showHideButtonConfigure("#show-hide-background-shape", ".backgroundshapes", false);

        setMinMaxValueHook(0, 1080, 200, 'shapeConfigXShape1', 'shapeConfigXShape1Display', renderImages);
        setMinMaxValueHook(0, 1080, 200, 'shapeConfigYShape1', 'shapeConfigYShape1Display', renderImages);
        setMinMaxValueHook(0, 1080, 200, 'shapeConfigWidthShape1', 'shapeConfigWidthShape1Display', renderImages);
        setMinMaxValueHook(0, 1080, 200, 'shapeConfigHeightShape1', 'shapeConfigHeightShape1Display', renderImages);
        setMinMaxValueHook(1, 100, 100, 'shapeConfigOpacityShape1', 'shapeConfigOpacityShape1Display', renderImages);
        setMinMaxValueHook(0, 180, 0, 'shapeConfigAngleShape1', 'shapeConfigAngleShape1Display', renderImages);

        document.getElementById("shapeConfigShape1RenderIt").addEventListener("change", renderImages);
        document.getElementById("shapeColourPickerShape1").addEventListener("change", renderImages);

    }

    function adjustCheckStatusWhenElementId(elementid, eventName, checkBoxId, checkValue){
        document.getElementById(elementid).addEventListener(eventName, function(){
                document.getElementById(checkBoxId).checked=checkValue
            }
        );
    }

    function DefaultMinMax(){

        this.theMin=1;
        this.theMax=100;
        this.theValue=50;
        this.sliderid="";
        this.numberid="";

        this.set = function(theMin, theMax, theValue, sliderid, numberid){
            this.theMin= theMin;
            this.theMax= theMax;
            this.theValue= theValue;
            this.sliderid= sliderid;
            this.numberid= numberid;
            return this;
        }
    }

    var defaultMinMaxValues=[];

    function setDefaultSliderValues(){
        for(var index=0; index<defaultMinMaxValues.length; index++){
            var defaults = defaultMinMaxValues[index];
            setMinMaxValue(defaults.theMin, defaults.theMax, defaults.theValue, defaults.sliderid, defaults.numberid);
        }
    }

    function createSliderNumberHook(sliderid, numberid){
        document.getElementById(sliderid).addEventListener("change", function(){
                setControlValueFromValue(sliderid, numberid);
            }
        );
        document.getElementById(numberid).addEventListener("change", function(){
                setControlValueFromValue(numberid, sliderid);
            }
        );
        document.getElementById(numberid).addEventListener("input", function(){
                setControlValueFromValue(numberid, sliderid);
            }
        );
    }

    function setControlValueFromValue(fromid, toid){
        document.getElementById(toid).value = document.getElementById(fromid).value;
    }

    function setMinMaxValue(theMin, theMax, theValue){

        for(var x=3; x<arguments.length; x++){
            var element = document.getElementById(arguments[x]);
            element.setAttribute('min', theMin);
            element.setAttribute('max', theMax);
            element.setAttribute('value', theValue);
            // force display change
            element.value = theValue;
        }
    }

    function setMinMaxValueHook(theMin, theMax, theValue, sliderid, numberid, renderImages){

        defaultMinMaxValues.push(new DefaultMinMax().set(theMin, theMax, theValue, sliderid, numberid));

        setMinMaxValue(theMin, theMax, theValue, sliderid, numberid);
        createSliderNumberHook(sliderid, numberid);
        document.getElementById(sliderid).addEventListener("change", renderImages);
        document.getElementById(numberid).addEventListener("change", renderImages);
        document.getElementById(numberid).addEventListener("input", renderImages);

    }
}


function Renderer() {

    var idForTextValue;

    // supports hooking an event on to a field with a value, and a field with innerText modification
    this.getTextFrom =function(anId){
        idForTextValue = anId;
        var elem = document.getElementById(anId);
        if(elem.value==undefined){
            // it doesn't seem to have a value so check for dom tree modifications and innerText
            document.getElementById(anId).addEventListener("DOMSubtreeModified",
                function(){
                    textToRender =  document.getElementById(anId).innerText;
                    renderImages();
                }
            );
        }else {
            // it has a value, use that
            document.getElementById(anId).addEventListener("change",
                function () {
                    textToRender = document.getElementById(anId).value;
                    renderImages();
                }
            );
        }
    }

    var idForFooterTextValue;
    this.getFooterTextFrom =function(anId){
        idForFooterTextValue = anId;
        var elem = document.getElementById(anId);
        if(elem.value==undefined){
            // it doesn't seem to have a value so check for dom tree modifications and innerText
            document.getElementById(anId).addEventListener("DOMSubtreeModified",
                function(){
                    footerToRender =  document.getElementById(anId).innerText;
                    renderImages();
                }
            );
        }else {
            // it has a value, use that
            document.getElementById(anId).addEventListener("change",
                function () {
                    footerToRender = document.getElementById(anId).value;
                    renderImages();
                }
            );
        }
    }

    this.setFooterText = function(text){
        footerToRender = text;
    }

    var backgroundImageFunctionality=undefined;
    this.backgroundImageFunctionalityEnabled = function(aboolean){
        if(aboolean){
            backgroundImageFunctionality = new BackgroundImage();
            backgroundImageFunctionality.enabled = true;
        }else{
            backgroundImageFunctionality = undefined;
        }
    }

    this.setTextToRender = function(text){
        textToRender = text;
    }

    this.setDefaultBackgroundColor = function(colour){
        backColor = colour;
        document.getElementById("backcolorpicker").value = colour;
    }

    this.renderNow = function(){
        renderImages();
    }




    this.displayIn = function(anId) {
        new GuiConfigurator().displayIn(anId, renderAppText, renderImages, changerendersize, backgroundImageFunctionality, setTextAlign);
    }


    function changerendersize(width, height) {
        var canvas = document.getElementById("renderslogan");
        canvas.setAttribute("width", width + "px");
        canvas.setAttribute("height", height + "px");

        var imagePercentage = 0.04;
        var img = document.getElementById("renderjpg");
        img.setAttribute("width", width * imagePercentage);
        img.setAttribute("height", height * imagePercentage);

        renderImages();
    }








    // https://stackoverflow.com/questions/13627111/drawing-text-with-an-outer-stroke-with-html5s-canvas

    function textEffectNormal(ctx, text, x, y, theTextColour){
        var textRenderer = new TextRenderer().setStyle(
            new TextRenderStyleConfig().
            setStyle(0).
            setFontColour(theTextColour));
        textRenderer.render(ctx, text, x, y);
    }

    function textEffectOutline(ctx, text, x, y, theTextColour, theEffectColour, theEffectWidth){
        var textRenderer = new TextRenderer().setStyle(
            new TextRenderStyleConfig().
            setStyle(1).
            setFontColour(theTextColour).
            setEffectColour(theEffectColour).
            setEffectWidth(theEffectWidth));
        textRenderer.render(ctx, text, x, y);
    }

    function textEffectShadow(ctx, text, x, y, theTextColour, theEffectColour, theEffectWidth){
        var textRenderer = new TextRenderer().setStyle(
            new TextRenderStyleConfig().
            setStyle(2).
            setFontColour(theTextColour).
            setEffectColour(theEffectColour).
            setEffectWidth(theEffectWidth));
        textRenderer.render(ctx, text, x, y);
    }

    function textEffectGlow(ctx, text, x, y, theTextColour, theEffectColour, theEffectWidth){
        var textRenderer = new TextRenderer().setStyle(
            new TextRenderStyleConfig().
            setStyle(3).
            setFontColour(theTextColour).
            setEffectColour(theEffectColour).
            setEffectWidth(theEffectWidth));
        textRenderer.render(ctx, text, x, y);
    }



    function renderLinesWithEffect(ctx, lines, whichEffect) {

        for (var n = 0; n < lines.length; n++) {

            switch(whichEffect) {
                case 1:
                    textEffectOutline(ctx, lines[n].text, lines[n].x, lines[n].y, textColor, effectColour, effectWidth);
                    break;
                case 2:
                    textEffectShadow(ctx, lines[n].text, lines[n].x, lines[n].y, textColor, effectColour, effectWidth);
                    break;
                case 3:
                    textEffectGlow(ctx, lines[n].text, lines[n].x, lines[n].y, textColor, effectColour, effectWidth);
                    break;
                default:
                    textEffectNormal(ctx, lines[n].text, lines[n].x, lines[n].y, textColor);
            }
        }
    }






    // may not be able to use background image for jpeg due to tainted image
    var backgroundimage;

    // TODO: too much repeated code here
    function renderText(ctx, text) {


        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();

        // add a non-transparent white background by default for jpeg mainly
        renderBackgroundColour(ctx, "#FFFFFF");

        if(backgroundImageFunctionality && backgroundImageFunctionality.enabled){

            backgroundImageFunctionality.renderImageIn(ctx,
                function(){
                    renderBackgroundColour(ctx);
                    if(backgroundShape){
                        backgroundShape.drawShape(ctx);
                    }
                    renderSlogan(ctx, text);
                    renderFooter(ctx, footerToRender)
                },
                function(){
                    renderBackgroundColour(ctx);
                    if(backgroundShape){
                        backgroundShape.drawShape(ctx);
                    }
                    renderSlogan(ctx, text);
                    renderFooter(ctx, footerToRender)
                }
            );

        }else{
            renderBackgroundColour(ctx);

            if(backgroundShape){
                backgroundShape.drawShape(ctx);
            }

            renderSlogan(ctx, text);
        }
    }


    function renderBackgroundColour(ctx, overridecolor){

        if(overridecolor){
            ctx.fillStyle = overridecolor;
        }else {
            // opacity test
            if(backgroundImageFunctionality && backgroundImageFunctionality.enabled) {
                ctx.fillStyle = new ColourConvertor().hexToRgb(backColor, backgroundOpacity);
            }else {
                ctx.fillStyle = backColor;
            }
        }

        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }




    function displayFontSize(validFontSize){
        document.getElementById("fontsize").innerText = validFontSize;
        document.getElementById("fontsizedisplay").innerText = validFontSize;
    }

    var startFontSize = 15;

    function renderSlogan(ctx, text){
        // max width for the rendering
        var maxWidth = ctx.canvas.width - (border * 2);
        var maxHeight = ctx.canvas.height - (border * 2);

        textFormatter = new TextFormatter();
        textFormatter.configure(ctx, text, maxWidth, maxHeight, maxCharsPerLine, splitOnNewLine);

        if (autoSizeFont) {
            fontSize = textFormatter.calculateFontSizeFor(startFontSize, fontfamily);
            ctx.font = textFormatter.getFontConfigString(fontSize, fontfamily);
            displayFontSize(fontSize);
        } else {
            // font is set as a global
            //fontSize = document.getElementById("fontsize").value;
            ctx.font = textFormatter.getFontConfigString(fontSize, fontfamily);
            displayFontSize(fontSize);
        }

        // setFooterConfigFromTextConfig(footerConfig, fontSize, fontfamily, textColor);

        var centerTextVertically = true;
        drawLines = textFormatter.formatTextFor(linespacing, textAlign, sloganyadjust + border, border, centerTextVertically);

        renderLinesWithEffect(ctx, drawLines, effectStyle);
        //renderLines(ctx, lines, x, y, lineHeight);
    }




    function renderFooter(ctx, text) {

        if(!footerConfig.isDisplayed){return;}

        var maxWidth = ctx.canvas.width - (border * 2);
        var maxHeight = ctx.canvas.height - (border * 2);

        var textFormatter = new TextFormatter();

        // use same formatting for footer as the main text - for single line of text
        //footerConfig.autoMode=="custom"
        textFormatter.configure(ctx, text, maxWidth, maxHeight, text.length, splitOnNewLine);


        // if auto size is on, and line is too wide for screen then change font size for footer
        if (footerConfig.autoMode=="self") {
            if(ctx.measureText(text).width > maxWidth){
                // autosize to fit text into space
                fontSize = textFormatter.calculateFontSizeForActualText(startFontSize, fontfamily, text);
                ctx.font = textFormatter.getFontConfigString(fontSize, fontfamily);
            }
        }
        // use same font as main text, but could change size here
        // fontSize = textFormatter.calculateFontSizeFor(startFontSize, fontfamily);
        //ctx.font = textFormatter.getFontConfigString(fontSize, fontfamily);


        // assume single line
        // footerx = ctx.canvas.width - ctx.measureText(text).width;
        // footerx = footerx / 2;

        // find y for footer
        footery = ctx.measureText(text).actualBoundingBoxAscent + footerConfig.footerYOffset;
        footery = ctx.canvas.height - footery;

        var centerTextVertically = false;
        drawLines = textFormatter.formatTextFor(linespacing, "center", footery, 0, centerTextVertically);

        //var footer = [text];
        //renderLines(ctx, footer, footerx, footery, 0);
        //var drawLines = [];
        //drawLines.push(new DrawLine().set(footerx, footery, footer));
        if(applyEffectToFooter){
            renderLinesWithEffect(ctx, drawLines, effectStyle);
        }else{
            renderLinesWithEffect(ctx, drawLines, 0);
        }
    }


// adjustable globals
    var backColor = "#ff0000";
    var textColor = "#000000";


    var fontfamily = "Calibri";
    var fontSize=80;

    var autoSizeFont=true;

    var maxCharsPerLine = 15;
    var linespacing = 30;
    var border = 100;

    var sloganyadjust = 0;
    var backgroundOpacity=0;

    var applyEffectToFooter = false;
    var effectColour = "white";
    var effectWidth = 8;
    var effectStyle=0;

    var textToRender = "";
    var footerToRender = "";

    var textAlign = "centerleft";
    var backgroundShape = undefined;

    var splitOnNewLine=true;

    // // TODO: allow footer text size and font to be different from the main text
    //


    function FooterConfig(){
        this.autoMode = "slogan";  // slogan, self, custom
        this.isDisplayed=true;
        this.footerYOffset=30;
        this.fontFamily= undefined;
        this.textColor= undefined;
        this.fontSize= undefined;
    }

    var footerConfig = new FooterConfig();

    //
    // function getFooterTextColor(){
    //     if(footerConfig.textColor){
    //         return footerConfig.textColor;
    //     }else{
    //         return textColor;
    //     }
    // }
    //
    // function getFooterFontFamily(){
    //     if(footerConfig.fontFamily){
    //         return footerConfig.fontFamily;
    //     }else{
    //         return fontfamily;
    //     }
    // }
    //
    // function getFooterFontSize(){
    //     if(footerConfig.fontSize){
    //         return footerConfig.fontFamily;
    //     }else{
    //         return fontfamily;
    //     }
    // }
    //
    // function setFooterConfigFromTextConfig(footerConfig, fontSize, fontfamily, textColor){
    //     if(footerConfig.sameAsText){
    //         footerConfig.fontSize = fontSize;
    //         footerConfig.fontFamily = fontfamily;
    //         footerConfig.textColor = textColor;
    //     }
    //     // else - leave it as it is
    // }

    function setTextAlign(){
        textAlign = "centerleft";
        var elems = document.querySelectorAll(".textaligncenterconfig input[type='radio']");
        for(var elemindex=0; elemindex<elems.length; elemindex++){
            if(elems[elemindex].checked){
                textAlign = elems[elemindex].getAttribute("value");
                return;
            }
        }
    }

    function setFooterAutoSize(){
        footerConfig.autoMode = "slogan";
        var elems = document.querySelectorAll(".footertextsizeauto input[type='radio']");
        for(var elemindex=0; elemindex<elems.length; elemindex++){
            if(elems[elemindex].checked){
                footerConfig.autoMode = elems[elemindex].getAttribute("value");
                return;
            }
        }
    }

    function setGlobalsFromGui() {
        setGlobals(
            document.getElementById("backcolorpicker").value,
            document.getElementById("textcolorpicker").value,
            document.getElementById("textfontselector").value,
            document.getElementById("fontsize").value,
            document.getElementById("autofontsize").checked,
            document.getElementById("maxcharsperline").value,
            document.getElementById('textlinespacing').value,
            document.getElementById('textborder').value,
            document.getElementById('sloganyadjust').value,
            document.getElementById('backgroundimageurlinput').value,
            document.getElementById('backgroundcolouropacity').value,

            // text effects
            document.getElementById('texteffectstyleselector').value,
            document.getElementById('applyeffecttofooter').checked,
            document.getElementById('effectColourPicker').value,
            document.getElementById('texteffectsize').value,

            // split word
            document.getElementById("splitonnewline").checked
        );

        setFooterConfig(
            document.getElementById('displayFooter').checked,
            document.getElementById('footerborder').value,
        );
        // TODO: rework this, created new extract because it was getting too big
        setBackGroundShapeGlobals(
            document.getElementById("shapeConfigShape1RenderIt").checked,
            document.getElementById("shapeColourPickerShape1").value,
                document.getElementById("shapeConfigXShape1").value,
                document.getElementById("shapeConfigYShape1").value,
                document.getElementById("shapeConfigWidthShape1").value,
                document.getElementById("shapeConfigHeightShape1").value,
                document.getElementById("shapeConfigOpacityShape1").value,
                document.getElementById("shapeConfigAngleShape1").value
        );
    }

    function setFooterConfig(useDisplayFooter, useFooterBorder){
        footerConfig.isDisplayed = useDisplayFooter;
        footerConfig.footerYOffset = parseInt(useFooterBorder);
        setFooterAutoSize();
    }

    function setGlobals(useBackColor, useTextColor, font, useFontSize, useAutoSizeFont, useMaxCharsPerLine, useLineSpacing, useBorder,
                        usesloganyadjust,
                        useImageUrl, useOpacity,
                        useTextEffectStyle, applyThisEffectToFooter, useEffectColour, useEffectSize,
                        splitWords
    ) {

        backColor = useBackColor;
        textColor = useTextColor;
        fontfamily = font;
        autoSizeFont = useAutoSizeFont;
        fontSize = parseInt(useFontSize);
        maxCharsPerLine = parseInt(useMaxCharsPerLine);
        linespacing = parseInt(useLineSpacing);
        border = parseInt(useBorder);
        sloganyadjust = parseInt(usesloganyadjust);

        effectStyle= parseInt(useTextEffectStyle);
        applyEffectToFooter = applyThisEffectToFooter;
        effectColour = useEffectColour;
        effectWidth = parseInt(useEffectSize);

        if(backgroundImageFunctionality && backgroundImageFunctionality.enabled){
            backgroundimage = backgroundImageFunctionality.setImageUrl(useImageUrl);
            backgroundOpacity = parseFloat(useOpacity);
        }else{
            backgroundimage = undefined;
            backgroundOpacity = 1;
        }

        splitOnNewLine = splitWords;

    }

    function setBackGroundShapeGlobals(showShape, useColour, useX, useY, useWidth, useHeight, useOpacity, useAngle){
        if(!showShape){
            backgroundShape=undefined;
            return;
        }

        backgroundShape = new ShapeDraw().
                            defineRect(
                                parseInt(useX),
                                parseInt(useY),
                                parseInt(useWidth),
                                parseInt(useHeight),
                                parseInt(useAngle),
                                useColour,
                                parseInt(useOpacity)/100);
    }

    function renderTextAndFooter() {
        var canvas = document.getElementById('renderslogan');
        var ctx = canvas.getContext('2d');
        renderText(ctx, textToRender);
        renderFooter(ctx, footerToRender);
    }

    function renderCanvasAsJpg() {
        // TODO: this does not work with a background image
        var img = document.getElementById("renderjpg");
        img.src = document.getElementById('renderslogan').toDataURL("image/jpeg");
    }

// References:
// https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element



    function renderImages() {
        setGlobalsFromGui();
        renderTextAndFooter();
        renderCanvasAsJpg();
    }

    function renderAppText(){
        if(idForFooterTextValue){
            textToRender = document.getElementById(idForTextValue).value;
        }
        if(idForFooterTextValue){
            footerToRender = document.getElementById(idForFooterTextValue).value;
        }
        renderImages();
    }






}


// TODO: allow a background image and an opacity for the background colour - need to catch error and make readable error for tainted image and this code needs to be programmatically activated as an advanced mode (tried copying into intermediate canvas but that didn't work) - workaround add links to png to jpg online conversion services
// TODO: when image and opacity is available allow 'margin' for the background colour to adjust amount of background image shown
// TODO: can we pull in list of font names supported by browser rather than hard code?
// TODO: make javascript control html template more configurable and code generated
// TODO: add a background circle
// TODO: add linear gradiant background, background shape
// TODO: add radial gradiant background, background shape
// TODO: prototype dragging slogan, background shape, footer, background image
// TODO: create separate Auto Size radio set for footer - [] Auto Size [] Use Slogan Size   (then add [] Custom Size)
// TODO: option to wrap footer text with max line etc. as per slogan
// TODO: add drop down of images if configured by page