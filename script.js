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

//
coords[0][0] = 125
coords[0][1] = 125
values[0] = 10
coords[1][0] = 375
coords[1][1] = 375 
values[1] =320

var tmax = values[0];
var tmin = values[0];

for (var i =0; i<values.length; i++){
    if(values[i] > tmax) {
        tmax = values[i];
    }
    if (values[i] < tmin){
        tmin = values[i];
    }
}
console.log(tmax)
console.log(tmin)

var xSize = 500;
var ySize = 500;
var xMin = 0;
var yMin = 0;

var tempField = new Array(ySize);
for (var z = 0; z< ySize; z++){
    tempField[z] = new Array(xSize);
}
console.log()

interpol(coords, values);
//console.log(tempField)
//maxMin(tmax, tmin, tempField, xSize, ySize);
//console.log(tmax)
//console.log(tmin)


function setup(){
    createCanvas(xSize, ySize)
    background(0)
   

    for(var i = 0; i< ySize; i++){
        for (var j = 0; j < xSize; j++){
            var color = colorMod(tempField[i][j], tmin, tmax)
            noStroke();
            //fill(floor(tempField[i][j]), tmin, tmax)
            //fill(color.r, color.g, color.b)
            fill(255 * color.r, 255 * color.g, 255 * color.b)
            rect(j, i, 1, 1);
            if(i == 50 && j == 200){
                console.log("test " + floor(tempField[i][j]))
                //console.log(color)
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
    var wi = 1 / Math.pow(n,2);
    return wi;
}

// interpolation
// implements the shepards equation and stores each point in coords and values arrays
function interpol(points, temp){
	for (var i = 0; i< ySize; i++){
		for(var j = 0; j < xSize; j++){
			var flag = false;

			var sumNum = 0;
            var sumDen = 0;
            // calculates Numerator 
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
            // calculates the denominator
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

// modifies the color of each point
function colorMod(temp, min, max){
    var color = {r: 0, g: 0, b: 0}
    color.r = (temp - min) / (max - min);

        // green component goes up to 1 at 1/2 way point then back down to 0
        var halfway = min + (max-min)/2;
        if (temp < halfway)
            // ramp up
            color.g = (temp - min) / (halfway - min);
        else
            // ramp down
            color.g = (max - temp) / (max - halfway);

        // blue component is a linear ramp down
        color.b = (max - temp) / (max - min);
    return color;
}

// finds the min temperature and the max temperature
// uncessary because, by definition of shepard's method min and max are defined
function maxMin(max, min, field, xSize, ySize){
    console.log("why")
    for(var i = 0; i< ySize; i++){
        for (var j = 0; j < xSize; j++){
            if(field[i][j] > max) {
                max = field[i][j];
            }
            if (field[i][j] < min){
                min = field[i][j];
            }
        }
    }
}


function getMore(){
    var xMax = document.querySelector("#sWidth").value;
    var yMax = document.querySelector("#sHeight").value;
    var numP = document.querySelector("#numP").value;

    var box = document.querySelector("#points")
    for (let i = 0; i < numP; i++){

        // add three html number inputs for Xs, Ys and temperature
    }
    console.log(yMax + " " + xMax + " " + numP)
}
