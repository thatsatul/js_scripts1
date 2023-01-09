const lights = [
  {
    color: 'red',
    time: 3
  },
  {
    color: 'green',
    time: 5
  },
  {
    color: 'yellow',
    time: 2
  },
];

const fullTimerDuration = 60;

const showTimer = (timer, lightIndex) => {
  if(timer <= 0) {
    return;
  }
  let timerCopy = timer;
  let lightTime = lights[lightIndex].time;
  if (timerCopy > lightTime) {
    console.log(`Starting ${lights[lightIndex].color} for ${lightTime} seconds`);
    timerCopy = timerCopy - lightTime;
  } else {
    lightTime = timerCopy;
    timerCopy = 0;
    console.log(`Starting ${lights[lightIndex].color} for ${lightTime} seconds`);
  }
  const tm = setTimeout(() => {
    clearTimeout(tm);
    let nextIndex = lightIndex + 1;
    if (nextIndex >= lights.length) {
      nextIndex = 0;
    }
    showTimer(timerCopy, nextIndex);
  }, lightTime * 1000);
}

showTimer(fullTimerDuration, 0);
