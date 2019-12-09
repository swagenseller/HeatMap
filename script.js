var numPoints = 2;
var coords = [
    [],
    []
];
var values = [];

//for(var  i = 0; i<numPoints; i++){
    coords[0][0] = 75;     // x1
    coords[0][1] = 50;     // y1
    values[0]    = 100.5;  // t1   
    coords[1][0] = 125;    // x2
    coords[1][1] = 50;     // y2
    values[1]    = 200.5;  // t2
//}


var xSize = 200;
var ySize = 100;
var xMin = 0;
var yMin = 0;

var tempField = new Array(ySize);
for (var z = 0; z< ySize; z++){
    tempField[z] = new Array(xSize);
}

interpol(coords, values);



function setup(){
    createCanvas(xSize, ySize)
    background(0)
   

    for(var i = 0; i< ySize; i++){
        for (var j = 0; j < xSize; j++){
            stroke(floor(tempField[i][j]), 200, 200)
            point(j, i);
            if(i == 0 && j == 0){
                console.log(floor(tempField[i][j]))
                //stroke(50);
                //rect(j,i, 50, 50)
            }
        }
    }
   

}


function distance(a,b, x,y) {
    var dx = Math.sqrt(Math.pow((x-a), 2) + Math.pow((y-b), 2));
    return dx;
}

// calculates the wi(x)
function subInter(a, b, x, y){
	var n = distance(a,b,x,y);
    var ui = 1 / Math.pow(n,2);
    return ui;
}

// interpolation
// implements the shepards equation and stores each point in coords and values arrays
function interpol(points, temp){
	for (var i = 0; i< ySize; i++){
		for(var j = 0; j < xSize; j++){
			var flag = false;

			var sumNum = 0;
			var sumDen = 0;
			for(var index = 0; index < points.length; index++){
				var xx = points[index][0] - xMin;
				var yy = points[index][1] - yMin;
				if (distance(yy, xx, i, j) == 0){
					tempField[i][j] = temp[index]
					flag = true
					continue;
				}
                var ret = subInter(yy, xx, i, j)
                //console.log(ret)
				ret *= temp[index]
				sumNum += ret;
            }
            for(var index=0; index<points.length; index++){
                if(flag){
                    continue;
                }
                var xx = points[index][0] - xMin;
                var yy = points[index][1] - yMin;
                var ret = subInter(yy,xx, i , j);
                sumDen += ret;
            }
            if(!flag) {
                //console.log(sumNum / sumDen)
                tempField[i][j] = sumNum / sumDen;
            }
		}
	}
    //return valueField;
}
