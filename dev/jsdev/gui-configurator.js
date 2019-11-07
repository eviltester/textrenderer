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

