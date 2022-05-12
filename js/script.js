

SmoothScroll({
   // Время скролла 400 = 0.4 секунды
   animationTime: 800,
   // Размер шага в пикселях
   stepSize: 35,

   // Дополнительные настройки:

   // Ускорение
   accelerationDelta: 30,
   // Максимальное ускорение
   accelerationMax: 2,

   // Поддержка клавиатуры
   keyboardSupport: true,
   // Шаг скролла стрелками на клавиатуре в пикселях
   arrowScroll: 50,

   // Pulse (less tweakable)
   // ratio of "tail" to "acceleration"
   pulseAlgorithm: true,
   pulseScale: 4,
   pulseNormalize: 1,

   // Поддержка тачпада
   touchpadSupport: true,
})
const animItems = document.querySelectorAll('._anim-item');

if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
   function animOnScroll() {
      for (let i = 0; i < animItems.length; i++) {
         const animItem = animItems[i],
            animItemHeight = animItem.offsetHeight,
            animItemOffset = offset(animItem).top,
            animStart = 4;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add('_active');

         } else {
            animItem.classList.remove('_active');
         }
      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }

   setTimeout(() => {
      animOnScroll();
   }, 300);
}
;


let sun = document.getElementById("sun");
let earth = document.getElementById("earth");
let saturn = document.getElementById("saturn");
let mars = document.getElementById("mars");
let jupiter = document.getElementById("jupiter");
let venus = document.getElementById("venus");
let mercury = document.getElementById("mercury");
let neptun = document.getElementById("neptun");
let uran = document.getElementById("uran");
// sun.src = '../img/sun.png';
// earth.src = '../img/Earth2.png';
// saturn.src = '../img/Saturn.png';;
let canvas = document.querySelector('.solar-system__canvas'),
   c = canvas.getContext('2d');

saturn.addEventListener('load', () => {
   canvas.width = document.documentElement.clientWidth;
   canvas.height = document.documentElement.clientHeight;

   addEventListener('resize', () => {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
      init();
   });

   c.fillRect(0, 0, canvas.width, canvas.height);
   const timesToUpdate = 60000 / 14.5,
      starsMoveCoefficients = 0.5,
      planetsMoveCoefficients = 1.5;
   class Circle {
      constructor(x, y, width, height, velocity, distance, image) {
         this.x = x;
         this.y = y;
         this.width = width;
         this.height = height
         this.baseX = x;
         this.baseY = y;
         this.radians = 0;
         this.velocity = velocity;
         this.distance = distance;
         this.image = image;
      }

      draw() {
         c.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
      update() {
         this.radians += this.velocity;
         this.x = this.baseX + Math.cos(this.radians) * this.distance;
         this.y = this.baseY + Math.sin(this.radians) * this.distance;
         this.draw();
      }
   }

   class Star {
      constructor(x, y, radius, color) {
         this.x = x;
         this.y = y;
         this.radius = radius;
         this.color = color;
      }
      draw() {
         c.beginPath();
         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
         c.fillStyle = this.color;
         c.fill();
         c.closePath();
         c.shadowColor = this.color;
         c.shadowBlur = 200;
      }
      update() {
         this.draw();
      }
   }


   let keys = {
      pressed: false,
      right: false,
      left: false,
      up: false,
      down: false,
   }
   addEventListener('keydown', ({ keyCode }) => {
      keys.pressed = true;
      switch (keyCode) {
         case 65: keys.left = true; break;
         case 83: keys.down = true; break;
         case 68: keys.right = true; break;
         case 87: keys.up = true; break;
      }
   });
   addEventListener('keyup', ({ keyCode }) => {
      keys.pressed = false;
      switch (keyCode) {
         case 65: keys.left = false; break;
         case 83: keys.down = false; break;
         case 68: keys.right = false; break;
         case 87: keys.up = false; break;
      }
   });



   let planets,
      stars;
   let objPlanets = [
      earth = {
         distance: 230,
         velocity: 0,
         timeToRotate: 1,
         img: earth,
         width: 50,
         height: 50
      },
      saturn = {
         velocity: 0,
         distance: 490,
         width: 120,
         height: 70,
         timeToRotate: 29.5,
         img: saturn
      },
      sun = {
         velocity: 0,
         distance: 0,
         width: 260,
         height: 260,
         timeToRotate: 84,
         img: sun
      },
      mars = {
         distance: 280,
         velocity: 0,
         timeToRotate: 1.88,
         img: mars,
         width: 33,
         height: 33
      },
      venus = {
         distance: 180,
         velocity: 0,
         timeToRotate: 0.615,
         img: venus,
         width: 38,
         height: 38
      },
      mercury = {
         distance: 150,
         velocity: 0,
         timeToRotate: 0.24,
         img: mercury,
         width: 15,
         height: 15
      },
      jupiter = {
         distance: 370,
         velocity: 0,
         timeToRotate: 11.86,
         img: jupiter,
         width: 170,
         height: 170
      },
      neptun = {
         distance: 600,
         velocity: 0,
         timeToRotate: 164.7,
         img: neptun,
         width: 45,
         height: 45
      },
      uran = {
         distance: 700,
         velocity: 0,
         timeToRotate: 84,
         img: uran,
         width: 80,
         height: 110
      },
   ]
   function init() {
      stars = [];
      for (let index = 0; index < 800; index++) {
         stars.push(new Star(Math.random() * 3000, Math.random() * 3000, 2, 'white'));
      }
      planets = [];
      objPlanets.forEach(elem => {
         elem.velocity = ((2 * Math.PI * 100 / timesToUpdate) / 100) / elem.timeToRotate;
         planets.push(new Circle(canvas.width / 2 - elem.width / 2, canvas.height / 2 - elem.height / 2, elem.width, elem.height, elem.velocity, elem.distance, elem.img));
      });

   }

   function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height)
      c.fillStyle = 'black';
      c.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
         star.update();
      });
      planets.forEach(planet => {
         planet.update();
      });


      if (keys.down) {
         planets.forEach(planet => {
            planet.baseY += planetsMoveCoefficients;
         });
         stars.forEach(star => {
            star.y += starsMoveCoefficients;
         });
      }
      if (keys.up) {
         planets.forEach(planet => {
            planet.baseY -= planetsMoveCoefficients;
         });
         stars.forEach(star => {
            star.y -= starsMoveCoefficients;
         });
      }
      if (keys.left) {
         planets.forEach(planet => {
            planet.baseX -= planetsMoveCoefficients;
         });
         stars.forEach(star => {
            star.x -= starsMoveCoefficients;
         });
      }
      if (keys.right) {
         planets.forEach(planet => {
            planet.baseX += planetsMoveCoefficients;
         });
         stars.forEach(star => {
            star.x += starsMoveCoefficients;
         });
      }
   }


   init();
   animate();
});
;

