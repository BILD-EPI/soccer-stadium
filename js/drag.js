// document.querySelectorAll(".button").forEach(function(el){
//   dragElement(el);
// });




// function dragElement(elmnt) {
//     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

//       elmnt.onmousedown  = dragMouseDown;
//       elmnt.ontouchstart  = dragMouseDown;

//     function dragMouseDown(e) {
//       e = e || window.event;
//       e.preventDefault();
//       // get the mouse cursor position at startup:
//       pos3 = e.clientX;
//       pos4 = e.clientY;
//       document.onmouseup = closeDragElement;
//       document.addEventListener("touchend", closeDragElement, {passive: false});
//       // document.ontouchend = closeDragElement;
//       // call a function whenever the cursor moves:
//       document.onmousemove = elementDrag;
//       document.addEventListener('touchmove', elementDrag, {passive: false});
//       // document.ontouchmove  = elementDrag;
//     }

//     function elementDrag(e) {
//       e = e || window.event;
//       e.preventDefault();
//       // calculate the new cursor position:
//       pos1 = pos3 - e.clientX;
//       pos2 = pos4 - e.clientY;
//       pos3 = e.clientX;
//       pos4 = e.clientY;
//       // set the element's new position:
//       elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//       elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//     }

//     function closeDragElement() {
//       /* stop moving when mouse button is released:*/
//       document.onmouseup = null;
//       document.onmousemove = null;
//     }
//   }
// target elements with the "draggable" class
document.addEventListener('DOMContentLoaded', function() {
  // Check if the page is being refreshed
  if (sessionStorage.getItem('isRefresh')) {
    // Clear current positions in localStorage
    document.querySelectorAll('.button').forEach(function(button) {
      var id = button.getAttribute('id');
      localStorage.removeItem(id + '-position-current-x');
      localStorage.removeItem(id + '-position-current-y');
    });
    // Remove the refresh flag from sessionStorage
    sessionStorage.removeItem('isRefresh');
  }

  // Initialize interact.js on elements with the "button" class
  interact('.button').draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'none',
        endOnly: true
      })
    ],
    autoScroll: true,
    listeners: {
      move: dragMoveListener,
      end: function(event) {
        var target = event.target;
        var x = parseFloat(target.getAttribute('data-x')) || 0;
        var y = parseFloat(target.getAttribute('data-y')) || 0;
        var id = target.getAttribute('id');
        
        // Save the current position in localStorage using the element's ID
        localStorage.setItem(id + '-position-current-x', x);
        localStorage.setItem(id + '-position-current-y', y);

        var textEl = target.querySelector('p');
        if (textEl) {
          textEl.textContent = 'Moved a distance of ' +
            (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                       Math.pow(event.pageY - event.y0, 2)) | 0).toFixed(2) + 'px';
        }
      }
    }
  });

  // Load positions from localStorage
  document.querySelectorAll('.button').forEach(function(button) {
    var id = button.getAttribute('id');
    var x = parseFloat(localStorage.getItem(id + '-position-current-x')) || 0;
    var y = parseFloat(localStorage.getItem(id + '-position-current-y')) || 0;

    button.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    button.setAttribute('data-x', x);
    button.setAttribute('data-y', y);
  });

  // Function to save position to a specific slot
  function savePosition(slot) {
    document.querySelectorAll('.button').forEach(function(button) {
      var id = button.getAttribute('id');
      var x = parseFloat(button.getAttribute('data-x')) || 0;
      var y = parseFloat(button.getAttribute('data-y')) || 0;

      localStorage.setItem(id + '-position-' + slot + '-x', x);
      localStorage.setItem(id + '-position-' + slot + '-y', y);
    });
  }

  // Function to load position from a specific slot
  function loadPosition(slot) {
    document.querySelectorAll('.button').forEach(function(button) {
      var id = button.getAttribute('id');
      var x = parseFloat(localStorage.getItem(id + '-position-' + slot + '-x')) || 0;
      var y = parseFloat(localStorage.getItem(id + '-position-' + slot + '-y')) || 0;

      button.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      button.setAttribute('data-x', x);
      button.setAttribute('data-y', y);
    });
  }

  // Reset button functionality
  document.getElementById('reset-button').addEventListener('click', function() {
    document.querySelectorAll('.button').forEach(function(button) {
      var id = button.getAttribute('id');

      // Reset the position to default (0, 0)
      button.style.transform = 'translate(0px, 0px)';
      button.setAttribute('data-x', 0);
      button.setAttribute('data-y', 0);

      // Clear the current positions in localStorage
      localStorage.removeItem(id + '-position-current-x');
      localStorage.removeItem(id + '-position-current-y');
    });
  });

  // Save position buttons
  document.getElementById('save-position-1').addEventListener('click', function() { savePosition(1); });
  document.getElementById('save-position-2').addEventListener('click', function() { savePosition(2); });
  document.getElementById('save-position-3').addEventListener('click', function() { savePosition(3); });

  // Load position buttons
  document.getElementById('load-position-1').addEventListener('click', function() { loadPosition(1); });
  document.getElementById('load-position-2').addEventListener('click', function() { loadPosition(2); });
  document.getElementById('load-position-3').addEventListener('click', function() { loadPosition(3); });
});

// Drag move listener function
function dragMoveListener(event) {
  var target = event.target;
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // Translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // Update the position attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// This function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// Before the page unloads, set a flag in sessionStorage to indicate a refresh
window.addEventListener('beforeunload', function() {
  sessionStorage.setItem('isRefresh', 'true');
});
