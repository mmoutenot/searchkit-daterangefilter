"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _searchkit = require("searchkit");

var _DateHistogramBucket = require("./DateHistogramBucket");

var get = require("lodash/get");
var maxBy = require("lodash/maxBy");

var DateRangeAccessor = (function (_FilterBasedAccessor) {
	_inherits(DateRangeAccessor, _FilterBasedAccessor);

	function DateRangeAccessor(key, options) {
		_classCallCheck(this, DateRangeAccessor);

		_get(Object.getPrototypeOf(DateRangeAccessor.prototype), "constructor", this).call(this, key, options.id);
		this.options = options;

		this.state = new _searchkit.ObjectState({});
	}

	_createClass(DateRangeAccessor, [{
		key: "buildSharedQuery",
		value: function buildSharedQuery(query) {
			var _this = this;

			if (this.state.hasValue()) {
				var val = this.state.getValue();
				var rangeFilter = (0, _searchkit.RangeQuery)(this.options.field, {
					lte: val.max + "||/y", // first date of year
					gte: val.min + "||/y" });
				// last date of year
				var selectedFilter = {
					name: this.translate(this.options.title),
					value: val.min + " - " + val.max,
					id: this.options.id,
					remove: function remove() {
						_this.state = _this.state.clear();
					}
				};

				return query.addFilter(this.key, rangeFilter).addSelectedFilter(selectedFilter);
			}

			return query;
		}
	}, {
		key: "getBuckets",
		value: function getBuckets() {
			return this.getAggregations([this.key, this.key, "buckets"], []);
		}
	}, {
		key: "isDisabled",
		value: function isDisabled() {
			if (this.options.loadHistogram) {
				var maxValue = get(maxBy(this.getBuckets(), "doc_count"), "doc_count", 0);
				return maxValue === 0;
			} else {
				return this.getAggregations([this.key, this.key, "value"], 0) === 0;
			}
		}
	}, {
		key: "getInterval",
		value: function getInterval() {
			if (this.options.interval) {
				return this.options.interval;
			}
			return "year";
		}
	}, {
		key: "buildOwnQuery",
		value: function buildOwnQuery(query) {
			var otherFilters = query.getFiltersWithoutKeys(this.key);
			var filters = (0, _searchkit.BoolMust)([otherFilters, (0, _searchkit.RangeQuery)(this.options.field, {
				gte: this.options.min, lte: this.options.max
			})]);

			var metric = undefined;

			if (this.options.loadHistogram) {
				metric = (0, _DateHistogramBucket.DateHistogramBucket)(this.key, this.options.field, {
					"interval": this.getInterval(),
					"min_doc_count": 0,
					"extended_bounds": {
						"min": this.options.min,
						"max": this.options.max
					}
				});
			} else {
				metric = (0, _searchkit.CardinalityMetric)(this.key, this.options.field);
			}

			return query.setAggs((0, _searchkit.FilterBucket)(this.key, filters, metric));
		}
	}]);

	return DateRangeAccessor;
})(_searchkit.FilterBasedAccessor);

exports.DateRangeAccessor = DateRangeAccessor;