import Observer from '../controller/observer'
/**
 * Базовая функция для FetchAPI
 * @string method
 * @string url
 * @json body
 * @function callback
 * @json headers
 */
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
      console.log(err)
      Observer.emit('render:error', {
        status: 500,
        text: 'Упс.. Скоро мы все починим :)',
        backButton: false,
      });
    });
}

/**
 * Замыкание для GET запроса для FetchAPI
 * @string url
 * @json headers
 * @function callback
 */
export function fetchGET({ url = '/', headers = {}, callback = () => void 0 } = {}) {
  return fetchApi({
    method: 'GET',
    headers,
    url,
    callback,
  });
}

/**
 * Замыкание для POST запроса для FetchAPI
 * @string url
 * @json headers
 * @function callback
 */
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

/**
 * Замыкание для PUT запроса для FetchAPI
 * @string url
 * @json headers
 * @function callback
 */
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
    callback,
    headers,
  });
}

/**
 * Замыкание для DELETE запроса для FetchAPI
 * @string url
 * @json headers
 * @function callback
 */
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

export function fetchMultipartPOST({
  url = '/',
  body = null,
  callback = () => void 0,
} = {}) {
  return fetchApi({
    method: 'POST',
    url,
    body,
    callback,
  });
}
