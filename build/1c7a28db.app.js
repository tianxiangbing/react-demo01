webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(35);

	var _reactRouter = __webpack_require__(165);

	var _App = __webpack_require__(226);

	var _App2 = _interopRequireDefault(_App);

	var _App3 = __webpack_require__(230);

	var _App4 = _interopRequireDefault(_App3);

	var _Record = __webpack_require__(248);

	var _Record2 = _interopRequireDefault(_Record);

	var _Fieldsign = __webpack_require__(249);

	var _Fieldsign2 = _interopRequireDefault(_Fieldsign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';

	(0, _reactDom.render)(_react2.default.createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.hashHistory },
	  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _App4.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/record', component: _Record2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/fieldsign', component: _Fieldsign2.default })
	), document.getElementById('app'));

/***/ },

/***/ 226:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	"use strict";

/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(165);

	var _reactHelmet = __webpack_require__(231);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _App = __webpack_require__(241);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Component = _react2.default.Component;

	var App = function (_Component) {
		_inherits(App, _Component);

		function App(props) {
			_classCallCheck(this, App);

			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

			_this2.state = { localInfo: {}, recordList: null, showText: "正在加载数据..." };
			return _this2;
		}

		_createClass(App, [{
			key: 'initMap',
			value: function initMap() {
				var map = new AMap.Map('container');
				map.setZoom(10);
				var lnglatXY = [116.396574, 39.992706];
				map.setCenter(lnglatXY);
				regeocoder();
				var _this = this;
				function regeocoder() {
					//逆地理编码
					var geocoder = new AMap.Geocoder({
						radius: 1000,
						extensions: "all"
					});
					geocoder.getAddress(lnglatXY, function (status, result) {
						if (status === 'complete' && result.info === 'OK') {
							geocoder_CallBack(result);
						}
					});
					var content = "<div class = 'iconfont icon-qiandaodingwei mapicon'></div>";
					var marker = new AMap.Marker({ //加点
						map: map,
						content: content,
						position: lnglatXY
					});
					map.setFitView();
				}

				function geocoder_CallBack(data) {
					var address = data.regeocode.addressComponent; //返回地址描述
					var title = address.township + address.street + address.streetNumber;
					var desc = address.province + address.city + address.district + title;
					_this.setState({ localInfo: { title: title, desc: desc } });
				}
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.initMap();
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'body' },
					_react2.default.createElement(_reactHelmet2.default, { title: '签到'
					}),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/record' },
						'/record123123'
					),
					_react2.default.createElement(
						'div',
						{ className: 'box downborder' },
						_react2.default.createElement(
							'div',
							{ className: 'mapContainer' },
							_react2.default.createElement('div', { ref: 'smallMap', id: 'container', className: 'smallMap' }),
							_react2.default.createElement(
								'div',
								{ className: 'mapAdress' },
								_react2.default.createElement(
									'h2',
									null,
									this.state.localInfo.title
								),
								_react2.default.createElement(
									'p',
									null,
									this.state.localInfo.desc
								)
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'box upborder signRecord' },
						_react2.default.createElement('div', { className: 'listSign' }),
						_react2.default.createElement(
							'div',
							{ className: 'nodata' },
							this.state.showText
						)
					)
				);
			}
		}]);

		return App;
	}(Component);

	exports.default = App;

