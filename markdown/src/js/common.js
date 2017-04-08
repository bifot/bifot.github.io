var body = document.querySelector('body');
var editorTextarea = document.querySelector('.editor__textarea');
var editorStatus = document.querySelector('.editor__status');
var editorCopy = document.querySelector('.editor__copy');
var show = document.querySelector('.show');

function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

document.addEventListener('scroll', function() {
  if (window.innerWidth > 768) {
    if (window.pageYOffset > (editorTextarea.clientHeight + 100)) {
      Object.assign(show.style, {
        margin: '0 auto',
        width: '70%'
      });
    } else {
      Object.assign(show.style, {
        width: '60%',
        margin: '0 0 30px 40.5%'
      });
    }
  }
});

editorCopy.addEventListener('click', function(event) {
  editorTextarea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    var color = successful ? 'green': 'red';

    Object.assign(editorStatus.style, {
      fontWeight: 600,
      color: color
    });

    fadeIn(editorStatus, 'block');
    
    editorStatus.innerHTML = 'Copying text was ' + msg;
  } catch (err) {
    Object.assign(editorStatus.style, {
      display: 'block',
      color: 'red'
    });
    
    editorStatus.innerHTML = 'Oops, unable to copy';
  }
});