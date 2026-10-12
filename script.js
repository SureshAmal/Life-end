const { animate, splitText, stagger, utils, onScroll, spring, cubicBezier } =
  anime;
const { chars } = splitText("heading", { words: false, chars: true });

const container = document.querySelector("container");
const heading = document.querySelector("heading");
const shaderart = document.querySelector("shader-art");

function deadcontentwrite() {
  heading.style.position = "static";
  const deadsong = document.querySelector("deadsong");
  deadsong.style.display = "block";
  deadsong.style.whiteSpace = "normal";
  deadsong.style.overflowWrap = "break-word";
  const { chars } = splitText(deadsong, { words: { wrap: true }, chars: true });
  container.style.alignItems = "flex-start";
  container.style.justifyContent = "start";
  container.style.padding = "2rem";

  animate(chars, {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 200,
    delay: stagger(30),
  });
}

function moveHeadingTop() {
  heading.style.position = "fixed";
  document.querySelector("body").removeChild(shaderart);
  animate("heading", {
    top: "2rem",
    left: "2rem",
    ease: spring({
      bounce: 0.3,
      duration: 600,
    }),
    loop: false,
    onComplete: deadcontentwrite,
  });
}

// tried scroll and found it not good ux
function animatedboxScroll() {
  const box = animate("movingbox", {
    height: ["1rem", "100vh"],
    width: ["1rem", "100vw"],
    borderRadius: ["50%", "20%", "5%", "0px"],
    ease: "inExpo",
    backgroundColor: [{ to: "#000000" }],
    top: 0,
    right: 0,
    duration: 800,
    autoplay: true,
    loop: false,
    onComplete: moveHeadingTop,
  });
}

animate(chars, {
  y: [
    { to: "-2.75rem", ease: "outExpo", duration: 600 },
    { to: 0, ease: "outBounce", duration: 800, delay: 100 },
  ],
  // Property specific parameters
  rotate: {
    from: "-1turn",
    delay: 0,
  },
  delay: stagger(50),
  ease: "inOutCirc",
  loopDelay: 1000,
  loop: false,
  onComplete: animatedboxScroll,
});

let cursormoved = false;

window.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  // Update the position of the div using the mouse coordinates
  const cursordiv = document.querySelector("cursordiv");

  animate(cursordiv, {
    translateX: mouseX,
    translateY: mouseY,
    duration: 400,
    easing: "easeOutExpo",
    overwrite: "auto",
  });
  if (!cursormoved) {
    animate(cursordiv, { opacity: "1", duration: 500 });
    cursormoved = true;
  }
});
