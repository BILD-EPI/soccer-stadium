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
      end: function (event) {
        var target = event.target;
        var x = parseFloat(target.getAttribute('data-x')) || 0;
        var y = parseFloat(target.getAttribute('data-y')) || 0;
        var id = target.getAttribute('id');

        // Save the position in localStorage using the element's ID
        localStorage.setItem(id + '-position-x', x);
        localStorage.setItem(id + '-position-y', y);

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
    var x = parseFloat(localStorage.getItem(id + '-position-x')) || 0;
    var y = parseFloat(localStorage.getItem(id + '-position-y')) || 0;

    button.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    button.setAttribute('data-x', x);
    button.setAttribute('data-y', y);
  });

  // Reset button functionality
  document.getElementById('reset-button').addEventListener('click', function() {
    document.querySelectorAll('.button').forEach(function(button) {
      var id = button.getAttribute('id');

      // Reset the position to default (0, 0)
      button.style.transform = 'translate(0px, 0px)';
      button.setAttribute('data-x', 0);
      button.setAttribute('data-y', 0);

      // Clear the saved position in localStorage
      localStorage.removeItem(id + '-position-x');
      localStorage.removeItem(id + '-position-y');
    });
  });
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
