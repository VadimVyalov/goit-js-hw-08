import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const THROTTLE_TIME=1000; // ms
const LS_KEY_PLAYER_TIME="videoplayer-current-time"

const saveLS = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set LS state error: ", error.message);
  }
};

const loadLS = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get LS state error: ", error.message);
  }
};


const saveTimePosition=(data)=>{
  saveLS(LS_KEY_PLAYER_TIME,data);
  }
  
const curentPositionPlay=loadLS(LS_KEY_PLAYER_TIME);

if (curentPositionPlay) {
  player.setCurrentTime(curentPositionPlay.seconds);
}

player.on('timeupdate', throttle(saveTimePosition,THROTTLE_TIME));
