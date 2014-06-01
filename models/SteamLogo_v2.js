function main() {
    var code_pl = vector_text(0, 0, "HAXET");
    var code = [];
    code_pl.forEach(function (pl) {
        character = rectangular_extrude(pl, {w: 2, h: 5});
        code.push(character);
    });
    code = scale(0.8, code);
    code = translate([-13, 42, 14], code);

    var bigEndBearing = cylinder({r: 27, h: 12, center: true}).translate([75,0,6]);
    bigEndBearing = difference(bigEndBearing, cylinder({r: 20, h: 12, center: true}).translate([75,0,6]));

    var endBearing = difference(
    cylinder({r: 20, h: 16, center: true}).translate([-120,0,8]),
	cylinder({r: 15, h: 4, center: true}).translate([-120,0,14])
    );
    var middleBearing = difference(
	cylinder({r: 20, h: 12, center: true}).translate([0,0,6]),
	cylinder({r: 15, h: 12, center: true}).translate([0,0,6])
    );

    var longShaft = hull( circle({r:12, center:true}),circle({r:12, center:true}).translate([-120,0,0]) );
    longShaft = linear_extrude({ height: 16 }, longShaft);
    longShaft = difference(longShaft, cylinder({r: 28, h: 12, center: true}).translate([-120,0,6]));
    longShaft = difference(longShaft, cylinder({r: 21, h: 12, center: true}).translate([0,0,6]));
    longShaft = union(longShaft, cylinder({r: 14, h: 12, center: true}).translate([0,0,6]));
    longShaft = union(longShaft, endBearing);
    longShaft = longShaft.translate([80,50,0]);

    var shortShaft = hull( circle({r:16, center:true}),circle({r:22, center:true}).translate([75,0,0]) );
    shortShaft = linear_extrude({ height: 12 }, shortShaft);
    shortShaft = difference(shortShaft, cylinder({r: 20, h: 16, center: true}).translate([0,0,8]));
    shortShaft = difference(shortShaft, cylinder({r: 20, h: 12, center: true}).translate([75,0,6]));
    shortShaft = union(shortShaft, bigEndBearing);
    shortShaft = union(shortShaft, middleBearing);
    shortShaft = shortShaft.translate([-25,0,0]);

    return union(
	longShaft.subtract(code),
	shortShaft
    );
}
