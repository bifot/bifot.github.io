var anchorInput = document.querySelector('.anchor__input');
var anchorTextarea = document.querySelector('.anchor__textarea');
var anchorResult = document.querySelector('.anchor__result');

var generateAnchors = function() {
  while (anchorResult.firstChild) {
    anchorResult.removeChild(anchorResult.firstChild);
  }

  var titles = anchorTextarea.value.split('\n');
  var repository = anchorInput.value[anchorInput.value.length - 1] == '/'
    ? anchorInput.value.substr(0, anchorInput.value.length - 1).split('#')[0]
    : anchorInput.value.split('#')[0];

  if (!repository.match(/^(?:(ht|f)tp(s?)\:\/\/)?/g)[0].length) {
    repository = 'http://' + repository;
  }

  titles.forEach(function(title) {
    var titleFormated = title.trim().toLowerCase().replace(/[^\w\- ]+/g, '').replace(/\s/g, '-').replace(/\-+$/, '');

    if (titleFormated) {
      var anchorUrl = repository + '#' + titleFormated;
      var anchorParagraph = document.createElement('p');
      var anchorLink = document.createElement('a');

      anchorLink.href = anchorUrl;
      anchorLink.textContent = anchorUrl;
      anchorParagraph.appendChild(anchorLink);
      anchorResult.style.opacity = 1;
      anchorResult.appendChild(anchorParagraph);
    } else {
      anchorResult.style.opacity = 0;
    }
  });
};

anchorInput.onkeyup = generateAnchors;
anchorTextarea.onkeyup = generateAnchors;
