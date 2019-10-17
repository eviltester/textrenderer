// https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element

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
