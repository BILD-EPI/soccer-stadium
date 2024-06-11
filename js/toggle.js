

    document.addEventListener('DOMContentLoaded', function() {
        const saveButton = document.getElementById('save-position');
        const loadButton = document.getElementById('load-position');

        function toggleButtons() {
            if (saveButton.style.display === 'none') {
                saveButton.style.display = 'inline-block';
                loadButton.style.display = 'none';
            } else {
                saveButton.style.display = 'none';
                loadButton.style.display = 'inline-block';
            }
        }

        saveButton.addEventListener('click', toggleButtons);
        loadButton.addEventListener('click', toggleButtons);
    });
