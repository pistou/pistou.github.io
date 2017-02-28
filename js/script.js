$(document).ready(function() {
    setTimeout(function() {
        var ad = $('ins.adsbygoogle');
        if (ad && ad.html().replace(/\s/g, "").length == 0) {
            $('.adblock-container').show();
        } else {
            $('.adblock-container').hide();
            $('.adsense-responsive').css('min-height', 0);
        }
    }, 3000);
});
