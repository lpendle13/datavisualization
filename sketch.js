let data;
let bgimg;
let buttons;
mouseOver = false;

function preload() {
  data = loadTable('density.csv', 'csv', 'header');
  bgimg = loadImage('central-park-map.jpg');
}

function setup() {
 createCanvas(1800,600);
}

function draw() {
 background(255);

image(bgimg,0,0,1604.3,360.2);

fill(255);
noStroke();
rectMode(CORNER);
fill(255,100);
rect(0,0,1604.2,360.2);

  if (data) {
    let numRows = data.getRowCount();
    let xpos = data.getColumn('X');
    let ypos = data.getColumn('Y');
    let size = data.getColumn('Count');
    let square = data.getColumn('Hectare');

    for (let i = 0; i < numRows; i++) {
      let x = xpos[i]*37.3;
      let y = ypos[i]*37.3 - 5;
      let xy = xpos[i]*37.3;
      let dx = size[i]*1.1;
      let dy = size[i]*1.1;
      let count = size[i];
      let hectare = square[i];

      rectMode(CENTER);
      fill(0);
      noStroke();
      ellipse(x, y, dx, dy);
    
      stroke(0,100,0);
      strokeWeight(0.05);
      
      if (xy<400) {
        line (0, xy-23.65, 1604.2, xy-23.65);} //horizontal gridlines
      line (18.65, 0, 18.65, 360.2); //vertical far left line
      line (x+18.65, 0, x+18.65, 360.2); //vertical gridlines
      
      if (mouseX < x+18.65 && mouseX > x-18.65 && mouseY < y+18.65 && mouseY > y-18.65) {
        fill(0,0,0,50);
        rect(x,y,37.3,37.3); // highlight box of current mouse position
        function click() {
          let col = color(0,0);
          let buttons = createButton(hectare);
          buttons.position(x-18.65,y-18.65);
          buttons.size(37.3,37.3);
          buttons.style('visibility', 'hidden');
          buttons.style('background-color', col);
          buttons.style('border', 'none');
        }
        click();
        noStroke();
       
        fill(0);
        let fontsize=30;
        textSize(fontsize);
        text('location: ' + hectare,10,410);
        text('squirrels in hectare ' + hectare + ': ' + count,10,450);

      }
      
    }
    

  }
}
