(function () {
    // Your GoatCounter site code — the 'yourname' in yourname.goatcounter.com.
    // (You can also paste a full https:// endpoint.) Leave empty to disable.
    const goatCounterSiteCode = 'nivedithasi';
    const respectDoNotTrack = true;
    const respectGlobalPrivacyControl = true;

    function hasDoNotTrackEnabled() {
        return navigator.doNotTrack === '1' ||
            window.doNotTrack === '1' ||
            navigator.msDoNotTrack === '1';
    }

    function hasGlobalPrivacyControlEnabled() {
        return navigator.globalPrivacyControl === true;
    }

    function isLocalDevelopmentHost() {
        return window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname === '::1' ||
            window.location.hostname === '[::1]';
    }

    function endpointFromSiteCode(siteCode) {
        const trimmedCode = siteCode.trim();
        if (!trimmedCode) return '';
        if (/^https?:\/\//.test(trimmedCode)) return trimmedCode;
        return 'https://' + trimmedCode + '.goatcounter.com/count';
    }

    function shouldSkipVisitTracking(endpoint) {
        if (!endpoint || window.location.protocol === 'file:') return true;
        if (isLocalDevelopmentHost()) return true;
        if (respectDoNotTrack && hasDoNotTrackEnabled()) return true;
        if (respectGlobalPrivacyControl && hasGlobalPrivacyControlEnabled()) return true;
        return false;
    }

    function loadTracker(endpoint) {
        if (document.querySelector('script[data-goatcounter]')) return;

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://gc.zgo.at/count.js';
        script.dataset.goatcounter = endpoint;
        document.head.appendChild(script);
    }

    const endpoint = endpointFromSiteCode(goatCounterSiteCode);
    if (shouldSkipVisitTracking(endpoint)) return;

    const ready = window.siteVisitTrackingReady;
    if (ready && typeof ready.then === 'function') {
        ready.then(
            function () { loadTracker(endpoint); },
            function () { loadTracker(endpoint); }
        );
        return;
    }

    loadTracker(endpoint);
})();
