let staticRects = [];// Array to store static rectangles
let moveRects = [];// Array to store moving rectangles
let pixelLength = 20;// Pixel length for each rectangle unit
let yellowRegions = [];// Array to store yellow rectangle regions
let yellowRegionUnits = [];// Array to store yellow region units (smaller segments after splitting)
let scaleFactor; // Scale factor for adjusting canvas size
let draggingRect = null; // The currently dragged rectangle (right-click drag)
let movingBlock = null; // The currently moving color block
let blockSpeed = 50;// Speed of the moving color block
let isChangeType;// Variable to track color change state

// Define MyRect class to represent static or dynamic rectangles
class MyRect {
  // Constructor initializes the rectangle's position (x, y), width (w), height (h), and type (color type)
  constructor(x, y, w, h, type) {
    this.x = x * scaleFactor;// Adjust x position by scale factor
    this.y = y * scaleFactor;// Adjust y position by scale factor
    this.w = w * scaleFactor;// Adjust width by scale factor
    this.h = h * scaleFactor;// Adjust height by scale factor
    this.type = type;// The color type of the rectangle, used to distinguish colors

    // Properties related to scaling animation
    this.isScaling = false;// Flag to indicate if scaling animation is active
    this.currentScale = 1;// Current scale factor, initially set to 1
    this.scaleFrequency = 4; // Frequency of scaling animation (how many times it scales in 5 seconds)
    this.scaleDuration = 5000; // Duration of the scaling animation in milliseconds
    this.startTime = 0;// Start time for the animation
  }

  // Method to check if this rectangle intersects with another rectangle
  intersects(other) {
    // If their boundaries don't overlap, they don't intersect. Otherwise, they intersect
    return !(this.x + this.w <= other.x || this.x >= other.x + other.w || this.y + this.h <= other.y || this.y >= other.y + other.h);
  }

  // Method to draw the rectangle on the canvas
  draw() {
    push();// Save current drawing state
    translate(this.x, this.y);// Move the drawing origin to the rectangle's (x, y) position

    // Check if scaling animation needs to be updated
    if (this.isScaling) {
      let elapsedTime = millis() - this.startTime;// Calculate elapsed time since animation started
      let progress = (elapsedTime % this.scaleDuration) / this.scaleDuration;// Calculate animation progress
      this.currentScale = 1 + 1 * sin(progress * TWO_PI * this.scaleFrequency);// Use a sine wave to simulate periodic scaling
      if (elapsedTime >= this.scaleDuration) {
        this.isScaling = false;// Stop animation once duration is over
      }
    }

    scale(this.currentScale);// Scale the rectangle according to the current scale factor
    noStroke();// Disable the rectangle border
    // Set the fill color based on the rectangle type, allowing for color changes
    if (this.type == 1) {
      if(isChangeType=="change1"){
        fill("#FAE201");// Yellow variation 1
      }else if (isChangeType=="change2") {
        fill("#FA6201");// Yellow variation 2
      }
      else if (isChangeType=="change3") {
        fill("#DEBE3A");// Yellow variation 3
      }
      else if (isChangeType=="change4") {
        fill("#8EFA01");// Yellow variation 4
      } else
      {
        fill(250, 201, 1);// Default yellow
      }

    } else if (this.type == 2) {
      if(isChangeType=="change1"){
        fill("#FA7D01");// Red variation 1
      }else if (isChangeType=="change2") {
        fill("#FF0100");// Red variation 2
      }
      else if (isChangeType=="change3") {
        fill("#C95E5E");// Red variation 3
      }
      else if (isChangeType=="change4") {
        fill("#DD008C");// Red variation 4
      } else
      {
        fill(221, 1, 0);// Default red
      }

    } else if (this.type == 3) {
      if(isChangeType=="change1"){
        fill("#BCB095");// Gray variation 1
      }else if (isChangeType=="change2") {
        fill("#C69696");// Gray variation 2
      }
      else if (isChangeType=="change3") {
        fill("#A9B5C5");// Gray variation 3
      }
      else if (isChangeType=="change4") {
        fill("#808080");// Gray variation 4
      } else
      {
        fill(200);// Default gray
      }

    } else if (this.type == 4) {
      if(isChangeType=="change1"){
        fill("#2EBC73");// Blue variation 1
      }else if (isChangeType=="change2") {
        fill("#632295");// Blue variation 2
      }
      else if (isChangeType=="change3") {

        fill("#6D88B2");// Blue variation 3
      }
      else if (isChangeType=="change4") {
        fill("#0055D5");// Blue variation 4
      } else
      {
        fill(34, 80, 149);// Default blue
      }
    }
    rect(0, 0, this.w, this.h);// Draw the rectangle
    pop();// Restore the previous drawing state
  }

  // Method to start the scaling animation
  startScaling() {
    this.isScaling = true;// Set the scaling flag to true
    // Extra curricular content: millis(), returns the number of milliseconds that have passed since the program started running. Commonly used for timing and animation control
    this.startTime = millis();// Record the start time of the animation
  }

