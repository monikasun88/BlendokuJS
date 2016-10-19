// http://stackoverflow.com/questions/6071409/draggable-revert-if-outside-this-div-and-inside-of-other-draggables-using-both
$('.grid,.startAreaGrid').droppable({
    tolerance: 'touch',
});

$('.box').draggable({
    revert: 'invalid',
    snap: '.grid,.startAreaGrid',
    snapMode: 'inner',
    stop: function(){
        $(this).draggable('option','revert','invalid');
    }
});

$('.box').droppable({
    greedy: true,
    tolerance: 'touch',
    drop: function(event,ui){
        ui.draggable.draggable('option','revert',true);
    }
});

// Generate random hexidecimal colors
// http://www.paulirish.com/2009/random-hex-color-code-snippets/
function genRandHexColor() {
  return '#' + ("000000" +
    Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
}

// Convert hexidecimal to RGB
function hex2rgb(hex) {
  return [parseInt(hex.substr(1,2), 16),
    parseInt(hex.substr(3,2), 16),
    parseInt(hex.substr(5,2), 16)];
}

// Convert RGB to hexidecimal
function rgb2hex(rgb) {
  return ("00" + rgb.toString(16)).slice(-2).toUpperCase();
}

// Generate a gradient based off a beginning color, end color (possibly user specified) and a total number of colors
function genGradient(n, begColor = null, endColor = null) {

  if (begColor === null) {
    begColor = genRandHexColor();
  }
  if (endColor === null) {
    endColor = genRandHexColor();
  }

  var begColorHexRGB = hex2rgb(begColor)
  var endColorHexRGB = hex2rgb(endColor)
  console.log(begColorHexRGB, endColorHexRGB)

  var diffRed = Math.abs(endColorHexRGB[0] - begColorHexRGB[0])/n
  var diffGreen = Math.abs(endColorHexRGB[1] - begColorHexRGB[1])/n
  var diffBlue = Math.abs(endColorHexRGB[2] - begColorHexRGB[2])/n
  console.log(diffRed, diffGreen, diffBlue)

  var retRed = [begColorHexRGB[0], endColorHexRGB[0]];
  var retGreen = [begColorHexRGB[1], endColorHexRGB[1]];
  var retBlue = [begColorHexRGB[2], endColorHexRGB[2]];
  console.log(retRed, retGreen, retBlue)

  for (i = 1; i < n-1; i++) {
    retRed.splice(1, 0, Math.round(endColorHexRGB[0] -
      ((endColorHexRGB[0] > begColorHexRGB[0]) ? i*diffRed : -i*diffRed)));
    retGreen.splice(1, 0, Math.round(endColorHexRGB[1] -
      ((endColorHexRGB[1] > begColorHexRGB[1]) ? i*diffGreen : -i*diffGreen)));
    retBlue.splice(1, 0, Math.round(endColorHexRGB[2] -
      ((endColorHexRGB[2] > begColorHexRGB[2]) ? i*diffBlue : -i*diffBlue)));
  }
  console.log(retRed, retGreen, retBlue)

  var retGrad = [];
  for (i = 0; i < retRed.length; i++) {
    retGrad.push('#' +
    rgb2hex(retRed[i]) +
    rgb2hex(retGreen[i]) +
    rgb2hex(retBlue[i]));
  }
  console.log(retGrad)

  return retGrad;
}

// Game logic

// Game mode: simple, easy, medium, master, daily
var gameMode = "master";

/*
Each game mode has a number of features.
  In the actual game, there are several block formations:
    straight lines (least hard): all modes
    box/matrix of colors (hardest): none on simple, 3x3 medium, 3-5x master, 4-6x master
    zigguraut (second hardest): none on simple, 1/3/5 medium, 1/2/3x2 and 1/3/5 master, all 
      available on daily plus 1/2/3/4x2
    circular (third hardest): only availble on medium and above
  Size of the board (boards are oriented more vertically):
    simple: y-rand(3:5), x-rand(3:5)
    easy: y-rand(7:9), x-rand(5:6)
    medium: y-rand(6:10), x-rand(4:5)
    master: y-rand(10:14), x-rand(5:7)
    daily:
  Number of inflection points (bold beg/end/corner colors):
    simple: 1-2
    easy: 2-3
    medium: 4-5
    master: 5-8
    daily: 8-10
*/











var numBoxes = $('.box').length
var numBoxesGrad = genGradient(numBoxes)

// Adds colors to box elements
for (i = 0; i < numBoxes; i++) {
  $('.box')[i].style.background = numBoxesGrad[i];
}
