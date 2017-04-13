import '../styles/site.scss';
import '../images/logo.png';
if (process.env.NODE_ENV !== 'production') {
  require('file-loader!../index.html')
}

console.log('hello everyone this is nagual --> ')
