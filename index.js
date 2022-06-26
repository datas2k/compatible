const images1 = [
                  './media/1/image-1.png',
                  './media/1/image-2.png',
                  './media/1/image-3.png',
                  './media/1/image-4.png',
                  './media/1/image-5.png',
                  './media/1/image-6.png',
                  './media/1/image-7.png',
                  './media/1/image-8.png'
                ];

const images2 = [
                  './media/2/1.jpg',
                  './media/2/10.jpg',
                  './media/2/11.jpg',
                  './media/2/12.jpg',
                  './media/2/13.jpg',
                  './media/2/14.jpg',
                  './media/2/15.jpg',
                  './media/2/16.jpg',
                  './media/2/17.jpg',
                  './media/2/18.jpg',
                  './media/2/19.jpg',
                  './media/2/2.jpg',
                  './media/2/20.jpg',
                  './media/2/21.jpg',
                  './media/2/22.jpg',
                  './media/2/3.jpg',
                  './media/2/4.jpg',
                  './media/2/5.jpg',
                  './media/2/6.jpg',
                  './media/2/7.jpg',
                  './media/2/8.jpg',
                  './media/2/9.jpg'
                ];

const images3 = [
                  './media/3/5ba.png',
                  './media/3/AmazedTrump.png',
                  './media/3/CA700_large.png',
                  './media/3/sandorjozsefbenedek.jpg',
                  './media/3/skandar3.jpg',
                  './media/3/skandar4.jpg',
                  './media/3/so.jpg',
                  './media/3/star_trek_tng_hd_meme_06_by_gutgutgut-d8zfthp.jpg',
                  './media/3/stuart-cooper-devito-render-flat-artstation.jpg',
                  './media/3/sw.jpg',
                  './media/3/thumpup.jpg',
                  './media/3/tragic-comics-sad-tragidoodles-ben-cameron-27-582c1412f21a0__880.jpg',
                  './media/3/tumblr_oj4dpwdnF41qgevfco1_500.jpg',
                  './media/3/voros_csillag.jpg',
                  './media/3/weird.jpg',
                  './media/3/wow-lifehacks-16.jpg',
                  './media/3/www.tvn.hu_a611d6d7528a7615fd303b3264f124a3.jpg',
                  './media/3/ZStdDkv.jpg'
];


class Carousel {
  constructor(carousel,speed,images) {
    // this.fxs = fxs;
    // this.fxState = true;
    // this.fxCounter = 0;
    this.dir = '100%';
    this.translationComplete = true;
    // this.wrapper = document.getElementsByClassName('wrapper')[0];
    // this.wrapperH = this.wrapper.clientHeight;
    this.speed = speed;
    this.images = images;
    this.index = 0;
    carousel.style.position = 'relative';
    carousel.style.display = "flex";
    carousel.style.flexFlow = "column";
    carousel.style.justifyContent = "center";
    carousel.style.alignItems = "center";
    carousel.style.overflow = "hidden";
    carousel.style.width = `100%`;
    carousel.style.height = `100%`;
    carousel.style.zIndex = 0;
    carousel.style.border = "1px solid black";
    
    this.slidesContainer = document.createElement('div');
    this.slidesContainer.className = 'slides-container';
    this.slidesContainer.style.position = 'relative';
    this.slidesContainer.style.display = "flex";
    this.slidesContainer.style.flexFlow = "row";
    this.slidesContainer.style.justifyContent = "center";
    this.slidesContainer.style.alignItems = "center";
    this.slidesContainer.style.overflow = "hidden";
    this.slidesContainer.style.width = `300%`;
    this.slidesContainer.style.height = `100%`;
    this.slidesContainer.style.zIndex = 1;
    carousel.appendChild(this.slidesContainer);
    
    this.control = document.createElement('div');
    this.control.style.position = 'absolute';
    this.control.style.display = "flex";
    this.control.style.flexFlow = "row";
    this.control.style.justifyContent = "center";
    this.control.style.alignItems = "center";
    this.control.style.width = `100%`;
    this.control.style.height = `100%`;
    this.control.style.backgroundColor = "transparent";
    this.control.style.zIndex = 10;
    this.controlPrev = document.createElement('div');
    this.controlCover = document.createElement('div');
    this.controlNext = document.createElement('div');
    this.controls = [this.controlPrev,this.controlCover,this.controlNext]
    this.controls.forEach(e => {
      e.style.height = '100%';
      e.style.backgroundColor = 'red';
      e.style.width = '1em';
      e.style.zIndex = 100;
      e.style.border = "2px solid cyan";
      this.control.appendChild(e);
    });
    this.controlCover.style.flex = 'auto';
    this.controlCover.style.backgroundColor = 'transparent';
    this.controlPrev.addEventListener('click', ()=> {
      this.animation('left','click');
    },false);
    this.controlNext.addEventListener('click', ()=> {
      this.animation('right','click');
    },false);
    carousel.appendChild(this.control);
    
    this.slides = [];
    this.img = [];
    for (let i = 0; i < 3; i++) {
      this.slides[i] = document.createElement('div');
      this.slides[i].className = 'slide';
      this.slides[i].style.position = 'relative';
      this.slides[i].style.width = `100%`;
      this.slides[i].style.height = `100%`;
      this.slides[i].style.zIndex = 2;
      this.slides[i].addEventListener("transitionend", this.transitionCompleted, false);                    
      

      this.img[i] = document.createElement('img');
      this.img[i].style.position = 'relative';
      this.img[i].style.width = `100%`;
      this.img[i].style.height = `100%`;
      this.img[i].style.zIndex = 0;
      this.img[i].style.objectFit = 'fill';                         // !!!!!!!!!!!!!
      this.img[i].style.zIndex = 3;
            
      this.slides[i].appendChild(this.img[i]);
      this.slidesContainer.appendChild(this.slides[i]);
    };
  
    let t = this;
    let slider = setInterval(function(){t.slider();}, t.speed * 1000  );
    //let fx = setInterval(function(){t.fx();}, t.speed * 120 );
  };


