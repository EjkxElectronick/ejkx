
                
                
                jQuery("#helpdesk_ticket_subject").hide();
                jQuery("#helpdesk_ticket_custom_field_cf_type_1539537").hide();
                jQuery('#helpdesk_ticket_custom_field_cf_servicio_que_desea_pagar_1539537').remove();
         
       //jQuery("#helpdesk_ticket_product_id").remove();
         jQuery('label.checkbox:contains("Si hizo un depósito bancario adjunte la foto del recibo de pago")').css('color','#000');     
         jQuery("#helpdesk_ticket_subject").hide();
                
        jQuery('#helpdesk_ticket_custom_field_cf_solicitud_1539537 option:contains("Seleccione...")').css('color', '#ff8c00');
                
                ///Longitud de matricula
                jQuery('#helpdesk_ticket_custom_field_cf_matricula_1588414').attr("minlength", 6);
                jQuery('#helpdesk_ticket_custom_field_cf_matricula_1588414').attr("maxlength", 7);
                jQuery('#helpdesk_ticket_custom_field_cf_matrcula_pagos_1588414').attr("minlength", 7);
         		jQuery('#helpdesk_ticket_custom_field_cf_matrcula_pagos_1588414').attr("maxlength", 7);
                jQuery('#helpdesk_ticket_custom_field_cf_matrcula_balance_1588414').attr("minlength", 6);
        		jQuery('#helpdesk_ticket_custom_field_cf_matrcula_balance_1588414').attr("maxlength", 7);
                jQuery('#helpdesk_ticket_custom_field_cf_matrcula_clave_web_1588414').attr("minlength", 6);
                jQuery('#helpdesk_ticket_custom_field_cf_matrcula_clave_web_1588414').attr("maxlength", 7);
                //Pattern matricula
                jQuery("#helpdesk_ticket_custom_field_cf_matrcula_pagos_1588414").attr("pattern", '[1-3][0-2][0-6]\\d{4}');
                jQuery("#helpdesk_ticket_custom_field_cf_matrcula_balance_1588414").attr("pattern", '[1-3][0-2][0-6]\\d{4}');
                jQuery("#helpdesk_ticket_custom_field_cf_matricula_1588414").attr("pattern", '[1-3][0-2][0-6]\\d{4}');
                jQuery("#helpdesk_ticket_custom_field_cf_matrcula_clave_web_1588414").attr("pattern", '[1-3][0-2][0-6]\\d{4}');
                //Longitud cédula
                jQuery('#helpdesk_ticket_custom_field_cf_cedula_o_rnc_1588414').attr("minlength", 9);
        	    jQuery('#helpdesk_ticket_custom_field_cf_cedula_o_rnc_1588414').attr("maxlength", 14);
                //Longitud número               
                jQuery('#helpdesk_ticket_custom_field_cf_nmero_de_telfono_1588414').attr("minlength", 10);
                
                //jQuery('#helpdesk_ticket_subject').val("PAGO DE MATRíCULA UTESA SEDE CICLO 2-2024");
                
                
              
           
