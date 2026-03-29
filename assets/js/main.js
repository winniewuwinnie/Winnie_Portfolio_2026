$(function () {
  $(window).resize(window_resize);
  window_resize();
  setScrollPage();
  setNav();
  init();
  AOS.init();
});


let DW, DH;

function window_resize() {
  DW = window.innerWidth;
  DH = window.innerHeight;

  if (DW > 850) {
    $('.nav_area').css('right', 0);
  } else {
    if (!isNavOpen) {
      $('.nav_area').css('right', '-100%');
      isNavOpen = false;
      setMobileNavClose();
    }
  }
};

function setScrollPage() {

  let scrollVal = $(this).scrollTop();

  let checkScroll = () => {
    if (scrollVal > 80) {
      $('.fix_aside').addClass('is_active');
      $('.fix_aside_kvShow').addClass('is_active');
      if (DW >= 768) {
        $('nav').addClass('is_active');
      }
    } else {
      $('.fix_aside').removeClass('is_active');
      $('.fix_aside_kvShow').removeClass('is_active');
      if (DW >= 768) {
        $('nav').removeClass('is_active');
      }
    }
  };


  checkScroll();

  $(window).scroll(() => {
    scrollVal = $(this).scrollTop()
    checkScroll();
  })

  let $scrollTopNow = 0,
    $body = $("html, body");

  function bScroll(tarTop, aniDuration) {
    $body.animate({
      scrollTop: tarTop
    }, aniDuration);
  }

  $('.js_page_scroll').on('click', function (e) {
    // $('.js_page_scroll').removeClass('active');
    // $(this).addClass('active');
    $scrollTopNow = $('html, body').scrollTop();
    let $tar = $(this),
      $tarTop = $($tar.attr('href')).offset().top - (DW >= 768 ? 50 : 0),
      $aniDuration = Math.abs($tarTop - $scrollTopNow) * .6 > 1200 ? 1200 : (Math.abs(
        $tarTop - $scrollTopNow) * .6);
    bScroll($tarTop, $aniDuration);


    e.preventDefault();
    if ($(window).width() <= 768) {
      // $('.nav_area').collapse('hide');
      // console.log($tarTop, $aniDuration)
      $('.nav_area').css('right', '-100%');
      isNavOpen = false;
      setMobileNavClose();
    }
  });

}


function init() {

  // DIGITIMES 個資蒐集聲明

  $('.pr_box-tit').data('_isOpen', false);
  $('.pr_box-tit').on('click', function () {
    let _isOpen = $(this).data('_isOpen');
    console.log('_isOpen:', _isOpen);

    if (_isOpen) {
      $('.pr_box-tit').data('_isOpen', false);
      $('.pr_box-cnt').slideUp();
      $('.pr_box-tit .arr').css('transform', 'rotate(180deg)');

    } else {
      $('.pr_box-tit').data('_isOpen', true);
      $('.pr_box-cnt').slideDown();
      $('.pr_box-tit .arr').css('transform', 'rotate(0deg)');

    }
  });

  //


}

//----------------------------------------NAV

var isNavOpen = false;

function setNav() {
  $('.nav_mobile-btn').on('click', function () {
    if (!isNavOpen) {
      setMobileNavOpen();
    } else {
      setMobileNavClose();
    }
  });
}

function setMobileNavOpen() {
  isNavOpen = true;
  gsap.to('.nav_area', 0.6, {
    css: {
      'right': '0%'
    },
    ease: "power4.inOut"
  });

  gsap.to('.HBLine0', 0.3, {
    y: 7,
    rotation: -135,
    ease: "power2.inOut"
  });
  gsap.to('.HBLine1', 0.3, {
    scaleX: 0,
    ease: "power2.inOut"
  });
  gsap.to('.HBLine2', 0.3, {
    y: -7,
    rotation: 135,
    ease: "power2.inOut"
  });
}

function setMobileNavClose() {
  isNavOpen = false;
  gsap.to('.nav_area', 0.6, {
    css: {
      'right': '-100%'
    },
    ease: "power4.inOut"
  });

  gsap.to('.HBLine0', 0.3, {
    y: 0,
    rotation: 0,
    ease: "power2.inOut"
  });
  gsap.to('.HBLine1', 0.3, {
    scaleX: 1,
    ease: "power2.inOut"
  });
  gsap.to('.HBLine2', 0.3, {
    y: 0,
    rotation: 0,
    ease: "power2.inOut"
  });
}


// -----------------------------------------------------------DateFormat

