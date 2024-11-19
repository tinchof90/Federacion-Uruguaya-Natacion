$().ready(iniciar);
function iniciar() {
    // Invocar funciones varias
    mostrarLogin();
    // Aca van todos los eventos

    //Acciones de pantalla principal
    $("#btnIniciarSesion").click(iniciarSesion);
    $("#btn-mostrar-registro").click(mostrarRegistro);

    //Acciones de pantalla para Nuevo Registro
    $("#btnRegistrarse").click(registrarse);

    //Acciones de Nav Principal tanto para Socio como Administrador
    $("#cerrarSesion").click(logOut);

    //Acciones de Nav Principal para Socios
    $("#btn1").click(mostrarAsignarseEquipo);
    $("#btn2").click(mostrarCrearEquipo);
    $("#btn3").click(abandonarEquipo);
    $("#btn4").click(mostrarCompetencias);
    $("#btn5").click(mostrarReporteSocio);

    //Acciones de pantalla Asignarse a un Equipo (Socios)
    $("#btnAsignarseEquipo").click(asignarseEquipo);

    //Acciones de pantalla Crear Equipo (Socios)
    $("#btnGenerarEquipo").click(crearEquipo);
    $("#img1").prop('checked', true);

    //Acciones de pantalla Competencias (Socios)
    $("#btnInscribirseCompetencia").click(inscripcionCompetencia);

    //Acciones de pantalla Reportes para socios

    $("#btnCambiarContraseña").click(mostrarCambiarContraseña);

    $("#btnConfirmarContra").click(cambioContra);







    $("#btn6").click(mostrarHabilitarSocio);
    $("#btnHabilitar").click(habilitarSocio);
    $("#btn7").click(mostrarCrearCompetencia);
    $("#btnCrearCompetencia").click(crearCompetencia);
    $("#btn8").click(mostrarIniciarCompetencia);
    $("#slcIniciar1").change(cargarComboEquipos);
    $("#slcIniciar2").change(cargarComboSocios);
    $("#slcIniciar2").click(cargarComboSocios);
    $("#slcIniciar3").change(limpiarCampoMetros);
    $("#btn9").click(mostrarPantallaReporteAdmin);
    $("#btnAcumular").click(acumularDatos);
    $("#btnMostrarDatos").click(mostrarDatosCompetencia);
    $("#btnGenerarReporteAdmin").click(generarReporteAdmin);

}


var tope = 3; //Variable global con el maximo de socios en un equipo
var tipoDeUsuario = ""; //Creo una variable con el tipo de usuario para poder usarlo en cualquier función

//Funcion encargada de hacer el login del socio o administrador
function iniciarSesion() {
    var email = $("#mailUsuario").val();
    var psw = $("#pswContraseña").val();
    var tipo = $("#slcUsuario").val();
    if (tipo === "Socio") { // Si el tipo de usuario es socio
        usr = devolverSocio(email);
        tipoDeUsuario = "Socio";
        if (usr !== null) {
            if (usr.password === psw) { //y la contraseña coincide
                mostrarPantallaSocio(); //Inicio sesion
            } else { // Si no, muestro mensaje de error
                mostrarMensajes("Usuario o Contraseña incorrecta", "Error");
            }
        } else {
            mostrarMensajes("Usuario no registrado como socio", "Error");
        }
    }
    if (tipo === "Administrador") { //Si el tipo de usuario es Administrador
        usr = devolverAdministrador(email);
        tipoDeUsuario = "Administrador";
        if (usr !== null) {
            if (usr.password === psw) { //y la contraseña coincide
                mostrarPantallaAdmin(); //inicio sesion
            } else { //Si no, muestro mensaje de error
                mostrarMensajes("Usuario o Contraseña incorrecta", "Error");
            }
        } else {
            mostrarMensajes("Usuario no registrado como administrador", "Error");
        }
    }
}

//Funcion encargada de desloguear un socio o administrador
function logOut() {
    usr = null; //Llamo a la variable global que contiene al usuario y le paso valor nulo
    mostrarLogin(); //Muestro la pantalla de Login
}

