/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/main.js":
/*!************************!*\
  !*** ./public/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_createLogin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/createLogin.js */ \"./public/modules/createLogin.js\");\n/* harmony import */ var _modules_createMainPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/createMainPage.js */ \"./public/modules/createMainPage.js\");\n/* harmony import */ var _modules_createMainPage_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_createMainPage_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _modules_createRegistration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/createRegistration.js */ \"./public/modules/createRegistration.js\");\n/* harmony import */ var _modules_createSettings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/createSettings.js */ \"./public/modules/createSettings.js\");\n/* harmony import */ var _modules_createProfile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/createProfile.js */ \"./public/modules/createProfile.js\");\n\n\n\n\n\n\n\nconst app = document.getElementById(\"application\");\n\napp.addEventListener('click', function (evt) {\n  const {target} = evt;\n  if (target instanceof HTMLAnchorElement) {\n    evt.preventDefault();\n    routes[target.dataset.section](app);\n  }\n});\n\nconst routes = {\n  main: Object(_modules_createMainPage_js__WEBPACK_IMPORTED_MODULE_1__[\"createMainPage\"])(app),\n  login: _modules_createLogin_js__WEBPACK_IMPORTED_MODULE_0__[\"createLogin\"],\n  registration: _modules_createRegistration_js__WEBPACK_IMPORTED_MODULE_2__[\"createRegistration\"],\n  settings: _modules_createSettings_js__WEBPACK_IMPORTED_MODULE_3__[\"createSettings\"],\n  about: _modules_createProfile_js__WEBPACK_IMPORTED_MODULE_4__[\"createProfile\"],\n};\n\nObject(_modules_createMainPage_js__WEBPACK_IMPORTED_MODULE_1__[\"createMainPage\"])(app);\n\n\n\n//# sourceURL=webpack:///./public/main.js?");

/***/ }),

/***/ "./public/modules/createBackButton.js":
/*!********************************************!*\
  !*** ./public/modules/createBackButton.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createBackButton; });\n/* harmony import */ var _createLinks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createLinks.js */ \"./public/modules/createLinks.js\");\n\n\nconst backButton = {\n        name: 'Назад',\n        link: \"main\",\n        cl: 'back_link',\n    };\n\nfunction createBackButton() {\n    const button = Object(_createLinks_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(backButton);\n    return button;\n}\n\n//# sourceURL=webpack:///./public/modules/createBackButton.js?");

/***/ }),

/***/ "./public/modules/createForm.js":
/*!**************************************!*\
  !*** ./public/modules/createForm.js ***!
  \**************************************/
/*! exports provided: createDefaultForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createDefaultForm\", function() { return createDefaultForm; });\nfunction createInput (item = {\n    title: 'Не определено',\n    name: undefined,\n    placeholder: undefined,\n    type: undefined,\n}) {\n    const input = document.createElement('input');\n    input.type = item.type;\n    input.name = item.name;\n    input.placeholder = item.placeholder;\n\n    return input;\n}\n\nfunction createTitle(title) {\n    const div =  document.createElement('div');\n    const span = document.createElement('span');\n    span.innerText = title;\n    div.appendChild(span);\n    return div;\n}\n\n\n\nfunction createFormButton(type, value) {\n    const button = document.createElement('input');\n    button.type = type;\n    button.value = value;\n\n    return button;\n}\n\nfunction createDefaultForm (formItems = {\n    by_default: {\n        placeholder: undefined,\n        name: undefined,\n        type: undefined}\n}, buttonName = 'Подтвердите') {\n    const form = document.createElement('form');\n    Object.values(formItems).forEach( (item) => {\n        const title = createTitle(item.title );\n        form.appendChild(title);\n        const input = createInput(item);\n        form.appendChild(input);\n    });\n    const submit = createFormButton('submit', buttonName);\n    form.appendChild(submit);\n    form.action = '#';\n    return form;\n}\n\n\n\n\n//# sourceURL=webpack:///./public/modules/createForm.js?");

/***/ }),

