<script> 
                <script>
jQuery(function () {
  const campoConfirmacion = jQuery("#helpdesk_ticket_custom_field_cf_confirmacin_correo_1588414");
  const campoPrincipal = jQuery("#helpdesk_ticket_email");

  const tooltipStyle = "font-size:12px; margin-top:4px; display:block;";
  const tooltip = jQuery(`<span class="tooltip-validacion" style="display:none; ${tooltipStyle}"></span>`);
  campoConfirmacion.after(tooltip);

  const dominiosConocidos = [
    "gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com",
    "protonmail.com", "aol.com", "zoho.com", "mail.com", "gmx.com",
    "alumno.utesa.edu", "utesa.edu", "live.com", "me.com", "msn.com",
    "educacion.gob.do", "edu.do", "do.edu", "unphu.edu.do", "pucmm.edu.do"
  ];

  function esCorreoValido(correo) {
    const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return regex.test(correo);
  }

  function obtenerDominio(correo) {
    const partes = correo.split("@");
    return partes.length === 2 ? partes[1].toLowerCase() : "";
  }

  function validarCampos() {
    // Quitar espacios en ambos campos
    let correoConfirmado = campoConfirmacion.val().replace(/\s/g, "");
    let correoOriginal = campoPrincipal.val().replace(/\s/g, "");

    campoConfirmacion.val(correoConfirmado);
    campoPrincipal.val(correoOriginal);

    const dominio = obtenerDominio(correoConfirmado);
    const correoValido = esCorreoValido(correoConfirmado);
    const dominioReconocido = dominiosConocidos.includes(dominio);

    if (!correoValido) {
      campoConfirmacion.css({ borderColor: "red", fontWeight: "bold" });
      tooltip.text("Correo inválido. Asegúrese de que tenga el formato correcto: usuario@dominio.com")
        .css({ color: "red" }).show();
    } else if (!dominioReconocido) {
      campoConfirmacion.css({ borderColor: "orange", fontWeight: "normal" });
      tooltip.html("Dominio poco común. Algunos dominios válidos:<br>• " + dominiosConocidos.slice(0, 5).join("<br>• ") + "<br>• ...")
        .css({ color: "orange" }).show();
    } else if (correoConfirmado.toLowerCase() !== correoOriginal.toLowerCase()) {
      campoConfirmacion.css({ borderColor: "red", fontWeight: "bold" });
      campoPrincipal.css({ borderColor: "red", fontWeight: "bold" });
      tooltip.text("Los correos introducidos son diferentes.")
        .css({ color: "red" }).show();
    } else {
      campoConfirmacion.css({ borderColor: "#28a745", fontWeight: "normal" });
      campoPrincipal.css({ borderColor: "#28a745", fontWeight: "normal" });
      tooltip.hide();
    }
  }

  // Escuchar tanto input como paste en tiempo real
  campoConfirmacion.on("input paste", function () {
    setTimeout(validarCampos, 0); // Espera para procesar valor pegado
  });

  campoPrincipal.on("input paste", function () {
    setTimeout(validarCampos, 0);
  });

  campoConfirmacion.attr("title", "Confirme su correo electrónico.");
});
</script>