//Funcion encargada de los nuevos registros de socios
function registrarse() {
    var todoOk = true; //Creo una variable que almacene todas las validaciones
    //Levanto los valores de los input
    var nombreSocio = validarMayuscula($("#txtNombre").val());
    var apellidoSocio = validarMayuscula($("#txtApellido").val());
    var mailSocio = $("#mailUsuarioRegistro").val();
    var contraseñaSocio = $("#pswContraseñaRegistro").val();
    usr = devolverSocio(mailSocio); //Levanto al usuario por su email
    //Me aseguro que los campos "nombre" y "apellido" no esten vacìos
    if ((nombreSocio === "") || (apellidoSocio === "") || (mailSocio === "") || (contraseñaSocio === "")) {
        todoOk = false;
        mostrarMensajes("Debe completar todos los campos.", "Error");
    } else if (!isValidEmail(mailSocio) || usr !== null) { // Si el mail es no es válido o el usuario no es null:
        todoOk = false;
        mostrarMensajes("Email incorrecto.", "Error"); //Muestro mensaje de error.
    } else if (!validarPwd($("#pswContraseñaRegistro").val())) { //Si la contraseña no es vàlida (no contiene al menos un nro y una letra)
        todoOk = false;
        mostrarMensajes("Password incorrecto - la contraseña debe tener al menos una letra y un numero", "Error");//Muestro mensaje de error
    }
    if (todoOk) { //Si todos los campos dan true despues de validar:
        ingresarSocio(nombreSocio, apellidoSocio, mailSocio, contraseñaSocio); //Ingreso al socio
        mostrarMensajes("Registro exitoso, espere...", "Exito");//Y muestro mensaje de éxito
        setTimeout(mostrarLogin, 2500);
    }
}

//La funcion se encarga de cambiar la contraseña de un Usuario
function cambioContra() {
//Levanto los valores de los inputs
    var contraseñaAnterior = $("#pswContraAnt").val();
    var contraseñaNueva = $("#pswNuevaContra").val();
    var repetirContraseña = $("#pswRepetirNuevaContra").val();
    // Creo una variable para cada una de las validaciones que debo hacer
    var contraseñasDistintas = false;
    var contraAntOk = false;
    var nuevaContra = false;
    var validarPws = false;

    if (contraseñaAnterior === usr.password) { //Si la contraseña anterior coincide con la que tiene guardada el socio
        contraAntOk = true;
        if (contraseñaAnterior !== contraseñaNueva) {
            contraseñasDistintas = true;
            if (contraseñaNueva === repetirContraseña) { //Y las nuevas contraseñas coinciden, valido.
                nuevaContra = true;
                if (validarPwd(contraseñaNueva)) { //Si contiene al menos una letra y un número, valido
                    validarPws = true;
                } else { //Si no, muestro mensaje de error
                    mostrarMensajes("La contraseña debe contener al menos una letra y un numero", "Error");
                }
            } else {
                mostrarMensajes("Las contraseñas no coinciden", "Error");
            }
        } else {
            mostrarMensajes("La nueva contraseña debe ser distinta a la anterior", "Error");
        }
    } else {
        mostrarMensajes("La contraseña anterior es incorrecta", "Error");
    }
    if (contraAntOk && nuevaContra && validarPws && contraseñasDistintas) { //Si todo está OK
        usr.password = contraseñaNueva; //Le asigno al socio la nueva contraseña, y muestro msj de exito
        mostrarMensajes("Cambio de clave exitoso, espere...", "Exito");
        if (usr === "Socio") {
            setTimeout(mostrarPantallaSocio, 2500);
        } else {
            setTimeout(mostrarPantallaAdmin(), 2500);

        }
    }
}

/*
 La funcion se encarga de crear un nuevo equipo con los datos aportados por el socio.
 Utiliza los datos de Nombre equipo e imagen.
 */