/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactSideEffect = __webpack_require__(232);

	var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);

	var _deepEqual = __webpack_require__(235);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _objectAssign = __webpack_require__(238);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _HelmetConstantsJs = __webpack_require__(239);

	var _PlainComponent = __webpack_require__(240);

	var _PlainComponent2 = _interopRequireDefault(_PlainComponent);

	var HELMET_ATTRIBUTE = "data-react-helmet";

	var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
	    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
	};

	var getInnermostProperty = function getInnermostProperty(propsList, property) {
	    var reversedPropsList = [].concat(propsList).reverse();

	    for (var i = 0; i < reversedPropsList.length; i++) {
	        var props = reversedPropsList[i];

	        if (props[property]) {
	            return props[property];
	        }
	    }

	    return null;
	};

	var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
	    var innermostTitle = getInnermostProperty(propsList, "title");
	    var innermostTemplate = getInnermostProperty(propsList, "titleTemplate");

	    if (innermostTemplate && innermostTitle) {
	        return innermostTemplate.replace(/\%s/g, innermostTitle);
	    }

	    var innermostDefaultTitle = getInnermostProperty(propsList, "defaultTitle");

	    return innermostTitle || innermostDefaultTitle || "";
	};

	var getOnChangeClientState = function getOnChangeClientState(propsList) {
	    return getInnermostProperty(propsList, "onChangeClientState") || function () {};
	};

	var getHtmlAttributesFromPropsList = function getHtmlAttributesFromPropsList(propsList) {
	    return propsList.filter(function (props) {
	        return typeof props[_HelmetConstantsJs.TAG_NAMES.HTML] !== "undefined";
	    }).map(function (props) {
	        return props[_HelmetConstantsJs.TAG_NAMES.HTML];
	    }).reduce(function (html, current) {
	        return _extends({}, html, current);
	    }, {});
	};

	var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
	    return propsList.filter(function (props) {
	        return typeof props[_HelmetConstantsJs.TAG_NAMES.BASE] !== "undefined";
	    }).map(function (props) {
	        return props[_HelmetConstantsJs.TAG_NAMES.BASE];
	    }).reverse().reduce(function (innermostBaseTag, tag) {
	        if (!innermostBaseTag.length) {
	            var keys = Object.keys(tag);

	            for (var i = 0; i < keys.length; i++) {
	                var attributeKey = keys[i];
	                var lowerCaseAttributeKey = attributeKey.toLowerCase();

	                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1) {
	                    return innermostBaseTag.concat(tag);
	                }
	            }
	        }

	        return innermostBaseTag;
	    }, []);
	};

	var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
	    // Calculate list of tags, giving priority innermost component (end of the propslist)
	    var approvedSeenTags = {};

	    var tagList = propsList.filter(function (props) {
	        return typeof props[tagName] !== "undefined";
	    }).map(function (props) {
	        return props[tagName];
	    }).reverse().reduce(function (approvedTags, instanceTags) {
	        var instanceSeenTags = {};

	        instanceTags.filter(function (tag) {
	            var primaryAttributeKey = undefined;
	            var keys = Object.keys(tag);
	            for (var i = 0; i < keys.length; i++) {
	                var attributeKey = keys[i];
	                var lowerCaseAttributeKey = attributeKey.toLowerCase();

	                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
	                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstantsJs.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstantsJs.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
	                    primaryAttributeKey = lowerCaseAttributeKey;
	                }
	                // Special case for innerHTML which doesn't work lowercased
	                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstantsJs.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstantsJs.TAG_PROPERTIES.CSS_TEXT)) {
	                    primaryAttributeKey = attributeKey;
	                }
	            }

	            if (!primaryAttributeKey) {
	                return false;
	            }

	            var value = tag[primaryAttributeKey].toLowerCase();

	            if (!approvedSeenTags[primaryAttributeKey]) {
	                approvedSeenTags[primaryAttributeKey] = {};
	            }

	            if (!instanceSeenTags[primaryAttributeKey]) {
	                instanceSeenTags[primaryAttributeKey] = {};
	            }

	            if (!approvedSeenTags[primaryAttributeKey][value]) {
	                instanceSeenTags[primaryAttributeKey][value] = true;
	                return true;
	            }

	            return false;
	        }).reverse().forEach(function (tag) {
	            return approvedTags.push(tag);
	        });

	        // Update seen tags with tags from this instance
	        var keys = Object.keys(instanceSeenTags);
	        for (var i = 0; i < keys.length; i++) {
	            var attributeKey = keys[i];
	            var tagUnion = (0, _objectAssign2["default"])({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

	            approvedSeenTags[attributeKey] = tagUnion;
	        }

	        return approvedTags;
	    }, []).reverse();

	    return tagList;
	};

	var updateTitle = function updateTitle(title) {
	    document.title = title || document.title;
	};

	var updateHtmlAttributes = function updateHtmlAttributes(attributes) {
	    var htmlTag = document.getElementsByTagName("html")[0];
	    var helmetAttributeString = htmlTag.getAttribute(HELMET_ATTRIBUTE);
	    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
	    var attributesToRemove = [].concat(helmetAttributes);
	    var attributeKeys = Object.keys(attributes);

	    for (var i = 0; i < attributeKeys.length; i++) {
	        var attribute = attributeKeys[i];
	        var value = attributes[attribute] || "";
	        htmlTag.setAttribute(attribute, value);

	        if (helmetAttributes.indexOf(attribute) === -1) {
	            helmetAttributes.push(attribute);
	        }

	        var indexToSave = attributesToRemove.indexOf(attribute);
	        if (indexToSave !== -1) {
	            attributesToRemove.splice(indexToSave, 1);
	        }
	    }

	    for (var i = attributesToRemove.length - 1; i >= 0; i--) {
	        htmlTag.removeAttribute(attributesToRemove[i]);
	    }

	    if (helmetAttributes.length === attributesToRemove.length) {
	        htmlTag.removeAttribute(HELMET_ATTRIBUTE);
	    } else {
	        htmlTag.setAttribute(HELMET_ATTRIBUTE, helmetAttributes.join(","));
	    }
	};

	var updateTags = function updateTags(type, tags) {
	    var headElement = document.head || document.querySelector("head");
	    var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
	    var oldTags = Array.prototype.slice.call(tagNodes);
	    var newTags = [];
	    var indexToDelete = undefined;

	    if (tags && tags.length) {
	        tags.forEach(function (tag) {
	            var newElement = document.createElement(type);

	            for (var attribute in tag) {
	                if (tag.hasOwnProperty(attribute)) {
	                    if (attribute === "innerHTML") {
	                        newElement.innerHTML = tag.innerHTML;
	                    } else if (attribute === "cssText") {
	                        if (newElement.styleSheet) {
	                            newElement.styleSheet.cssText = tag.cssText;
	                        } else {
	                            newElement.appendChild(document.createTextNode(tag.cssText));
	                        }
	                    } else {
	                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
	                        newElement.setAttribute(attribute, value);
	                    }
	                }
	            }

	            newElement.setAttribute(HELMET_ATTRIBUTE, "true");

	            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
	            if (oldTags.some(function (existingTag, index) {
	                indexToDelete = index;
	                return newElement.isEqualNode(existingTag);
	            })) {
	                oldTags.splice(indexToDelete, 1);
	            } else {
	                newTags.push(newElement);
	            }
	        });
	    }

	    oldTags.forEach(function (tag) {
	        return tag.parentNode.removeChild(tag);
	    });
	    newTags.forEach(function (tag) {
	        return headElement.appendChild(tag);
	    });

	    return {
	        oldTags: oldTags,
	        newTags: newTags
	    };
	};

	var generateHtmlAttributesAsString = function generateHtmlAttributesAsString(attributes) {
	    var keys = Object.keys(attributes);
	    var attributeString = "";

	    for (var i = 0; i < keys.length; i++) {
	        var attribute = keys[i];
	        var attr = typeof attributes[attribute] !== "undefined" ? attribute + "=\"" + attributes[attribute] + "\"" : "" + attribute;
	        attributeString += attr + " ";
	    }

	    return attributeString.trim();
	};

	var generateTitleAsString = function generateTitleAsString(type, title) {
	    var stringifiedMarkup = "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(title) + "</" + type + ">";

	    return stringifiedMarkup;
	};

	var generateTagsAsString = function generateTagsAsString(type, tags) {
	    var stringifiedMarkup = tags.map(function (tag) {
	        var attributeHtml = Object.keys(tag).filter(function (attribute) {
	            return !(attribute === "innerHTML" || attribute === "cssText");
	        }).map(function (attribute) {
	            if (typeof tag[attribute] === "undefined") {
	                return attribute;
	            }

	            var encodedValue = encodeSpecialCharacters(tag[attribute]);
	            return attribute + "=\"" + encodedValue + "\"";
	        }).join(" ").trim();

	        var tagContent = tag.innerHTML || tag.cssText || "";

	        return "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (type === _HelmetConstantsJs.TAG_NAMES.SCRIPT || type === _HelmetConstantsJs.TAG_NAMES.STYLE ? ">" + tagContent + "</" + type + ">" : "/>");
	    }).join("");

	    return stringifiedMarkup;
	};

	var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title) {
	    // assigning into an array to define toString function on it
	    var component = [_react2["default"].createElement(_HelmetConstantsJs.TAG_NAMES.TITLE, _defineProperty({
	        key: title
	    }, HELMET_ATTRIBUTE, true), title)];

	    return component;
	};

	var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
	    /* eslint-disable react/display-name */
	    var component = tags.map(function (tag, i) {
	        var mappedTag = _defineProperty({
	            key: i
	        }, HELMET_ATTRIBUTE, true);

	        Object.keys(tag).forEach(function (attribute) {
	            var mappedAttribute = _HelmetConstantsJs.REACT_TAG_MAP[attribute] || attribute;

	            if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
	                var content = tag.innerHTML || tag.cssText;
	                mappedTag.dangerouslySetInnerHTML = { __html: content };
	            } else {
	                mappedTag[mappedAttribute] = tag[attribute];
	            }
	        });

	        return _react2["default"].createElement(type, mappedTag);
	    });

	    return component;
	    /* eslint-enable react/display-name */
	};

	var getMethodsForTag = function getMethodsForTag(type, tags) {
	    switch (type) {
	        case _HelmetConstantsJs.TAG_NAMES.TITLE:
	            return {
	                toComponent: function toComponent() {
	                    return generateTitleAsReactComponent(type, tags);
	                },
	                toString: function toString() {
	                    return generateTitleAsString(type, tags);
	                }
	            };
	        case _HelmetConstantsJs.TAG_NAMES.HTML:
	            return {
	                toComponent: function toComponent() {
	                    return tags;
	                },
	                toString: function toString() {
	                    return generateHtmlAttributesAsString(tags);
	                }
	            };
	        default:
	            return {
	                toComponent: function toComponent() {
	                    return generateTagsAsReactComponent(type, tags);
	                },
	                toString: function toString() {
	                    return generateTagsAsString(type, tags);
	                }
	            };
	    }
	};

	var mapStateOnServer = function mapStateOnServer(_ref) {
	    var htmlAttributes = _ref.htmlAttributes;
	    var title = _ref.title;
	    var baseTag = _ref.baseTag;
	    var metaTags = _ref.metaTags;
	    var linkTags = _ref.linkTags;
	    var scriptTags = _ref.scriptTags;
	    var styleTags = _ref.styleTags;
	    return {
	        htmlAttributes: getMethodsForTag(_HelmetConstantsJs.TAG_NAMES.HTML, htmlAttributes),
	        title: getMethodsForTag(_HelmetConstantsJs.TAG_NAMES.TITLE, title),
	        base: getMethodsForTag(_HelmetConstantsJs.TAG_NAMES.BASE, baseTag),
	        meta: getMethodsForTag(_HelmetConstantsJs.TAG_NAMES.META, metaTags),
	        link: getMethodsForTag(_HelmetConstantsJs.TAG_NAMES.LINK, linkTags),
	        script: getMethodsForTag(_HelmetConstantsJs.TAG_NAMES.SCRIPT, scriptTags),
	        style: getMethodsForTag(_HelmetConstantsJs.TAG_NAMES.STYLE, styleTags)
	    };
	};

	var Helmet = function Helmet(Component) {
	    /* eslint-disable react/no-multi-comp */

	    var HelmetWrapper = (function (_React$Component) {
	        _inherits(HelmetWrapper, _React$Component);

	        function HelmetWrapper() {
	            _classCallCheck(this, HelmetWrapper);

	            _get(Object.getPrototypeOf(HelmetWrapper.prototype), "constructor", this).apply(this, arguments);
	        }

	        /* eslint-enable react/no-multi-comp */

	        _createClass(HelmetWrapper, [{
	            key: "shouldComponentUpdate",
	            value: function shouldComponentUpdate(nextProps) {
	                return !(0, _deepEqual2["default"])(this.props, nextProps);
	            }

	            // Component.peek comes from react-side-effect:
	            // For testing, you may use a static peek() method available on the returned component.
	            // It lets you get the current state without resetting the mounted instance stack.
	            // Don’t use it for anything other than testing.
	        }, {
	            key: "render",
	            value: function render() {
	                return _react2["default"].createElement(Component, this.props);
	            }
	        }], [{
	            key: "propTypes",

	            /**
	             * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
	             * @param {String} title: "Title"
	             * @param {String} defaultTitle: "Default Title"
	             * @param {String} titleTemplate: "MySite.com - %s"
	             * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
	             * @param {Array} meta: [{"name": "description", "content": "Test description"}]
	             * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
	             * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
	             * @param {Array} style: [{"type": "text/css", "cssText": "div{ display: block; color: blue; }"}]
	             * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
	             */
	            value: {
	                htmlAttributes: _react2["default"].PropTypes.object,
	                title: _react2["default"].PropTypes.string,
	                defaultTitle: _react2["default"].PropTypes.string,
	                titleTemplate: _react2["default"].PropTypes.string,
	                base: _react2["default"].PropTypes.object,
	                meta: _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.object),
	                link: _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.object),
	                script: _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.object),
	                style: _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.object),
	                onChangeClientState: _react2["default"].PropTypes.func
	            },
	            enumerable: true
	        }, {
	            key: "peek",
	            value: Component.peek,
	            enumerable: true
	        }, {
	            key: "rewind",
	            value: function value() {
	                var mappedState = Component.rewind();
	                if (!mappedState) {
	                    // provide fallback if mappedState is undefined
	                    mappedState = mapStateOnServer({
	                        htmlAttributes: [],
	                        title: "",
	                        baseTag: [],
	                        metaTags: [],
	                        linkTags: [],
	                        scriptTags: [],
	                        styleTags: []
	                    });
	                }

	                return mappedState;
	            },
	            enumerable: true
	        }, {
	            key: "canUseDOM",
	            set: function set(canUseDOM) {
	                Component.canUseDOM = canUseDOM;
	            }
	        }]);

	        return HelmetWrapper;
	    })(_react2["default"].Component);

	    return HelmetWrapper;
	};

	var reducePropsToState = function reducePropsToState(propsList) {
	    return {
	        htmlAttributes: getHtmlAttributesFromPropsList(propsList),
	        title: getTitleFromPropsList(propsList),
	        baseTag: getBaseTagFromPropsList([_HelmetConstantsJs.TAG_PROPERTIES.HREF], propsList),
	        metaTags: getTagsFromPropsList(_HelmetConstantsJs.TAG_NAMES.META, [_HelmetConstantsJs.TAG_PROPERTIES.NAME, _HelmetConstantsJs.TAG_PROPERTIES.CHARSET, _HelmetConstantsJs.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstantsJs.TAG_PROPERTIES.PROPERTY], propsList),
	        linkTags: getTagsFromPropsList(_HelmetConstantsJs.TAG_NAMES.LINK, [_HelmetConstantsJs.TAG_PROPERTIES.REL, _HelmetConstantsJs.TAG_PROPERTIES.HREF], propsList),
	        scriptTags: getTagsFromPropsList(_HelmetConstantsJs.TAG_NAMES.SCRIPT, [_HelmetConstantsJs.TAG_PROPERTIES.SRC, _HelmetConstantsJs.TAG_PROPERTIES.INNER_HTML], propsList),
	        styleTags: getTagsFromPropsList(_HelmetConstantsJs.TAG_NAMES.STYLE, [_HelmetConstantsJs.TAG_PROPERTIES.CSS_TEXT], propsList),
	        onChangeClientState: getOnChangeClientState(propsList)
	    };
	};

	var handleClientStateChange = function handleClientStateChange(newState) {
	    var htmlAttributes = newState.htmlAttributes;
	    var title = newState.title;
	    var baseTag = newState.baseTag;
	    var metaTags = newState.metaTags;
	    var linkTags = newState.linkTags;
	    var scriptTags = newState.scriptTags;
	    var styleTags = newState.styleTags;
	    var onChangeClientState = newState.onChangeClientState;

	    updateHtmlAttributes(htmlAttributes);

	    updateTitle(title);

	    var tagUpdates = {
	        baseTag: updateTags(_HelmetConstantsJs.TAG_NAMES.BASE, baseTag),
	        metaTags: updateTags(_HelmetConstantsJs.TAG_NAMES.META, metaTags),
	        linkTags: updateTags(_HelmetConstantsJs.TAG_NAMES.LINK, linkTags),
	        scriptTags: updateTags(_HelmetConstantsJs.TAG_NAMES.SCRIPT, scriptTags),
	        styleTags: updateTags(_HelmetConstantsJs.TAG_NAMES.STYLE, styleTags)
	    };

	    var addedTags = {};
	    var removedTags = {};

	    Object.keys(tagUpdates).forEach(function (tagType) {
	        var _tagUpdates$tagType = tagUpdates[tagType];
	        var newTags = _tagUpdates$tagType.newTags;
	        var oldTags = _tagUpdates$tagType.oldTags;

	        if (newTags.length) {
	            addedTags[tagType] = newTags;
	        }
	        if (oldTags.length) {
	            removedTags[tagType] = tagUpdates[tagType].oldTags;
	        }
	    });

	    onChangeClientState(newState, addedTags, removedTags);
	};

	var SideEffect = (0, _reactSideEffect2["default"])(reducePropsToState, handleClientStateChange, mapStateOnServer);

	// PlainComponent is used to be a blank component decorated by react-side-effect
	exports["default"] = Helmet(SideEffect(_PlainComponent2["default"]));
	module.exports = exports["default"];

