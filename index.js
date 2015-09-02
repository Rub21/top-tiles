'use strict'
var fs = require('fs');
var tilebelt = require('tilebelt');
var tilecover = require('tile-cover');
var t = require('turf');
var _ = require('underscore');
var jsonfile = require('jsonfile');
var csv2geojson = require('csv2geojson');
jsonfile.readFile('japan.geojson', function(err, obj) {
	var limits = {
			min_zoom: 9,
			max_zoom: 9
		}
		// var tiles = tilecover.tiles(geojson.geometry, limits); //num tiles in geojson
	var json_tiles = tilecover.geojson(obj.features[0].geometry, limits); //geojson from each tile in geojson
	// fs.writeFile('outputo.geojson', JSON.stringify(json_tiles), function(err) {
	// 	if (err)
	// 		return console.log(err);
	// 	console.log('resuotl');
	// });
	fs.readFile('twitter.csv', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		csv2geojson.csv2geojson(data, function(err, points) {
			var counted = t.count(json_tiles, points, 'num');
			var resultFeatures = points.features.concat(counted.features);
			var result = {
				"type": "FeatureCollection",
				"features": resultFeatures
			};
			fs.writeFile('result.geojson', JSON.stringify(result), function(err) {
				if (err)
					return console.log(err);
			});
		});
	});
});