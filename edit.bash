#!/bin/bash

vim \
    ./bower.json \
    ./.bowerrc \
    ./app/index.html \
    `find app/ test/ -name \*.html` \
    `find app/scripts/ test/ -name \*.js` \
    ./app/robots.txt \
    `find app/styles/ -name \*.css` \
    ./.editorconfig \
    ./README.md \
    ./.yo-rc.json \
    ./.gitignore \
    ./Gruntfile.js \
    ./package.json
