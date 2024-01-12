export const fadeUpAnimate = {
  initial: {
    opacity: 0,
    y: 100,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 500,
    },
  },
};

export const fadeDownAnimate = {
  initial: {
    opacity: 0,
    y: -100,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 500,
    },
  },
};

export const fadeLeftAnimate = {
  initial: {
    opacity: 0,
    x: -100,
  },
  visibleOnce: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 500,
    },
  },
};

export const fadeRightAnimate = {
  initial: {
    opacity: 0,
    x: +100,
  },
  visibleOnce: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 500,
    },
  },
};

export const leftLineAnimate = {
  initial: {
    transform: "scaleX(0.4)",
    "transform-origin": "0% 0%",
  },
  visibleOnce: {
    transform: "scaleX(1)",
    "transform-origin": "0% 0%",
    transition: {
      duration: 1700, // 1.7s süre
      easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
      repeat: "both", // Animasyonun her iki yönde tekrarlanmasını sağlar
    },
  },
};

export const fadeUpAnimate1 = {
  initial: {
    opacity: 0,
    y: 100,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 500,
    },
  },
};
export const fadeUpAnimate2 = {
  initial: {
    opacity: 0,
    y: 100,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 700,
    },
  },
};
export const fadeUpAnimate3 = {
  initial: {
    opacity: 0,
    y: 100,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 900,
    },
  },
};

export const leftLineAnimate2 = {
  initial: {
    transform: "scaleX(0.4)",
    "transform-origin": "0% 0%",
    opacity: 0,
  },
  visibleOnce: {
    transform: "scaleX(1)",
    "transform-origin": "0% 0%",
    opacity: 1,
    transition: {
      duration: 1700, // 1.7s süre
      easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
      repeat: "both", // Animasyonun her iki yönde tekrarlanmasını sağlar
    },
  },
};
