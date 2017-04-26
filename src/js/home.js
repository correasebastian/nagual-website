export class Home {
  constructor() {}
  init() {
    this.$video = document.getElementById('home-video');
    this.$btnPlay = document.querySelector('.btn-play');
    this.$btnDemo = document.querySelector('.btn-get-started');

    this.setListeners();
  }

  setListeners() {
    this.$btnPlay.addEventListener('click', () => {
      this.$btnDemo.classList.add('playing');
      this.$video.play();

      this.$btnPlay.classList.add('hidden-xs-up');
      this.$video.setAttribute('controls', '');

      // console.log('manual play');
      // console.time('pl');
    });

    this.$video.addEventListener('ended', () => {
      this.$btnPlay.classList.remove('hidden-xs-up');
      this.$video.removeAttribute('controls');
      this.$btnDemo.classList.remove('playing');
      this.$video.currentTime = 0;
      this.$video.classList.add('hide-native-ios-play-btn');
    });

    this.$video.addEventListener('playing', () => {
      // console.log('playing');
      // console.timeEnd('pl');
      this.$video.classList.remove('hide-native-ios-play-btn');
    });


  }
}
