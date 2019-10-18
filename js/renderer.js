// https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element

const rendering_gui_html = `
    <div id="rendering">

        <button onclick="renderImages()">RENDER</button>
        <br/>

        <div>
            <div class="canvasdisplay" style="width:47%;float:left;margin-right:1em;">
                <canvas id="renderslogan" width="1080px" height="1080px" style="width:100%"/>
            </div>
            <div id="renderingcontrols" style="width:47%; float:right">
                <select id="font" onchange="renderImages()">
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
                <br/>

                <label for="fontsize">Font Size</label>
                <input type="range" min="1" max="200" value="15" class="slider" style="width:50%" id="fontsize" onchange="
            document.getElementById('fontsizedisplay').value = document.getElementById('fontsize').value;document.getElementById('autofontsize').checked=false; renderImages()">
                <input id="fontsizedisplay" value="15"></input>
                <br/>
                <input type="checkbox" id="autofontsize" checked>Auto Size
                <hr/>



                <br/>
                <label for="maxcharsperline">Max Chars Per Line</label>
                <input type="range" min="1" max="50" value="15" class="slider" style="width:80%" id="maxcharsperline" onchange="
            document.getElementById('maxcharsperlinedisplay').value = document.getElementById('maxcharsperline').value; renderImages()">
                <input id="maxcharsperlinedisplay" value="15"></input>
                <hr/>

                <br/>
                <label for="backcolorpicker">BackGround Colour</label>
                <input type="color" id="backcolorpicker" value="#ff0000" onchange="renderImages()" style="width:50%;">
                <br/>
                <label for="textcolorpicker">Text Colour</label>
                <input type="color" id="textcolorpicker" value="#000000"  onchange="renderImages()"  style="width:50%;">
                <br/>

                <p>for .jpg right click and save as below:</p>
                <img id="renderjpg" width="50px" height="50px"/>
                <br/>

            </div>
        </div>
    </div>
`;

function displayIn(anId){
    if(!document.getElementById("rendering")) {
        document.getElementById(anId).insertAdjacentHTML('beforeend', rendering_gui_html);
    }
}

function wrapText(ctx, text, maxWidth, lineHeight) {
    var lines=[];
    var words = text.split(' ');
    var line = '';

    // add words until the length of the string is greater than maxWidth
    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        }
        else {
            line = testLine;
        }
    }
    lines.push(line);

    return lines;
}

function renderLines(ctx, lines, x, y, lineHeight){

    for(var n = 0; n < lines.length; n++) {
        ctx.fillText(lines[n], x, y);
        y += lineHeight;
    }

}

function calculateFontSizeFor(ctx, text, startFontSize, fontFamily, maxWidth, maxCharsPerLine){

    var validFontSize = startFontSize;
    ctx.font = validFontSize + "px " + fontFamily;

    var lineLength = ctx.measureText("X").width * maxCharsPerLine;

    var testFontSize = validFontSize;

    while(lineLength<maxWidth){
        testFontSize++;
        ctx.font = testFontSize + "px " + fontFamily;
        lineLength = ctx.measureText("X").width * maxCharsPerLine;
        if(lineLength<maxWidth){
            validFontSize=testFontSize;
        }
    }

    document.getElementById("fontsize").value = validFontSize;
    document.getElementById("fontsizedisplay").value = validFontSize;

    return validFontSize + "px " + fontFamily;

}

function renderText(ctx, text) {


    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = backColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var border = 100;
    // max width for the rendering
    var maxWidth = 1080-(border*2);

    var startFontSize=15;

    if(document.getElementById("autofontsize").checked) {
        ctx.font = calculateFontSizeFor(ctx, text, startFontSize, fontfamily, maxWidth, maxCharsPerLine);
    }else{
        ctx.font = document.getElementById("fontsize").value + "px " + fontfamily;
    }

    ctx.fillStyle = textColor;


    var linespacing=30;
    lineHeight = ctx.measureText("X").actualBoundingBoxAscent + linespacing;

    maxLineWidth = ctx.measureText("X").width * maxCharsPerLine;


    lines = wrapText(ctx, text, maxLineWidth, lineHeight);

    // center text vertically
    y = (maxWidth - (lines.length*lineHeight))/2;
    y+=border;

    // center text horizontally
    longestLength=0;
    longestLine=0;
    for(x=0;x<lines.length;x++){
        var lineLength = ctx.measureText(lines[x]).width;
        if(lineLength>longestLength){
            longestLength = lineLength;
            longestLine = x;
        }
    }

    x = (maxWidth-longestLength)/2;
    if(x<0){x=0;}
    x += border;


    renderLines(ctx, lines, x, y, lineHeight);


}

function renderFooter(ctx, text){

    footerx = ctx.canvas.width - ctx.measureText(text).width;
    footerx = footerx/2;

    footerborder=30;
    footery = ctx.measureText(text).actualBoundingBoxAscent + footerborder;
    footery = ctx.canvas.height-footery;

    var footer = [text];
    renderLines(ctx, footer, footerx, footery, 0);
}

var backColor = "#ff0000";
var textColor = "#000000";
var fontfamily = "Calibri";
var maxCharsPerLine = 15;

function renderThis(useBackColor, useTextColor, text, footer, font, useMaxCharsPerLine){

    backColor = useBackColor;
    textColor = useTextColor;
    fontfamily = font;
    maxCharsPerLine=useMaxCharsPerLine;

    var canvas = document.getElementById('renderslogan');
    var ctx = canvas.getContext('2d');
    renderText(ctx, text);
    renderFooter(ctx, footer)
}

function renderCanvasAsJpg(){
    var img = document.getElementById("renderjpg");
    img.src = document.getElementById('renderslogan').toDataURL("image/jpeg");
}
