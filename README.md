# Major-project

## How to interact with works
Interaction 1: Click on the small square with the left mouse button, and the small square will cyclically increase and decrease in size
Interaction 2: Click on any color block with the left mouse button, and the color of the entire graphic will change based on the color of the clicked color block
Interaction 3: Right click on the small square with the mouse, then left click in place to drag the small square and move it. During the movement, other small squares passed by the dragged small square will turn the same color Click the left button again anywhere to release the small square and stop dragging

## Detailed description
### Method
I used a mouse input to make the graphics change

### Animation
The square blocks in the graphic can be dragged and clicked to change the size of the square, and the overall pattern can change color

### Inspiration
This is where my ideas come from.
[click to view](https://lines.chromeexperiments.com/)
![Picture](Image/01.jpg)
This is where my ideas come from. On this site, if you draw a line, it will match up with scenery that is the same shape. These lessons have taught me to let what the user does affect other things, which gives the art a certain flow. Mondrian's art is known for its strict color balance and geometric grid plan, which show how art should be put together. This natural order is broken by letting blocks be dragged and changing the color of other blocks while they are being pulled. This creates some chaos or uncertainty. In some ways, this process gives artistic works more freedom. But at the same time, the viewer's basic job was just to passively enjoy. I also added interactivity to the work, which let the viewer be a part of the making process and gave the work new life.

### Technical explanation
Drawing rectangles, detecting interactions, and controlling animations are at the heart of this code. Classes (MyRect and MovingBlock) hold rectangles' basic features, like position, size, and color. Depending on its type, each rectangle can have a different color and behave in different ways. When the user clicks on a rectangle, animation effects will play that go with it. These effects include scaling animation (which changes the size of the rectangle over time using sine wave functions) and dynamic movement (which makes color blocks move in different directions). At the same time, the code tracks how the mouse moves over the rectangle, checks to see if the rectangles overlap through collision detection, and changes the rectangle's position and color when the mouse is dragged.
