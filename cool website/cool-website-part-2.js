const song = new Audio(
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
);

function playSong() {
  song.currentTime = 0;
  song.play();
}

function init() {
  const songButton = document.getElementById("songbutton");
  if (!songButton) return;

  songButton.addEventListener("click", () => {
    playSong();
    console.log("Song button clicked");
    alert("Playing cool song!");
  });
  const stopsongButton = document.getElementById("stopsongbutton");
  if (!stopsongButton) return;

  stopsongButton.addEventListener("click", () => {
    song.pause();
    console.log("Stop song button clicked");
    alert("Song stopped!");
  });
}

document.addEventListener("DOMContentLoaded", init);