/***/ "./public/modules/createLinks.js":
/*!***************************************!*\
  !*** ./public/modules/createLinks.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createLinks; });\nfunction createLinks(data = {\n  by_default: {\n    name: 'undefined',\n    link: 'undefined',\n    cl: 'main_link'\n\n  } }) {\n  const pageItem = document.createElement('a');\n  pageItem.textContent = data.name;\n  pageItem.href = `/${data.link}`;\n  pageItem.dataset.section = data.link;\n  pageItem.classList.add(data.cl);\n\n  return pageItem;\n}\n\n//# sourceURL=webpack:///./public/modules/createLinks.js?");

/***/ }),

/***/ "./public/modules/createLogin.js":
/*!***************************************!*\
  !*** ./public/modules/createLogin.js ***!
  \***************************************/
/*! exports provided: createLogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createLogin\", function() { return createLogin; });\n/* harmony import */ var _createForm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createForm.js */ \"./public/modules/createForm.js\");\n/* harmony import */ var _createBackButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createBackButton.js */ \"./public/modules/createBackButton.js\");\n\n\n\nconst loginItems = {\n    email: {\n        title: 'Логин',\n        name: 'email',\n        placeholder: 'ivan.ivanov@mail.ru',\n        type: 'email',\n    },\n    password: {\n        title: 'Пароль',\n        name: 'password',\n        placeholder: '',\n        type: 'password'\n    }\n};\n\n function createLogin(parent = document.body) {\n    parent.innerHTML = '';\n    const form = Object(_createForm_js__WEBPACK_IMPORTED_MODULE_0__[\"createDefaultForm\"])(loginItems, 'Войти');\n    parent.appendChild(form);\n    const backButton = Object(_createBackButton_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    parent.appendChild(backButton);\n}\n\n\n//# sourceURL=webpack:///./public/modules/createLogin.js?");

/***/ }),

/***/ "./public/modules/createMainPage.js":
/*!******************************************!*\
  !*** ./public/modules/createMainPage.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (31:8)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| \\n| class MainPage {\\n>   _data = dataForMainPage;\\n| \\n|   get data() {\");\n\n//# sourceURL=webpack:///./public/modules/createMainPage.js?");

/***/ }),

/***/ "./public/modules/createPost.js":
/*!**************************************!*\
  !*** ./public/modules/createPost.js ***!
  \**************************************/
/*! exports provided: createPosts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createPosts\", function() { return createPosts; });\nfunction createPosts( parent = document.body,\n  data =[ {\n  name: 'Default post name',\n  textData: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',\n  imageData: 'https://picsum.photos/200/300?grayscale',\n}]) {\n  let posts = new Post();\n  posts.data = data;\n  parent.innerHTML = posts.render();\n}\n\nclass Post {\n  get data() {\n    return this._data;\n  }\n\n  set data(d) {\n    this._data = d;\n  }\n\n  _renderTmpl() {\n    return window.fest['components/postsGenerate/postsGenerate.tmpl'](this._data)\n  }\n\n  render() {\n    return this._renderTmpl()\n  }\n}\n\n//# sourceURL=webpack:///./public/modules/createPost.js?");

/***/ }),

/***/ "./public/modules/createProfile.js":
/*!*****************************************!*\
  !*** ./public/modules/createProfile.js ***!
  \*****************************************/
/*! exports provided: createProfile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createProfile\", function() { return createProfile; });\n/* harmony import */ var _createPost_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createPost.js */ \"./public/modules/createPost.js\");\n\n\nfunction createProfile(parent, user = {\n  name: 'UserName',\n  dateOfB: '00',\n  monthOfB: '00',\n  yearOfB: '0000',\n  avatar: 'https://picsum.photos/200/300'\n}, posts =[ {\n  name: 'Default post name',\n  textData: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',\n  imageData: 'https://picsum.photos/200/300?grayscale',\n}]) {\n  parent.innerHTML = '';\n  let profile = new Profile();\n  profile.data =  {\n    user: user,\n    posts: posts\n  };\n  console.log(profile.data);\n  parent.innerHTML = profile.render();\n\n}\n\nclass Profile {\n\n  get data() {\n    return this._user;\n  }\n\n  set data(d) {\n    this._user = d;\n  }\n\n  _renderTmpl() {\n    return window.fest['components/pofile/pofile.tmpl'](this._data)\n  }\n\n  render() {\n    return this._renderTmpl()\n  }\n}\n\n//# sourceURL=webpack:///./public/modules/createProfile.js?");

