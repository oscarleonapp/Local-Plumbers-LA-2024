document.addEventListener('DOMContentLoaded', (event) => {
    // Modal 1
    const modal1 = document.getElementById("modal1");
    const btnOpenModal1 = document.getElementById("openModal1");
    const spanCloseModal1 = document.getElementById("closeModal1");

    // Modal 2
    const modal2 = document.getElementById("modal2");
    const btnOpenModal2 = document.getElementById("openModal2");
    const spanCloseModal2 = document.getElementById("closeModal2");

    // Abrir Modal 1
    btnOpenModal1.onclick = function() {
        modal1.style.display = "block";
    }

    // Cerrar Modal 1
    spanCloseModal1.onclick = function() {
        modal1.style.display = "none";
    }

    // Abrir Modal 2 desde Modal 1
    btnOpenModal2.onclick = function() {
        modal1.style.display = "none";
        modal2.style.display = "block";
    }

    // Cerrar Modal 2
    spanCloseModal2.onclick = function() {
        modal2.style.display = "none";
    }

    // Cerrar los modales al hacer clic fuera de ellos
    window.onclick = function(event) {
        if (event.target == modal1) {
            modal1.style.display = "none";
        }
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
    }
});
