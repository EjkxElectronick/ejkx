<script>
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

        // =================================================================================================
        // Configuración general y validaciones
        //
        // =================================================================================================
        // Ocultar campos de asunto y tipo
        jQuery("#helpdesk_ticket_subject").hide();
        jQuery("#helpdesk_ticket_custom_field_cf_type_1539537").hide();
        jQuery('#helpdesk_ticket_custom_field_cf_servicio_que_desea_pagar_1539537').remove();
        
        // Cambiar color a label de adjuntar recibo
        jQuery('label.checkbox:contains("—Si hizo un depósito bancario adjunte la foto del recibo de pago")').css('color', '#000');
        
        // Estilizar opción "Seleccione..."
        jQuery('#helpdesk_ticket_custom_field_cf_solicitud_1539537 option:contains("Seleccione...")').css('color', '#ff8c00');
        
        // Longitudes y patrones para matrículas
        const matriculaCampos = {
            "#helpdesk_ticket_custom_field_cf_matricula_1588414": { min: 6, max: 7 },
            "#helpdesk_ticket_custom_field_cf_matrcula_pagos_1588414": { min: 7, max: 7 },
            "#helpdesk_ticket_custom_field_cf_matrcula_balance_1588414": { min: 6, max: 7 },
            "#helpdesk_ticket_custom_field_cf_matrcula_clave_web_1588414": { min: 6, max: 7 }
        };
        for (const selector in matriculaCampos) {
            jQuery(selector).attr("minlength", matriculaCampos[selector].min).attr("maxlength", matriculaCampos[selector].max);
        }

        // Longitudes de cédula y teléfono
        jQuery('#helpdesk_ticket_custom_field_cf_cedula_o_rnc_1588414').attr("minlength", 9).attr("maxlength", 14);
        jQuery('#helpdesk_ticket_custom_field_cf_nmero_de_telfono_1588414').attr("minlength", 10);
        
        // =================================================================================================
        // Validar matrícula
        //
        // =================================================================================================
        const camposMatricula = [
            "#helpdesk_ticket_custom_field_cf_matrcula_pagos_1588414",
            "#helpdesk_ticket_custom_field_cf_matrcula_balance_1588414",
            "#helpdesk_ticket_custom_field_cf_matricula_1588414",
            "#helpdesk_ticket_custom_field_cf_matrcula_clave_web_1588414"
        ];
        const anioActual = new Date().getFullYear(); // Obtiene el año actual
        const maxAnio = anioActual % 100; // Obtiene los últimos dos dígitos del año actual
        
        camposMatricula.forEach(function (selector) {
            const campo = jQuery(selector);
            // Configura el título con el formato requerido
            campo.attr("title", `Formato requerido: 1-3 + año (00-${maxAnio}) + 4 dígitos. Ejemplo: 1239999`);
            
            // Crea tooltip para mostrar mensajes de validación
            let tooltip = campo.next(".tooltip-validacion");
            if (!tooltip.length) {
                tooltip = jQuery('<span class="tooltip-validacion" style="display:none; font-size:12px; margin-top:4px; display:block;"></span>');
                campo.after(tooltip);
            }
            
            campo.on("input", function () {
                this.value = this.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
                let valor = this.value;
                const regex = new RegExp(`^[1-3]([0-9]{2})([0-9]{4})$`); // Expresión regular para validar el formato
                
                let valido = false;
                const match = valor.match(regex);
                
                if (match && valor.length === 7) {
                    const anioIngresado = parseInt(match[1], 10);
                    const parteFinal = parseInt(match[2], 10);
                    if (anioIngresado <= maxAnio && parteFinal >= 0 && parteFinal <= 9999) {
                        valido = true;
                    }
                }
                
                // Aplica estilos y muestra mensajes en el tooltip
                if (valido) {
                    campo.css({ borderColor: '#28a745', fontWeight: 'bold' });
                    tooltip.text("Matrícula válida ✔").css({color: "#28a745"}).show();
                } else if (valor.length === 7) {
                    campo.css({ borderColor: 'red', fontWeight: 'normal' });
                    tooltip.text("Matrícula inválida ✘").css({color: "red"}).show();
                } else {
                    campo.css({ borderColor: '', fontWeight: '' });
                    tooltip.hide();
                }
            });
        });
        
        // =================================================================================================
        // Validar correo institucional de UTESA
        //
        // =================================================================================================
        const campoCorreoUtesa = jQuery("#helpdesk_ticket_custom_field_cf_correo_office_365_que_desea_recuperar_1588414");
        
        // Crea tooltip para el campo de correo UTESA
        let tooltipCorreoUtesa = campoCorreoUtesa.next(".tooltip-validacion");
        if (!tooltipCorreoUtesa.length) {
            tooltipCorreoUtesa = jQuery('<span class="tooltip-validacion" style="display:none; font-size:12px; margin-top:4px; display:block;"></span>');
            campoCorreoUtesa.after(tooltipCorreoUtesa);
        }
        
        function validarCorreoInstitucional(correo) {
            const regex = /^[a-zA-Z0-9._%+-]+@alumno\.utesa\.edu$/i; // Expresión regular para el dominio @alumno.utesa.edu
            return regex.test(correo);
        }
        
        function aplicarEstilosCorreoUtesa(valor) {
            if (valor.length === 0) {
                campoCorreoUtesa.css({ borderColor: "", color: "", fontWeight: "" });
                tooltipCorreoUtesa.hide();
                return;
            }
            if (validarCorreoInstitucional(valor)) {
                campoCorreoUtesa.css({ borderColor: "#28a745", color: "#1e5631", fontWeight: "bold" });
                tooltipCorreoUtesa.text("Correo válido ✔").css({ color: "#28a745" }).show();
            } else {
                campoCorreoUtesa.css({ borderColor: "red", color: "", fontWeight: "normal" });
                tooltipCorreoUtesa.text("Correo inválido ✘. Debe terminar en @alumno.utesa.edu").css({ color: "red" }).show();
            }
        }
        
        campoCorreoUtesa.on("input paste", function () {
            setTimeout(() => {
                aplicarEstilosCorreoUtesa(this.value.trim()); // Aplica validación en tiempo real
            }, 0);
        });
        
        campoCorreoUtesa.attr("title", "Solo se permite correo con dominio @alumno.utesa.edu"); // Título para el campo
        
        // =================================================================================================
        // Validar correo de confirmación
        //
        // =================================================================================================
        const campoConfirmacion = jQuery("#helpdesk_ticket_custom_field_cf_confirmacin_correo_1588414");
        const campoPrincipal = jQuery("#helpdesk_ticket_email");
        
        // Lista de dominios conocidos
        const dominiosConocidos = [
            "gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com",
            "protonmail.com", "aol.com", "zoho.com", "mail.com", "gmx.com",
            "alumno.utesa.edu", "utesa.edu", "live.com", "me.com", "msn.com",
            "educacion.gob.do", "edu.do", "do.edu", "unphu.edu.do", "pucmm.edu.do"
        ];
        
        const tooltipStyle = "font-size:12px; margin-top:4px; display:block;";
        const tooltipConfirmacion = jQuery(`<span class="tooltip-validacion" style="display:none; ${tooltipStyle}"></span>`);
        campoConfirmacion.after(tooltipConfirmacion);
        
        function esCorreoValido(correo) {
            const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
            return regex.test(correo); // Valida el formato general del correo
        }
        
        function obtenerDominio(correo) {
            const partes = correo.split("@");
            return partes.length === 2 ? partes[1].toLowerCase() : ""; // Extrae el dominio
        }
        
        function validarCamposConfirmacion() {
            let correoConfirmado = campoConfirmacion.val().replace(/\s/g, "");
            let correoOriginal = campoPrincipal.val().replace(/\s/g, "");
            
            campoConfirmacion.val(correoConfirmado);
            campoPrincipal.val(correoOriginal);
            
            const dominio = obtenerDominio(correoConfirmado);
            const correoValido = esCorreoValido(correoConfirmado);
            const dominioReconocido = dominiosConocidos.includes(dominio);
            
            // Aplica estilos y mensajes según las validaciones
            if (!correoValido) {
                campoConfirmacion.css({ borderColor: "red", fontWeight: "bold" });
                tooltipConfirmacion.text("Correo inválido. Asegúrese de que tenga el formato correcto: usuario@dominio.com").css({ color: "red" }).show();
            } else if (!dominioReconocido) {
                campoConfirmacion.css({ borderColor: "orange", fontWeight: "normal" });
                tooltipConfirmacion.html("Dominio poco común. Algunos dominios válidos:<br>• " + dominiosConocidos.slice(0, 5).join("<br>• ") + "<br>• ...").css({ color: "orange" }).show();
            } else if (correoConfirmado.toLowerCase() !== correoOriginal.toLowerCase()) {
                campoConfirmacion.css({ borderColor: "red", fontWeight: "bold" });
                campoPrincipal.css({ borderColor: "red", fontWeight: "bold" });
                tooltipConfirmacion.text("Los correos introducidos son diferentes.").css({ color: "red" }).show();
            } else {
                campoConfirmacion.css({ borderColor: "#28a745", fontWeight: "normal" });
                campoPrincipal.css({ borderColor: "#28a745", fontWeight: "normal" });
                tooltipConfirmacion.hide();
            }
        }
        
        campoConfirmacion.on("input paste", function () {
            setTimeout(validarCamposConfirmacion, 0); // Llama a la validación en tiempo real
        });
        
        campoPrincipal.on("input paste", function () {
            setTimeout(validarCamposConfirmacion, 0); // Llama a la validación en tiempo real
        });
        
        campoConfirmacion.attr("title", "Confirme su correo electrónico."); // Título para el campo
        
        // =================================================================================================
        // Validar nombre y apellido
        //
        // =================================================================================================
        const camposNombre = ["#helpdesk_ticket_custom_field_cf_apellidos_1588414", "#name_field"];
        
        function capitalizarNombre(texto) {
            // Capitaliza cada palabra del nombre
            return texto.toLowerCase().replace(/\s+/g, ' ').split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');
        }
        
        function sugerirCorrecciones(texto) {
            const sugerencias = [];
            if (/([aeiouáéíóú])\1{2,}/i.test(texto)) {
                sugerencias.push("Evite repetir letras: 'Mariiia' → 'María'"); // Sugerencia de letras repetidas
            }
            if (/[ñÑ]/.test(texto) && /[A-Z][^a-z]*[ñÑ]/.test(texto)) {
                sugerencias.push("Revise el uso de la 'ñ': 'NuÑEz' → 'Nuñez'"); // Sugerencia sobre el uso de la 'ñ'
            }
            if (/[A-Z]{2,}/.test(texto)) {
                sugerencias.push("Evite escribir todo en mayúsculas"); // Sugerencia de mayúsculas consecutivas
            }
            return sugerencias;
        }
        
        function esNombreValido(texto) {
            return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(texto); // Valida que solo contenga letras y espacios
        }
        
        camposNombre.forEach(selector => {
            const campo = jQuery(selector);
            
            // Crea tooltip para los campos de nombre/apellido
            let tooltip = campo.next(".tooltip-validacion");
            if (!tooltip.length) {
                tooltip = jQuery(`<span class="tooltip-validacion" style="display:none; ${tooltipStyle}"></span>`);
                campo.after(tooltip);
            }
            
            campo.on("input", function () {
                // Filtra caracteres no permitidos
                this.value = this.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, '');
                
                const capitalizado = capitalizarNombre(this.value);
                this.value = capitalizado;
                
                const sugerencias = sugerirCorrecciones(capitalizado);
                
                // Aplica estilos y muestra sugerencias o errores
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
            
            campo.attr("title", "Ingrese solo letras y espacios. El texto se capitaliza automáticamente según reglas ortográficas."); // Título del campo
        });

        // =================================================================================================
        // Validar teléfono
        //
        // =================================================================================================
        const campoTelefono = jQuery("#helpdesk_ticket_custom_field_cf_nmero_de_telfono_1588414");
        
        // Crea tooltip para el campo de teléfono
        let tooltipTelefono = campoTelefono.next(".tooltip-validacion");
        if (!tooltipTelefono.length) {
            tooltipTelefono = jQuery('<span class="tooltip-validacion" style="display:none; font-size:12px; margin-top:4px; display:block;"></span>');
            campoTelefono.after(tooltipTelefono);
        }
        
        const seriesTelefonicasValidas = ["809", "829", "849"]; // Series válidas de teléfonos en RD
        
        function validarTelefonoRD(numero) {
            if (!/^\d{10}$/.test(numero)) return false; // Valida que tenga 10 dígitos
            return seriesTelefonicasValidas.includes(numero.substring(0, 3)); // Valida que la serie sea una de las permitidas
        }
        
        function aplicarEstilosTelefono(numero) {
            if (numero.length === 0) {
                campoTelefono.css({ borderColor: "", color: "", fontWeight: "" });
                tooltipTelefono.hide();
                return;
            }
            if (validarTelefonoRD(numero)) {
                campoTelefono.css({ borderColor: "#28a745", color: "#1e5631", fontWeight: "bold" });
                tooltipTelefono.text("Número válido ✔").css({ color: "#28a745" }).show();
            } else if (numero.length === 10) {
                campoTelefono.css({ borderColor: "red", color: "", fontWeight: "normal" });
                tooltipTelefono.text("Número inválido ✘").css({ color: "red" }).show();
            } else {
                campoTelefono.css({ borderColor: "", color: "", fontWeight: "" });
                tooltipTelefono.hide();
            }
        }
        
        campoTelefono.on("input paste", function () {
            setTimeout(() => {
                this.value = this.value.replace(/\D/g, ''); // Solo permite números
                if (this.value.length > 10) {
                    this.value = this.value.substring(0, 10); // Limita a 10 dígitos
                }
                aplicarEstilosTelefono(this.value); // Aplica validación y estilos
            }, 0);
        });
        
        campoTelefono.attr("title", "Ingrese un número telefónico válido de 10 dígitos en RD (Ej.: 8091234567, 8290000000, 8491112222)"); // Título del campo
        
        // =================================================================================================
        // Validar cédula
        //
        // =================================================================================================
        const campoCedula = jQuery("#helpdesk_ticket_custom_field_cf_cedula_o_rnc_1588414");
        
        // Crea tooltip para el campo de cédula
        let tooltipCedula = jQuery('<span class="tooltip-validacion" style="display:none; font-size:12px; margin-top:4px; display:block;"></span>');
        campoCedula.after(tooltipCedula);
        
        const seriesValidas = [
            "001", "002", "003", "004", "005", "006", "007", "008", "009", "010", "011", "012", "013", "014", "015",
            "016", "017", "018", "019", "020", "021", "022", "023", "024", "025", "026", "027", "028", "029", "030",
            "031", "032", "033", "034", "035", "036", "037", "038", "039", "040", "041", "042", "043", "044", "045",
            "046", "047", "048", "049", "050", "051", "052", "053", "054", "055", "056", "057", "058", "059", "060",
            "061", "062", "063", "064", "065", "066", "067", "068", "069", "070", "071", "072", "073", "074", "075",
            "076", "077", "078", "079", "080", "081", "082", "083", "084", "085", "086", "087", "088", "089", "090",
            "091", "092", "093", "094", "095", "096", "097", "098", "099", "100", "101", "102", "103", "104", "105",
            "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120",
            "121", "402"
        ]; // Series de cédulas válidas en RD
        
        function validarCedulaRD(cedula) {
            if (!/^\d{11}$/.test(cedula)) return false; // Valida que sean 11 dígitos
            const serie = cedula.substring(0, 3);
            if (!seriesValidas.includes(serie)) return false; // Valida la serie
            
            // Algoritmo de validación de dígito verificador
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
        
        function aplicarEstilosCedula(cedula) {
            if (cedula.length === 0) {
                campoCedula.css({ borderColor: "", color: "", fontWeight: "normal" });
                tooltipCedula.hide();
                return;
            }
            if (cedula.length === 11 && validarCedulaRD(cedula)) {
                campoCedula.css({ borderColor: "#28a745", color: "#1e5631", fontWeight: "bold" });
                tooltipCedula.text("Cédula válida ✔").css({ color: "#28a745" }).show();
            } else {
                campoCedula.css({ borderColor: "red", color: "", fontWeight: "normal" });
                tooltipCedula.text("Cédula inválida ✘").css({ color: "red" }).show();
            }
        }
        
        campoCedula.on("input paste", function () {
            setTimeout(() => {
                this.value = this.value.replace(/[^0-9]/g, ''); // Solo permite números
                aplicarEstilosCedula(this.value); // Aplica validación y estilos
            }, 0);
        });
        
        campoCedula.attr("title", "Ingrese una cédula o RNC válido de 11 dígitos con serie autorizada (Ej.: 001, 121, 402...)"); // Título del campo
        
    });
</script>
