export class slideNav {

  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
  }

  onStart(event) {
    event.preventDefault();
   this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    console.log(event.clientX);
  }

  onEnd() {
   this.wrapper.removeEventListener('mousemove', this.onMove);
  }


  addEventsList() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  bind() {
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  init() {
    this.bind();
    this.addEventsList();
  }


}
