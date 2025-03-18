$(document).ready(function () {
    const jsonFile = 'events.json';

    // Cargar eventos desde el archivo JSON
    function loadEvents() {
        $.getJSON(jsonFile, function (data) {
            $('#events-list').empty();  // Limpiar lista de eventos

            data.events.forEach(function (event, index) {
                const eventHtml = `
                    <div class="event" data-index="${index}">
                        <h5>${event.name}</h5>
                        <p><strong>Fecha:</strong> ${event.date} a las ${event.time}</p>
                        <p><strong>Descripción:</strong> ${event.description}</p>
                        <button class="btn btn-warning editEventButton">Editar</button>
                    </div>
                `;
                $('#events-list').append(eventHtml);
            });
        });
    }

    // Abrir el modal para editar un evento
    $('#events-list').on('click', '.editEventButton', function () {
        const eventIndex = $(this).closest('.event').data('index');

        $.getJSON(jsonFile, function (data) {
            const event = data.events[eventIndex];

            $('#eventName').val(event.name);
            $('#eventDate').val(event.date);
            $('#eventTime').val(event.time);
            $('#eventDescription').val(event.description);

            $('#editModal').data('index', eventIndex).modal('show');
        });
    });

    // Guardar evento editado
    $('#eventForm').submit(function (e) {
        e.preventDefault(); // Prevenir el envío del formulario

        const eventIndex = $('#editModal').data('index');

        const updatedEvent = {
            name: $('#eventName').val(),
            date: $('#eventDate').val(),
            time: $('#eventTime').val(),
            description: $('#eventDescription').val()
        };

        $.getJSON(jsonFile, function (data) {
            data.events[eventIndex] = updatedEvent;

            // Guardar los cambios en el archivo JSON (esto requeriría un backend)
            // Por ahora solo actualizamos la vista
            alert('Evento guardado.');

            // Volver a cargar los eventos
            loadEvents();
            $('#editModal').modal('hide');
        });
    });

    // Cancelar edición
    $('#cancelEdit').click(function () {
        $('#editModal').modal('hide');
    });

    // Añadir un evento nuevo
    $('#addEventButton').click(function () {
        $('#eventName').val('');
        $('#eventDate').val('');
        $('#eventTime').val('');
        $('#eventDescription').val('');
        $('#editModal').data('index', -1).modal('show');
    });

    // Cargar los eventos al inicio
    loadEvents();
});
