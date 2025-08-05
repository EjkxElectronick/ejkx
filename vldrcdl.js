jQuery(function () {
  const campoCedula = jQuery("#helpdesk_ticket_custom_field_cf_cedula_o_rnc_1588414");

  // Crear un span para el tooltip debajo del campo, si no existe
  let tooltip = jQuery('<span class="tooltip-validacion" style="display:none; font-size:12px; margin-top:4px; display:block;"></span>');
  campoCedula.after(tooltip);

  const seriesValidas = [
    "001", "002", "003", "004", "005", "006", "007", "008", "009",
    "010", "011", "012", "013", "014", "015", "016", "017", "018", "019",
    "020", "021", "022", "023", "024", "025", "026", "027", "028", "029",
    "030", "031", "032", "033", "034", "035", "036", "037", "038", "039",
    "040", "041", "042", "043", "044", "045", "046", "047", "048", "049",
    "050", "051", "052", "053", "054", "055", "056", "057", "058", "059",
    "060", "061", "062", "063", "064", "065", "066", "067", "068", "069",
    "070", "071", "072", "073", "074", "075", "076", "077", "078", "079",
    "080", "081", "082", "083", "084", "085", "086", "087", "088", "089",
    "090", "091", "092", "093", "094", "095", "096", "097", "098", "099",
    "100", "101", "102", "103", "104", "105", "106", "107", "108", "109",
    "110", "111", "112", "113", "114", "115", "116", "117", "118", "119",
    "120", "121", "402"
  ];

  function validarCedulaRD(cedula) {
    if (!/^\d{11}$/.test(cedula)) return false;

    const serie = cedula.substring(0, 3);
    if (!seriesValidas.includes(serie)) return false;

    let suma = 0;
    const multiplicadores = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

    for (let i = 0; i < 10; i++) {
      let producto = parseInt(cedula[i], 10) * multiplicadores[i];
      if (producto > 9) producto -= 9;
      suma += producto;
    }

    const digitoVerificador = (10 - (suma % 10)) % 10;
    return digitoVerificador === parseInt(cedula[10], 10);
  }

  function aplicarEstilos(cedula) {
    if (cedula.length === 0) {
      campoCedula.css({
        borderColor: "",
        color: "",
        fontWeight: "normal"
      });
      tooltip.hide();
      return;
    }

    if (cedula.length === 11 && validarCedulaRD(cedula)) {
      campoCedula.css({
        borderColor: "#28a745",
        color: "#1e5631",
        fontWeight: "bold"
      });
      tooltip.text("Cédula válida ✔").css({ color: "#28a745" }).show();
    } else {
      campoCedula.css({
        borderColor: "red",
        color: "",
        fontWeight: "normal"
      });
      tooltip.text("Cédula inválida ✘").css({ color: "red" }).show();
    }
  }

  campoCedula.on("input paste", function () {
    setTimeout(() => {
      this.value = this.value.replace(/[^0-9]/g, '');
      aplicarEstilos(this.value);
    }, 0);
  });

  campoCedula.attr("title", "Ingrese una cédula o RNC válido de 11 dígitos con serie autorizada (Ej.: 001, 121, 402...)");
});
