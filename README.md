gufurnar
========

# Gufurnar - a Startup Iceland Hackathon project

## Getting Started

Note: These instructions have only been verified on a Mac and on an Ubuntu 14.04 LTS server. Please
update if/when verified on other OSes.

1. Clone our repository into some folder.
2. Install Node.js version 0.8.1 or newer.
   * Mac: Go to http://nodejs.org/download/ and install Node.js version 0.8.1 or
newer.
   * Linux: sudo apt-get install nodejs npm
3. In the folder enclosing our repository (one level up), run the
   following commands:

```
% git clone https://github.com/Spiritdude/OpenJSCAD.org
% cd OpenJSCAD.org
% make install
% cd ..
% sudo npm install nedb --save
% sudo npm install nodeunit -g
% cd gufurnar
% node server.js     # on Mac
% nodejs server.js   # on Linux
```

Our server should now be running at http://localhost:8000

## Architecture

The file prototype.jscad is a model containing a dummy string that
gets embedded in or on the model in an appropriate place. The server
in make_model.js will take a code=ABBA parameter and the string
provided will be replaced in prototype.jscad and then OpenJSCAD is
used to output an STL model of our thing with the provided code
(e.g. ABBA) embedded in the model.
