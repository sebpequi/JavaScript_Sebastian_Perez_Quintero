
/**Declaramos una variable con eventlistener con una función para encender la calculadora
var prender = document.getElementById("on").addEventListener("click", function(){calculadora.iniciar(); calculadora.on()});
**/

//Declaramos el objeto de la calculadora
var calculadora = {
  pantalla: document.getElementById("display"),
  decimal: 0,
  negativo: 0,
  memoriaResultado: "",

  //Iniciar el reconocimiento de los Eventos onclick
  on: function(){
    calculadora.animarTeclas("on");
    this.pantalla.innerHTML = "0";
    this.decimal = 0;
    this.negativo = 0;
  },
  iniciar: (function(){
    this.eventosOnClick();
    var cursorPointer = document.getElementsByClassName("tecla");
    for (var p = 0; p < cursorPointer.length; p++ ){
      cursorPointer[p].style.cursor = "pointer";
    }
    if(this.pantalla.innerHTML == ""){
      this.pantalla.innerHTML = "0";
    }
  }),
  //metodo para animar las teclas y hacerlas mas pequeñas
  animarTeclas: function(tecla){
    document.getElementById(tecla).style.transform = "scale(0.9)";
    setTimeout(function(){document.getElementById(tecla).style.transform = "scale(1)";}, 300);
  },
  agregarDatos: function(dato){
    calculadora.animarTeclas(dato);
    if(this.pantalla.innerHTML.length < 8){
      if (this.pantalla.innerHTML == 0 && this.decimal == 0){
        this.pantalla.innerHTML = dato;
      }else {
        this.pantalla.innerHTML += dato;
      }
    }
  },
  //Agregamos el decimal
  punto: function() {
    calculadora.animarTeclas("punto");
    if(this.decimal == 0 && this.pantalla.innerHTML.length < 7){
      this.pantalla.innerHTML += ".";
    }
    this.decimal = 1;
  },
  //Numero negativo o positivo
  sign: function(){
    calculadora.animarTeclas("sign");
    if(this.negativo == 0){
      this.pantalla.innerHTML = this.pantalla.innerHTML.replace(/^/, "-");
      this.negativo = 1;
    }else {
      this.pantalla.innerHTML = this.pantalla.innerHTML.substring(1);
      this.negativo = 0;
    }
  },
  operaciones: function(opcion){
    switch(opcion){
      case 1:
        console.log("suma");
      break;

    }
  },
  suma: function(){
    this.animarTeclas("mas");
    this.operaciones(1);
  },
  limiteDisplay: function(){

  },
  //Asignación de los eventos en las teclas para ver que se oprime
  eventosOnClick: function(){
    document.getElementById("0").addEventListener("click", function(){calculadora.agregarDatos("0");});
    document.getElementById("1").addEventListener("click", function(){calculadora.agregarDatos("1");});
    document.getElementById("2").addEventListener("click", function(){calculadora.agregarDatos("2");});
    document.getElementById("3").addEventListener("click", function(){calculadora.agregarDatos("3");});
    document.getElementById("4").addEventListener("click", function(){calculadora.agregarDatos("4");});
    document.getElementById("5").addEventListener("click", function(){calculadora.agregarDatos("5");});
    document.getElementById("6").addEventListener("click", function(){calculadora.agregarDatos("6");});
    document.getElementById("7").addEventListener("click", function(){calculadora.agregarDatos("7");});
    document.getElementById("8").addEventListener("click", function(){calculadora.agregarDatos("8");});
    document.getElementById("9").addEventListener("click", function(){calculadora.agregarDatos("9");});
    document.getElementById("punto").addEventListener("click", function(){calculadora.punto();});
    document.getElementById("on").addEventListener("click", function(){calculadora.on();});
    document.getElementById("sign").addEventListener("click", function(){calculadora.sign();});
    document.getElementById("mas").addEventListener("click", function(){calculadora.suma();});
  },


  //Imprimir los datos en pantalla
  escribirPantalla: function(){

  },
}
calculadora.iniciar();
