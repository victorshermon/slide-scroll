export class slideNav {

  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.dist = {finalPosition: 0, startX: 0, movement: 0}
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    event.preventDefault();
    this.dist.startX = event.clientX;
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
   this.wrapper.removeEventListener('mousemove', this.onMove);
   this.dist.finalPosition = this.dist.movePosition;
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
