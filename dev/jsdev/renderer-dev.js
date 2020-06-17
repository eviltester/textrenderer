
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

