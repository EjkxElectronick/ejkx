
    jQuery(function () {
        // =================================================================================================
        // Ocultar campo de información
        //
        // =================================================================================================
        const campoInfo = jQuery("#helpdesk_ticket_custom_field_cf_info_1588414");
        campoInfo.hide(); // Oculta el campo en sí
        const labelInfo = jQuery(`label[for="helpdesk_ticket_custom_field_cf_info_1588414"]`); // Oculta el label asociado
        if (labelInfo.length) {
            labelInfo.hide();
        } else {
            campoInfo.prev("label").hide();
        }

        

