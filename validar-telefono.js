jQuery(function () {
  const campoTelefono = jQuery("#helpdesk_ticket_custom_field_cf_nmero_de_telfono_1588414");

  // Crear un span para el tooltip debajo del campo, si no existe
  let tooltip = campoTelefono.next(".tooltip-validacion");
  if (!tooltip.length) {
    tooltip = jQuery('<span class="tooltip-validacion" style="display:none; font-size:12px; margin-top:4px; display:block;"></span>');
    campoTelefono.after(tooltip);
  }

  const seriesTelefonicasValidas = ["809", "829", "849"];

  function validarTelefonoRD(numero) {
    if (!/^\d{10}$/.test(numero)) return false;
    return seriesTelefonicasValidas.includes(numero.substring(0, 3));
  }

  function aplicarEstilosTelefono(numero) {
    if (numero.length === 0) {
      // Vacío, ocultar tooltip y estilos
      campoTelefono.css({ borderColor: "", color: "", fontWeight: "" });
      tooltip.hide();
      return;
    }

    if (validarTelefonoRD(numero)) {
      campoTelefono.css({
        borderColor: "#28a745",
        color: "#1e5631",
        fontWeight: "bold"
      });
      tooltip.text("Número válido ✔").css({ color: "#28a745" }).show();
    } else if (numero.length === 10) {
      campoTelefono.css({
        borderColor: "red",
        color: "",
        fontWeight: "normal"
      });
      tooltip.text("Número inválido ✘").css({ color: "red" }).show();
    } else {
      campoTelefono.css({
        borderColor: "",
        color: "",
        fontWeight: ""
      });
      tooltip.hide();
    }
  }

  campoTelefono.on("input paste", function () {
    setTimeout(() => {
      // Solo números
      this.value = this.value.replace(/\D/g, '');

      // Limitar longitud a 10 dígitos
      if (this.value.length > 10) {
        this.value = this.value.substring(0, 10);
      }

      aplicarEstilosTelefono(this.value);
    }, 0);
  });

  campoTelefono.attr("title", "Ingrese un número telefónico válido de 10 dígitos en RD (Ej.: 8091234567, 8290000000, 8491112222)");
});
