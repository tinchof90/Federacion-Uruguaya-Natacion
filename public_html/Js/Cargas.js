// Lista de datos
var listaSocios = [];
var listaEquipos = [];
var listaAdmin = [];
var listaCompetencias = ["Torneo1", "Torneo2", "Torneo3"];
var listaInscriptos = [];

// Estructuras
function Socio(pNombre, pApellido, pEmail, pPassword, pEquipo) {
    this.nombre = pNombre;
    this.apellido = pApellido;
    this.email = pEmail;
    this.password = pPassword;
    this.equipo = pEquipo === undefined ? null : pEquipo;
    this.habilitado = true;
}
function Administrador(pEmail, pPassword) {
    this.email = pEmail;
    this.password = pPassword;
}
function Equipo(pNombre, pLogo) {
    this.nombre = pNombre;
    this.logo = pLogo;
}
function Inscriptos(pEmail,pEquipo,pCompetencia, pMetros){
   this.email = pEmail;
   this.equipo = pEquipo;
   this.competencia = pCompetencia;
   this.metros = pMetros;
}
// Capturos los datos

//TODO: Sacar los true
var socio1 = new Socio("Martin", "Facio", "tinchofacio@gmail.com", "m1", "Equipo rocket", true);
var socio2 = new Socio("Juan", "Perez", "juan@gmail.com", "Juan1", "Aston birra", true);
var socio3 = new Socio("Sofia", "Rovira", "sofia@gmail.com", "Sofia1",null, true);
var socio4 = new Socio("Franca", "Croce", "franca@gmail.com", "Franca1", "Equipo rocket", true);
var socio5 = new Socio("Jorge", "Kleinman", "jorge@gmail.com", "Jorge1", "Aston birra", true);
var socio6 = new Socio("Alberto", "Gonzalez", "alberto@gmail.com", "Alberto1", "Los angeles de la siesta", true);
var socio7 = new Socio("Alejandro", "Gutierrez", "alejandro@gmail.com", "Alejandro1", "Los angeles de la siesta", true);
var socio8 = new Socio("Veronica", "Rodriguez", "veronica@gmail.com", "Veronica1", "Equipo rocket", true);
var socio9 = new Socio("Lucia", "Facio", "lucia@gmail.com", "Lucia1", "Aston birra", true);
var socio10 = new Socio("Mateo", "Polenta", "mateo@gmail.com", "Mateo1", "Los angeles de la siesta", true);

var admin1 = new Administrador("admin1@gmail.com", "admin1");
var admin2 = new Administrador("admin2@gmail.com", "admin2");

var equipo1 = new Equipo("Equipo rocket", "1.JPG");
var equipo2 = new Equipo("Aston birra", "2.JPG");
var equipo3 = new Equipo("Los angeles de la siesta", "3.JPG");

var inscriptos1 = new Inscriptos("tinchofacio@gmail.com", "Equipo rocket","Torneo1",0);
var inscriptos2 = new Inscriptos("franca@gmail.com", "Equipo rocket", "Torneo1", 0);
var inscriptos3 = new Inscriptos("veronica@gmail.com", "Equipo rocket", "Torneo1", 0);
var inscriptos4 = new Inscriptos("tinchofacio@gmail.com", "Equipo rocket","Torneo2",0);
var inscriptos5 = new Inscriptos("franca@gmail.com", "Equipo rocket", "Torneo2", 0);
var inscriptos6 = new Inscriptos("veronica@gmail.com", "Equipo rocket", "Torneo2", 0);
var inscriptos7 = new Inscriptos("alejandro@gmail.com", "Los angeles de la siesta", "Torneo2", 0);
var inscriptos8 = new Inscriptos("mateo@gmail.com", "Los angeles de la siesta", "Torneo2", 0);
var inscriptos9 = new Inscriptos("alberto@gmail.com", "Los angeles de la siesta", "Torneo2", 0);

// Agrego datos a la lista
listaSocios.push(socio1);
listaSocios.push(socio2);
listaSocios.push(socio3);
listaSocios.push(socio4);
listaSocios.push(socio5);
listaSocios.push(socio6);
listaSocios.push(socio7);
listaSocios.push(socio8);
listaSocios.push(socio9);
listaSocios.push(socio10);

listaAdmin.push(admin1);
listaAdmin.push(admin2);

listaEquipos.push(equipo1);
listaEquipos.push(equipo2);
listaEquipos.push(equipo3);

listaInscriptos.push(inscriptos1);
listaInscriptos.push(inscriptos2);
listaInscriptos.push(inscriptos3);
listaInscriptos.push(inscriptos4);
listaInscriptos.push(inscriptos5);
listaInscriptos.push(inscriptos6);
listaInscriptos.push(inscriptos7);
listaInscriptos.push(inscriptos8);
listaInscriptos.push(inscriptos9);
