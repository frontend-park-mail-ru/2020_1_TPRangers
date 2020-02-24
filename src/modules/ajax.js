(function() {
  class FetchModule {
    _fetchApi({ method = 'GET', url = '/', body = null, callback = () => void 0 } = {}) {
      let headers = {};
      if (body) {
        headers = {
          'Content-Type': 'application/json',
        };
      }
      fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        mode: 'cors',
        credentials: 'same-origin',
      })
        .then(callback)
        .catch(err => {
          console.log(`Fetch error: ${err}`);
        });
    }

    fetchGET({ url = '/', callback = () => void 0 } = {}) {
      this._fetchApi({
        method: 'GET',
        url: url,
        callback: callback,
      });
    }

    fetchPOST({ url = '/', body = null, callback = () => void 0 } = {}) {
      this._fetchApi({
        method: 'POST',
        url: url,
        body: body,
        callback: callback,
      });
    }

    fetchPUT({ url = '/', body = null, callback = () => void 0 } = {}) {
      this._fetchApi({
        method: 'PUT',
        url: url,
        body: body,
        callback: callback,
      });
    }

    fetchDELETE({ url = '/', body = null, callback = () => void 0 } = {}) {
      this._fetchApi({
        method: 'DELETE',
        url: url,
        body: body,
        callback: callback,
      });
    }
  }

  globalThis.FetchModule = new FetchModule();
})();
