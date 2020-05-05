window.onload = function () {
  init();
}

function init() {
  initCourseList();
}

var initCourseList = (function () {

  var oBtinGroup = document.getElementsByClassName('btn-group')[0],
    oBtnItems = document.getElementsByClassName('btn-item'),
    oList = document.getElementsByClassName('J-list')[0],
    oTpl = document.getElementById('J_itemTpl').innerHTML,
    oLoading = document.getElementsByClassName('loading')[0],
    page = 0,
    cache = {};

  function init() {
    bindEvent();
    getAjaxCourses();
  }

  function bindEvent() {
    oBtinGroup.addEventListener('click', btnClick, false);
  }

  function btnClick(e) {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      oParent = tar.parentNode;

    if (oParent.className === 'btn-item') {
      page = Array.prototype.indexOf.call(oBtnItems, oParent);

      // console.log(cache[page])
      cache[page] ? getCacheList() : getAjaxCourses();

      var len = oBtnItems.length,
        item;

      for (var i = 0; i < len; i++) {
        item = oBtnItems[i];
        item.className = 'btn-item';
      }

      oParent.className += ' cur';
    }

  }

  function getCacheList() {
    return cache[page];
  }

  function clearCache(pageIndex) {
    var ival = setInterval(function() {
      delete cache[pageIndex];
      clearInterval(ival);
    }, 4000);
  }

  function getAjaxCourses() {
    oLoading.style.display = 'block';
    ajaxReturn({
      url: APIs.getCourses,
      data: {
        page: page
      },
      success: function (data) {
        setTimeout(function () {
          cache[page] = data;
          render(data);
          oLoading.style.display = 'none';
          clearCache(page);
        }, 1000);
      },
      error: function (data) {
        alert(data);
        oLoading.style.display = 'none';
      }
    })
  }

  function render(data) {
    oList.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      oList.innerHTML += setTplToHtml(oTpl, data[i]);
    }
  }

  return function () {
    init();
  }
})();

var APIs = {
  getCourses: 'http://study.jsplusplus.com/Lfcourses/getCourses'
};