function crearEquipo() {
    //Obtengo el valor del campo nombre
    var nombreDelEquipo = $("#txtNombreEquipo").val();

    //Obtengo la imagen de logo seleccionada
    var valorFoto = "Img/" + $("input[name='imagen']:checked").val();

    if (nombreDelEquipo === "") { //Si no escribe nada en el input, muestro mensaje de error
        mostrarMensajes("Por favor ingrese un nombre", "Error");
    } else if (usr.equipo !== null) { //Verifico que el socio no tenga equipo asignado
        mostrarMensajes("El socio ya tiene un equipo asignado, no puede pertenecer a dos equipos", "Error");
    } else {
        var nombreOK = validarMayuscula(nombreDelEquipo); //Me aseguro que el nombre del equipo empiece con mayuscula y el resto sea minuscula.
        if (devolverEquipoExistente(nombreOK) === null) { //Si el nombre del equipo no existe, lo agrego a la lista de equipos
            //Creo el nuevo equipo con los datos aportados por el Socio
            var equipo = new Equipo(nombreOK, valorFoto);
            //Lo agrego a la lista de equipos
            listaEquipos.push(equipo);
            usr.equipo = nombreOK;
            //Muestro un mensaje de exito
            mostrarMensajes(nombreOK + " creado correctamente", "Exito");
        } else { //Si no, muestro msj de error
            mostrarMensajes(nombreOK + " ya existe, ingrese otro nombre.", "Error");
        }
    }
}

/*
 La funcion permite al socio logueado abadonar un equipo del que forma parte.
 */
function abandonarEquipo() {
    //Si el socio no pertenece a ningun equipo, muestro un error
    if (usr.equipo === null) {
        mostrarMensajes("El socio no formaba parte de un equipo", "Error");
    }
    //Si el usuario pertenece a algun equipo,entonces lo abandono y muestro un mensaje de exito
    else {
        usr.equipo = null;
        mostrarMensajes("Equipo abandonado con exito", "Exito");
    }
}


/*
 La funcion permite que un socio se asigne a un equipo
 */
function asignarseEquipo() {
    var nuevoEquipo = $("#slcEquipo").val(); //Levanto el valor del input en una variable
    if (usr.equipo !== null) { //Si el usuario ya pertenece a un equipo
        mostrarMensajes("El socio ya tiene un equipo asignado, no puede pertenecer a dos equipos", "Error"); //Muestro mensaje de error

    } else if (topeInscripcionEq(nuevoEquipo) === false) { //Si el grupo ya tiene 3 integrantes
        mostrarMensajes("Este equipo ya tiene 3 socios", "Error");//Si no, muestro mensaje de error
    } else {
        usr.equipo = nuevoEquipo; //Si no, agrego al socio al nuevo equipo
        mostrarMensajes("Bienvenido a " + nuevoEquipo, "Exito");//Y le muestro el mensaje de bienvenida
    }
}


//La funcion permite que un usuario inscriba su equipo a una competencia
function inscripcionCompetencia() {
    var competencia = $("#slcCompetencia").val();
    var equipo = usr.equipo;
    var socio = usr.email;
    var equipoInscripto = false;
    var socioConEquipo = false;
    var equipoDeTres = false;
    var sociosHabilitados = false;

    if (existeEquipo(competencia, equipo) === false) { //Primero valido que el grupo no esté inscripto a la competencia
        equipoInscripto = true;
        if (equipo !== null) { // Después valido que el socio pertenezca a un equipo
            socioConEquipo = true;
            if (sonTresSocios(equipo)) { //Después valido que el equipo tenga tres socios
                equipoDeTres = true;
                if (estanHabilitados(equipo)) { //Por último valido que los tres socios estén habilitados
                    sociosHabilitados = true;
                } else {
                    mostrarMensajes("Los tres socios deben estar habilitados para inscribirse a una competencia", "Error");
                }
            } else {
                mostrarMensajes("El equipo debe tener tres socios para inscribirse a una competencia", "Error");
            }
        } else {
            mostrarMensajes("Debes estar inscripto a un equipo para anotarte en esta competencia", "Error");
        }
    } else {
        mostrarMensajes("Tu equipo ya está inscripto a esta competencia", "Error");
    }
    if (equipoInscripto, socioConEquipo, equipoDeTres, sociosHabilitados) {
        var listaSociosEq = devolverListaDeObjetos(listaSocios, "equipo", equipo);
        for (var i = 0; i < listaSociosEq.length; i++) {
            socio = listaSociosEq[i]["email"];
            listaInscriptos.push(new Inscriptos(socio, equipo, competencia, 0));
            mostrarMensajes("Equipo inscripto. Suerte en la competencia!", "Exito");
        }
    }
}

