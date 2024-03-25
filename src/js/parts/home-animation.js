import { gsap } from "gsap";


let tl = gsap.timeline();

tl.to('.home h1 span i', {
    height: 'auto',
    stagger: 0.2,
    duration: 0.5,
    onComplete: () => {
        gsap.to('.home p', {
            opacity: 1,
            duration: 0.5,
            y: 0,
        })

        gsap.to('.home button', {
            opacity: 1,
            y: 0,
            duration: 0.5,
        })

        gsap.to('.home__video', {
            opacity: 1,
            duration: 1,
        })
    }
})

