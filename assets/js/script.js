import {slideNav} from './slide.js';
let slide = new slideNav('.slide-wrapper', '.slide');
slide.init();
slide.changedSlide(3);
console.log(slide.activePrevSlide());
