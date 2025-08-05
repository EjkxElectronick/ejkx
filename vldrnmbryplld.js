<script>
                
                jQuery(function () {
  const camposNombre = [
    "#helpdesk_ticket_custom_field_cf_apellidos_1588414",
    "#name_field"
  ];

  const tooltipStyle = "font-size:12px; margin-top:4px; display:block;";

  function capitalizarNombre(texto) {
    return texto
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(palabra =>
        palabra.charAt(0).toUpperCase() + palabra.slice(1)
      )
      .join(' ');
  }

  function sugerirCorrecciones(texto) {
    const sugerencias = [];

    if (/([aeiouáéíóú])\1{2,}/i.test(texto)) {
      sugerencias.push("Evite repetir letras: 'Mariiia' → 'María'");
    }

    if (/[ñÑ]/.test(texto) && /[A-Z][^a-z]*[ñÑ]/.test(texto)) {
      sugerencias.push("Revise el uso de la 'ñ': 'NuÑEz' → 'Nuñez'");
    }

    if (/[A-Z]{2,}/.test(texto)) {
      sugerencias.push("Evite escribir todo en mayúsculas");
    }

    return sugerencias;
  }

  function esNombreValido(texto) {
    return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(texto);
  }

  camposNombre.forEach(selector => {
    const campo = jQuery(selector);

    let tooltip = campo.next(".tooltip-validacion");
    if (!tooltip.length) {
      tooltip = jQuery(`<span class="tooltip-validacion" style="display:none; ${tooltipStyle}"></span>`);
      campo.after(tooltip);
    }

    campo.on("input", function () {
      // Solo letras, acentos, ñ y espacios
      this.value = this.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, '');

      const capitalizado = capitalizarNombre(this.value);
      this.value = capitalizado;

      const sugerencias = sugerirCorrecciones(capitalizado);

      if (!esNombreValido(this.value)) {
        campo.css({ borderColor: "red", fontWeight: "normal" });
        tooltip.text("Solo se permiten letras y espacios").css({ color: "red" }).show();
      } else if (sugerencias.length > 0) {
        campo.css({ borderColor: "orange", fontWeight: "bold" });
        tooltip.html("Sugerencias:<br>• " + sugerencias.join("<br>• ")).css({ color: "orange" }).show();
      } else {
        campo.css({ borderColor: "#28a745", fontWeight: "" });
        tooltip.hide();
      }
    });

    campo.attr("title", "Ingrese solo letras y espacios. El texto se capitaliza automáticamente según reglas ortográficas.");
  });
});

              </script>
