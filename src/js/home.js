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
    });

    this.$video.addEventListener('ended', () => {
      this.$btnPlay.classList.remove('hidden-xs-up');
      this.$video.removeAttribute('controls');
      this.$btnDemo.classList.remove('playing');
      this.$video.currentTime=0;
    });
  }
}
