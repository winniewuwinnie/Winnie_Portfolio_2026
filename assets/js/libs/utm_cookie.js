var Util = {

    toGetParam: function (name, casesensitive) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var href = window.location.href;

        if (!casesensitive) name = name.toLowerCase();
        if (!casesensitive) href = href.toLowerCase();

        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(href);

        if (results == null) {
            return "";
        } else {
            return results[1];
        }
    }

};