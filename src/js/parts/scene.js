
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

class onLoad {
    constructor() {
        imagesToLoad--;
        this.onload = null;

        if (!imagesToLoad) {
            render();
            gsap.set(canvas, { autoAlpha: 1 });
        }
    }
}




gsap.to(".home__video", {
    width: '100%',
    height: '100vh',
    yPercent: 0,
    top: 0,

    scrollTrigger: {
        trigger: '.home',
        start: "top top",
        end: "+=200%",
        // markers: true,
        pin: true,
        scrub: true,


        onEnter: () => {
            console.log('onEnter');
        },
        onLeave: () => {
            console.log('onLeave');

        },
        onEnterBack: () => {
            console.log('onEnterBack');

        },
        onLeaveBack: () => {
            console.log('onLeaveBack');

        }
    }
})

const playVideoBtn = document.querySelector('.home__video button');
const videoIframe = document.querySelector('.home__video iframe');

playVideoBtn.addEventListener('click', function () {
    playVideoBtn.classList.add('_hide');
    videoIframe.classList.add('_show');
    videoIframe.src = videoIframe.dataset.src;
});




let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

let width = window.innerWidth

if (window.innerWidth >= 1500) {
    width = document.querySelector('.scene__container').getBoundingClientRect().width;
}

canvas.width = width
canvas.height = window.innerHeight;

console.log(canvas.width, canvas.height);

let frameCount = 45 + 1;
let currentFrame = index => (
    `img/scene1/Scene01_${(index).toString().padStart(5, '0')}.png`
);

let images = []
let airpods = {
    frame: 0
};

let imagesToLoad = frameCount;

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.onload = new onLoad;
    img.src = currentFrame(i);
    images.push(img);
}


gsap.to(airpods, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: 0.5,
        pin: 'canvas',
        onEnter: () => console.log('onEnter'),
        onEnterBack: () => console.log('onEnterBack'),
        onLeave: () => console.log('onLeave'),
        onLeaveBack: () => console.log('onLeaveBack'),
    },
    onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.drawImage(images[airpods.frame], 0, 0);
    context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height);
}


const scrollElems = gsap.utils.toArray(".scene__content-item");

scrollElems.forEach((elem, i) => {
    ScrollTrigger.create({
        trigger: elem,
        start: "top center",
        end: "+=100%",
        // markers: true,


        onEnter: () => {
            elem.classList.add('_show');
        },
        onLeave: () => {
            elem.classList.remove('_show');
            elem.classList.add('_hide');
        },
        onEnterBack: () => {
            elem.classList.remove('_hide');
            elem.classList.add('_show');
        },
        onLeaveBack: () => {
            elem.classList.remove('_show');
        }
    });
});



ScrollTrigger.normalizeScroll();

// window.addEventListener('resize', function () {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// })