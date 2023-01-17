
var elFocus, headH, headHen; //포커스요소 저장하는 전역변수
var page = 0;

function resizeContentHeight() {
  var conH = $('#contents').outerHeight();
  var lnbH = $('.lnb').outerHeight();
  if (conH < lnbH) {
    $('#contents').outerHeight(lnbH);
  } else {
    $('#contents').removeAttr('style');
  }
}



$(function(){

  // gnb 마우스 hover 헤더 변경
  $('.top_bg').on('mouseover', function(){
    $(this).addClass('active');
  });

  $('.top_bg').on('mouseleave', function(){
    $(this).removeClass('active');
  });

  // gnb 메뉴 slide down
  $('.gnb ul').hover(function(){
    // $(this).css('color','#00205f')
    $(this).children().find('.dept01').stop().slideDown();
    $(this).parents().find('.sub-menu-bar-bg').stop().slideDown();
    $(this).children().find('.dept01').css('color','#fff');
  }, function(){
    // $(this).css('color','#666')
    $(this).children().find('.dept01').stop().slideUp();
    $(this).parents().find('.sub-menu-bar-bg').stop().slideUp();
    $(this).children().find('.dept01').css('color','#333');
  });

  // 참여소통 탭
  $('.pool .main_tit4 a').click(function(){
    var idx = $(this).index();
    $('.pool .main_tit4 a').removeClass("on");
    $('.pool .main_tit4 a').eq(idx).addClass("on");
    $('.pool > .division').hide();
    $('.pool > .division').eq(idx).show();
  });

  // 메인 슬라이드
  var slide2 = $('.banner .slide');

  slide2.on('init', function(event, slick, currentSlide) {
		$(".item").eq(1).addClass("active");
	});
	slide2.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$(".item").removeClass("active");
		$(this).find(".item").eq(nextSlide+1).addClass("active");

	});


  if(slide2.length > 0){
    var time = 3;  //자동재생 시간 설정
    var $bar, isPause, tick, percentTime;

    isPause = false;
    $bar = $('.progress');
    function startProgressbar() {
      resetProgressbar();
      percentTime = 0;

      tick = setInterval(interval, 10);
    }


    function interval() {
      if (isPause === false) {
        percentTime++;
        $bar.css({
          width: (percentTime / time) + "%"
        });
        if (percentTime >= 100 * time) {
          percentTime = 100 * time;
          slide2.slick('slickNext');
        }
      }
    }



    function resetProgressbar() {
      $bar.css({
        width: 0 + '%'
      });
      clearTimeout(tick);
    }
    startProgressbar();
    slide2.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $(' .slide_btn .pagination_num').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
      startProgressbar();
    });

    slide2.slick({
      autoplay: false,
      autoplaySpeed: 4000,
      cssEase: 'ease-in',
      infinite: true,
      dots: true,
      // fade:true,
      appendDots: $('.slide_btn .pagination_dot'),//dot 설정
      customPaging: function (slide, i) {
        return '<button type="button">' + '<span class="hide">슬라이드이동</span></button>'
      },
      prevArrow: $('.prev'),//arrow 설정
      nextArrow: $('.next'),//arrow 설정
    });



    $('.banner .control .pause').click(function () {
      if ($(this).hasClass('play')) {
        $(this).removeClass('play').children('span').text('자동재생 정지');
        slide2.slick('slickPlay');
        isPause = false;
      } else {
        $(this).addClass('play').children('span').text('자동재생 시작');
        slide2.slick('slickPause');
        isPause = true;
      }
    });
  }
});


$(function(){

	$('.lnb2>li.selected').parent('ul').slideDown()

$('.lnb>li>a').on('click',function(e){

	  let selected=$(this).parent('li').hasClass('selected');
	  if(selected){
	    $(this).parent('li').removeClass('selected')
	    $(this).siblings('ul').slideUp(
        )

	  }else{
	    $('.lnb>li>a').parent('li').removeClass('selected')
	    $('.lnb>li>a').siblings('ul').slideUp()
	    $(this).parent('li').addClass('selected')
	    $(this).siblings('ul').slideDown(function () {
            resizeContentHeight();
        })
	  }
	  e.preventDefault();
	})


	$('.lnb2>li>a').on('click',function(e){
	  let selected=$(this).parent('li').hasClass('selected');
	  if(selected){
	    $(this).parent('li').removeClass('selected')
	    $(this).siblings('ol').slideUp()
	  }else{
	    $('.lnb2>li>a').parent('li').removeClass('selected')
	    $('.lnb2>li>a').siblings('ol').slideUp()
	    $(this).parent('li').addClass('selected')
	    $(this).siblings('ol').slideDown()
	  }
	})

});



   $(window).on('load', function () {
    //lnb 컨텐츠 높이 통일
    resizeContentHeight();



  });