//La funcion genera y muestra el reporte del Socio
function mostrarReporteSocio() {
    mostrarPantallaReporteSocio();
    var socio = usr.email;
    $("#tablaDeReporteSocio").html(generarTablaObj(devolverListaDeObjetos(listaInscriptos, "email", socio), [0]));
}

//La funcion permite habilitar o deshabilitar un socio
function habilitarSocio() {
    var mail = $("#slcSociosHabilitados").val();
    var usuario = devolverSocio(mail);

    if (usuario.habilitado) {
        usuario.habilitado = false;
        mostrarMensajes("Socio deshabilitado con exito", "Exito");

    } else {
        usuario.habilitado = true;
        mostrarMensajes("Socio hablitado con exito", "Exito");

    }
}

//La funcion crea nueva competencias
function crearCompetencia() {
    //Levanto el valor de los input en una variable
    var nombreDeLaCompetencia = $("#txtNombreCompetencia").val();
    var nombreDeLaCompetenciaOk = validarMayuscula(nombreDeLaCompetencia);
    if (nombreDeLaCompetenciaOk === "") { //Si no escribe nada en el input, muesSitro mensaje de error
        mostrarMensajes("Por favor ingrese un nombre", "Error");
    } else {//Si no existe una competencia con ese nombre, agrego la competencia a la lista
        if (devolverCompetencia(listaCompetencias, nombreDeLaCompetenciaOk) === null) {
            mostrarMensajes("Competencia " + nombreDeLaCompetenciaOk + " creada con exito", "Exito");
            listaCompetencias.push(nombreDeLaCompetenciaOk);
        } else {//Sino, muestro mensaje de error
            mostrarMensajes("Ya existe una competencia con ese nombre", "Error");
        }
    }
}



function cargarComboEquipos() {
    //Obtengo la competencia que esta cargada en el select
    var competencia = $("#slcIniciar1").val();
    //Busco los equipos que estan en la competencia seleccionada
    var equiposEnCompetencia = devolverEquiposDeUnaCompetencia(competencia);

    //Si no hay equipos en dicha competencia
    if (equiposEnCompetencia.length < 1) {
        //Muestro un error y limpio los campos de los demas selects
        mostrarMensajes("La competencia seleccionada no tiene ningun equipo asignado. Seleccione otra.", "Error");
        $("#slcIniciar2").empty();
        $("#slcIniciar3").empty()
    } else {
        //Cargo el select de equipos con los equipos que pertenecen a la competencias
        $("#slcIniciar2").html(comboUnParametro(equiposEnCompetencia));
    }

}

function cargarComboSocios() {
    var equipo = $("#slcIniciar2").val();
    if (equipo !== null) {
        var listaDeSocios = sociosDeUnEquipo(equipo);
        var lista = [];
        for (var i = 0; i < listaDeSocios.length; i++)
            lista.push(listaDeSocios[i]);
        $("#slcIniciar3").html(comboCuatroParametros(lista, "nombre", "apellido", "email"));
    } else {
        $("#slcIniciar3").empty();
    }

}

function iniciarCompetencia() {
    var competencia = $("#slcIniciar1").val();
    var equipo = $("#slcIniciar2").val();
    devolverSocioNoLogueado($("#slcIniciar3").val());
}

