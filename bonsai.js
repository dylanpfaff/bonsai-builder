// setup
const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");
const centerX = width / 2;
const centerY = height * 0.8;
//let s;
//start of program, and eventually start of tree
//const start = new Date();

// import tree trunk photo
const image = new Image();
image.src = "trunk.png";

// bonsai object
const tree = {
  nodes: [],
  // counter to track height of most recent node to be added to trigger add node function
  counter: 0,
  addNode: function() {
    let obj = {
      x: centerX,
      y: centerY,
      w: 1,
      h: 2,
      photo: image,
      bd: new Date(),
      age: 0,
      branch: false
    };
    this.nodes.push(obj);
    console.log("New Node!");
  },
  // check properties of each node/branch object and update values w/ respect to time
  updateTree: function() {
    for (let i = 0; i < this.nodes.length; i++) {
      // update date to calc time since start
      let now = new Date();
      // calc age of each tree
      let change = now.getTime() - this.nodes[i].bd.getTime();
      // convert age from millisec to sec
      let s = change / 1000;
      // set growth rate to one pixel every 60 sec
      let rate = s / 360;
      // update tree age
      this.nodes[i].age = s;

      // add new node condition
      if (this.nodes[i].age > 10 && this.nodes[i].branch == false) {
        this.nodes[i].branch = true;

        this.addNode();
      }
      // increase h and w every 60 seconds
      this.nodes[i].h += rate;
      this.nodes[i].w += rate / 2;
      // offset root of each node base by previous branch apex
      if (i > 0) {
        this.nodes[i].x = centerX - this.nodes[i - 1].w / 2;
        this.nodes[i].y = centerY - this.nodes[i - 1].h;
      }
      // offset main root node
      this.nodes[i].x = centerX - this.nodes[i].w / 2;
      this.nodes[i].y = centerY - this.nodes[i].h;
    }
  },

  drawTree: function() {
    for (let i = 0; i < this.nodes.length; i++) {
      ctx.drawImage(
        image,
        this.nodes[i].x,
        this.nodes[i].y,
        this.nodes[i].w,
        this.nodes[i].h
      );
    }
  }
};

tree.addNode();

// define animation loop
const loop = function() {
  // draw background
  ctx.fillStyle = "rgba(86, 187, 105, 0.8)";
  ctx.fillRect(0, 0, width, height);
  // update tree
  tree.updateTree();
  // draw tree image
  tree.drawTree();
  // timer display in seconds
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.font = "36px arial";
  ctx.strokeText("age: " + tree.nodes[0].age, centerX, centerY - 100);
  // call animation loop
  requestAnimationFrame(loop);
};

// on load call animation loop
image.addEventListener("load", () => loop());

// d'autre chose

/*
ctx.fillStyle = "rgba(255, 0, 255, 0.05)";
ctx.fillRect(0, 0, width / 2, height / 2);

ctx.fillStyle = "rgba(100, 50, 255, 0.05)";
ctx.fillRect(0, 50, width / 4, height / 2);
*/

// animation
/*
function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let length = 250;
let moveOffset = 20;

for (let i = 0; i < 500; i++) {
  ctx.fillStyle = `rgba(${255 - length},0,${255 - length},0.9)`;
  ctx.beginPath();
  ctx.moveTo(moveOffset, moveOffset);
  ctx.lineTo(moveOffset + length, moveOffset);
  const triHeight = (length / 2) * Math.tan(degToRad(60));
  ctx.lineTo(moveOffset + length / 2, moveOffset + triHeight);
  ctx.lineTo(moveOffset, moveOffset);
  ctx.fill();

  length--;
  moveOffset += 0.7;
  ctx.rotate(degToRad(5));
}
*/
