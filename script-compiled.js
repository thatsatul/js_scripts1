function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Run below command to convert class to function
// babel --plugins @babel/plugin-transform-classes class_to_function.js --watch --out-file script-compiled.js --source-maps
let Test = /*#__PURE__*/function () {
  function Test(name) {
    _classCallCheck(this, Test);

    this.name = name;
    this.gender = 'M';
  }

  _createClass(Test, [{
    key: "logger",
    value: function logger() {
      console.log("Hello", this.name);
    }
  }]);

  return Test;
}();

//# sourceMappingURL=script-compiled.js.map