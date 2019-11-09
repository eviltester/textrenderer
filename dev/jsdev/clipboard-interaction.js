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
}