status = "";
object = []
function preload() {}
function setup() {
  canvas = createCanvas(380, 380)
  canvas.center()
  video = createCapture(VIDEO)
  video.size(380, 380)
  video.hide()
  
  objectDetector = ml5.objectDetector("cocossd", modelLoaded)
}
function modelLoaded() {
  console.log("model is loaded")
  status = true;
}
function gotResults(error, results) {
  if (error) {
    console.log(error)
  }
  else {
    console.log(results)
    object = results
  }
}
function draw() {
  image(video, 0, 0, 380, 380)  

  if (status != "") {
    objectDetector.detect(video, gotResults)
    for (i  = 0; i < object.length; i++) {
      console.log("running")
      document.getElementById("status").innerHTML = "object detected"
      document.getElementById("number").innerHTML = "number of objects detected = "+object.length

      r = random(255)
      g = random(255)
      b = random(255)

      accuracy = floor(object[i].confidence * 100)+"%"
      fill(r,g,b)
      text(object[i].label +" " + accuracy, object[i].x, object[i].y)
      noFill()
      stroke(r,g,b)
      rect(object[i].x, object[i].y, object[i].width, object[i].height)
    }
  }
}