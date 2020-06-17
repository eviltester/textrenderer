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
}