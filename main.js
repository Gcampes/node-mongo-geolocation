var fs = require('fs');
var coordObj = JSON.parse(fs.readFileSync('coords.json', 'utf8'));
var geolib = require('geolib');

var geolibCoords = []
coordObj.forEach(function(item, key){
  if(item.lat && item.lon && item.continent == "NA"){
    geolibCoords.push({longitude:item.lon, latitude: item.lat});
  }
})

console.log(geolibCoords.length);
console.log(geolibCoords);
console.log(geolibCoords.length);

baselineCoords = geolibCoords;

var count = 0;
geolibCoords.forEach(function(coord, key){
  console.time('query');
    coord.nearCoords = [];
    console.log(key);

    baselineCoords.forEach(function(item, index){
      if(key !== index){
        if(geolib.isPointInCircle(item, coord, 100000)){
          coord.nearCoords.push(item);
          count++;
          console.log(item, index);
        }
      }
    })
  console.log(count);
  console.timeEnd('query');
});

// var i = 0;
// geolibCoords.forEach(function(item, key){
//   // console.log(key
//   if(item.nearCoords.length){
//     // console.log(item);
//     // console.log(i++);
//   }
// })
