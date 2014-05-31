// Prototype of adding text to an existing model (in this case just a cube).

function main() {
    var code_pl = vector_text(0, 0, "42AQLUE");
    var code = [];
    code_pl.forEach(function (pl) {
        character = rectangular_extrude(pl, {w: 2, h: 2});
        code.push(character);
    });

    // This drops the text into the cube.    
    return cube({size: 3}).subtract(
        translate([0,0.3,2.98], scale(0.02, code)));

    // This puts the text on top of the cube.
    /*
    return union(
        cube({size: 3}),
        translate([0,0,3], scale(0.02, code))
        ).translate([0,0,0]);
    */
}