  // Method to check if the mouse is hovering over the rectangle
  isMouseOver(mx, my) {
    let adjustedX = this.x + (width - 1000 * scaleFactor) / 2;// Adjust the x coordinate for centerin
    let adjustedY = this.y + (height - 1000 * scaleFactor) / 2;// Adjust the y coordinate for centering
    // Check if the mouse coordinates are within the bounds of the rectangle
    return mx > adjustedX && mx < adjustedX + this.w && my > adjustedY && my < adjustedY + this.h;
  }
}

// Handle mouse press events
function mousePressed() {
  if (mouseButton === LEFT) {// If the left mouse button is clicked
    let isCLick =false; // Flag to check if a rectangle was clicked
    for (let rect of moveRects) {
      if (rect.isMouseOver(mouseX, mouseY)) {// Check if a dynamic rectangle was clicked
        // Trigger moving color block based on rectangle type
        if(rect.type==1){// Yellow block, moves from top to bottom
          movingBlock = new MovingBlock(-windowWidth/2, -windowHeight, windowWidth, windowHeight,  color(250, 201, 1),rect.type);
          isChangeType="change1";
          isCLick =true;
        }
        if(rect.type==4){// Blue block, moves from left to right
          movingBlock = new MovingBlock(-windowWidth/2, -windowHeight*0.2, windowWidth*2, windowHeight*2, color(34, 80, 149),rect.type);
          isChangeType="change4";
          isCLick =true;
        }
        if(rect.type==3){// Gray block, moves from right to left
          movingBlock = new MovingBlock(windowWidth, 0,windowWidth, windowHeight,  color(240),rect.type);
          isChangeType="change3";
          isCLick =true;
        }
        if(rect.type==2){// Red block, moves from bottom to top
          movingBlock = new MovingBlock(0, windowHeight*0.8, windowWidth, windowHeight,
              color(221, 1, 0) ,2);
          isChangeType="change2";  isCLick =true;
        }
        rect.startScaling();// Start the scaling animation
        break;
      }
    }

    if(isCLick){
      return;
    }

    for (let rect of staticRects) {// Check the static rectangles
      if (rect.isMouseOver(mouseX, mouseY)) {
        // Trigger moving color block based on rectangle type
        if(rect.type==1){// Yellow block
          movingBlock = new MovingBlock(0, -windowHeight, windowWidth, windowHeight,  color(250, 201, 1),rect.type);
          isChangeType="change1";
        }
        if(rect.type==4){// Blue block
          movingBlock = new MovingBlock(-windowWidth/2, -windowHeight*0.2, windowWidth*2, windowHeight*2, color(34, 80, 149),rect.type);
          isChangeType="change4";
        }
        if(rect.type==3){// Gray block
          movingBlock = new MovingBlock(windowWidth, 0,windowWidth, windowHeight,  color(240),rect.type);
          isChangeType="change3";
        }
        if(rect.type==2){// Red block
          movingBlock = new MovingBlock(0, windowHeight*0.8, windowWidth, windowHeight,
              color(221, 1, 0) ,2);
          isChangeType="change2";
        }
        rect.startScaling(); // Start the scaling animation
        break;
      }
    }
  } else if (mouseButton === RIGHT) {// If the right mouse button is clicked
    for (let rect of moveRects) {
      if (rect.isMouseOver(mouseX, mouseY)) {// Check if the mouse is over a dynamic rectangle
        draggingRect = rect; // Record the currently dragged rectangle
        break;
      }
    }
  }
}
// Handle mouse drag events
function mouseDragged() {
  if (mouseButton === RIGHT && draggingRect) {// If the right mouse button is held and a rectangle is being dragged
    let dx = mouseX - pmouseX;// Calculate the drag distance on the x-axis
    let dy = mouseY - pmouseY;// Calculate the drag distance on the y-axis
    draggingRect.x += dx;// Update the rectangle's x position
    draggingRect.y += dy;// Update the rectangle's y position
    // Check if the dragged rectangle intersects with other rectangles and change their color
    for (let rect of moveRects) {
      if (rect !== draggingRect && draggingRect.intersects(rect)) {// If the rectangles intersect
        rect.type = draggingRect.type; // Change the color of the intersected rectangle
      }
    }
  }
}

// Handle mouse release events
function mouseReleased() {
  if (mouseButton === RIGHT) {
    draggingRect = null; // Stop dragging
  }
}

// Add an isMouseOver method to the MyRect prototype to detect mouse hover
MyRect.prototype.isMouseOver = function(mx, my) {
  let adjustedX = this.x + (width - 1000 * scaleFactor) / 2;// Adjust the x coordinate for centering
  let adjustedY = this.y + (height - 1000 * scaleFactor) / 2;// Adjust the y coordinate for centering
  return mx > adjustedX && mx < adjustedX + this.w * this.currentScale &&
      my > adjustedY && my < adjustedY + this.h * this.currentScale;// Check if the mouse is hovering over the rectangle
};

