/*
  @italoadler 2017
  sound and digital artist.
  ruido_branco_ruido_rosa, é parte da série lamentos de uma queimada;
*/

var ruido, invertido;

function preload() {
  background(255,100,100);

  ruido = loadSound('material/rrrrr_menor.wav');

}

function setup() {
  createCanvas(displayWidth, displayHeight);
  ruido.setVolume(0.1);
  ruido.play();
}

function draw() {
  background(255,0,0);
  noStroke();
  fill(255,100,100,map(mouseX,0,255,0,width));
  rect(0,0,width,height);
  ruido.play();
  loadPixels();
  if(mouseIsPressed) {
    background(255,random(110,140),random(120,130));
    ruido.reverseBuffer();
    ruido.play();

    pixelDensity(random(0.1,1) );

  } else {
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var index = (x + y * width)*4;
        pixels[index+0] = x;
        pixels[index+1] = random(255) ;
        pixels[index+2] = y;
        pixels[index+3] = 255;
      }
    }
  }

  updatePixels();

}
