(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.pell = {})));
}(this, (function (exports) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultParagraphSeparatorString = 'defaultParagraphSeparator';
var formatBlock = 'formatBlock';
var addEventListener = function addEventListener(parent, type, listener) {
  return parent.addEventListener(type, listener);
};
var appendChild = function appendChild(parent, child) {
  return parent.appendChild(child);
};
var createElement = function createElement(tag) {
  return document.createElement(tag);
};
var queryCommandState = function queryCommandState(command) {
  return document.queryCommandState(command);
};
var queryCommandValue = function queryCommandValue(command) {
  return document.queryCommandValue(command);
};

var exec = function exec(command) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return document.execCommand(command, false, value);
};

var defaultActions = {
bold: {icon: '<b>B</b>',title: 'Bold',state: function state() {return queryCommandState('bold');},result: function result() {return exec('bold');}},
italic: {icon: '<i>I</i>',title: 'Italic',state: function state() {return queryCommandState('italic');},result: function result() {return exec('italic');}},
underline: {icon: '<u>U</u>',title: 'Underline',state: function state() {return queryCommandState('underline');},result: function result() {return exec('underline');}},
strikethrough: {icon: '<strike>S</strike>',title: 'Strike-through',state: function state() {return queryCommandState('strikeThrough');},result: function result() {return exec('strikeThrough');}},
heading1: {icon: '<b>H<sub>1</sub></b>',title: 'Heading 1',result: function result() {return exec(formatBlock, '<h1>');}},
heading2: {icon: '<b>H<sub>2</sub></b>',title: 'Heading 2',result: function result() {return exec(formatBlock, '<h2>');}},
paragraph: {icon: '&#182;',title: 'Paragraph',result: function result() {return exec(formatBlock, '<p>');}},
quote: {icon: '&#8220; &#8221;',title: 'Quote',result: function result() {return exec(formatBlock, '<blockquote>');}},
olist: {icon: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGhSURBVGhD7dm9K0VxGMDxG0neklKUkImShcVkMBgopbDYKBmlpBSDBROrwaIsdhYG5T/wUsjLwKTIiAHfp+5TT7f7Uo57nef6fetT955bp/t0z7n9zjmJUCj0Kw1gLKlLNnirAuv4MlbhqgY8wQ7hcpAWpA7hepBn3CdfuxykCkOowS6yDbKMrQKYR6RyDXIK/TyfThCpfzPILNYKYAaRyjWIm4pmkCnoP8eIbAiFoleCTvSiUjZ4rBvn0BP9FZNwVSNknaVDWKNw0ybsl38zr2/gpiPoF19Cn3kvyuGiCSwk9eMCOsQ1bC6WKM24gg7xiXHYYr9obIO9qBJzSC3Wg3TgAXZHZ9DDzZ4jsT60jmGHSFULF8nPmG4A5WaQFexl4Xa5Evrr2tGTRhNclelkd3epWzSDHOAF77CDDMJdctv0ETrEHarhLnmoY38NcYtW2OSqUZcu+SQr8h+VbhAhh50t9qvfUtQlyWM33eEHyqDFepBhTBvb0B3KZa/cXdFi/Vgh09+v2IGbMg1yiXq4aQOHxj4WIU96Q6FQKBShROIboaWfEY6f8hEAAAAASUVORK5CYII=" width="15px">',title: 'Ordered List',result: function result() {return exec('insertOrderedList');}},
ulist: {icon: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEvSURBVGhD7dm/K0VxGMfxg8RMWQzkb7CzsIiRQQxKKSmLDMrsX7AalL/DxmZTFiYKUQbKr/dzL3V6+g5O6dv3OX3e9eqeW7dTT5177+k5lVJKqVIbxAT6Ou+Cto83fOEO8wjXEmyAuheMw2cDH2awg8adwA9iNuC7QOqz/+0UjTtC6mRr8BU9yAw+UT/RPUbg28ZBBqmr4U+t4BrvOMMkQtf/86qUUipbPRjuHsZtC0+wf/UrTCNcC6jfnphnjMJX9C3KMfwgZh2+om8aWzNI6tKy70u4S8vaxCNsiEtMIWz28zvUPVRKKZW38MuHVdzgA+cIuQ6ahV/QPSC1oLPt424Gy2hca1amrVliL8KfyB4rjMFX9GMFaw+vsCFuMYewDcAevfV23imllFK/VdU3IVxO0eKIC0kAAAAASUVORK5CYII=" width="15px">',title: 'Unordered List',result: function result() {return exec('insertUnorderedList');}},
code: {icon: '&lt;/&gt;',title: 'Code',result: function result() {return exec(formatBlock, '<pre>');}},
line: {icon: '&#8213;',title: 'Horizontal Line',result: function result() {return exec('insertHorizontalRule');}},
link: {icon: '&#128279;',title: 'Link',result: function result() {var url = window.prompt('Enter the link URL');if (url) exec('createLink', url);}},
unlink:{icon:'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASlSURBVGhD7ZnJj1VFFMZbkHEBkQgiYOKCsDCBxMgkYUFcgC5w5wBiQEHYMP0lJAwODEZWDDuiJv4LKBqXGMWAYRAChqiIE6LfL/h1Tir17qt7X7/bj+R9yS/dt27d6jo1nHOqemSooYYaaqhCzRXviKPiE/GxOCK2iNli4PWU+FD8Lf7twJ/iXTFHDKReED+JXOdzXBXLxUDpFfGXiB29IPaJnWKXOCB+ELHOb2KFGAhhRFxKvwj2wgSR6lGBUb8L178sxn3fvCyiETfEYtFNq8Ufwt8xW+MmOnxHuDPXxTOiVLuFv2VZPi5a1yPirHBHboo6RqBJ4opwG5tF62JJuQP/iLWiid4Xboc407pOCHfgDAUNtVe4HYJm67ol3IH1FDTUHuF2PqWgTU0T/uPwpIiaKhY8+LWrDgq3QzrTquaJaMhMYWHEZ+KieJqCCk0U1HM720Srmiz8x78X0wWyEX53SVTNzFbhusSi+aJ1fSswgiQRpUYAz1NETsSgX4XrfiT6Lkac5cRMWHibpkbQ1jfCdXEc6T4bExHsiBMnRfROwEzgaay6RkQREJ8VJSlNbS0Rn4vYsUgvy6k1EQ/iuk15KIxIU/H74rR4SXCSYxnQeVTHCMpo47D4UlwTnBD5yfMH4kUxJgOQGkECuEbkVGoE547tgg7Hup2gHnGE7xqJ4ykj5AarUvFSI1h+X4lYrxRmqTQrGBUfRK/EoahXI5aKH0Wsx74jydwonhcLxSrxhsAzxjMN8P1zoljHhD/+WXRyg6VGMDAMhuuwz94T3W5LuDoinae+v8WYopnh43vCH74lOokGY06UM4K1/bVwnbviVVFHrwm+cxssM/KxSrGx/MF3IndREEUCSO6UMwLtEG6PkaVT1mOCWc2Jct5br4s4M+RjlSJldmWubErEzOSMoCx6Jy7frFmCjc8ApMZ4yfKeehYu2W1x95X7m6PiEOPKXAL0IuKE22Jje08w0tF7RWNshN9RzzPzhIgOYJ3oKI6VrhhzpyYi2LktvJOVdhZ4nvH/z7Q8ztgp4Xc4go7ioO+KeJZexKZ0W7jUqJwxt5Pn1Aj0pvD7cxR0EjeBrsiVDClIU8W4sZKCRDljTM4IRLxxHfZJR3FFGe9q6+yT9CQXM4NFFGTEckpngmfKc6Id16P9Sh0Srsz1JdeY3UTQPP/g11H1Y0aI/K5TOSMI7xJv+rhY5oI5l7gRZ/DpeCX8fFyKrGG3sYmCoJwRY7pHLK70udqPDXP1zzUNRsF+ESM7cLKzot8nd7JyRvBc4rU4QvhdsTNaJpi+2HAVpPmcJC3OE36H/ycOoKZxhPN7jCO1rmPZ/OyZuHFTcA7HRXpRQOSNAxFHsElkj1kH/zuJlx7F4mof10yQI2iSAdAwuVlVNhpzN/YQOZPFSKdGWJR7JtAGEXOtt0WrwkHEwEgWGxPHEmFEzH65BOma/fZDzFh0xYws6UW3Oyvek2nEmSAJLTqP9Euc7KIxwMbFC+GaiQ8+IeJiKU9PiBhR64TYLzGScZnV4QsxrjORij1DAC29RSEws7G7HfDGTbhOzhPsFUYbN42L5yfPuGreV7jYkZH/AKFhQlKp3jgAAAAAAElFTkSuQmCC" width="15px">',title:"Unlink",result:function(){return exec('unlink')}},
image: {icon: '&#128247;',title: 'Image',result: function result() {var url = window.prompt('Enter the image URL');if (url) exec('insertImage', url);}}
,justifyLeft:{icon:'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACOSURBVGhD7dixDYQwEERRJxRwIR1QBPElxPREKRRDREMwrsBOWFbDf9LPvRIWKxcAAGBuUL/k1TM2LepKXj1jE4ME1jWIzR1BNrM6AtvVI6Iv+6keYTPIqNbA/gqfMKktefWMTTYris0gNp8WsrH5IdqsKDaD2KzxyIYHusC6VhQGCaxrEB7oAADAq0q5AYd4KPsuwNLDAAAAAElFTkSuQmCC" width="15px">',title:"Align Left",result:function(){return exec('justifyLeft')}},
justifyRight:{icon:'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVGhD7dixCYAwEEbhNA5g6QYOYW1j7U6O4jBWLqSXXsgh5Iw/74PX58DDkAQAAMR1Vt94+YxFi3U1Xj5jEYME5hpEZkegYLeOwCaritN6WspauZb9DZlBZmsNbLDwO6O1NV4+Y5HMFUVmEJlPCwpkfojctV5WbRCZazxq4oEuMNeyM0hgrkF4oAMAAJ9K6QZQyij7CV5mPwAAAABJRU5ErkJggg==" width="15px">',title:"Align Right",result:function(){return exec('justifyRight')}},
justifyCenter:{icon:'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACUSURBVGhD7dfBDYAgDEBRLt5MjFu4i2d3cjh30vZOAolQS/0v+WdpIogJAAAEN0mr83SNRbt0O0/XWMQghlUNEmaPYBSzdBmnz2xukXIbr2f6zObCDKInxWEcp1Mom3Q6T9dYxF3LsKpBwrxaGEWYDyJ3rRd1GSTMNR5f0ZMi98PvqarTjLuWYf8aJMweAQAAY0rpAWwhKPvu8FH3AAAAAElFTkSuQmCC" width="15px">',title:"Align Center",result:function(){return exec('justifyCenter')}},
justifyFull:{icon:'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACESURBVGhD7dixDYBACEbhaxzA0g0cwg2s3cnh3ElhAqjwF9+XvB4SPc0NAADQ3GTN4vmMod26xfMZQyxSWGqRNu8I1GzWJZ7PGOLUKiy1yGId4vmM+JzVOsXzGUOcWoWlFmnzaEFNmw8ip1ZhqUXa/MZDDRd0hf3r1GqzCBd0AADgVWM8Tb120zvb4ToAAAAASUVORK5CYII=" width="15px">',title:"Align Justify",result:function(){return exec('justifyFull')}}
};

var defaultClasses = {
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  content: 'pell-content',
  selected: 'pell-button-selected'
};

var init = function init(settings) {
  var actions = settings.actions ? settings.actions.map(function (action) {
    if (typeof action === 'string') return defaultActions[action];else if (defaultActions[action.name]) return _extends({}, defaultActions[action.name], action);
    return action;
  }) : Object.keys(defaultActions).map(function (action) {
    return defaultActions[action];
  });

  var classes = _extends({}, defaultClasses, settings.classes);

  var defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'div';

  var actionbar = createElement('div');
  actionbar.className = classes.actionbar;
  appendChild(settings.element, actionbar);

  var content = settings.element.content = createElement('div');
  content.contentEditable = true;
  content.className = classes.content;
  content.oninput = function (_ref) {
    var firstChild = _ref.target.firstChild;

    if (firstChild && firstChild.nodeType === 3) exec(formatBlock, '<' + defaultParagraphSeparator + '>');else if (content.innerHTML === '<br>') content.innerHTML = '';
    settings.onChange(content.innerHTML);
  };
  content.onkeydown = function (event) {
    if (event.key === 'Tab') {
      event.preventDefault();
    } else if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
      setTimeout(function () {
        return exec(formatBlock, '<' + defaultParagraphSeparator + '>');
      }, 0);
    }
  };
  appendChild(settings.element, content);

  actions.forEach(function (action) {
    var button = createElement('button');
    button.className = classes.button;
    button.innerHTML = action.icon;
    button.title = action.title;
    button.setAttribute('type', 'button');
    button.onclick = function () {
      return action.result() && content.focus();
    };

    if (action.state) {
      var handler = function handler() {
        return button.classList[action.state() ? 'add' : 'remove'](classes.selected);
      };
      addEventListener(content, 'keyup', handler);
      addEventListener(content, 'mouseup', handler);
      addEventListener(button, 'click', handler);
    }

    appendChild(actionbar, button);
  });

  if (settings.styleWithCSS) exec('styleWithCSS');
  exec(defaultParagraphSeparatorString, defaultParagraphSeparator);

  return settings.element;
};

var pell = { exec: exec, init: init };

exports.exec = exec;
exports.init = init;
exports['default'] = pell;

Object.defineProperty(exports, '__esModule', { value: true });

})));
