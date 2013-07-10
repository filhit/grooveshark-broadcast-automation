(function ($) {
    "use strict";
    var automationInterval = 5000;

    var Grooveshark = function () {
        function runInWindowContext(func, param) {
            var actualCode = '(' + func + ')(' + JSON.stringify(param) + ');';
            var script = document.createElement('script');
            script.textContent = actualCode;
            (document.head||document.documentElement).appendChild(script);
            script.parentNode.removeChild(script);
        }

        this.isPlaying = function() {
            return $("#bc-now-playing-title:visible").length > 0;
        };

        this.isBroadcastOwner = function () {
            return $("#bc-col1").length > 0;
        };

        this.acceptOverrideListenersOrderPopup = function () {
            $("#dont-ask-again").each(function () {
                this.click();
            });

            var acceptButtons = $(".lightbox-broadcastPauseSkip .btn.submit:visible");
            acceptButtons.each(function () {
                this.click();
            });

            return acceptButtons.length > 0;
        }

        this.approveAllSuggestions = function () {
            var suggestionLinks = $("#suggestions-grid .song .bc-actions .btn.approve:visible");
            suggestionLinks.each(function () {
                this.click();
            });

            return suggestionLinks.length;
        };

        this.playSongsById = function(songIds) {
            runInWindowContext(function (songIds) {
                window.Grooveshark.addSongsByID(songIds);
                window.Grooveshark.next();
            }, songIds);
        }
    };

    function doAutomate() {
        var grooveshark = new Grooveshark();
        if (!grooveshark.isBroadcastOwner()) {
            return;
        }

        if (grooveshark.acceptOverrideListenersOrderPopup()) {
            return;
        }

        if (!grooveshark.isPlaying()) {
            var approvedSuggestionsCount = grooveshark.approveAllSuggestions();
            if (approvedSuggestionsCount === 0) {
                grooveshark.playSongsById([13963]);
            }
        }
    }

    window.setInterval(doAutomate, automationInterval);
}) (jQuery);
