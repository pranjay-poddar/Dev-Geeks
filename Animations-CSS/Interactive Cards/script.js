var $cont = document.querySelector('.cont');
var $arrsArr = [].slice.call(document.querySelectorAll('.arr'));
var $closeBtnsArr = [].slice.call(document.querySelectorAll('.arr__close-btn'));

setTimeout(function() {
  $cont.classList.remove('s--inactive');
}, 200);

$arrsArr.forEach(function($arr) {
  $arr.addEventListener('click', function() {
    if (this.classList.contains('s--active')) return;
    $cont.classList.add('s--arr-active');
    this.classList.add('s--active');
  });
});

$closeBtnsArr.forEach(function($btn) {
  $btn.addEventListener('click', function(e) {
    e.stopPropagation();
    $cont.classList.remove('s--arr-active');
    document.querySelector('.arr.s--active').classList.remove('s--active');
  });
});

