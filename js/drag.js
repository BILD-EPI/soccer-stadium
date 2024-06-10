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
interact('.button')

  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of its parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'none',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var target = event.target;
        console.log(target)
        var x = parseFloat(target.getAttribute('data-x')) || 0;
        var y = parseFloat(target.getAttribute('data-y')) || 0;

        // Save the position in localStorage
        localStorage.setItem('button-position-x', x);
        localStorage.setItem('button-position-y', y);

        var textEl = target.querySelector('p');
        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
      }
    }
  });

function dragMoveListener (event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// Load the position from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('.button');
  var x = parseFloat(localStorage.getItem('button-position-x'));
  var y = parseFloat(localStorage.getItem('button-position-y'));

  if (x !== null && y !== null) {
    button.style.webkitTransform =
      button.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    button.setAttribute('data-x', x);
    button.setAttribute('data-y', y);
  } else {
    // Reset to default position if no cached values
    button.style.webkitTransform =
      button.style.transform =
        'translate(0px, 0px)';

    button.setAttribute('data-x', 0);
    button.setAttribute('data-y', 0);
  }
});

// Reset button functionality
document.getElementById('reset-button').addEventListener('click', function() {
  var button = document.querySelector('.button');
  
  // Reset the position to default (0, 0)
  button.style.webkitTransform =
    button.style.transform =
      'translate(0px, 0px)';

  button.setAttribute('data-x', 0);
  button.setAttribute('data-y', 0);

  // Clear the saved position in localStorage
  localStorage.removeItem('button-position-x');
  localStorage.removeItem('button-position-y');
});

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
