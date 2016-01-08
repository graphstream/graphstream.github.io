'use strict';

(function() {
  var content  = document.querySelector("#content")
    , sections = content.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id]")
    , toc      = document.querySelector("#toc");
  
  function getDepth(e) {
    return parseInt(e.tagName.substring(1));
  }
  
  if (toc) {
    var minDepth = 6;
    
    for (var i = 0; i < sections.length; i++) {
      minDepth = Math.min(minDepth, getDepth(sections[i]));
    }
    
    for (var i = 0; i < sections.length; i++) {
      var tocSection = document.createElement("li")
        , tocLink    = document.createElement("a");
      
      tocLink.innerHTML = sections[i].innerHTML;
      tocLink.setAttribute("href", "#" + sections[i].id);
      tocSection.appendChild(tocLink);
      tocSection.classList.add("toc-" + (getDepth(sections[i]) - minDepth));
      
      toc.appendChild(tocSection);
    }
  }
  else {
    console.log("toc not found");
  }
})();
