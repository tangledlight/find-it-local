#!/bin/sh
set -eu

mkdir -p dist/src
cp index.html styles.css dist/
cp src/*.js dist/src/
