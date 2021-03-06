const sleep = require('js-util/sleep');

export default class WebCamera {
  constructor() {
    this.video = document.createElement('video');
    this.resolution = {
      x: 0,
      y: 0
    };
  }
  async init() {
    if (!navigator.mediaDevices) return;

    await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: `environment`, // environment or user
        }
      })
      .then((stream) => {
        this.video.srcObject = stream;
      })
      .catch((error) => {
        window.alert("It wasn't allowed to use WebCam.");
      });

    // get video stream, and set attributes to video object to play auto on iOS.
    this.video.setAttribute("playsinline", true);
    this.video.setAttribute("controls", true);

    // play video.
    this.video.play();

    // get video resolution with promise.
    await sleep(1000);
    this.resolution.x = this.video.videoWidth;
    this.resolution.y = this.video.videoHeight

    return;
  }
}
