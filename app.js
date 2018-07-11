var recordButton, stopButton, recorder, liveStream;

window.onload = function () {
  recordButton = document.getElementById('record');
  stopButton = document.getElementById('stop');

  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
  .then(function (stream) {
    liveStream = stream;

    var liveVideo = document.getElementById('live');
    liveVideo.src = URL.createObjectURL(stream);
    liveVideo.play();

    recordButton.disabled = false;
    recordButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);

  }).catch(function(err){
        console.log("There is no camera attached to your Machine!" + err.message);
    });
};

function startRecording() {
  recorder = new MediaRecorder(liveStream);

  recorder.addEventListener('dataavailable', onRecordingReady);
  recordButton.disabled = true;
  stopButton.disabled = false;
  recorder.start();
}

function stopRecording() {
  recordButton.disabled = false;
  stopButton.disabled = true;
  recorder.stop();
}

function onRecordingReady(e) {
  var video = document.getElementById('recording');
  video.src = URL.createObjectURL(e.data);
  video.play();
}
