//Función para agregar un nuevo socio a mi array de socios
function ingresarSocio(nombre, apellido, email, password) {
    listaSocios.push(new Socio(nombre, apellido, email, password));
}
//Variable global con el usuario
var usr = null;

// VALIDACIONES
function isValidEmail(mail) {
    //Validacion de email
    return /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(mail);
}

function validarPwd(txtPwd) {
    var tieneLetra = false;
    var tieneDigito = false;
    var exito = false;
    //Funcion para validar contraseña
    for (var x = 0; x < txtPwd.length; x++) {
        if (txtPwd.charCodeAt(x) >= 97 && txtPwd.charCodeAt(x) <= 122) //caracteres ascii a=97 y z=122
            tieneLetra = true;
        if (txtPwd.charCodeAt(x) >= 48 && txtPwd.charCodeAt(x) <= 57) //caracteres ascii 0=48 y 9=57
            tieneDigito = true;
        if (tieneLetra && tieneDigito) { //Si cumple las dos condiciones, es valida
            exito = true;
            break;//preguntar si precisa el break
        }
    }
    return exito;
}

function validarMayuscula(texto) {
    var otroString = "";
    for (var x = 0; x < texto.length; x++) {
        if (x === 0) {
            otroString = texto[0].toUpperCase();
        } else {
            otroString = otroString + texto[x].toLowerCase();
        }
    }
    return otroString;
}

//BUSCAR OBJETO POR ALGUN DATO
function devolverObjeto(lista, campo, valor) {
    //Esta funcion me devuelve un OBJETO. Busca en el array, el campo que le pido y me da el valor
    var encontre = false;
    var objeto = null;
    var indice = 0;
    while (indice < lista.length && !encontre) {
        if (lista[indice][campo] === valor) {
            objeto = lista[indice];
            encontre = true;
        } else
            indice++;
    }
    return objeto;
}

function devolverSocio(email) {
    return devolverObjeto(listaSocios, "email", email); //Esta funcion me trae al socio por su mail
}

function devolverAdministrador(pEmail) {
    return devolverObjeto(listaAdmin, "email", pEmail); //Esta funcion me trae al administrador por su mail
}

function devolverEquipoExistente(equipo) {
    return devolverObjeto(listaEquipos, "nombre", equipo); //Esta funcion me devuelve el equipo al que pertenece el socio
}

function devolverSociosDeUnEquipo(nombreDelEquipo) {
    //Esta funcion me devuelve un ARRAY de socios que pertenecen a un mismo equipo
    var socios = [];
    for (var x = 0; listaSocios.length > x; x++) {
        if (listaSocios[x].equipo === nombreDelEquipo) {
            socios.push(listaSocios[x]);
        }
    }
    return socios;
}

function devolverCompetencia(lista, competencia) {
    var encontre = false;
    var objeto = null;
    var x = 0;
    while (x < lista.length && !encontre) {
        if (lista[x] === competencia) {
            objeto = lista[x];
            encontre = true;
        } else
            x++;
    }
    return objeto;
}

function eliminarEquiposDuplicados(listaDeEquipos) {
    var aux = [];
    for (var x = 0; x < listaDeEquipos.length; x++) {
        if (!isInArray(listaDeEquipos[x].equipo, aux)) {
            aux.push(listaDeEquipos[x].equipo);
        }
    }
    return aux;
}

