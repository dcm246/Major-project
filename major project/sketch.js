let staticRects = [];
let moveRects = [];
let pixelLength = 20;
let yellowRegions = [];
let yellowRegionUnits = [];
let scaleFactor; 
let draggingRect = null; 
let movingBlock = null; 
let blockSpeed = 50;
let isChangeType;


class MyRect {
  constructor(x, y, w, h, type) {
    this.x = x * scaleFactor;
    this.y = y * scaleFactor;
    this.w = w * scaleFactor;
    this.h = h * scaleFactor;
    this.type = type;

    this.isScaling = false;
    this.currentScale = 1;
    this.scaleFrequency = 4; 
    this.scaleDuration = 5000;
    this.startTime = 0;
  }


  intersects(other) {
    return !(this.x + this.w <= other.x || this.x >= other.x + other.w || this.y + this.h <= other.y || this.y >= other.y + other.h);
  }

  draw() {
    push();
    translate(this.x, this.y);

    if (this.isScaling) {
      let elapsedTime = millis() - this.startTime;
      let progress = (elapsedTime % this.scaleDuration) / this.scaleDuration;

      this.currentScale = 1 + 1 * sin(progress * TWO_PI * this.scaleFrequency);

      if (elapsedTime >= this.scaleDuration) {
        this.isScaling = false;
      }
    }

    scale(this.currentScale);
    noStroke();
    if (this.type == 1) {
      if(isChangeType=="change1"){
        fill("#FAE201");
      }else if (isChangeType=="change2") {
        fill("#FA6201");
      }
      else if (isChangeType=="change3") {
        fill("#DEBE3A");
      }
      else if (isChangeType=="change4") {
        fill("#8EFA01");
      } else
      {
        fill(250, 201, 1);
      }

    } else if (this.type == 2) {
      if(isChangeType=="change1"){
        fill("#FA7D01");
      }else if (isChangeType=="change2") {
        fill("#FF0100");
      }
      else if (isChangeType=="change3") {

        fill("#C95E5E");
      }
      else if (isChangeType=="change4") {
        fill("#DD008C");
      } else
      {
        fill(221, 1, 0);
      }

    } else if (this.type == 3) {
      if(isChangeType=="change1"){
        fill("#BCB095");
      }else if (isChangeType=="change2") {
        fill("#C69696");
      }
      else if (isChangeType=="change3") {

        fill("#A9B5C5");
      }
      else if (isChangeType=="change4") {
        fill("#808080");
      } else
      {
        fill(200);
      }
    } else if (this.type == 4) {


      if(isChangeType=="change1"){
        fill("#2EBC73");
      }else if (isChangeType=="change2") {
        fill("#632295");
      }
      else if (isChangeType=="change3") {

        fill("#6D88B2");
      }
      else if (isChangeType=="change4") {
        fill("#0055D5");
      } else
      {
        fill(34, 80, 149);
      }
    }
    rect(0, 0, this.w, this.h);
    pop();
  }

  startScaling() {
    this.isScaling = true;
    this.startTime = millis();
  }

  isMouseOver(mx, my) {
    let adjustedX = this.x + (width - 1000 * scaleFactor) / 2;
    let adjustedY = this.y + (height - 1000 * scaleFactor) / 2;
    return mx > adjustedX && mx < adjustedX + this.w && my > adjustedY && my < adjustedY + this.h;
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    let isCLick =false;
    for (let rect of moveRects) {
      if (rect.isMouseOver(mouseX, mouseY)) {

        if(rect.type==1){
          movingBlock = new MovingBlock(-windowWidth/2, -windowHeight, windowWidth, windowHeight,  color(250, 201, 1),rect.type);
          isChangeType="change1";
          isCLick =true;
        }
        //
        if(rect.type==4){
          movingBlock = new MovingBlock(-windowWidth/2, -windowHeight*0.2, windowWidth*2, windowHeight*2, color(34, 80, 149),rect.type);
          isChangeType="change4";
          isCLick =true;

        }
        //
        if(rect.type==3){
          movingBlock = new MovingBlock(windowWidth, 0,windowWidth, windowHeight,  color(240),rect.type);
          isChangeType="change3";
          isCLick =true;
        }


        if(rect.type==2){

          movingBlock = new MovingBlock(0, windowHeight*0.8, windowWidth, windowHeight,
              color(221, 1, 0) ,2);
          isChangeType="change2";  isCLick =true;
        }


        rect.startScaling();
        break;
      }
    }
    if(isCLick){
      return;
    }
    for (let rect of staticRects) {
      if (rect.isMouseOver(mouseX, mouseY)) {

        if(rect.type==1){
          movingBlock = new MovingBlock(0, -windowHeight, windowWidth, windowHeight,  color(250, 201, 1),rect.type);
          isChangeType="change1";
        }

        if(rect.type==4){
          movingBlock = new MovingBlock(-windowWidth/2, -windowHeight*0.2, windowWidth*2, windowHeight*2, color(34, 80, 149),rect.type);
          isChangeType="change4";
        }

        if(rect.type==3){
          movingBlock = new MovingBlock(windowWidth, 0,windowWidth, windowHeight,  color(240),rect.type);
          isChangeType="change3";
        }


        if(rect.type==2){

          movingBlock = new MovingBlock(0, windowHeight*0.8, windowWidth, windowHeight,
              color(221, 1, 0) ,2);
          isChangeType="change2";
        }



        rect.startScaling(); 
        break;
      }
    }
  } else if (mouseButton === RIGHT) {
    for (let rect of moveRects) {
      if (rect.isMouseOver(mouseX, mouseY)) {
        draggingRect = rect; 
        break;
      }
    }
  }
}

