
function main() {

    var bigEndBearing = cylinder({r: 27, h: 12, center: true}).translate([35,60,6]);
	bigEndBearing = difference(bigEndBearing, cylinder({r: 20, h: 12, center: true}).translate([35,60,13]));
	bigEndBearing = union(bigEndBearing, cylinder({r: 15, h: 12, center: true}).translate([35, 60,6]));

	var endBearing = difference(
		cylinder({r: 20, h: 12, center: true}).translate([-110,20,6]),
		cylinder({r: 15, h: 12, center: true}).translate([-110,20,13])
	);
	var middleBearing = difference(
		cylinder({r: 20, h: 12, center: true}).translate([0,0,6]),
		cylinder({r: 15, h: 12, center: true}).translate([0,0,13])
	);

    var longShaft = hull( circle({r:12, center:true}),circle({r:12, center:true}).translate([-110,20,0]) );
    longShaft = linear_extrude({ height: 12 }, longShaft);

    var shortShaft = hull( circle({r:12, center:true}),circle({r:22, center:true}).translate([35,60,0]) );
	shortShaft = linear_extrude({ height: 12 }, shortShaft);
	shortShaft = difference(shortShaft, cylinder({r: 20, h: 12, center: true}).translate([0,0,13]));
	shortShaft = difference(shortShaft, cylinder({r: 20, h: 12, center: true}).translate([35,60,13]));

	return union(
		longShaft,
		shortShaft,
		bigEndBearing,
		endBearing,
		middleBearing
	);
}