

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

var imageName = newImage();
imageName.src="images/img.png";

var audioName = new Audio();
audioName.src = "audio/audio.png";

// DRAW IMAGES

ctx.drawImage(imageName, x, y, width, height);

ctx.drawImage(Flappy.png, 100, 150, 50, 50)