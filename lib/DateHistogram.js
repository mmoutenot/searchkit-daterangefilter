'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodashMaxBy = require('lodash/maxBy');

var _lodashMaxBy2 = _interopRequireDefault(_lodashMaxBy);

function computeMaxValue(items, field) {
  if (!items || items.length == 0) return 0;
  return (0, _lodashMaxBy2['default'])(items, field)[field];
}

var DateHistogram = (function (_React$Component) {
  _inherits(DateHistogram, _React$Component);

  function DateHistogram() {
    _classCallCheck(this, DateHistogram);

    _get(Object.getPrototypeOf(DateHistogram.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DateHistogram, [{
    key: 'getDefaultProps',
    value: function getDefaultProps() {
      return {
        mod: 'sk-range-histogram'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var mod = _props.mod;
      var className = _props.className;
      var min = _props.min;
      var max = _props.max;
      var minValue = _props.minValue;
      var maxValue = _props.maxValue;
      var _props$items = _props.items;
      var items = _props$items === undefined ? [] : _props$items;

      var bemBlocks = {
        container: block(mod)
      };

      var maxCount = computeMaxValue(items, 'doc_count');
      if (maxCount == 0) return null;

      var bars = items.map(function (_ref) {
        var key_as_string = _ref.key_as_string;
        var doc_count = _ref.doc_count;

        var year = new Date(key_as_string).getYear();
        var outOfBounds = year < minValue || year > maxValue;
        return _react2['default'].createElement('div', { className: bemBlocks.container('bar').state({ 'out-of-bounds': outOfBounds }),
          key: key_as_string,
          style: {
            height: doc_count / maxCount * 100 + '%'
          } });
      });

      return _react2['default'].createElement(
        'div',
        { className: bemBlocks.container().mix(className) },
        bars
      );
    }
  }]);

  return DateHistogram;
})(_react2['default'].Component);

exports.DateHistogram = DateHistogram;