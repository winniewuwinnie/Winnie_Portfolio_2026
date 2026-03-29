window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'UA-178494487-1');

function CallGaBtn(_clickName) {

    gtag('event', 'click', {
        'event_category': '2020Q4event16cha',
        'event_label': _clickName
    });
}