function fetchApi({
  method = 'GET',
  url = '/',
  headers = {},
  body = null,
  callback = () => void 0,
} = {}) {
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

export function fetchGET({ url = '/', callback = () => void 0 } = {}) {
  return fetchApi({
    method: 'GET',
    url: url,
    callback: callback,
  });
}

export function fetchPOST({
  url = '/',
  body = null,
  headers = { 'Content-Type': 'application/json' },
  callback = () => void 0,
} = {}) {
  return fetchApi({
    method: 'POST',
    url: url,
    body: body,
    headers: headers,
    callback: callback,
  });
}

export function fetchPUT({
  url = '/',
  body = null,
  headers = { 'Content-Type': 'application/json' },
  callback = () => void 0,
} = {}) {
  return fetchApi({
    method: 'PUT',
    url: url,
    body: body,
    headers: headers,
    callback: callback,
  });
}

export function fetchDELETE({
  url = '/',
  body = null,
  headers = {},
  callback = () => void 0,
} = {}) {
  return fetchApi({
    method: 'DELETE',
    url: url,
    body: body,
    headers: headers,
    callback: callback,
  });
}
