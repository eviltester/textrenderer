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
        if (!document.getElementById("rendering")) {
            document.getElementById(anId).insertAdjacentHTML(
                'beforeend', new GuiHtml().html());
        }

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


        // TODO: this shows we still have some work to do to make setting up the GUI simpler for event hooks
        // look instead for elements under an element of different types
        showHideButtonConfigure("#show-hide-background-shape", ".backgroundshapes", false);
        createSliderNumberHook('shapeConfigXShape1', 'shapeConfigXShape1Display');
        createSliderNumberHook('shapeConfigYShape1', 'shapeConfigYShape1Display');
        createSliderNumberHook('shapeConfigWidthShape1', 'shapeConfigWidthShape1Display');
        createSliderNumberHook('shapeConfigHeightShape1', 'shapeConfigHeightShape1Display');
        createSliderNumberHook('shapeConfigOpacityShape1', 'shapeConfigOpacityShape1Display');
        createSliderNumberHook('shapeConfigAngleShape1', 'shapeConfigAngleShape1Display');
        setMinMaxValue(0, 1080, 200, 'shapeConfigXShape1', 'shapeConfigXShape1Display');
        setMinMaxValue(0, 1080, 200, 'shapeConfigYShape1', 'shapeConfigYShape1Display');
        setMinMaxValue(0, 1080, 200, 'shapeConfigWidthShape1', 'shapeConfigWidthShape1Display');
        setMinMaxValue(0, 1080, 200, 'shapeConfigHeightShape1', 'shapeConfigHeightShape1Display');
        setMinMaxValue(1, 100, 100, 'shapeConfigOpacityShape1', 'shapeConfigOpacityShape1Display');
        setMinMaxValue(0, 180, 0, 'shapeConfigAngleShape1', 'shapeConfigAngleShape1Display');
        document.getElementById("shapeConfigXShape1").addEventListener("change", renderImages);
        document.getElementById("shapeConfigYShape1").addEventListener("change", renderImages);
        document.getElementById("shapeConfigWidthShape1").addEventListener("change", renderImages);
        document.getElementById("shapeConfigHeightShape1").addEventListener("change", renderImages);
        document.getElementById("shapeConfigOpacityShape1").addEventListener("change", renderImages);
        document.getElementById("shapeConfigAngleShape1").addEventListener("change", renderImages);

        document.getElementById("shapeConfigShape1RenderIt").addEventListener("change", renderImages);
        document.getElementById("shapeColourPickerShape1").addEventListener("change", renderImages);
        document.getElementById("shapeConfigXShape1Display").addEventListener("change", renderImages);
        document.getElementById("shapeConfigYShape1Display").addEventListener("change", renderImages);
        document.getElementById("shapeConfigWidthShape1Display").addEventListener("change", renderImages);
        document.getElementById("shapeConfigHeightShape1Display").addEventListener("change", renderImages);
        document.getElementById("shapeConfigOpacityShape1Display").addEventListener("change", renderImages);
        document.getElementById("shapeConfigAngleShape1Display").addEventListener("change", renderImages);
        document.getElementById("shapeConfigXShape1Display").addEventListener("imput", renderImages);
        document.getElementById("shapeConfigYShape1Display").addEventListener("imput", renderImages);
        document.getElementById("shapeConfigWidthShape1Display").addEventListener("imput", renderImages);
        document.getElementById("shapeConfigHeightShape1Display").addEventListener("imput", renderImages);
        document.getElementById("shapeConfigOpacityShape1Display").addEventListener("imput", renderImages);
        document.getElementById("shapeConfigAngleShape1Display").addEventListener("imput", renderImages);

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

}