/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _fbjsLibExecutionEnvironment = __webpack_require__(233);

	var _fbjsLibExecutionEnvironment2 = _interopRequireDefault(_fbjsLibExecutionEnvironment);

	var _fbjsLibShallowEqual = __webpack_require__(234);

	var _fbjsLibShallowEqual2 = _interopRequireDefault(_fbjsLibShallowEqual);

	module.exports = function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
	  if (typeof reducePropsToState !== 'function') {
	    throw new Error('Expected reducePropsToState to be a function.');
	  }
	  if (typeof handleStateChangeOnClient !== 'function') {
	    throw new Error('Expected handleStateChangeOnClient to be a function.');
	  }
	  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
	    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
	  }

	  function getDisplayName(WrappedComponent) {
	    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	  }

	  return function wrap(WrappedComponent) {
	    if (typeof WrappedComponent !== 'function') {
	      throw new Error('Expected WrappedComponent to be a React component.');
	    }

	    var mountedInstances = [];
	    var state = undefined;

	    function emitChange() {
	      state = reducePropsToState(mountedInstances.map(function (instance) {
	        return instance.props;
	      }));

	      if (SideEffect.canUseDOM) {
	        handleStateChangeOnClient(state);
	      } else if (mapStateOnServer) {
	        state = mapStateOnServer(state);
	      }
	    }

	    var SideEffect = (function (_Component) {
	      _inherits(SideEffect, _Component);

	      function SideEffect() {
	        _classCallCheck(this, SideEffect);

	        _Component.apply(this, arguments);
	      }

	      SideEffect.peek = function peek() {
	        return state;
	      };

	      SideEffect.rewind = function rewind() {
	        if (SideEffect.canUseDOM) {
	          throw new Error('You may ony call rewind() on the server. Call peek() to read the current state.');
	        }

	        var recordedState = state;
	        state = undefined;
	        mountedInstances = [];
	        return recordedState;
	      };

	      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	        return !_fbjsLibShallowEqual2['default'](nextProps, this.props);
	      };

	      SideEffect.prototype.componentWillMount = function componentWillMount() {
	        mountedInstances.push(this);
	        emitChange();
	      };

	      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
	        emitChange();
	      };

	      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
	        var index = mountedInstances.indexOf(this);
	        mountedInstances.splice(index, 1);
	        emitChange();
	      };

	      SideEffect.prototype.render = function render() {
	        return _react2['default'].createElement(WrappedComponent, this.props);
	      };

	      _createClass(SideEffect, null, [{
	        key: 'displayName',

	        // Try to use displayName of wrapped component
	        value: 'SideEffect(' + getDisplayName(WrappedComponent) + ')',

	        // Expose canUseDOM so tests can monkeypatch it
	        enumerable: true
	      }, {
	        key: 'canUseDOM',
	        value: _fbjsLibExecutionEnvironment2['default'].canUseDOM,
	        enumerable: true
	      }]);

	      return SideEffect;
	    })(_react.Component);

	    return SideEffect;
	  };
	};