function acumularDatos() {
    vaciarTodo();
    //Obtengo el socio seleccionado al que se le desea agregar metros
    var socioSeleccionado = $("#slcIniciar3").val();

    //Obtengo los metros ingresados en el campo
    var metros = parseInt($("#txtMetrosRecorridos").val());

    //Si el campo metros es un numero
    if (!isNaN(metros)) {
        //Obtengo la competencia
        var competencia = $("#slcIniciar1").val();
        //Obtengo el equipo
        var equipo = $("#slcIniciar2").val();

        var listaDeSocios = devolverListaDeObjetos(listaInscriptos, "email", socioSeleccionado);
        var socio = devolverObjeto(listaDeSocios, "competencia", competencia);
        var nombreDelSocio = $("#slcIniciar3 option:selected").text();

        //Chequeo si es el ultimo socio al que se le estan ingresando los metros
        if (esElUltimoSocio(equipo, socio, competencia)) {
            if (metros % 25 === 0) {
                socio.metros = socio.metros + metros;
                mostrarMensajes("Se han agregado " + metros + " metros al usuario " + nombreDelSocio, "Exito");
            } else {
                mostrarMensajes("Los metros ingresados deben ser múltiplos de 25", "Error");
            }
        }
        //Si no es el ultimo socio
        else {
            if (metros % 50 === 0) {
                socio.metros = socio.metros + metros;
                mostrarMensajes("Se han agregado " + metros + " metros al usuario " + nombreDelSocio, "Exito");
            } else {
                mostrarMensajes("Los metros ingresados deben ser múltiplos de 50", "Error");
            }
        }

    } else {
        mostrarMensajes("Ingrese un numero en el campo metros.", "Error");
    }

}

function mostrarDatosCompetencia(){
  vaciarTodo();
  var competencia = $("#slcIniciar1").val();
  var equipo = $("#slcIniciar2").val();
  if(equipo !== null){
    if(inscriptosTienenMetrosCargados()){
      mostrarDatosDeEquipos(competencia);
      $("#datosEquipos").show();
      mostrarDatosDeSociosOrdenados(competencia);
      $("#datosSocios").show();
    }

    else{
      mostrarMensajes("Primero se debe ingresar metros a todos los inscriptos", "Error");
    }

  }
  else{
    mostrarMensajes("La competencia no tiene equipos asignados.", "Error");
  }
}

function inscriptosTienenMetrosCargados(){
  var competencia = $("#slcIniciar1").val();
  var resultado = true;
  var inscriptosAux = devolverListaDeObjetos(listaInscriptos, "competencia", competencia);
  for(var i = 0; i < inscriptosAux.length; i++) {
    if(inscriptosAux[i].metros === 0){
      resultado = false;
    }
  }
  return resultado;
}


function vaciarTodo() {
    $("#pswContraAnt").val('');
    $("#pswNuevaContra").val('');
    $("#pswRepetirNuevaContra").val('');
    $("#txtNombreEquipo").val('');
    $("#txtNombre").val('');
    $("#txtApellido").val('');
    $("#mailUsuarioRegistro").val('');
    $("#pswContraseñaRegistro").val('');
    $("#mailUsuario").val('');
    $("#pswContraseña").val('');
    $("#txtNombreCompetencia").val('');
    $("#tablaDeReporteSocio").empty();
    borrarMensajesAnteriores();

    $("#tablaDeDatosEquipos").empty();
    $("#tablaDeDatosSocios").empty();
    $("#datosSocios").hide();
    $("#datosEquipos").hide();

    $("#reporteAdmin").hide();
    $("#reporteGeneradoAdmin").hide();

}

function generarReporteAdmin() {
    limpiarReporte();
    var equipo = $("#slcReporteEquipos").val();
    crearReporte(equipo);
}



/********************************************************
 -----Funciones encargadas de mostrar u ocultar cosas-----
 *********************************************************/


