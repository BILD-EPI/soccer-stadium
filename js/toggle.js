

    document.addEventListener('DOMContentLoaded', function() {
        const loadButton = document.getElementById('load-position');
        const saveButton = document.getElementById('save-position');
        const saveOne   = document.getElementById('save-position-1');
        const saveTwo   = document.getElementById('save-position-2');
        const saveThree = document.getElementById('save-position-3');
        const loadOne   = document.getElementById('load-position-1');
        const loadTwo   = document.getElementById('load-position-2');
        const loadThree = document.getElementById('load-position-3');

        function toggleButtons() {
            if (saveButton.style.display === 'none') {
                saveButton.style.display = 'inline-block';
                loadButton.style.display = 'none';
                 loadOne.style.display = 'inline-block';
                loadTwo.style.display = 'inline-block';
                loadThree.style.display = 'inline-block';
                saveOne.style.display = 'none';
                saveTwo.style.display = 'none';
                saveThree.style.display = 'none';
            } else {
                saveButton.style.display = 'none';
                loadButton.style.display = 'inline-block';

                saveOne.style.display = 'inline-block';
                saveTwo.style.display = 'inline-block';
                saveThree.style.display = 'inline-block';
                loadOne.style.display = 'none';
                loadTwo.style.display = 'none';
                loadThree.style.display = 'none';
            }
        }

        function blinkElement(element) {
            element.classList.add('blink');
            console.log(element)
            setTimeout(function() {
                element.classList.remove('blink');
                toggleButtons(); 
            }, 1000); 
        }

        saveButton.addEventListener('click', toggleButtons);
        loadButton.addEventListener('click', toggleButtons);
        saveOne.addEventListener('click', function() {
            blinkElement(saveOne);
        });
        saveTwo.addEventListener('click', function() {
            blinkElement(saveTwo);
        });
        saveThree.addEventListener('click', function() {
            blinkElement(saveThree);
        });
    });





