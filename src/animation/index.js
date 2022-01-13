module.exports = {
  CARD: {
    visible: {
      x: 0,
      opacity: 1,
    },
    hidden: {
      x: -32,
      opacity: 0.4,
    },
  },
  CONTAINER: {
    visible: {
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    hidden: {
      transition: {
        when: "afterChildren",
      },
    },
  },
};
