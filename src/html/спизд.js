import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);



const scene1 = document.querySelector('.scene-1 .scene__scene');

const theWindow = window;
const winHeight = window.innerHeight;
const animationHeight = winHeight * 4;

const bp = [
    {
        start: 0,
        duration: animationHeight,
        data: {
            container: scene1,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'https://gist.githubusercontent.com/fatninza/46b85df069b8bf5b4a772d65ab7b8f1c/raw/f4c285cbfe38f92744a37bdeec9dd220c3f755f7/ltt3.json'
        },
        anim: null
    }
];

bp.forEach(v => { v.anim = bodymovin.loadAnimation(v.data) });

window.addEventListener('scroll', function (e) {
    const pos = theWindow.scrollY;

    bp.forEach((v, i) => {
        if (pos >= v.start && pos < v.start + v.duration) {
            const maxFrames = v.anim.totalFrames;
            const frame = maxFrames * (pos - v.start) / v.duration;
            v.anim.goToAndStop(frame, true);
        }
    })
})


ScrollTrigger.create({
    trigger: scene1,
    start: "top top",
    end: `+=${animationHeight - winHeight}`,
    pin: true,
    markers: true
});