  transitionCompleted() {
    console.log('COMPL!')
    this.translationComplete = true;
  }
  
  fx() {
    let height = this.wrapper.style.height;
    let clientHeight= this.wrapper.clientHeight;
    if (this.fxCounter > this.fxs.length-1) {
      this.fxCounter = 0;
      this.fxState = !this.fxState;
    }
     if (this.fxState) {
      this.wrapper.style.height = `${this.wrapper.clientHeight - (this.wrapper.clientHeight * (0.01 * this.fxs[this.fxCounter]))}px`;
    } else {
      this.wrapper.style.height = `${this.wrapper.clientHeight + (this.wrapper.clientHeight * (0.01 * this.fxs[this.fxCounter]))}px`;
    }
    this.fxCounter++;
  }

  slider() {
    this.animation('right','slide');
  };
  
  copy() {
    let indexLeft,indexRight;
    if (this.index <= 0) {
      indexLeft = (this.images.length-1)-(Math.abs(this.index));
    } else {
      indexLeft = this.index-1;
    }
    if (this.index < 0) {
      this.index = this.images.length-1;
    }
    if (this.index > this.images.length-1) {
      this.index = 0;
    }
    if (this.index >= this.images.length-1) {
      indexRight = this.index - (this.images.length-1);
    } else {
      indexRight = this.index + 1;
    }
    let indexes = [indexLeft,this.index,indexRight];
    for (let i = 0; i < indexes.length; i++) {
      this.img[i].src = `${this.images[indexes[i]]}`;
    }
  }
  

  animation(direction,input) {
    
    if (input == 'click') {
      switch (direction) {
        case 'left':
          this.dir = '-100%';
          break;
        case 'right':
          this.dir = '100%';
          break;
      };  
    };
    

    if (this.translationComplete) {
      this.translationComplete = false;
    
      switch (this.dir) {
        case '-100%':
          this.index++;  
          break;
        case '100%':
          this.index--;  
          break;
      }
      
    
      this.slides.forEach(e => {
        e.style.transition = `transform ${this.speed}s ease`;
        e.style.transform = `translateX(${this.dir})`;  
      });  
      setTimeout( ()=> {
        this.copy();
        this.slides.forEach(e => {
          e.style.transition = "transform 0s linear";
          e.style.transform = `translateX(0)`;
          this.translationComplete = true;  
        });
      }, this.speed * 1000);
    };
    
  };

  anim_slide() {
  }

}

const images = [images3,images2,images3,images3,images2,images3,images1,images2,images1];
const fxs = [1,2,3,1,2,3];    
let speeds = [1,0.7,0.9,1.1];
window.addEventListener('load', ()=> {
  let carousels = Array.from(document.getElementsByClassName('carousel'));
  for (let i = 0; i < carousels.length; i++) {
    carousels[i] = new Carousel(carousels[i],speeds[i],images[i]);
    carousels[i].copy();
  }
});