// Define MovingBlock class for moving color blocks
class MovingBlock {
  constructor(x, y, w, h, color,type) {
    this.x = x;// Initial x position
    this.y = y;// Initial y position
    this.w = w;// Width of the block
    this.h = h;// Height of the block
    this.color = color;// The color of the block
    this.type = type;// The type of block (determines movement direction)
  }

// Draw the moving block
  draw() {
    fill(this.color);// Set the fill color of the block
    noStroke();// Disable the border
    rect(this.x, this.y, this.w, this.h);// Draw the block
  }

  // Update the block's position
  update() {
    if(this.type==1){// Yellow block, moves from top to bottom
      this.y += blockSpeed;
    }
    if(this.type==4){// Blue block, moves from left to right
      this.x += blockSpeed;
    }
    if(this.type==3){// Gray block, moves from right to left
      this.x -= blockSpeed;
    }
    if(this.type==2){// Red block, moves from bottom to top
      this.y -= blockSpeed;
    }
  }
}

// Setup function to initialize the canvas and rectangles
function setup() {
  createCanvas(windowWidth, windowHeight);// Create a full-screen canvas

  // Calculate the scale factor based on window height
  scaleFactor = windowHeight * 0.8 / 1000;// Scale based on a height of 1000

  // Initialize static rectangles and adjust their size based on the scale factor
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

  // Extract coordinates of yellow rectangles and store them in the yellowRegions array
  for (let i = 0; i < staticRects.length; i++) {
    if(staticRects[i].type == 1) {// If the rectangle is yellow
      yellowRegions.push({
        x: staticRects[i].x, 
        y: staticRects[i].y,
        w:staticRects[i].w,
        h:staticRects[i].h
      });
    }
  }

  // Split yellow regions into smaller units
  for (let i = 0; i < yellowRegions.length; i++) {
    // Horizontally split large yellow regions
    if (yellowRegions[i].w >= pixelLength * scaleFactor) {
      let num = yellowRegions[i].w / (pixelLength * scaleFactor);// Calculate number of splits
      let initX = yellowRegions[i].x;// Initial x position
      for (let j = 0; j < num; j++) {
        yellowRegionUnits.push({
          x: initX + j * pixelLength * scaleFactor,
          y: yellowRegions[i].y
        });
      }
    }

    // Vertically split large yellow regions
    if (yellowRegions[i].h >= pixelLength * scaleFactor) {
      let num = yellowRegions[i].h / (pixelLength * scaleFactor);// Calculate number of splits
      let initY = yellowRegions[i].y; // Initial y position
      for (let j = 0; j < num; j++) {
        yellowRegionUnits.push({
          x: yellowRegions[i].x,
          y: initY + j * pixelLength * scaleFactor
        });
      }
    }
  }
}

// Draw function to render the canvas on every frame
function draw() {
  fill(240,30);// Background color fill
  if(isChangeType=="change1"){
    fill(255,229,124,30);// Yellow background gradient
  }
  if(isChangeType=="change2"){
    fill(255,134,133,30);// Red background gradient
  }
  if(isChangeType=="change3"){
    fill(240,30);// Gray background gradient
  }
  if(isChangeType=="change4"){
    fill(149,191,255,30);// Blue background gradient
  }

  rect(0,0,windowWidth,windowHeight);// Draw the background rectangle
  push();// Save the current drawing state

  // Translate the canvas to the center and adjust for scaling
  translate((width - 1000 * scaleFactor) / 2, (height - 1000 * scaleFactor) / 2);

  // Draw all static rectangles
  for (let i = 0; i < staticRects.length; i++) {
    staticRects[i].draw();
  }

  // If the dynamic rectangle array is empty, generate random rectangles
  if (moveRects.length === 0) {
    generateRandomRectangles();
  }

  // Draw all dynamic rectangles
  for (let i = 0; i < moveRects.length; i++) {
    moveRects[i].draw();
  }

  pop();// Restore the previous drawing state

  // If there is a moving block, update and draw it
  if (movingBlock!=null) {
    movingBlock.update();// Update the block's position
    movingBlock.draw();// Draw the block
  }
}


// Generate random rectangles
function generateRandomRectangles() {
  // Iterate over yellow region units and generate random rectangles
  for (let i = 0; i < 300; i++) {
      let region = random(yellowRegionUnits);// Randomly select a yellow region unit
      let colorIndex = floor(random(3));// Randomly select a color type
      noStroke();// Disable the border
      let scaledX = region.x / scaleFactor;// Scale the x coordinate
      let scaledY = region.y / scaleFactor;// Scale the y coordinate
      // Generate rectangles based on color type
      if (colorIndex == 0) {
        moveRects.push(new MyRect(scaledX, scaledY, pixelLength, pixelLength, 3));// Gray rectangle
      } else if (colorIndex == 1) {
        moveRects.push(new MyRect(scaledX, scaledY, pixelLength, pixelLength, 2));// Red rectangle
      } else if (colorIndex == 2) {
        moveRects.push(new MyRect(scaledX, scaledY, pixelLength, pixelLength, 4));// Blue rectangle
      }
  }
}
