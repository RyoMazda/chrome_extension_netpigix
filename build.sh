#!/bin/bash

set -eu -o pipefail

rm -r dist
yarn webpack
cp src/my_style.css dist/my_style.css
zip -r dist.zip dist/
