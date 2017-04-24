export class Home {
  constructor() {}
  init() {
    this.$video = document.getElementById('home-video');
    this.$btnPlay = document.querySelector('.btn-play');

    this.setListeners();
  }

  setListeners() {
    this.$btnPlay.addEventListener('click', () => {
      this.$video.play();
      this.$btnPlay.classList.add('hidden-xs-up');
      this.$video.setAttribute('controls', '');
    });

    this.$video.addEventListener('ended', () => {
      this.$btnPlay.classList.remove('hidden-xs-up');
    });
  }
}
