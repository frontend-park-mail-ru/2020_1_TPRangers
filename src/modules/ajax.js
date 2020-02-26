function fetchApi({
  method = 'GET',
  url = '/',
  headers = {},
  body = null,
  callback = () => void 0,
} = {}) {
  fetch(url, {
    method,
    headers,
    body,
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
    url,
    callback,
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
    url,
    body,
    headers,
    callback,
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
    url,
    body,
    headers,
    callback,
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
    url,
    body,
    headers,
    callback,
  });
}