/***/ },

/***/ 233:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ },

/***/ 234:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 * @typechecks
	 * 
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(236);
	var isArguments = __webpack_require__(237);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },

/***/ 236:
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },

/***/ 237:
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },

/***/ 238:
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },

/***/ 239:
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var TAG_NAMES = {
	    HTML: "htmlAttributes",
	    TITLE: "title",
	    BASE: "base",
	    META: "meta",
	    LINK: "link",
	    SCRIPT: "script",
	    STYLE: "style"
	};

	exports.TAG_NAMES = TAG_NAMES;
	var TAG_PROPERTIES = {
	    NAME: "name",
	    CHARSET: "charset",
	    HTTPEQUIV: "http-equiv",
	    REL: "rel",
	    HREF: "href",
	    PROPERTY: "property",
	    SRC: "src",
	    INNER_HTML: "innerHTML",
	    CSS_TEXT: "cssText"
	};

	exports.TAG_PROPERTIES = TAG_PROPERTIES;
	var REACT_TAG_MAP = {
	    "charset": "charSet",
	    "http-equiv": "httpEquiv"
	};
	exports.REACT_TAG_MAP = REACT_TAG_MAP;

/***/ },

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var PlainComponent = (function (_React$Component) {
	    _inherits(PlainComponent, _React$Component);

	    function PlainComponent() {
	        _classCallCheck(this, PlainComponent);

	        _get(Object.getPrototypeOf(PlainComponent.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(PlainComponent, [{
	        key: "render",
	        value: function render() {
	            return null;
	        }
	    }]);

	    return PlainComponent;
	})(_react2["default"].Component);

	exports["default"] = PlainComponent;
	module.exports = exports["default"];

/***/ },

/***/ 241:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	"use strict";

/***/ },

/***/ 248:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactHelmet = __webpack_require__(231);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Component = _react2.default.Component;

	var Record = function (_Component) {
		_inherits(Record, _Component);

		function Record() {
			_classCallCheck(this, Record);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Record).apply(this, arguments));
		}

		_createClass(Record, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(_reactHelmet2.default, { title: "记录" }),
					"RECORD",
					_react2.default.createElement(
						"a",
						{ href: "#/" },
						"index"
					)
				);
			}
		}]);

		return Record;
	}(Component);

	exports.default = Record;

/***/ },

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactHelmet = __webpack_require__(231);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Component = _react2.default.Component;

	var Fieldsign = function (_Component) {
		_inherits(Fieldsign, _Component);

		function Fieldsign() {
			_classCallCheck(this, Fieldsign);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Fieldsign).apply(this, arguments));
		}

		_createClass(Fieldsign, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					null,
					"外勤签到"
				);
			}
		}]);

		return Fieldsign;
	}(Component);

	exports.default = Fieldsign;

/***/ }

});