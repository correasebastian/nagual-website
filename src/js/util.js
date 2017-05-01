export function uno() {
  return 'uno';
}

export function dos() {
  return 'dos';
}

export const $ = {
  byId(id) {
    return document.getElementById(id);
  },
  onDocument(event, handler) {
    document.addEventListener(event, handler);
  },
  getDocumentState() {
    return document.readyState;
  },
  getActionMethod($ele) {

    const action = $ele.getAttribute('action');
    const method = $ele.getAttribute('method');
    return [action, method];
  },
  formTojson($form) {
    let data = {};
    Array.from($form.querySelectorAll('input[name]'))
      .forEach($input => {
        data[$input.getAttribute('name')] = $input.value;
      });

    return JSON.stringify(data);
  },
  fetch(url, method, jsonData) {
    return fetch(url, {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      })
      .then(function(response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      }).catch(function(ex) {
        console.log('http error', ex);
        return Promise.reject(ex);
      });
  }
};