function mostrarIniciarCompetencia() {
    //Vaciamos todos los campos innecesarios
    vaciarTodo();

    //Escondo
    $("#menuSocio").hide();
    $("#inicioSesion").hide();
    $("#registro").hide();
    $(".classcambio").hide();
    $(".classCrearEquipo").hide();
    $("#divSelect").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").hide();

    //Muestro
    $(".navPrincipal").show();
    $("#menuAdmin").show();
    $("#aux").show();
    $("#iniciarCompetencia").show();

    //Cargo el Select con las competencias
    $("#slcIniciar1").html(comboUnParametro(listaCompetencias));

    //Cargo los equipos de esa competencia
    cargarComboEquipos();

    //Cargo los socios asociados a ese equipo
    cargarComboSocios();

}

function mostrarCrearCompetencia() {
    vaciarTodo();
    $(".navPrincipal").show();
    $("#menuSocio").hide();
    $("#menuAdmin").show();
    $("#aux").show();
    $("#inicioSesion").hide();
    $("#registro").hide();
    $(".classcambio").hide();
    $(".classCrearEquipo").hide();
    $("#divSelect").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").show();
    $("#habilitacionSocio").hide();
    $("#iniciarCompetencia").hide();
}

function mostrarPantallaReporteSocio() {
    vaciarTodo();
    $(".navPrincipal").show();
    $("#menuSocio").show();
    $("#tablaDeReporteSocio").show();
    $("#aux").show();
    $("#inicioSesion").hide();
    $("#registro").hide();
    $(".classcambio").hide();
    $(".classCrearEquipo").hide();
    $("#divSelect").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").hide();
    $("#iniciarCompetencia").hide();
}

function mostrarPantallaAdmin() {
    vaciarTodo();
    $(".navPrincipal").show();
    $("#menuSocio").hide();
    $("#menuAdmin").show();
    $("#aux").show();
    $("#inicioSesion").hide();
    $("#registro").hide();
    $(".classcambio").hide();
    $(".classCrearEquipo").hide();
    $("#divSelect").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").hide();
    $("#iniciarCompetencia").hide();
}

function mostrarPantallaReporteAdmin() {
    vaciarTodo();
    $(".navPrincipal").show();
    $("#menuSocio").hide();
    $("#menuAdmin").show();
    $("#aux").show();
    $("#inicioSesion").hide();
    $("#registro").hide();
    $(".classcambio").hide();
    $(".classCrearEquipo").hide();
    $("#divSelect").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").hide();
    $("#iniciarCompetencia").hide();
    var equipos = [];
    for (var i = 0; i < listaEquipos.length; i++) {
        equipos.push(listaEquipos[i].nombre);
    }
    $("#slcReporteEquipos").html(comboUnParametro(equipos));
    $("#reporteAdmin").show();
}

function mostrarHabilitarSocio() {
    $(".navPrincipal").show();
    $("#menuSocio").hide();
    $("#menuAdmin").show();
    $("#aux").show();
    $("#inicioSesion").hide();
    $("#registro").hide();
    $(".classcambio").hide();
    $(".classCrearEquipo").hide();
    $("#divSelect").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").show();
    $("#iniciarCompetencia").hide();
    $("#reporteAdmin").hide();
    $("#reporteGeneradoAdmin").hide();

    var lista = [];
    for (var i = 0; i < listaSocios.length; i++)
        lista.push(listaSocios[i]);
    $("#slcSociosHabilitados").html(comboCuatroParametros(lista, "nombre", "apellido", "email"));
}

//La funcion se encarga de mostrar todo lo relevante a la pantalla Asignarse a Equipo
function mostrarAsignarseEquipo() {
    vaciarTodo();

    //Escondo lo que no preciso en esta Pantalla
    $("#menuAdmin").hide();
    $("#inicioSesion").hide();
    $("#registro").hide();
    $(".classcambio").hide();
    $(".classCrearEquipo").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").hide();
    $("#iniciarCompetencia").hide();

    //Muestro lo relacionado a la Pantalla
    $(".navPrincipal").show();
    $("#menuSocio").show();
    $("#aux").show();
    $("#divSelect").show();

    //Cargo el select con los equipos
    var lista = [];
    for (var i = 0; i < listaEquipos.length; i++)
        lista.push(listaEquipos[i]);
    $("#slcEquipo").html(comboDosParametros(lista, "nombre"));
}