function mouseDragged() {
  if (mouseButton === RIGHT && draggingRect) {
    let dx = mouseX - pmouseX;
    let dy = mouseY - pmouseY;

    draggingRect.x += dx;
    draggingRect.y += dy;


    for (let rect of moveRects) {
      if (rect !== draggingRect && draggingRect.intersects(rect)) {
        rect.type = draggingRect.type; 
      }
    }
  }
}

function mouseReleased() {
  if (mouseButton === RIGHT) {
    draggingRect = null; 
  }
}


MyRect.prototype.isMouseOver = function(mx, my) {
  let adjustedX = this.x + (width - 1000 * scaleFactor) / 2;
  let adjustedY = this.y + (height - 1000 * scaleFactor) / 2;
  return mx > adjustedX && mx < adjustedX + this.w * this.currentScale &&
      my > adjustedY && my < adjustedY + this.h * this.currentScale;
};



class MovingBlock {
  constructor(x, y, w, h, color,type) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.type = type;

  }


  draw() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }


  update() {
    if(this.type==1){
      this.y += blockSpeed;
    }

    if(this.type==4){
      this.x += blockSpeed;
    }

    if(this.type==3){
      this.x -= blockSpeed;
    }

    if(this.type==2){
      this.y -= blockSpeed;
    }


  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  scaleFactor = windowHeight * 0.8 / 1000;

  staticRects.push(new MyRect(0, 20, 1000, pixelLength, 1));
  staticRects.push(new MyRect(0, 140, 1000, pixelLength, 1));
  staticRects.push(new MyRect(0, 320, 1000, pixelLength, 1));
  staticRects.push(new MyRect(0, 380, 1000, pixelLength, 1));
  staticRects.push(new MyRect(0, 500, 1000, pixelLength, 1));
  staticRects.push(new MyRect(0, 560, 1000, pixelLength, 1));
  staticRects.push(new MyRect(0, 620, 60, pixelLength, 1));
  staticRects.push(new MyRect(60, 660, 460, pixelLength, 1));
  staticRects.push(new MyRect(0, 700, 60, pixelLength, 1));
  staticRects.push(new MyRect(0, 760, 1000, pixelLength, 1));
  staticRects.push(new MyRect(0, 800, 60, pixelLength, 1));
  staticRects.push(new MyRect(0, 860, 1000, pixelLength, 1));
  staticRects.push(new MyRect(0, 960, 1000, pixelLength, 1));

  staticRects.push(new MyRect(20, 0, pixelLength, 320, 1));
  staticRects.push(new MyRect(60, 0, pixelLength, 1000, 1));
  staticRects.push(new MyRect(120, 0, pixelLength, 860, 1));
  staticRects.push(new MyRect(240, 0, pixelLength, 1000, 1));
  staticRects.push(new MyRect(480, 0, pixelLength, 1000, 1));
  staticRects.push(new MyRect(520, 0, pixelLength, 320, 1));
  staticRects.push(new MyRect(520, 380, pixelLength, 620, 1));
  staticRects.push(new MyRect(600, 380, pixelLength, 180, 1));
  staticRects.push(new MyRect(800, 0, pixelLength, 1000, 1));
  staticRects.push(new MyRect(860, 0, pixelLength, 320, 1));
  staticRects.push(new MyRect(900, 0, pixelLength, 380, 1));
  staticRects.push(new MyRect(900, 560, pixelLength, 220, 1));
  staticRects.push(new MyRect(960, 0, pixelLength, 1000, 1));

  staticRects.push(new MyRect(120, 60, 120, pixelLength * 2, 1));
  staticRects.push(new MyRect(120, 240, 120, pixelLength * 3, 1));
  staticRects.push(new MyRect(800, 420, 160, pixelLength * 3, 1));
  staticRects.push(new MyRect(800, 660, 160, pixelLength * 2, 1));
  staticRects.push(new MyRect(120, 700, 120, pixelLength * 3, 1));
  staticRects.push(new MyRect(160, 320, pixelLength * 3, 80, 1));
  staticRects.push(new MyRect(300, 380, pixelLength * 3, 120, 1));
  staticRects.push(new MyRect(400, 320, pixelLength * 3, 200, 1));

  staticRects.push(new MyRect(80, 180, pixelLength * 3, 60, 4));
  staticRects.push(new MyRect(80, 600, pixelLength * 3, 60, 4));
  staticRects.push(new MyRect(300, 420, pixelLength * 3, 80, 4));
  staticRects.push(new MyRect(600, 160, pixelLength * 5, 160, 4));
  staticRects.push(new MyRect(880, 100, pixelLength * 4, 40, 4));
  staticRects.push(new MyRect(820, 600, pixelLength * 4, 60, 4));

  staticRects.push(new MyRect(160, 40, pixelLength * 3, 100, 2));
  staticRects.push(new MyRect(140, 440, pixelLength * 5, 60, 2));
  staticRects.push(new MyRect(280, 40, pixelLength * 4, 100, 2));
  staticRects.push(new MyRect(400, 860, pixelLength * 3, 140, 2));
  staticRects.push(new MyRect(600, 200, pixelLength * 5, 80, 2));
  staticRects.push(new MyRect(860, 180, pixelLength * 3, 60, 2));
  staticRects.push(new MyRect(640, 400, pixelLength * 5, 160, 2));
  staticRects.push(new MyRect(880, 420, pixelLength, 60, 2));
  staticRects.push(new MyRect(820, 700, pixelLength * 4, 60, 2));

  staticRects.push(new MyRect(160, 100, pixelLength * 3, 20, 3));
  staticRects.push(new MyRect(160, 260, pixelLength * 3, 20, 3));
  staticRects.push(new MyRect(180, 340, pixelLength, 40, 3));
  staticRects.push(new MyRect(180, 720, pixelLength * 2, 20, 3));
  staticRects.push(new MyRect(300, 60, pixelLength * 2, 40, 3));
  staticRects.push(new MyRect(280, 120, pixelLength * 4, 20, 3));
  staticRects.push(new MyRect(400, 380, pixelLength * 3, 20, 3));
  staticRects.push(new MyRect(400, 420, pixelLength * 3, 60, 3));
  staticRects.push(new MyRect(400, 900, pixelLength * 3, 60, 3));
  staticRects.push(new MyRect(660, 420, pixelLength * 3, 60, 3));
  staticRects.push(new MyRect(640, 540, pixelLength * 5, 20, 3));


  for (let i = 0; i < staticRects.length; i++) {
    if(staticRects[i].type == 1) {
      yellowRegions.push({x: staticRects[i].x, y: staticRects[i].y,
      w:staticRects[i].w,h:staticRects[i].h
      });
    }
  }




  for (let i = 0; i < yellowRegions.length; i++) {

    if (yellowRegions[i].w >= pixelLength * scaleFactor) {
      let num = yellowRegions[i].w / (pixelLength * scaleFactor);
      let initX = yellowRegions[i].x;
      for (let j = 0; j < num; j++) {
        yellowRegionUnits.push({
          x: initX + j * pixelLength * scaleFactor,
          y: yellowRegions[i].y
        });
      }
    }


    if (yellowRegions[i].h >= pixelLength * scaleFactor) {
      let num = yellowRegions[i].h / (pixelLength * scaleFactor);
      let initY = yellowRegions[i].y;
      for (let j = 0; j < num; j++) {
        yellowRegionUnits.push({
          x: yellowRegions[i].x,
          y: initY + j * pixelLength * scaleFactor
        });
      }
    }
  }




}

