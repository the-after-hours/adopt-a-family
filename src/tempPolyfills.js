// This file is a temporary fix for
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
const raf = (global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
});

export default raf;
