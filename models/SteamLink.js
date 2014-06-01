function main() {
    return union(
        cylinder({r: 22, h: 20, center: true}).translate([50,0,5]),
        difference(
            cylinder({r: 30, h: 10, center: true}).translate([-50,0,0]),
            cylinder({r: 23, h: 10, center: true}).translate([-50,0,0])
        ),
        cube({size: [58,25,10], center: true}).translate([5,0,0])
    );
}