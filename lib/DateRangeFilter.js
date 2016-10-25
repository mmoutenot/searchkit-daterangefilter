'use strict';

Object.defineProperty(exports, '__esModule', {
		value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _searchkit = require("searchkit");

var _DateRangeAccessor = require('./DateRangeAccessor');

var defaults = require("lodash/defaults");
var max = require("lodash/max");
var map = require("lodash/map");
var maxBy = require("lodash/maxBy");
var get = require("lodash/get");

function computeMaxValue(items, field) {
		if (!items || items.length == 0) return 0;
		return maxBy(items, field)[field];
}

var DateRangeFilter = (function (_SearchkitComponent) {
		_inherits(DateRangeFilter, _SearchkitComponent);

		function DateRangeFilter(props) {
				_classCallCheck(this, DateRangeFilter);

				_get(Object.getPrototypeOf(DateRangeFilter.prototype), 'constructor', this).call(this, props);
				this.sliderUpdate = this.sliderUpdate.bind(this);
				this.sliderUpdateAndSearch = this.sliderUpdateAndSearch.bind(this);
		}

		_createClass(DateRangeFilter, [{
				key: 'defineAccessor',
				value: function defineAccessor() {
						var _props = this.props;
						var id = _props.id;
						var title = _props.title;
						var min = _props.min;
						var max = _props.max;
						var field = _props.field;
						var interval = _props.interval;
						var showHistogram = _props.showHistogram;

						return new _DateRangeAccessor.DateRangeAccessor(id, {
								id: id, min: min, max: max, title: title, field: field, interval: interval, loadHistogram: showHistogram
						});
				}
		}, {
				key: 'defineBEMBlocks',
				value: function defineBEMBlocks() {
						var block = this.props.mod || "sk-range-filter";
						return {
								container: block,
								labels: block + "-value-labels"
						};
				}
		}, {
				key: 'sliderUpdate',
				value: function sliderUpdate(newValues) {
						if (newValues.min == this.props.min && newValues.max == this.props.max) {
								this.accessor.state = this.accessor.state.clear();
						} else {
								this.accessor.state = this.accessor.state.setValue(newValues);
						}
						this.forceUpdate();
				}
		}, {
				key: 'sliderUpdateAndSearch',
				value: function sliderUpdateAndSearch(newValues) {
						this.sliderUpdate(newValues);
						this.searchkit.performSearch();
				}
		}, {
				key: 'getMaxValue',
				value: function getMaxValue() {
						if (this.accessor.getBuckets() == 0) return 0;
						return max(map(this.accessor.getBuckets(), "doc_count"));
				}
		}, {
				key: 'getRangeComponent',
				value: function getRangeComponent() {
						var _props2 = this.props;
						var rangeComponent = _props2.rangeComponent;
						var showHistogram = _props2.showHistogram;

						if (!showHistogram && rangeComponent === _searchkit.RangeSliderHistogram) {
								return _searchkit.RangeSlider;
						} else {
								return rangeComponent;
						}
				}
		}, {
				key: 'render',
				value: function render() {
						var _props3 = this.props;
						var id = _props3.id;
						var title = _props3.title;
						var containerComponent = _props3.containerComponent;
						var collapsable = _props3.collapsable;
						var defaultCollapsed = _props3.defaultCollapsed;

						var maxValue = computeMaxValue(this.accessor.getBuckets(), "doc_count");

						return (0, _searchkit.renderComponent)(containerComponent, {
								title: title,
								className: id ? 'filter--' + id : undefined,
								defaultCollapsed: defaultCollapsed,
								disabled: maxValue == 0
						}, this.renderRangeComponent(this.getRangeComponent()));
				}
		}, {
				key: 'renderRangeComponent',
				value: function renderRangeComponent(component) {
						var _props4 = this.props;
						var min = _props4.min;
						var max = _props4.max;

						var state = this.accessor.state.getValue();
						return React.createElement(
								'div',
								{ className: 'search-result-dropdown' },
								React.createElement(
										'div',
										{ style: { padding: 16, minHeight: 100 } },
										(0, _searchkit.renderComponent)(component, {
												min: min, max: max,
												minValue: Number(get(state, "min", min)),
												maxValue: Number(get(state, "max", max)),
												items: this.accessor.getBuckets(),
												onChange: this.sliderUpdate,
												onFinished: this.sliderUpdateAndSearch
										})
								)
						);
				}
		}]);

		return DateRangeFilter;
})(_searchkit.SearchkitComponent);

exports.DateRangeFilter = DateRangeFilter;

DateRangeFilter.propTypes = defaults({
		field: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		id: React.PropTypes.string.isRequired
}, // containerComponent:RenderComponentPropType,
// rangeComponent:RenderComponentPropType
_searchkit.SearchkitComponent.propTypes);

DateRangeFilter.defaultProps = {
		containerComponent: _searchkit.Panel,
		rangeComponent: _searchkit.RangeSliderHistogram,
		showHistogram: true
};