(function () {
    "use strict";
    var automationInterval = 5000;

    var Grooveshark = function () {
        this.isPlaying = function() {
            return false;
        };

        this.isBroadcastOwner = function () {

        }

        this.approveAllSuggestions = function () {

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
}) ();