function draw() {
  fill(240,30);
  if(isChangeType=="change1"){
    fill(255,229,124,30);

  }
  if(isChangeType=="change2"){
    fill(255,134,133,30);
  }
  if(isChangeType=="change3"){
    fill(240,30);
  }
  if(isChangeType=="change4"){
    fill(149,191,255,30);
  }

  rect(0,0,windowWidth,windowHeight);

  push();

  translate((width - 1000 * scaleFactor) / 2, (height - 1000 * scaleFactor) / 2);

  for (let i = 0; i < staticRects.length; i++) {
    staticRects[i].draw();
  }


  if (moveRects.length === 0) {
    generateRandomRectangles();
  }


  for (let i = 0; i < moveRects.length; i++) {
    moveRects[i].draw();
  }



  pop();

  if (movingBlock!=null) {
    movingBlock.update();
    movingBlock.draw();


  }
}



function generateRandomRectangles() {

  for (let i = 0; i < 300; i++) {

      let region = random(yellowRegionUnits);
      let colorIndex = floor(random(3));

      noStroke();


      let scaledX = region.x / scaleFactor;
      let scaledY = region.y / scaleFactor;

      if (colorIndex == 0) {
        moveRects.push(new MyRect(scaledX, scaledY, pixelLength, pixelLength, 3));
      } else if (colorIndex == 1) {
        moveRects.push(new MyRect(scaledX, scaledY, pixelLength, pixelLength, 2));
      } else if (colorIndex == 2) {
        moveRects.push(new MyRect(scaledX, scaledY, pixelLength, pixelLength, 4));
      }

  }
}