//La funcion se encarga de mostrar la pantalla para el cambio de contraseña
function mostrarCambiarContraseña() {
    vaciarTodo();
    if (tipoDeUsuario === "Socio") {
        $("#menuSocio").show();
        $("#menuAdmin").hide();

    } else if (tipoDeUsuario === "Administrador") {
        $("#menuSocio").hide();
        $("#menuAdmin").show();
    }
    $(".navPrincipal").show();
    $("#aux").show();
    $("#inicioSesion").hide();
    $("#registro").hide();
    $(".classcambio").show();
    $(".classCrearEquipo").hide();
    $("#divSelect").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").hide();
    $("#iniciarCompetencia").hide();
}

//La funcion se encarga de mostrar la pantalla de login
function mostrarLogin() {
    vaciarTodo();
    $(".navPrincipal").show();
    $("#menuSocio").hide();
    $("#menuAdmin").hide();
    $("#aux").hide();
    $("#inicioSesion").show();
    $("#registro").hide();
    $(".classcambio").hide();
    $(".classCrearEquipo").hide();
    $("#divSelect").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").hide();
    $("#iniciarCompetencia").hide();
}

//La funcion se encarga de mostrar la pantalla para registrar nuevos socios
function mostrarRegistro() {
    vaciarTodo();
    $(".navPrincipal").show();
    $("#menuSocio").hide();
    $("#menuAdmin").hide();
    $("#aux").hide();
    $("#inicioSesion").hide();
    $("#registro").show();
    $(".classcambio").hide();
    $(".classCrearEquipo").hide();
    $("#divSelect").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").hide();
    $("#iniciarCompetencia").hide();
}

function mostrarPantallaSocio() {
    vaciarTodo();
    $(".navPrincipal").show();
    $("#menuSocio").show();
    $("#menuAdmin").hide();
    $("#aux").show();
    $("#inicioSesion").hide();
    $("#registro").hide();
    $(".classcambio").hide();
    $(".classCrearEquipo").hide();
    $("#divSelect").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").hide();
    $("#iniciarCompetencia").hide();
}

function mostrarCrearEquipo() {
    vaciarTodo();
    $(".navPrincipal").show();
    $("#menuSocio").show();
    $("#menuAdmin").hide();
    $("#aux").show();
    $("#inicioSesion").hide();
    $("#registro").hide();
    $(".classcambio").hide();
    $(".classCrearEquipo").show();
    $("#divSelect").hide();
    $("#divSelect2").hide();
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").hide();
    $("#iniciarCompetencia").hide();
}

function mostrarCompetencias() {
    vaciarTodo();
    $(".navPrincipal").show();
    $("#menuSocio").show();
    $("#menuAdmin").hide();
    $("#aux").show();
    $("#inicioSesion").hide();
    $("#registro").hide();
    $(".classcambio").hide();
    $(".classCrearEquipo").hide();
    $("#divSelect").hide();
    $("#divSelect2").show();
    $("#slcCompetencia").html(comboUnParametro(listaCompetencias));
    $("#crearCompetencia").hide();
    $("#habilitacionSocio").hide();
    $("#iniciarCompetencia").hide();
}

/********************************************************
 -----------------Otras funciones auxiliares--------------
 *********************************************************/

//La funcion limpia el campo metros
function limpiarCampoMetros() {
    $("#txtMetrosRecorridos").val('');
}

//Limpia el historial del reporte, es decir si ya habia un reporte hecho, lo borra de la pantalla y muestra otro
function limpiarReporte() {
    $("#competenciasParticipadas").empty();
    $("#metrosRecorridosPorEquipo").empty();
    $("#integrantesEquipo").empty();
}
