"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateHistogramBucket = DateHistogramBucket;

var _searchkit = require("searchkit");

var assign = require("lodash/assign");

function DateHistogramBucket(key, field) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  for (var _len = arguments.length, childAggs = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    childAggs[_key - 3] = arguments[_key];
  }

  return (0, _searchkit.AggsContainer)(key, { date_histogram: assign({ field: field }, options) }, childAggs);
}