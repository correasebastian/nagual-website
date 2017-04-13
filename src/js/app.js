import '../styles/site.scss';
if (process.env.NODE_ENV !== 'production') {
  require('file-loader!../index.html')
}

console.log('hello everyone this is nagual --> ')
