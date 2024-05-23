document.addEventListener('DOMContentLoaded', (event) => {
    // Modal 1
    const modal1 = document.getElementById("modal1");
    const btnOpenModal1 = document.getElementById("openModal1");
    const spanCloseModal1 = document.getElementById("closeModal1");

    // Modal 2
    const modal2 = document.getElementById("modal2");
    const spanCloseModal2 = document.getElementById("closeModal2");

    // Coupon and Print button
    const btnPrintCoupon = document.getElementById("printCoupon");
    const couponElement = document.getElementById("coupon");

    // Abrir Modal 1
    btnOpenModal1.onclick = function() {
        modal1.style.display = "block";
    }

    // Cerrar Modal 1
    spanCloseModal1.onclick = function() {
        modal1.style.display = "none";
    }

    // Capturar y descargar cupón sin mostrar el botón "Print"
    btnPrintCoupon.onclick = function() {
        // Ocultar el botón "Print"
        btnPrintCoupon.style.display = "none";
        
        // Capturar y descargar la imagen del cupón
        html2canvas(couponElement).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'cupon.png';
            link.click();

            // Mostrar el botón "Print" nuevamente
            btnPrintCoupon.style.display = "inline-block";
        });
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
