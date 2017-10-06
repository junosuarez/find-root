#!/usr/bin/env node
var findroot = require('..')
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2))
var path = require('path')

process.stdout.write(findroot(argv._[0] || process.cwd()))
