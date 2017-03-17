(function() {
  function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
  }

  window.onload = function() {
      var _wHeight = window.innerHeight,
        sS_active = false,
        ts_active = true;

      var _fSection = document.getElementById("first-section"),
        _fSectionHeight = _fSection.clientHeight,
        _sSection = document.getElementById("second-section"),
        _sSectionFixedImagePosition = getCoords(_sSection.children[0]).top,
        _sSectionHeight = _sSection.clientHeight,
        _sSectionOffsetTop = getCoords(_sSection).top,
        _tSection = document.getElementById("third-section"),
        _tSectionOffsetTop = getCoords(_tSection).top,
        _fis = document.getElementsByClassName("fade-in-scroll");


      _sSection.children[0].style.top = Math.abs((_sSectionFixedImagePosition - document.body.scrollTop)) + "px";

      if (document.body.scrollTop >= _sSectionFixedImagePosition) {
        sS_active = false;
      }

      window.onscroll = function() {
        for (var i = 0; i < _fis.length; i++) {
          if (this.scrollY >= (getCoords(_fis[i]).top) * 0.3 && !_fis[i].classList.contains("anim-finished"))  {
            _fis[i].classList.add("anim-finished");

            TweenMax.to(_fis[i], 0.8, {
              y: 0,
              opacity: 1
            })
          }
        }

        if (!sS_active) {
          if (this.scrollY <= _fSectionHeight) {
            if (this.scrollY >= 25) {
              TweenMax.to(_fSection.children[0], 0.3, { y: "-100px"});
            } else {
              TweenMax.to(_fSection.children[0], 0.25, { y: "0px"});
            }

            _fSection.children[1].style.opacity = (_fSectionHeight - this.scrollY) / (_fSectionHeight);
            _fSection.children[1].style.marginTop =  this.scrollY / 4 + "px";
          } else if (this.scrollY >= _sSectionOffsetTop) {
          }

          if (this.scrollY >= _sSectionFixedImagePosition) {
            _sSection.children[0].style.top = Math.abs((_sSectionFixedImagePosition - this.scrollY)) + "px";
          } else {
            _sSection.children[0].style.top = 0;
          }
        }

        if (this.scrollY >= (_tSectionOffsetTop - _wHeight)) {
          sS_active = true;
        } else {
          sS_active = false;
        }
      }

      for (var i = 0, e = _fSection.children[2].children; i < e.length; i++) {
        e[i].onmouseenter = function() {
          var duration = 1;
          TweenMax.to(this, duration / 4, {y:-40, ease:Power2.easeOut});
          TweenMax.to(this, duration / 2, {y:0, ease:Bounce.easeOut, delay:duration / 4});
        }
      }


      if (document.body.scrollTop >= (_tSectionOffsetTop - _wHeight)) {
        sS_active = true;
      } else {
        sS_active = false;
      }
  }




})();
