(function () {
    var accData = localStorage.getItem('accData');
    if (accData) {
        accData = JSON.parse(accData);
    } else {
        accData = {};
    }
    var form = document.querySelector('#acc-data');
    var accNumberEl = document.querySelector('#account');
    var userNameEl = document.querySelector('#username');
    var statusEl = document.querySelector('#status')

    if (accData.site) {
        accNumberEl.value = accData.site;
    }

    if (accData.user) {
        userNameEl.value = accData.user
    }
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        localStorage.setItem('accData', JSON.stringify({
            site: accNumberEl.value.trim(),
            user: userNameEl.value.trim()
        }));
        window.location.reload();
    }, false);

    window.site = accData.site;

    window.lpTag = window.lpTag || {};
    window.lpTag.identities = window.lpTag.identities || [];
    window.lpTag.sdes = window.lpTag.sdes || [];

    if (accData.site && accData.user) {
        window.lpTag.identities.push(function (callback) {
            statusEl.innerText = 'Auth identity called';
            setTimeout(function () {
                statusEl.innerText = 'Auth identity responded with auth data after 3 seconds';
                callback({
                    iss: "LivePerson",
                    acr: "loa1",
                    sub: accData.user
                })
                setTimeout(function () {
                    statusEl.innerText = '';
                }, 3000);
            }, 3000);
        });

        lpTag.sdes.push({"type": "ctmrinfo", "info": {customerId: accData.user}});

        window.LPJsMethodName = function (callback) {
            callback(accData.user);
        };

        LPGetAuthenticationToken = function (callback) {
            callback(accData.user);
        }
    }

})();