function DateFormat() {
  return new DateFormat.prototype.init();
}
DateFormat.fn = DateFormat.prototype = {
  _default: {
    formatFn: function (date, pattern) {
      date = date || 0;
      pattern = pattern.length;
      return pattern === 1 ? date : (Math.pow(10, pattern) + date + '').slice(-pattern);
    },
    formatMap: {
      Y: function (d, f) {
        return DateFormat.fn._default.formatFn(d.getFullYear(), f);
      },
      M: function (d, f) {
        return DateFormat.fn._default.formatFn(d.getMonth() + 1, f);
      },
      D: function (d, f) {
        return DateFormat.fn._default.formatFn(d.getDate(), f);
      },
      h: function (d, f) {
        return DateFormat.fn._default.formatFn(d.getHours(), f);
      },
      m: function (d, f) {
        return DateFormat.fn._default.formatFn(d.getMinutes(), f);
      },
      s: function (d, f) {
        return DateFormat.fn._default.formatFn(d.getSeconds(), f);
      },
      w: function (d, f) {
        return d.getDay();
      }
    },
  },
  // 初始化
  init: function () {
    return this;
  },
  // 配置
  config: function (config) {
    for (var name in config) {
      this._default[name] = config[name];
    }
    return this;
  },
  // 格式化
  format: function (date, pattern) {

    date = new Date(date);

    if (/Invalid/i.test(date + '')) {
      console.error('请提供一个合法日期！');
      return;
    }

    var _self = this,
      char = '';

    return pattern.replace(/([YMDhsmw])\1*/g,
      function (format) {
        char = format.charAt();
        return _self._default.formatMap[char] ? _self._default.formatMap[char](date, format) : '';
      });
  }
};

DateFormat.fn.init.prototype = DateFormat.fn;


// ========================
// class slick
// ========================
$(document).on('ready', function () {
  $(".slick_L").slick({
    speed: 2000,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          vertical: false,
          verticalSwiping: false
        }
      }
    ]
  });

  // AOS 初始化
  AOS.init({});
});

$(document).on('ready', function () {
  $(".slick_R").slick({
    speed: 2000,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          vertical: false,
          verticalSwiping: false
        }
      }
    ]
  });

  // AOS 初始化
  AOS.init({});
});

// clients slick START
$(document).on('ready', function () {
  $(".clients_slick").slick({
    speed: 1000,
    dots: false,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    swipeToSlide:false,
    touchMove:false,

    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      }
    ]
  });

  AOS.init({});
});
// clients slick END


// projects page
// 選取元素
const projects = document.querySelectorAll(".sc_list_projects .item");
const breadcrumbType = document.querySelector(".breadcrumb-type");
const breadcrumbCategory = document.querySelector(".breadcrumb-category");
const dropdownItems = document.querySelectorAll(".dropdown-item");

let currentType = "website";
let currentCategory = "event";

// Dropdown 篩選
dropdownItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    // 判斷是 Website 還是 EDM 的 dropdown
    const type = item.closest(".dropdown_website") ? "website" : "edm";
    const category = item.textContent.toLowerCase();

    currentType = type;
    currentCategory = category;

    updateBreadcrumb();
    filterProjects();
    updateDropdownButtons(type, category);
  });
});

// 更新 breadcrumb
function updateBreadcrumb() {
  breadcrumbType.textContent = capitalize(currentType);
  breadcrumbCategory.textContent = capitalize(currentCategory);
}

// 篩選項目
function filterProjects() {
  projects.forEach(project => {
    const type = project.dataset.type;
    const category = project.dataset.category;

    if(type === currentType && category === currentCategory){
      project.style.display = "block";
      // 觀察 lazy image
      const img = project.querySelector("img.lazy");
      if(img) observer.observe(img);
    } else {
      project.style.display = "none";
    }
  });
}

// 更新 dropdown 按鈕文字
function updateDropdownButtons(type, category) {
  document.querySelectorAll(".dropdown_bttn").forEach(btn => btn.classList.remove("active"));
  if(type === "website") {
    document.getElementById("dropdownWebsite").classList.add("active");
    document.getElementById("dropdownWebsite").textContent = capitalize(type);
  } else {
    document.getElementById("dropdownEDM").classList.add("active");
    document.getElementById("dropdownEDM").textContent = capitalize(type);
  }
}

// 首字母大寫
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Lazy loading 使用 IntersectionObserver
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      obs.unobserve(img);
    }
  });
}, {
  rootMargin: '0px 0px 200px 0px'
});

// 初始顯示
updateBreadcrumb();
filterProjects();