/*
    Informal version tracking

    20191029 - all html code events added by js, and config controlled by js min, max, value, defaults, changed label to number and  hooked slider to number, text alignment
    20191026 - added basic font effect control - normal, outline, shadow, glow
    20191020 - added dom subtree hook to getFooterTextFrom
    20191020 - started tracking

    Renderer is open source and available from: https://github.com/eviltester/textrenderer

*/
function GuiHtml(){

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
                                  <input id="textalignleft" type="radio" name="textalign" value="left" checked>Left 
                                  <input id="textaligncenter" type="radio" name="textalign" value="center">Center 
                                  <input id="textalignright" type="radio" name="textalign" value="right">Right
                            </div>
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
                    <label for="footerborder">Footer Vertical Adjust <input type="number"  id="footerborderdisplay"/></label>
                    <input type="range" class="slider" id="footerborder">
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
                

                
                <!-- prototype as not always going to work so don't want to confuse users -->
                <div class="backgroundimageconfig" style="display:none">
                    <div class="backgroundimageurlinput">
                        <label for="backgroundimageurlinput">Background Image Url</label>
                        <input type="text" id="backgroundimageurlinput">
                    </div>
                    <div class="backgroundcolouropacity">
                        <label for="backgroundcolouropacity">Background Colour Opacity 0 - 1</label>
                        <input type="text" id="backgroundcolouropacity">
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

    var backgroundImageFunctionality=false;
    this.backgroundImageFunctionalityEnabled = function(aboolean){
        backgroundImageFunctionality = aboolean;
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


    function setTextAlign(){
        textAlign = "left";
        if(document.getElementById("textaligncenter").checked){
            textAlign="center";
        }
        if(document.getElementById("textalignright").checked){
            textAlign="right";
        }

    }

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

    this.displayIn = function(anId) {
        if (!document.getElementById("rendering")) {
            document.getElementById(anId).insertAdjacentHTML(
                'beforeend', new GuiHtml().html());
        }

        showHideButtonConfigure("#show-hide-text-config", ".textbodyconfig", true);
        showHideButtonConfigure("#show-hide-footer-config", ".textfooterconfig", true);
        showHideButtonConfigure("#show-hide-colourpickers", ".colourpickers", true);
        showHideButtonConfigure("#show-hide-texteffects", ".textEffects", false);
        showHideButtonConfigure("#show-hide-jpgpreview", ".jpgimagepreview", false);


        document.getElementById("renderfromguibutton").addEventListener("click", renderAppText);


        document.getElementById("resetdefaults").addEventListener("click", function(){
            setDefaultSliderValues(); renderImages();
        });

        document.getElementById("textfontselector").addEventListener("change", renderImages);
        document.getElementById("autofontsize").addEventListener("change", renderImages);

        document.getElementById("textaligncenter").addEventListener("change", function(){
            setTextAlign();
            renderImages()
        });
        document.getElementById("textalignleft").addEventListener("change", function(){
            setTextAlign();
            renderImages()
        });
        document.getElementById("textalignright").addEventListener("change", function(){
            setTextAlign();
            renderImages()
        });

        document.getElementById("fontsize").addEventListener("change", renderImages);
        document.getElementById("maxcharsperline").addEventListener("change", renderImages);
        document.getElementById("textlinespacing").addEventListener("change", renderImages);
        document.getElementById("textborder").addEventListener("change", renderImages);
        document.getElementById("footerborder").addEventListener("change", renderImages);
        document.getElementById("backcolorpicker").addEventListener("change", renderImages);
        document.getElementById("textcolorpicker").addEventListener("change", renderImages);
        document.getElementById("sloganyadjust").addEventListener("change", renderImages);

        document.getElementById("texteffectstyleselector").addEventListener("change", renderImages);
        document.getElementById("applyeffecttofooter").addEventListener("change", renderImages);
        document.getElementById("effectColourPicker").addEventListener("change", renderImages);
        document.getElementById("texteffectsize").addEventListener("change", renderImages);

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

        createSliderNumberHook('fontsize', 'fontsizedisplay');
        document.getElementById('fontsize').addEventListener("change", function(){
                document.getElementById('autofontsize').checked=false
            }
        );
        document.getElementById('fontsizedisplay').addEventListener("change", function(){
                document.getElementById('autofontsize').checked=false
            }
        );
        document.getElementById('fontsizedisplay').addEventListener("input", function(){
                document.getElementById('autofontsize').checked=false
            }
        );
        document.getElementById("fontsizedisplay").addEventListener("input", renderImages);
        document.getElementById("fontsizedisplay").addEventListener("change", renderImages);

        createSliderNumberHook('maxcharsperline', 'maxcharsperlinedisplay');
        createSliderNumberHook('sloganyadjust', 'sloganyadjustdisplay');
        createSliderNumberHook('textlinespacing', 'textlinespacingdisplay');
        createSliderNumberHook('textborder', 'textborderdisplay');
        createSliderNumberHook('footerborder', 'footerborderdisplay');
        createSliderNumberHook('texteffectsize', 'texteffectsizedisplay');

        document.getElementById("maxcharsperlinedisplay").addEventListener("change", renderImages);
        document.getElementById("sloganyadjustdisplay").addEventListener("change", renderImages);
        document.getElementById("textlinespacingdisplay").addEventListener("change", renderImages);
        document.getElementById("textborderdisplay").addEventListener("change", renderImages);
        document.getElementById("footerborderdisplay").addEventListener("change", renderImages);
        document.getElementById("texteffectsizedisplay").addEventListener("change", renderImages);

        document.getElementById("maxcharsperlinedisplay").addEventListener("input", renderImages);
        document.getElementById("sloganyadjustdisplay").addEventListener("input", renderImages);
        document.getElementById("textlinespacingdisplay").addEventListener("input", renderImages);
        document.getElementById("textborderdisplay").addEventListener("input", renderImages);
        document.getElementById("footerborderdisplay").addEventListener("input", renderImages);
        document.getElementById("texteffectsizedisplay").addEventListener("input", renderImages);
    }

    function setDefaultSliderValues(){
        setMinMaxValue(1, 200, 80, 'fontsize', 'fontsizedisplay');
        setMinMaxValue(1, 50, 15, 'maxcharsperline', 'maxcharsperlinedisplay');
        setMinMaxValue(-300, 300, 0, 'sloganyadjust', 'sloganyadjustdisplay');
        setMinMaxValue(1, 200, 30, 'textlinespacing', 'textlinespacingdisplay');
        setMinMaxValue(1, 400, 100, 'textborder', 'textborderdisplay');
        setMinMaxValue(-400, 500, 30, 'footerborder', 'footerborderdisplay');
        setMinMaxValue(0, 200, 6, 'texteffectsize', 'texteffectsizedisplay');
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

    function setMinMaxValue(theMin, theMax, theValue, control){

        for(var x=3; x<arguments.length; x++){
            var element = document.getElementById(arguments[x]);
            element.setAttribute('min', theMin);
            element.setAttribute('max', theMax);
            element.setAttribute('value', theValue);
            // force display change
            element.value = theValue;
        }
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





    function wrapText(ctx, text, maxWidth, lineHeight) {
        var lines = [];
        var words = text.split(' ');
        var line = '';

        // add words until the length of the string is greater than maxWidth
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = ctx.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        return lines;
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

    function calculateFontSizeFor(ctx, text, startFontSize, fontFamily, maxWidth, maxCharsPerLine) {

        var validFontSize = startFontSize;
        ctx.font = validFontSize + "px " + fontFamily;

        var lineLength = ctx.measureText("X").width * maxCharsPerLine;

        var testFontSize = validFontSize;

        while (lineLength < maxWidth) {
            testFontSize++;
            ctx.font = testFontSize + "px " + fontFamily;
            lineLength = ctx.measureText("X").width * maxCharsPerLine;
            if (lineLength < maxWidth) {
                validFontSize = testFontSize;
            }
        }

        document.getElementById("fontsize").innerText = validFontSize;
        document.getElementById("fontsizedisplay").innerText = validFontSize;

        return validFontSize;

    }

    function getFontConfigString(thesize, thefamily){
        return thesize + "px " + thefamily;
    }


    // may not be able to use background image for jpeg due to tainted image
    var backgroundimage;

    function renderText(ctx, text) {


        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();

        // add a non-transparent white background by default for jpeg mainly
        renderBackgroundColour(ctx, "#FFFFFF");

        if(backgroundimage && backgroundimage.length!=0){
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

                renderBackgroundColour(ctx);

                renderSlogan(ctx, text);
            }

            background.onerror = function(){
                // TODO: create a GUI control for error reporting
                console.log("could not load image, rendering with background instead");
                renderBackgroundColour(ctx);
                renderSlogan(ctx, text);
            }

            background.src = backgroundimage;

        }else{
            renderBackgroundColour(ctx);
            renderSlogan(ctx, text);
        }
    }


    function hexToRgb(hex, alpha) {
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

    function renderBackgroundColour(ctx, overridecolor){


        if(overridecolor){
            ctx.fillStyle = overridecolor;
        }else {
            // opacity test
            if(backgroundImageFunctionality) {
                ctx.fillStyle = hexToRgb(backColor, backgroundOpacity);
            }else {
                ctx.fillStyle = backColor;
            }
        }

        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }



    function renderSlogan(ctx, text){
        // max width for the rendering
        var maxWidth = ctx.canvas.width - (border * 2);
        var maxHeight = ctx.canvas.height - (border * 2);

        var startFontSize = 15;

        if (autoSizeFont) {
            fontSize = calculateFontSizeFor(ctx, text, startFontSize, fontfamily, maxWidth, maxCharsPerLine);
            ctx.font = getFontConfigString(fontSize, fontfamily)
        } else {
            // font is set as a global
            //fontSize = document.getElementById("fontsize").value;
            ctx.font = getFontConfigString(fontSize, fontfamily)
        }

        // setFooterConfigFromTextConfig(footerConfig, fontSize, fontfamily, textColor);




        lineHeight = ctx.measureText("X").actualBoundingBoxAscent + linespacing;

        maxLineWidth = ctx.measureText("X").width * maxCharsPerLine;


        lines = wrapText(ctx, text, maxLineWidth, lineHeight);

        drawLines = [];

        // center text vertically
        y = (maxHeight - (lines.length * lineHeight)) / 2;
        y += sloganyadjust;
        y += border;


        //
        // ALIGN SLOGAN TEXT HORIZONTALLY
        //
        // center text horizontally
        longestLength = 0;
        longestLine = 0;

        // left align by default
        for (x = 0; x < lines.length; x++) {
            var lineLength = ctx.measureText(lines[x]).width;
            if (lineLength > longestLength) {
                longestLength = lineLength;
                longestLine = x;
            }
        }

        x = (maxWidth - longestLength) / 2;
        if (x < 0) {
            x = 0;
        }
        x += border;


        // apply x,y to lines
        liney=y;
        for (var n = 0; n < lines.length; n++) {
            switch(textAlign) {
                case "center":
                    x = (ctx.canvas.width / 2) - (ctx.measureText(lines[n]).width / 2);
                    drawLines.push(new DrawLine().set(x, liney, lines[n]));
                    break;
                case "right":
                    // right align
                    x = border + longestLength - ctx.measureText(lines[n]).width;
                    drawLines.push(new DrawLine().set(x, liney, lines[n]));
                    break;
                default:
                    // left align
                    drawLines.push(new DrawLine().set(x, liney, lines[n]));
            }
            liney += lineHeight;
        }




        renderLinesWithEffect(ctx, drawLines, effectStyle);
        //renderLines(ctx, lines, x, y, lineHeight);
    }

    function renderFooter(ctx, text) {

        footerx = ctx.canvas.width - ctx.measureText(text).width;
        footerx = footerx / 2;


        footery = ctx.measureText(text).actualBoundingBoxAscent + footerborder;
        footery = ctx.canvas.height - footery;

        var footer = [text];
        //renderLines(ctx, footer, footerx, footery, 0);
        var drawLines = [];
        drawLines.push(new DrawLine().set(footerx, footery, footer));
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

    var autoSizeFont=true;

    var maxCharsPerLine = 15;
    var linespacing = 30;
    var border = 100;
    var footerborder = 30;
    var sloganyadjust = 0;
    var backgroundOpacity=0;

    var applyEffectToFooter = false;
    var effectColour = "white";
    var effectWidth = 8;
    var effectStyle=0;

    var textToRender = "";
    var footerToRender = "";

    var textAlign = "left";

    // // TODO: allow footer text size and font to be different from the main text
    //
    // var footerConfig = {
    //     sameAsText: true,
    //     fontFamily: undefined,
    //     textColor: undefined,
    //     fontSize: undefined
    // };
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
            document.getElementById('footerborder').value,
            document.getElementById('sloganyadjust').value,
            document.getElementById('backgroundimageurlinput').value,
            document.getElementById('backgroundcolouropacity').value,

            // text effects
            document.getElementById('texteffectstyleselector').value,
            document.getElementById('applyeffecttofooter').checked,
            document.getElementById('effectColourPicker').value,
            document.getElementById('texteffectsize').value
        )
    }

    function setGlobals(useBackColor, useTextColor, font, useFontSize, useAutoSizeFont, useMaxCharsPerLine, useLineSpacing, useBorder, useFooterBorder,
                        usesloganyadjust,
                        useImageUrl, useOpacity,
                        useTextEffectStyle, applyThisEffectToFooter, useEffectColour, useEffectSize
    ) {

        backColor = useBackColor;
        textColor = useTextColor;
        fontfamily = font;
        autoSizeFont = useAutoSizeFont;
        fontSize = parseInt(useFontSize);
        maxCharsPerLine = parseInt(useMaxCharsPerLine);
        linespacing = parseInt(useLineSpacing);
        border = parseInt(useBorder);
        footerborder = parseInt(useFooterBorder);
        sloganyadjust = parseInt(usesloganyadjust);

        effectStyle= parseInt(useTextEffectStyle);
        applyEffectToFooter = applyThisEffectToFooter;
        effectColour = useEffectColour;
        effectWidth = parseInt(useEffectSize);

        if(backgroundImageFunctionality){
            backgroundimage = useImageUrl;
            backgroundOpacity = parseFloat(useOpacity);
        }else{
            backgroundimage = undefined;
            backgroundOpacity = 1;
        }
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
// TODO: add a background shape e.g square, circle, rectangle - config colour, x, y, width, height and rotation
// TODO: add linear gradiant background, background shape
// TODO: add radial gradiant background, background shape

