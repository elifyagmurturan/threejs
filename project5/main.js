
var map = "XXXXXXX    \n" +
          "X     X    \n" +
          "X  S  X    \n" +
          "X     X    \n" +
          "X   S XXX  \n" +
          "XXX     X  \n" +
          " XX S   X  \n" +
          "  X     X  \n" +
          "  XXXXXXX  \n"

map = map.splut("\n");
var HORIZONTAL_UNIT = 100,
    VERTICAL_UNIT = 100,
    ZSIZE = map.length * HORIZONTAL_UNIT,
    XSIZE = map[0].length * HORIZONTAL_UNIT;


//generate map
for(var i=0, rows=map.length; i<rows; i++){
  for(var j=0, cols=map[i].length; j<cols; j++){
    addVoxel(map[i].charAt(j), i, j);
  }
}

function addVoxel(type, row, col){
  var z = (row+1) * HORIZONTAL_UNIT - ZSIZE * 0.5;
  x = (col+1) * HORIZONTAL_UNIT - XSIZE * 0.5;
  switch(type){
    case '': break;
    case 'S':
      //spawn points
    case 'X':
      // borders
      // build cubes here
    
  }
}