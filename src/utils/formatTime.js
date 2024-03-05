const formatTime = (time) => {
  return parseInt(time / 60) > 0
    ? parseInt(time / 60) + 'ч ' + (time % 60) + 'м'
    : (time % 60) + 'м';
};

export default formatTime;
