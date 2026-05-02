document.addEventListener('DOMContentLoaded', function () {

    function mostrarModal(el) {
        el.style.display = 'block';
        el.classList.add('show');
        document.body.classList.add('modal-open');
        var backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        backdrop.setAttribute('data-para', el.id);
        document.body.appendChild(backdrop);
        backdrop.addEventListener('click', function () {
            ocultarModal(el);
        });
    }

    function ocultarModal(el) {
        el.style.display = 'none';
        el.classList.remove('show');
        document.body.classList.remove('modal-open');
        var backdrop = document.querySelector('[data-para="' + el.id + '"]');
        if (backdrop) backdrop.remove();
    }

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-bs-dismiss="modal"]');
        if (btn) {
            var modal = btn.closest('.modal');
            if (modal) ocultarModal(modal);
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(function (modal) {
                ocultarModal(modal);
            });
        }
    });

    /* ── Modal de mensajes del sistema ── */
    var modalMensaje = document.getElementById('modalMensaje');
    if (modalMensaje) {
        mostrarModal(modalMensaje);
    }

    /* ── Modal de confirmación de eliminación ── */
    var modalEliminarEl = document.getElementById('modalEliminar');
    if (modalEliminarEl) {
        document.addEventListener('click', function (event) {
            var btn = event.target.closest('[data-accion="eliminar"]');
            if (!btn) return;

            var nombre   = btn.dataset.nombre   || '';
            var url      = btn.dataset.url      || '';
            var tipo     = btn.dataset.tipo     || 'elemento';
            var usuarios = parseInt(btn.dataset.usuarios || '0');

            document.getElementById('modal-eliminar-titulo').textContent =
                'Eliminar ' + tipo;

            var preguntaEl = document.getElementById('modal-eliminar-pregunta');
            preguntaEl.innerHTML = '';
            preguntaEl.appendChild(document.createTextNode(
                '¿Estás seguro de que deseas eliminar ' +
                (tipo === 'usuario' ? 'al usuario ' : 'el rol ')
            ));
            var fuerte = document.createElement('strong');
            fuerte.textContent = nombre;
            preguntaEl.appendChild(fuerte);
            preguntaEl.appendChild(document.createTextNode('?'));

            var avisoEl = document.getElementById('modal-eliminar-aviso');
            if (tipo === 'rol' && usuarios > 0) {
                avisoEl.textContent = 'Este rol tiene ' + usuarios +
                    ' usuario' + (usuarios !== 1 ? 's' : '') +
                    ' asignados. Serán desvinculados del rol.';
                avisoEl.style.display = '';
            } else {
                avisoEl.style.display = 'none';
            }

            document.getElementById('form-modal-eliminar').action = url;
            mostrarModal(modalEliminarEl);
        });
    }

});