/***/ }),

/***/ "./public/modules/createRegistration.js":
/*!**********************************************!*\
  !*** ./public/modules/createRegistration.js ***!
  \**********************************************/
/*! exports provided: createRegistration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createRegistration\", function() { return createRegistration; });\n/* harmony import */ var _createForm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createForm.js */ \"./public/modules/createForm.js\");\n/* harmony import */ var _createBackButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createBackButton.js */ \"./public/modules/createBackButton.js\");\n\n\n\nconst regItems = {\n    username: {\n        title: 'Ваше имя',\n        name: 'username',\n        placeholder: 'Иван Иванов',\n        type: 'text',\n    },\n    email: {\n        title: 'Email',\n        name: 'email',\n        placeholder: 'ivan.ivanov@mail.ru',\n        type: 'email',\n    },\n    phone: {\n        title: 'Телефон',\n        name: 'phone',\n        placeholder: '+7 910 777 77 77',\n        type: 'text'\n    },\n    date: {\n        title: 'Дата рождения',\n        name: 'date',\n        type: 'date',\n    },\n    password: {\n        title: 'Пароль',\n        name: 'password',\n        placeholder: '',\n        type: 'password'\n    },\n    passwordRepeat: {\n        title: 'Повторите пароль',\n        name: 'password-repeat',\n        placeholder: '',\n        type: 'password'\n    }\n}\n\n\n\nfunction createRegistration(parent = document.body) {\n    parent.innerHTML = '';\n    const form = Object(_createForm_js__WEBPACK_IMPORTED_MODULE_0__[\"createDefaultForm\"])(regItems, 'Регистрация');\n    parent.appendChild(form);\n    const backButton = Object(_createBackButton_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    parent.appendChild(backButton);\n}\n\n//# sourceURL=webpack:///./public/modules/createRegistration.js?");

/***/ }),

/***/ "./public/modules/createSettings.js":
/*!******************************************!*\
  !*** ./public/modules/createSettings.js ***!
  \******************************************/
/*! exports provided: createSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createSettings\", function() { return createSettings; });\n/* harmony import */ var _createForm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createForm.js */ \"./public/modules/createForm.js\");\n/* harmony import */ var _createBackButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createBackButton.js */ \"./public/modules/createBackButton.js\");\n\n\n\nconst settingsItems = {\n    avatar: {\n        title: 'Загрузите/обновите аватар',\n        name: 'avatar',\n        type: 'file',\n    },\n    username: {\n        title: 'Ваше имя',\n        name: 'username',\n        placeholder: 'Иван Иванов',\n        type: 'text',\n    },\n    date: {\n        title: 'Дата рождения',\n        name: 'date',\n        type: 'date',\n    },\n    email: {\n        title: 'Email',\n        name: 'email',\n        placeholder: 'ivan.ivanov@mail.ru',\n        type: 'email',\n    },\n    phone: {\n        title: 'Телефон',\n        name: 'phone',\n        placeholder: '+7 910 777 77 77',\n        type: 'text'\n    },\n    password: {\n        title: 'Пароль',\n        name: 'password',\n        placeholder: '',\n        type: 'password'\n    },\n}\n\n\n\nfunction createSettings(parent = document.body) {\n    parent.innerHTML = '';\n    const form = Object(_createForm_js__WEBPACK_IMPORTED_MODULE_0__[\"createDefaultForm\"])(settingsItems, 'Сохранить');\n    parent.appendChild(form);\n    const backButton = Object(_createBackButton_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    parent.appendChild(backButton);\n}\n\n//# sourceURL=webpack:///./public/modules/createSettings.js?");

/***/ })

/******/ });