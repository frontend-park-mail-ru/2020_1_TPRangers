export function ajax(method, url, callback) {
    fetch(url, {
        method: method,
        mode: 'cors',
        credentials: "same-origin"
    })
        .then(callback)
        .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });

}
