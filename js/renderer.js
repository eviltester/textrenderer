/*
    Informal version tracking

    20191020 - added dom subtree hook to getFooterTextFrom
    20191020 - started tracking

*/

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

    this.setTextToRender = function(text){
        textToRender = text;
    }

    this.renderNow = function(){
        renderImages();
    }

    this.displayIn = function(anId) {
        if (!document.getElementById("rendering")) {
            document.getElementById(anId).insertAdjacentHTML(
                'beforeend', rendering_gui_html);
        }

        document.getElementById("renderfromguibutton").addEventListener("click", renderAppText);

        document.getElementById("textfontselector").addEventListener("change", renderImages);
        document.getElementById("fontsize").addEventListener("change", renderImages);
        document.getElementById("maxcharsperline").addEventListener("change", renderImages);
        document.getElementById("textlinespacing").addEventListener("change", renderImages);
        document.getElementById("textborder").addEventListener("change", renderImages);
        document.getElementById("footerborder").addEventListener("change", renderImages);
        document.getElementById("backcolorpicker").addEventListener("change", renderImages);
        document.getElementById("textcolorpicker").addEventListener("change", renderImages);

        document.getElementById("render1024x512").addEventListener("click", function(){changerendersize(1024,512)})
        document.getElementById("render1080x1080").addEventListener("click", function(){changerendersize(1080,1080)})


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


    const rendering_gui_html = `
    <div id="rendering">

        <button id="renderfromguibutton">RENDER</button>
        <br/>

        <div>
            <div class="canvasdisplay">
                <button id="render1080x1080">1080x1080</button>
                <button id="render1024x512">1024x512</button>
                <canvas id="renderslogan" class="rendercanvas" width="1080px" height="1080px"/>
            </div>
            <div id="renderingcontrols" class="renderingcontrols">
                <div class="textbodyconfig">
                    <div class="textbodyfontconfig">
                        <div class="textbodyfontnameconfig">
                            <select id="textfontselector"">
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
                                <label for="fontsize">Font Size <span id="fontsizedisplay">15</span></label>
                                <input type="range" min="1" max="200" value="15" class="slider" id="fontsize" onchange="
                            document.getElementById('fontsizedisplay').innerText = document.getElementById('fontsize').value;document.getElementById('autofontsize').checked=false;">
                            </div>

                         </div>        
        
        
                        <div class="maxcharsperlineconfig">
                            <label for="maxcharsperline">Max Chars Per Line <span id="maxcharsperlinedisplay">15</span></label>
                            <input type="range" min="1" max="50" value="15" class="slider" id="maxcharsperline" onchange="
                        document.getElementById('maxcharsperlinedisplay').innerText = document.getElementById('maxcharsperline').value;">
                        </div> 
                                               
                        <div class="textlinespacingconfig">
                            <label for="textlinespacing">Line Spacing <span id="textlinespacingdisplay">30</span></label>
                            <input type="range" min="1" max="200" value="30" class="slider" id="textlinespacing" onchange="
                        document.getElementById('textlinespacingdisplay').innerText = document.getElementById('textlinespacing').value;">
                        </div>                        
                        
                        <div class="textborderconfig">
                            <label for="textborder">Text Border <span id="textborderdisplay">100</span></label>
                            <input type="range" min="1" max="400" value="100" class="slider" id="textborder" onchange="
                        document.getElementById('textborderdisplay').innerText = document.getElementById('textborder').value;">
                        </div>
                    </div>
                </div>
                
                <div class="textfooterconfig">
                    <label for="footerborder">Footer Border <span id="footerborderdisplay">30</span></label>
                    <input type="range" min="-400" max="500" value="30" class="slider" id="footerborder" onchange="
                document.getElementById('footerborderdisplay').innerText = document.getElementById('footerborder').value;">
                </div>
                
                <div class="colourpickers">
                    <div class="backgroundcolourpicker">
                        <label for="backcolorpicker" class="colourpickerlabel">BackGround Colour</label>
                        <input type="color" id="backcolorpicker"  class="colourpicker" value="#ff0000""">
                    </div>
                    <div class="textcolourpicker">
                        <label for="textcolorpicker" class="colourpickerlabel">Text Colour</label>
                        <input type="color" id="textcolorpicker" value="#000000" class="colourpicker"">
                    </div>
                </div>
                
                <div class="jpgimagepreview"
                    <p>for .jpg right click and save as below:</p>
                    <img id="renderjpg" width="50px" height="50px"/>
                </div>
            </div>
        </div>
    </div>
    <div style="clear:both"></div>
`;


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

    function renderLines(ctx, lines, x, y, lineHeight) {

        for (var n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], x, y);
            y += lineHeight;
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



    function renderText(ctx, text) {


        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.fillStyle = backColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // max width for the rendering
        var maxWidth = ctx.canvas.width - (border * 2);
        var maxHeight = ctx.canvas.height - (border * 2);

        var startFontSize = 15;

        if (document.getElementById("autofontsize").checked) {
            fontSize = calculateFontSizeFor(ctx, text, startFontSize, fontfamily, maxWidth, maxCharsPerLine);
            ctx.font = getFontConfigString(fontSize, fontfamily)
        } else {
            fontSize = document.getElementById("fontsize").value;
            ctx.font = getFontConfigString(fontSize, fontfamily)
        }

        // setFooterConfigFromTextConfig(footerConfig, fontSize, fontfamily, textColor);

        ctx.fillStyle = textColor;


        lineHeight = ctx.measureText("X").actualBoundingBoxAscent + linespacing;

        maxLineWidth = ctx.measureText("X").width * maxCharsPerLine;


        lines = wrapText(ctx, text, maxLineWidth, lineHeight);

        // center text vertically
        y = (maxHeight - (lines.length * lineHeight)) / 2;
        y += border;

        // center text horizontally
        longestLength = 0;
        longestLine = 0;
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


        renderLines(ctx, lines, x, y, lineHeight);


    }

    function renderFooter(ctx, text) {

        footerx = ctx.canvas.width - ctx.measureText(text).width;
        footerx = footerx / 2;


        footery = ctx.measureText(text).actualBoundingBoxAscent + footerborder;
        footery = ctx.canvas.height - footery;

        var footer = [text];
        renderLines(ctx, footer, footerx, footery, 0);
    }


// adjustable globals
    var backColor = "#ff0000";
    var textColor = "#000000";
    var fontfamily = "Calibri";
    var maxCharsPerLine = 15;
    var linespacing = 30;
    var border = 100;
    var footerborder = 30;

    var textToRender = "";
    var footerToRender = "";

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
            document.getElementById("maxcharsperline").value,
            document.getElementById('textlinespacing').value,
            document.getElementById('textborder').value,
            document.getElementById('footerborder').value
        )
    }

    function setGlobals(useBackColor, useTextColor, font, useMaxCharsPerLine, useLineSpacing, useBorder, useFooterBorder) {

        backColor = useBackColor;
        textColor = useTextColor;
        fontfamily = font;
        maxCharsPerLine = parseInt(useMaxCharsPerLine);
        linespacing = parseInt(useLineSpacing);
        border = parseInt(useBorder);
        footerborder = parseInt(useFooterBorder);
    }


    function renderTextAndFooter() {
        var canvas = document.getElementById('renderslogan');
        var ctx = canvas.getContext('2d');
        renderText(ctx, textToRender);
        renderFooter(ctx, footerToRender);
    }

    function renderCanvasAsJpg() {
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



// TODO: allow a background image and an opacity for the background colour
// TODO: when image and opacity is available allow 'margin' for the background colour to adjust amount of background image shown
// TODO: can we pull in list of font names supported by browser rather than hard code?
// TODO: add a [default] button to set all defaults
// TODO: double click on label to set default for individual value
// TODO: font styles? outline text colour?
// TODO: make javascript control html template more configurable and code generated


}