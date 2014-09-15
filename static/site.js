(function () {

  var header = document.getElementById('header'),
      article = document.getElementById('article'),
      sections = article.getElementsByTagName('section'),
      sectionsLength = sections.length,
      footer = document.getElementById('footer'),
      links = footer.getElementsByTagName('a'),
      linksLength = links.length;

  var wasFlexing;
  var isFlexing = function(changed) {
    var flexing = window.matchMedia(
      'only screen and (min-width: 500px) and (min-height: 600px)'
    ).matches;
    if (flexing != wasFlexing) {
      wasFlexing = flexing;
      changed && changed(null, flexing);
    }
    return flexing;
  }

  var articleHeight = article.clientHeight;
  var setIndent = function(e) {
    var flexing = isFlexing();
    if (flexing) {
      article.setAttribute("class", "indent");
      footer.setAttribute("class", "indent");
    } else {
      article.removeAttribute("class", "indent");
      footer.setAttribute("class", "indent");
    }
  }

  var resizeSections = function(e) {
    var flexing = isFlexing(focusSection);
    if (article.clientHeight == articleHeight) {
      return;
    }
    articleHeight = article.clientHeight;
    for (var s = 0; s < sectionsLength; s++) {
      if (flexing) {
        sections[s].style.minHeight = articleHeight + 'px';
      } else {
        sections[s].style.minHeight = 'initial';
      }
    }
  };

  var focusSection = function (e, flexing) {
    if (flexing === undefined) {
      flexing = isFlexing()
    };
    var hash = (location.hash != '#header' && location.hash) || '#intro';
    for (var s = 0; s < sectionsLength; s++) {
      var section = sections[s];
      if (!flexing) {
        section.className = '';
        continue;
      }
      if (section.id != hash.substr(1)) {
        section.className = 'hidden';
      } else if (section.className == 'hidden') {
        section.className = 'appearing'; // kill me now
        setTimeout(function() {
          this.className = '';
        }.bind(section), 30);
      }
    }
    for (var l = 0; l < linksLength; l++) {
      if (links[l].className == 'fluid') {
        continue;
      }
      links[l].className =
        (flexing && links[l].getAttribute('href') == hash)
        ? 'fixed active' : 'fixed';
    }
  };

  setIndent();
  window.addEventListener('resize', setIndent);
  resizeSections();
  window.addEventListener('resize', resizeSections);
  focusSection();
  window.addEventListener('hashchange', focusSection);

})();
