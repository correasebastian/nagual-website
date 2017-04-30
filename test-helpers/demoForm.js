const config = {
  fullname: 'sebas',
  company: 'sawyer',
  role: 'role',
  email_address: 'sebas@sebas.com',
  phone: '3454567898'
};

Object.entries(config).forEach(entry => {
  var [key, value] = entry;
  console.log(key, value);
  document.querySelector(`input[name="${key}"]`).value = value;
})
;
