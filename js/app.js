//Declaramos el objeto de la calculadora
var calculadora = {
  pantalla: document.getElementById("display"),
  decimal: 0,
  negativo: 0,
  memoriaResultado: 0,
  ultNumero: 0,
  opcion: 0,
  igualContinuo: 0,
  igualActivo: 0, /**esta variable me permite saber cuando el resultado se da
  despues de un igual, para así poder orientar bien el flujo de la operación**/

  //Iniciar el reconocimiento de los Eventos onclick
  on: function(){
    calculadora.animarTeclas("on");
    this.pantalla.innerHTML = "0";
    this.decimal = 0;
    this.negativo = 0;
    this.memoriaResultado = 0;
    this.opcion = 0;
    this.igualActivo = 0;
  },
  iniciar: (function(){
    this.losEventos();
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
  suma: function(){
    this.animarTeclas("mas");
    if(this.opcion == 0 || this.igualActivo == 1){
      this.memoriaResultado += Number(this.pantalla.innerHTML);
    }else {
      this.memoriaResultado = this.resulAux();
    };
    this.pantalla.innerHTML = "";
    this.decimal = 0;
    this.opcion = 1;
    this.igualContinuo = 0;
  },
  resta: function(){
    this.animarTeclas("menos");
    if(this.opcion == 0 || this.igualActivo == 1){
      this.memoriaResultado = this.pantalla.innerHTML;
    }else{
      this.memoriaResultado = this.resulAux();
    };
    this.pantalla.innerHTML = "";
    this.decimal = 0;
    this.opcion = 2;
    this.igualContinuo = 0;
  },
  multiplicacion: function(){
    this.animarTeclas("por");
    if(this.opcion == 0 || this.igualActivo == 1){
      this.memoriaResultado = this.pantalla.innerHTML;
    }else{
      this.memoriaResultado = this.resulAux();
    };
    this.pantalla.innerHTML = "";
    this.decimal = 0;
    this.opcion = 3;
    this.igualContinuo = 0;
  },
  division: function(){
    this.animarTeclas("dividido");
    if(this.opcion == 0 || this.igualActivo == 1){
      this.memoriaResultado = this.pantalla.innerHTML;
    }else{
      this.memoriaResultado = this.resulAux();
    };
    this.pantalla.innerHTML = "";
    this.decimal = 0;
    this.opcion = 4;
    this.igualContinuo = 0;
  },
  raiz: function(){
    this.animarTeclas("raiz");
    if (Number(this.pantalla.innerHTML) < 0){
      this.pantalla.innerHTML = "ERROR";
    }else{
      if (this.opcion == 0 || this.igualActivo == 1) {
        this.memoriaResultado = this.pantalla.innerHTML;
        this.pantalla.innerHTML = Math.sqrt(Number(this.memoriaResultado));
        this.memoriaResultado = this.pantalla.innerHTML;
      }else{
        this.memoriaResultado = this.resulAux();
        this.pantalla.innerHTML = Math.sqrt(Number(this.memoriaResultado));
        this.memoriaResultado = this.pantalla.innerHTML;
      }
    }
    this.decimal = 0;
    this.opcion = 5;
    this.igualContinuo = 0;
    this.limiteDisplay();
  },
  /**con resulAux lo que se hace es que se hace la operación para poder hacer
  diferentes operaciones consecutivas, sin precionar el igual.
  **/
  resulAux: function(){
    switch(this.opcion){
    //Suma temporal - no imprime el resultado en pantalla
      case 1:
        this.ultNumero = this.pantalla.innerHTML;
        this.memoriaResultado = Number(this.ultNumero) + Number(this.memoriaResultado);
        return this.memoriaResultado;
      break;
    //Resta temporal - no imprime el resultado en pantalla
      case 2:
        this.ultNumero = this.pantalla.innerHTML;
        this.memoriaResultado = Number(this.memoriaResultado) - Number(this.ultNumero);
        return this.memoriaResultado;
      break;
    //Multiplicación temporal - no imprime el resultado en pantalla
      case 3:
        this.ultNumero = this.pantalla.innerHTML;
        this.memoriaResultado = Number(this.ultNumero) * Number(this.memoriaResultado);
        return this.memoriaResultado;
      break;
    //Division temporal - no imprime el resultado en pantalla
      case 4:
        this.ultNumero = this.pantalla.innerHTML;
        this.memoriaResultado = Number(this.memoriaResultado) / Number(this.ultNumero);
        return this.memoriaResultado;
      break;
    //Raiz, luego de la raiz, para continuar operando se crea una memoria auxiliar
      case 5:
        this.memoriaResultado = this.memoriaResultado;
        return this.memoriaResultado;
      break;
      default:
      break;
    }
  },
  resultado: function(){
    this.animarTeclas("igual");
    switch(this.opcion){
    //Suma
      case 1:
        if(this.igualContinuo == 0){
          this.ultNumero = this.pantalla.innerHTML;
          this.pantalla.innerHTML = "";
          this.pantalla.innerHTML = Number(this.memoriaResultado) + Number(this.ultNumero);
          this.memoriaResultado = 0;
          this.igualContinuo = 1;
          this.igualActivo = 1;
        } else {
          this.memoriaResultado = this.pantalla.innerHTML;
          this.pantalla.innerHTML = Number(this.memoriaResultado) + Number(this.ultNumero);
          this.memoriaResultado = 0;
          this.igualActivo = 1;
        }
        break;
    //Resta
      case 2:
        if(this.igualContinuo == 0){
          this.ultNumero = this.pantalla.innerHTML;
          this.pantalla.innerHTML = "";
          this.pantalla.innerHTML = Number(this.memoriaResultado) - Number(this.ultNumero);
          this.memoriaResultado = 0;
          this.igualContinuo = 1;
          this.igualActivo = 1;
        }else{
          this.memoriaResultado = this.pantalla.innerHTML;
          this.pantalla.innerHTML = Number(this.memoriaResultado) - Number(this.ultNumero);
          this.memoriaResultado = 0;
          this.igualActivo = 1;
        }
      break;
    //Multiplicacion
      case 3:
        if(this.igualContinuo == 0){
          this.ultNumero = this.pantalla.innerHTML;
          this.pantalla.innerHTML = "";
          this.pantalla.innerHTML = Number(this.memoriaResultado) * Number(this.ultNumero);
          this.memoriaResultado = 0;
          this.igualContinuo = 1;
          this.igualActivo = 1;
        }else{
          this.memoriaResultado = this.pantalla.innerHTML;
          this.pantalla.innerHTML = Number(this.memoriaResultado) * Number(this.ultNumero);
          this.memoriaResultado = 0;
          this.igualActivo = 1;
        }
      break;
    //Division
      case 4:
        if(this.igualContinuo == 0){
          this.ultNumero = this.pantalla.innerHTML;
          this.pantalla.innerHTML = "";
          this.pantalla.innerHTML = Number(this.memoriaResultado) / Number(this.ultNumero);
          this.memoriaResultado = 0;
          this.igualContinuo = 1;
          this.igualActivo = 1;
        }else{
          this.memoriaResultado = this.pantalla.innerHTML;
          this.pantalla.innerHTML = Number(this.memoriaResultado) / Number(this.ultNumero);
          this.memoriaResultado = 0;
          this.igualActivo = 1;
        }
      break;
    //Raiz cuadrada
      case 5:
        if(this.igualContinuo == 0){
          this.igualContinuo = 1;
        }else {
          this.memoriaResultado = this.pantalla.innerHTML;
          this.pantalla.innerHTML = Math.sqrt(Number(this.memoriaResultado));
          this.memoriaResultado = 0;
        }
      break;
      default:
      break;
    }
    this.limiteDisplay();
  },
  limiteDisplay: function(){
    if(this.pantalla.innerHTML.length > 8){
      this.pantalla.innerHTML = this.pantalla.innerHTML.substring(0, 8);
    }
  },
  //Asignación de los eventos en las teclas para ver que se oprime
  losEventos: function(){
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
    document.getElementById("menos").addEventListener("click", function(){calculadora.resta();});
    document.getElementById("por").addEventListener("click", function(){calculadora.multiplicacion();});
    document.getElementById("dividido").addEventListener("click", function(){calculadora.division();});
    document.getElementById("raiz").addEventListener("click", function(){calculadora.raiz();});
    document.getElementById("igual").addEventListener("click", function(){calculadora.resultado();});
    document.addEventListener("keyup", this.lectorTeclas);
  },
  lectorTeclas: function(et){
    var tecla = et.key;
    console.log(tecla);
    switch(tecla){
      case "0":
        calculadora.agregarDatos("0");
      break;
      case "1":
        calculadora.agregarDatos("1");
      break;
      case "2":
        calculadora.agregarDatos("2");
      break;
      case "3":
        calculadora.agregarDatos("3");
      break;
      case "4":
        calculadora.agregarDatos("4");
      break;
      case "5":
        calculadora.agregarDatos("5");
      break;
      case "6":
        calculadora.agregarDatos("6");
      break;
      case "7":
        calculadora.agregarDatos("7");
      break;
      case "8":
        calculadora.agregarDatos("8");
      break;
      case "9":
        calculadora.agregarDatos("9");
      break;
      case "+":
        calculadora.suma();
      break;
      case "-":
        calculadora.resta();
      break;
      case "/":
        calculadora.division();
      break;
      case "*":
        calculadora.multiplicacion();
      break;
      case ".":
        calculadora.punto();
      break;
      case "Enter":
        calculadora.resultado();
      break;
      case "=":
        calculadora.resultado();
      break;
      case "Backspace":
        calculadora.on();
      break;
    }
  },
}
calculadora.iniciar();
  /**
document.addEventListener("keydown", saberTeclas);
function saberTeclas(evento){

  var tecla = evento.key;
  console.log("tecla presionada: " + tecla);
  if(tecla == "*"){
    console.log("Hola multiplicacion");
  }

}
**/
