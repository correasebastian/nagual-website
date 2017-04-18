export class Home {
  constructor() {}
  init() {
    this.$video = document.getElementById('home-video');
    this.$btnPlay = document.querySelector('.btn-play');

    this.setListeners();
  }

  setListeners(){
    this.$btnPlay.addEventListener('click', ()=>{
      this.$video.play();
    });
  }
}
