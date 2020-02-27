function fetchApi({
  method = 'GET',
  url = '/',
  body = null,
  callback = () => void 0,
  headers,
} = {}) {
  fetch(url, {
    method,
    headers,
    body,
    mode: 'cors',
    credentials: 'include',
  })
    .then(callback)
    .catch(err => {
      console.log(`Fetch error: ${err}`);
    });
}

export function fetchGET({ url = '/', headers = {}, callback = () => void 0 } = {}) {
  return fetchApi({
    method: 'GET',
    headers,
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
  // headers = { 'Content-Type': 'multipart/form-data' },
  callback = () => void 0,
} = {}) {
  return fetchApi({
    method: 'PUT',
    url,
    body,
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
