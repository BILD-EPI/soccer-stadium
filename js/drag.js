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

      // Clear the saved positions in localStorage
      for (var i = 1; i <= 3; i++) {
        localStorage.removeItem(id + '-position-' + i + '-x');
        localStorage.removeItem(id + '-position-' + i + '-y');
      }
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
