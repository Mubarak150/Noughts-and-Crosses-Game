let i =0;
var check = "x";
var circle = "o";
let touch = true; 
var checkMoves = []; 
var circleMoves = [];
const winningCombos = [
  ["1", "4", "7"], // First row
  ["2", "5", "8"], // Second row
  ["3", "6", "9"], // Third row
  ["1", "2", "3"], // First column
  ["4", "5", "6"], // Second column
  ["7", "8", "9"], // Third column
  ["1", "5", "9"], // Diagonal from top-left to bottom-right
  ["7", "5", "3"]  // Diagonal from bottom-left to top-right
];

// loop over this array and get each loop instance of it. and check its 
const isSubArray = (subArray, mainArray) => subArray.every(val => mainArray.includes(val));

// the restarting phenomenon: 
$(document).find("pre").click(function (){
  touch = true; 
  i= 0; 
  checkMoves = []; 
  circleMoves = []; 
  $('.tap').find(".image").attr("src", "");
  $(document).find(".declaration").text('')
})

// function handling click: 
function registerTurn (context, image, input, array) {
  context.find(".image").attr("src", `images/${image}`); // image = circle.png for example
  context.find("p").text(`${input}`); // x or o
  const square = context.find("b").text();
  array.push(square) // array = circleMoves or checkMoves

  winningCombos.map((combo) => {
    let isWin = isSubArray(combo, array);
    if(isWin) {
      i = 0; 
      $(document).find(".declaration").text(`\n player ${image.split('.')[0].toUpperCase()} won\n tap here to restart`);
      touch = false
      return
    
    }
  })
}

// when a user clicks: 
$(".tap").click(function(){
  if(touch){
    let src = $(this).find(".image").attr("src"); 
    if( !src){
      i++;
      if(i%2==0) registerTurn($(this), 'check.jpg', 'x', checkMoves ); 
      if(i%2!=0) registerTurn($(this), 'circle.png', 'o', circleMoves );
    }
  }
});