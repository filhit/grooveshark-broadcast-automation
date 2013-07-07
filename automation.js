(function ($) {
    "use strict";
    var automationInterval = 5000;

    var Grooveshark = function () {
        this.isPlaying = function() {
            return $("#bc-now-playing-title:visible").length > 0;
        };

        this.isBroadcastOwner = function () {
            return $("#bc-col1").length > 0;
        };

        this.approveAllSuggestions = function () {
            $("#suggestions-grid .song .bc-actions .btn.approve:visible").each(function () {
                this.click()
            });
        };
    };

    function doAutomate() {
        var grooveshark = new Grooveshark();
        if (!grooveshark.isBroadcastOwner()) {
            return;
        }

        if (!grooveshark.isPlaying()) {
            grooveshark.approveAllSuggestions();
        }
    }

    window.setInterval(doAutomate, automationInterval);
}) (jQuery);
