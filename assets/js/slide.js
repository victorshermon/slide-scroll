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
    let movetype;
    if(event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = 'mousemove'
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove';
    }

    console.log(event.type);

    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
   this.wrapper.removeEventListener(movetype, this.onMove);
   this.dist.finalPosition = this.dist.movePosition;
   this.changedSlideOnEnd();
  }

  changedSlideOnEnd() {
    if(this.dist.movement > 120) {
      this.activeNextSlide();
    } else if(this.dist.movement < -120) {
      this.activePrevSlide();
    } else {
      this.changedSlide(this.index.active);
    }
  }


  addEventsList() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  bind() {
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  /* Slide Configs */

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slideConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return {position, element}
    });
    console.log(this.slideArray);
  }

  slideIndexNav(index) {
    const last = this.slideArray.length;
    this.index = {
      prev:index ? index - 1 : undefined,
      active:index,
      next:(index === (last -1) ) ? undefined : index + 1,
    }
  }

  changedSlide(index) {
   const activeSlide = this.slideArray[index];
   this.moveSlide(activeSlide.position);
   this.slideIndexNav(index);
   this.dist.finalPosition = activeSlide.position;
  }

  activePrevSlide() {
    if(this.index.prev !== undefined) this.changedSlide(this.index.prev);
  }
  activeNextSlide() {
    if(this.index.next !== undefined){
      this.changedSlide(this.index.next);
    }

  }

  init() {
    this.slideConfig();
    this.bind();
    this.addEventsList();
  }


}
