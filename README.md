gufurnar
========

# Gufurnar - a Startup Iceland Hackathon project

## Getting Started

Note: These instructions have only been verified on a Mac (please
update if/when verified on other OSes).

1. Clone our repository into some folder.
2. Go to http://nodejs.org/download/ and install Node.js version 0.8.1 or
newer.
3. In the folder enclosing our repository (one level up), run the
   following commands:

```
% git clone https://github.com/Spiritdude/OpenJSCAD.org
% cd OpenJSCAD.org
% make install
% npm install nedb --save
% sudo npm install nodeunit -g
```

## Architecture

The file prototype.jscad is a model containing a dummy string that
gets embedded in or on the model in an appropriate place. The server
in make_model.js will take a code=ABBA parameter and the string
provided will be replaced in prototype.jscad and then OpenJSCAD is
used to output an STL model of our thing with the provided code
(e.g. ABBA) embedded in the model.
