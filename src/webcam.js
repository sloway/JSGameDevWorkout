export async function getMedia() {
  const constraints = {
    video: { width: 1280, height: 720 },
    audio: false,
  };
  try {
    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    let webcam = document.querySelector("video");
    webcam.srcObject = stream;
    webcam.onloadedmetadata = function () {
      webcam.play();
    };
  } catch (err) {
    /* handle the error */
  }
}
