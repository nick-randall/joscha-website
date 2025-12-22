const cool_object = {
  age: 0,
  name: " cool object",
  saymyname: function () {
    console.log("my name is" + this.name);
  },
};
cool_object.saymyname();
const array = [];

for (let j = 0; j < 100; j = j + 1) {
  const object = {
    name: "bob",
    age: j
  };
  //array.push(object);
} 

for (let j = 0; j < 100; j = j + 1){
    console.log(array[j])
}


    let i = 0;
    function setup(){
    createCanvas(windowWidth, windowHeight);
}
function draw(){
     i = i + 0.5;
 
  
document.getElementById("myButton").addEventListener("click", function(){
  circle(i,200,50);
}
)};
const shape1 = {
    x: 200,
    y: 200,
    size: 50
};

 array.push(shape1);
 console.log(array[0]);























































































































































































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