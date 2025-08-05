<script>
     jQuery(function () {
  const camposNumericos = [
    "#helpdesk_ticket_custom_field_cf_matrcula_pagos_1588414",
    "#helpdesk_ticket_custom_field_cf_matrcula_balance_1588414",
    "#helpdesk_ticket_custom_field_cf_matricula_1588414",
    "#helpdesk_ticket_custom_field_cf_matrcula_clave_web_1588414"
  ];

  const anioActual = new Date().getFullYear();
  const maxAnio = anioActual % 100; // ejemplo: 2025 -> 25
  const regex = new RegExp(`^[1-3]([0-9]{2})([0-9]{4})$`);

  camposNumericos.forEach(function (selector) {
    const campo = jQuery(selector);

    // Crear tooltip si no existe
    let tooltip = campo.next(".tooltip-validacion");
    if (!tooltip.length) {
      tooltip = jQuery('<span class="tooltip-validacion" style="display:none; font-size:12px; margin-top:4px; display:block;"></span>');
      campo.after(tooltip);
    }

    campo.on("input", function () {
      // Eliminar caracteres no numéricos
      this.value = this.value.replace(/[^0-9]/g, '');
      let valor = this.value;

      // Validar primer dígito
      if (valor.length >= 1 && !['1', '2', '3'].includes(valor[0])) {
        this.value = '';
        this.style.borderColor = 'red';
        tooltip.text("Primer dígito inválido.").css({color: "red"}).show();
        return;
      }

      // Validar año si hay al menos 3 dígitos
      if (valor.length >= 3) {
        const anioIngresado = parseInt(valor.substring(1, 3), 10);
        if (anioIngresado > maxAnio) {
          // Conservar primer dígito solamente
          this.value = valor[0];
          this.style.borderColor = 'red';
          tooltip.text(`Año no puede ser mayor a ${maxAnio}.`).css({color: "red"}).show();
          return;
        }
      }

      // Validación completa con regex para los 7 dígitos
      const match = valor.match(regex);
      let valido = false;

      if (match && valor.length === 7) {
        const anioIngresado = parseInt(match[1], 10);
        const parteFinal = parseInt(match[2], 10);
        if (anioIngresado <= maxAnio && parteFinal >= 0 && parteFinal <= 9999) {
          valido = true;
        }
      }

      this.style.borderColor = valido ? '' : 'red';

      if (valido) {
        tooltip.text("Matrícula válida ✔").css({color: "#28a745"}).show();
      } else if (valor.length === 7) {
        tooltip.text("Matrícula inválida ✘").css({color: "red"}).show();
      } else {
        tooltip.hide();
      }
    });

    campo.attr("title", `Formato requerido: 1-3 + año (00-${maxAnio}) + 4 dígitos. Ejemplo: 1239999`);
  });
});



                 
</script>
