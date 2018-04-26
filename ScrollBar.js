'use strict';

!function (options) {
  var count = 0;
  function preventDefault(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
  function ScrollBar(options) {
    count++;
    this.content = document.querySelector(options.el);

    this.getDom();

    this.contentHeight = this.content.scrollHeight;
    this.containerHeight = this.container.clientHeight;
    this.oldY; //初始鼠标拖动位置，只点击无拖动无效
    this.oldTranslateY = 0; //mousemove前的滚动条位置
    this.newTranslateY; //mousemove后的滚动条位置
    this.dist; //鼠标拖动距离
    this.thumbHeight = this.target.clientHeight; //滚动条高度
    this.moveDist = options.moveDist; //一次滑轮滑动距离
    this.availableDist = this.containerHeight - this.thumbHeight; //滚动条可拉动距离

    this.hasScroll = false; //判断是否滑动过

    this.init();
  }
  ScrollBar.prototype.init = function () {
    this.scroll();
    this.wheel();
  };
  ScrollBar.prototype.getDom = function () {
    this.container = document.querySelectorAll('.scrollbar-container')[count - 1];
    this.target = document.querySelectorAll('.scroll-thumb')[count - 1];
    this.target.classList.add('thum' + count);
  };

  ScrollBar.prototype.scroll = function () {
    var _this = this;

    var callback = this.moveCallback.bind(this);
    var event = void 0;
    this.target.addEventListener('mousedown', function (e) {
      console.log('down');
      event = window.event || e;
      preventDefault(event);
      _this.target.classList.remove('scroll-scroll-ani');
      _this.content.classList.remove('scroll-scroll-ani');
      window.addEventListener('mousemove', callback);
    });
    window.addEventListener('mouseup', function () {
      console.log('up');
      window.removeEventListener('mousemove', callback);
      if (!_this.hasScroll) {
        return;
      }
      _this.oldY = undefined;

      _this.oldTranslateY = _this.newTranslateY;
    });
  };

  ScrollBar.prototype.wheel = function () {
    var _this2 = this;

    var event = void 0;
    this.container.addEventListener('mousewheel', function (e) {
      event = window.event || e;

      _this2.target.classList.add('scroll-scroll-ani');
      _this2.content.classList.add('scroll-scroll-ani');

      _this2.newTranslateY = event.wheelDelta < 0 ? _this2.oldTranslateY + _this2.moveDist : _this2.oldTranslateY - _this2.moveDist;

      if (_this2.newTranslateY >= _this2.availableDist) {
        if (_this2.newTranslateY >= _this2.containerHeight) {
          return;
        }
        _this2.newTranslateY = _this2.availableDist;
      } else if (_this2.newTranslateY <= 0) {
        if (_this2.newTranslateY <= -_this2.moveDist) {
          return;
        }
        _this2.newTranslateY = 0;
      }

      preventDefault(event);
      _this2.oldTranslateY = _this2.newTranslateY;
      _this2.move();
    });
    this.container.addEventListener('DOMMouseScroll', function (e) {
      event = window.event || e;

      _this2.target.classList.add('scroll-scroll-ani');
      _this2.content.classList.add('scroll-scroll-ani');

      _this2.newTranslateY = event.detail < 0 ? _this2.oldTranslateY - _this2.moveDist : _this2.oldTranslateY + _this2.moveDist;

      if (_this2.newTranslateY >= _this2.availableDist) {
        if (_this2.newTranslateY >= _this2.containerHeight) {
          return;
        }
        _this2.newTranslateY = _this2.availableDist;
      } else if (_this2.newTranslateY <= 0) {
        if (_this2.newTranslateY <= -_this2.moveDist) {
          return;
        }
        _this2.newTranslateY = 0;
      }

      preventDefault(event);
      _this2.oldTranslateY = _this2.newTranslateY;
      _this2.move();
    });
  };

  ScrollBar.prototype.moveCallback = function (e) {
    var _this3 = this;

    requestAnimationFrame(function () {
      _this3.handler(e);
    });
  };
  ScrollBar.prototype.handler = function (event) {

    if (!this.oldY) {
      this.hasScroll = true;
      this.oldY = event.screenY;
      return;
    }

    this.dist = event.screenY - this.oldY;
    if (this.oldTranslateY + this.dist >= this.availableDist) {
      this.newTranslateY = this.availableDist;
      this.move();
      return;
    }
    if (this.oldTranslateY + this.dist <= 0) {
      this.newTranslateY = 0;
      this.move();
      return;
    }
    this.newTranslateY = this.oldTranslateY + this.dist;

    this.move();
  };
  ScrollBar.prototype.move = function () {
    this.target.style.transform = 'translateY(' + this.newTranslateY + 'px)';
    this.content.style.transform = 'translateY(' + -(this.contentHeight - this.containerHeight) * (this.newTranslateY / this.availableDist) + 'px';
  };

  window.ScrollBar = ScrollBar;
}();