var typed = new Typed('#typed', {
   stringsElement: '#main-title',
   typeSpeed: 70,
   startDelay: 600,
});

window.onload = function () {
   const starsSpeedK = 30;
   const starsSpeedD = 20;

   const speed = 0.05;
   let positionX = 0, positionY = 0;
   // let spositionX = 0, spositionY = 0;
   let coordXprocent = 0, coordYprocent = 0;
   // let scoordXprocent = 0, scoordYprocent = 0;
   const stars = document.querySelector('.paralax-images__stars1'),
      stars2 = document.querySelector('.paralax-images__stars2'),
      // stars3 = document.querySelector('.solar-system__parallax'),
      // stars4 = document.querySelector('.solar-system__parallax2'),
      mainParallax = document.querySelector('.main'),
      solarSystemParallax = document.querySelector('.solar-system');

   function setMouseParallaxStyle() {
      const distX = coordXprocent - positionX,
         distY = coordYprocent - positionY;
      // const sdistX = scoordXprocent - spositionX,
      //    sdistY = scoordYprocent - spositionY;

      positionX = positionX + (distX * speed);
      positionY = positionY + (distY * speed);
      // spositionX = spositionX + (sdistX * speed);
      // spositionY = spositionY + (sdistY * speed);

      stars.style.cssText = `transform: translate(${positionX / starsSpeedK}%, ${positionY / starsSpeedK}%)`
      stars2.style.cssText = `transform: translate(${positionX / starsSpeedD}%, ${positionY / starsSpeedD}%)`
      // stars3.style.cssText = `transform: translate(${spositionX / starsSpeedD}%, ${spositionY / starsSpeedD}%)`
      // stars4.style.cssText = `transform: translate(${spositionX / starsSpeedK}%, ${spositionY / starsSpeedK}%)`



      requestAnimationFrame(setMouseParallaxStyle);
   }
   setMouseParallaxStyle();


   mainParallax.addEventListener('mousemove', e => {
      const parallaxWidth = mainParallax.offsetWidth,
         parallaxHeight = mainParallax.offsetHeight;


      const coordX = e.pageX - parallaxWidth / 2,
         coordY = e.pageY - parallaxHeight / 2;
      coordXprocent = coordX / parallaxWidth * 100;
      coordYprocent = coordY / parallaxHeight * 100;
   });
   // solarSystemParallax.addEventListener('mousemove', e => {
   //    const parallaxWidth = solarSystemParallax.offsetWidth,
   //       parallaxHeight = solarSystemParallax.offsetHeight;
   //    console.log(parallaxHeight);

   //    const scoordX = e.pageX - parallaxWidth / 2,
   //       scoordY = e.pageY - parallaxHeight / 2;

   //    scoordXprocent = scoordX / parallaxWidth * 100;
   //    scoordYprocent = scoordY / parallaxHeight * 100;
   // });

}
const mainSvgIcon1 = document.querySelector('.main-icon-1');
const mainSvgIcon2 = document.querySelector('.main-icon-2');
const mainSvgIcon3 = document.querySelector('.main-header');
setTimeout(() => {
   mainSvgIcon1.style.opacity = "1";
   mainSvgIcon2.style.opacity = "1";
   mainSvgIcon3.style.opacity = "1";
}, 4500);

let scrollHeight = Math.max(
   document.body.scrollHeight, document.documentElement.scrollHeight,
   document.body.offsetHeight, document.documentElement.offsetHeight,
   document.body.clientHeight, document.documentElement.clientHeight
);

let width = document.documentElement.clientWidth;


let specialAnimItem = document.querySelector('.special-animation'),
   progressLine = document.querySelector('.main-header__progress-line'),
   progressBarIcon = document.querySelector('.main-header__icon');


addEventListener('scroll', () => {
   let scrollProgress = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;

   progressLine.style.width = `${scrollProgress}%`;
   if (window.pageYOffset > 0) {
      specialAnimItem.style.cssText = `
            transform: translate(-50%, -${50 + window.pageYOffset / 2}%);
         `;
      progressBarIcon.classList.add('_active');
   } else {
      progressBarIcon.classList.remove('_active');
   }
});



// progressLine.style.width = 

