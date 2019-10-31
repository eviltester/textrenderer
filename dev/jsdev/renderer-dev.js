
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

    this.displayIn = function(anId) {
        new GuiConfigurator().displayIn(anId, renderAppText, renderImages, changerendersize, backgroundImageFunctionality);
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
            if(backgroundImageFunctionality) {
                ctx.fillStyle = new ColourConvertor().hexToRgb(backColor, backgroundOpacity);
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
    var backgroundShape = undefined;

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