
jQuery(function () {
  const campo = jQuery("#helpdesk_ticket_custom_field_cf_info_1588414");

  // Ocultar el campo
  campo.hide();

  // Ocultar el label asociado (si está antes o relacionado por for/id)
  const label = jQuery(`label[for="helpdesk_ticket_custom_field_cf_info_1588414"]`);
  if (label.length) {
    label.hide();
  } else {
    // Si el label no tiene 'for', tratar de ocultar el anterior
    campo.prev("label").hide();
  }
});