function eliminarCompetenciasDuplicadas(listaDeCompetencias) {
    var aux = [];
    for (var x = 0; x < listaDeCompetencias.length; x++) {
        if (!isInArray(listaDeCompetencias[x].competencia, aux)) {
            aux.push(listaDeCompetencias[x].competencia);
        }
    }
    return aux;
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function devolverEquiposDeUnaCompetencia(pCompetencia) {
    var equiposEnCompetencia = devolverListaDeObjetos(listaInscriptos, "competencia", pCompetencia);
    var equipos = eliminarEquiposDuplicados(equiposEnCompetencia);
    return equipos;
    //$("#slcIniciar2").html(comboUnParametro(equipos));
}

function mostrarDatosDeEquipos(equipos) {
    for (var x = 0; x < equipos.length; x++) {
        var metrosRecorridosPorEquipo = 0;
        var sociosDelEquipo = devolverSociosDeUnEquipo(equipo[x].nombre);
        for (var i = 0; i < sociosDelEquipo.length; i++) {
            metrosRecorridosPorEquipo += sociosDelEquipo[i].metros;
        }

    }
}

//DEVOLVER LISTAS DE OBJETOS
function devolverListaDeObjetos(arrayDondeEsta, nombreCampoClave, valorCampoClave) {
    var listaDeObjetos = [];
    for (var x = 0; x < arrayDondeEsta.length; x++) {
        var loQueDevuelveElFor = arrayDondeEsta[x];
        if (loQueDevuelveElFor[nombreCampoClave] === valorCampoClave) {
            listaDeObjetos.push(arrayDondeEsta[x]);
        }
    }
    return listaDeObjetos;
}

function existeEquipo(pCompetencia, pEquipo) {
    var resultado = true;
    var auxListaCompetencias = devolverListaDeObjetos(listaInscriptos, "competencia", pCompetencia);
    var listaDeEquipos = devolverListaDeObjetos(auxListaCompetencias, "equipo", pEquipo);
    if (listaDeEquipos.length === 0) {
        resultado = false;
    }
    return resultado;
}

function sonTresSocios(pEquipo) {
    var listaDeSocios = devolverListaDeObjetos(listaSocios, "equipo", pEquipo);
    var resultado = true;
    if (listaDeSocios.length !== tope) {
        resultado = false;
    }
    return resultado;
}

function topeInscripcionEq(pEquipo) {
    var listaDeSocios = devolverListaDeObjetos(listaSocios, "equipo", pEquipo);
    var resultado = false;
    if (listaDeSocios.length < tope) {
        resultado = true;
    }
    return resultado;
}

function estanHabilitados(pEquipo) {
    var listaDeSocios = devolverListaDeObjetos(listaSocios, "equipo", pEquipo);
    var socioHabilitado = true;

    for (var x = 0; x < listaDeSocios.length; x++) {
        var socioActual = listaDeSocios[x];
        if (socioActual.habilitado === false) {
            socioHabilitado = false;
            break;
        }
    }
    return socioHabilitado;
}

function sociosDeUnEquipo(pEquipo) {
    var listaDeSocios = devolverListaDeObjetos(listaSocios, "equipo", pEquipo);
    return listaDeSocios;
}

//CREAR SELECT CON DATOS DE UN ARRAY
function comboCuatroParametros(lista, valor1, valor2, mail) {
    var textoAOption = "";
    for (var i = 0; i < lista.length; i++) {
        textoAOption += "<option value='" + lista[i][mail] + "'>" + lista[i][valor1] + " " + lista[i][valor2] + "</option>";
    }
    return textoAOption;
}
function comboDosParametros(lista, valor) {
    var textoAOption = "";
    for (var i = 0; i < lista.length; i++) {
        textoAOption += "<option>" + lista[i][valor] + "</option>";
    }
    return textoAOption;
}

function comboUnParametro(lista) {
    var textoAOption = "";
    for (var x = 0; x < lista.length; x++) {
        textoAOption += "<option>" + lista[x] + "</option>";
    }
    return textoAOption;
}

//CREAR TABLA
function generarTablaObj(listaObj, listaIgnorar) {
    var listaDeAtributos = Object.keys(listaObj[0]);
    var tabla = "<table border='1'><tr>";
    var linea = [];
    for (var x = 0; x < listaDeAtributos.length; x++)
        if (listaIgnorar.indexOf(x) === -1)
            tabla += "<th>" + listaDeAtributos[x] + "</th>";
    tabla += "</tr>";
    for (var x = 0; x < listaObj.length; x++) {
        linea = listaObj[x];
        tabla += "<tr>";
        for (var y = 0; y < listaDeAtributos.length; y++)
            if (listaIgnorar.indexOf(y) === -1)
                tabla += "<td>" + linea[listaDeAtributos[y]] + "</td>";
        tabla += "</tr>";
    }
    tabla += "</table>";
    return tabla;
}

function esElUltimoSocio(pEquipo, pSocio, pCompetencia) {
    var resultado = false;
    var listaDeSocios = devolverListaDeObjetos(listaInscriptos, "equipo", pEquipo);
    listaDeSocios = devolverListaDeObjetos(listaDeSocios, "competencia", pCompetencia);
    if (listaDeSocios.indexOf(pSocio) === 2) {
        resultado = true;
    }
    return resultado;
}


function mostrarDatosDeSociosOrdenados(competencia) {
    var inscriptosACompetencia = devolverListaDeObjetos(listaInscriptos, "competencia", competencia);
    var inscriptosOrdenadosPorMetros = inscriptosACompetencia.sort(function (a, b) {
        return (b.metros - a.metros);
    });
    $("#tablaDeDatosSocios").append("<tr><th>" + "USUARIO" + "</th><th>" + "METROS" + "</th></tr>")
    for (var i = 0; i < inscriptosOrdenadosPorMetros.length; i++) {
        var inscriptoActual = inscriptosOrdenadosPorMetros[i];
        agregarLineaATablaDatosSocios(inscriptoActual);
    }
}


function agregarLineaATablaDatosSocios(inscriptoActual) {
    $("#tablaDeDatosSocios").append("<tr><td>" + inscriptoActual.email + "</td><td>" + inscriptoActual.metros + "</td></tr>")
}

function mostrarDatosDeEquipos(competencia) {
    var inscriptosACompetencia = devolverListaDeObjetos(listaInscriptos, "competencia", competencia);
    var equiposDeCompetencia = eliminarEquiposDuplicados(inscriptosACompetencia);

    $("#tablaDeDatosEquipos").append("<tr><th>" + "NOMBRE EQUIPO" + "</th><th>" + "METROS TOTALES" + "</th></tr>");
    for (var i = 0; i < equiposDeCompetencia.length; i++) {
        var equipoActual = equiposDeCompetencia[i];
        var metrosTotalesDelEquipo = calcularTotalDeMetrosDelEquipo(equipoActual, inscriptosACompetencia);
        agregarLineaATablaDatosEquipos(metrosTotalesDelEquipo, equipoActual);
    }
}

function calcularTotalDeMetrosDelEquipo(equipo, inscriptosACompetencia) {
    var metros = 0;
    for (var i = 0; i < inscriptosACompetencia.length; i++) {
        if (inscriptosACompetencia[i].equipo === equipo) {
            metros += inscriptosACompetencia[i].metros;
        }
    }
    return metros;
}

function agregarLineaATablaDatosEquipos(metros, equipo) {
    $("#tablaDeDatosEquipos").append("<tr><td>" + equipo + "</td><td>" + metros + "</td></tr>")
}

function crearReporte(equipo) {
    var equipo = devolverEquipoExistente(equipo);

    //Cargar logo del equipo
    $("#imagenLogoEquipo").attr('src', "img/" + equipo.logo);

    //Competencias participadas
    var competencias = devolverListaDeObjetos(listaInscriptos, "equipo", equipo.nombre);
    var competenciasSinDuplicados = eliminarCompetenciasDuplicadas(competencias);
    for (var i = 0; i < competenciasSinDuplicados.length; i++) {
        $("#competenciasParticipadas").append("<li>" + competenciasSinDuplicados[i] + "</li>")
    }

    //Metros recorridos
    var metrosRecorridos = 0;
    for (var i = 0; i < competencias.length; i++) {
        metrosRecorridos += competencias[i].metros;
    }
    $("#metrosRecorridosPorEquipo").append("<li>" + metrosRecorridos + "</li>")

    var sociosDelEquipo = devolverSociosDeUnEquipo(equipo.nombre);
    for (var i = 0; i < sociosDelEquipo.length; i++) {
        $("#integrantesEquipo").append("<li>" + sociosDelEquipo[i].nombre + " " + sociosDelEquipo[i].apellido + "</li>");
    }

    $("#reporteGeneradoAdmin").show();

}

function mostrarMensajes(textoDelMensaje, tipo) {
    borrarMensajesAnteriores();
    $("#pMensaje" + tipo).html(textoDelMensaje);
}

function borrarMensajesAnteriores() {
    $("#pMensajeError").empty();
    $("#pMensajeExito").empty();
}
