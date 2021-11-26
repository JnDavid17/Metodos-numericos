var valor;
var exponente;
var xn = [];
var operacion;
var expon = true;
var x;
var numAnt = false;
var aux;
var fn = [];
var fxf;
var raiz = [];
var errorV = [];
var num;
var tam;
var iteracion = 1;
var xi = [];
var errorAprox = [];

var x1 = [];
var fx = [];

var cont = -5;
var terminado = true;
const contAbs = Math.abs(cont);

var finPrograma;
var firstTrace = false;

var xTrace = [];
var xfTrace = [];
var index = 0;
document.body
  .querySelector("#graficar")
  .addEventListener("click", graficoClick);
document.body.querySelector("#enviar").addEventListener("click", entrar);


document.body.querySelector('.container-table').style.display = 'none';



function leer(iteracion) {
  
    
  for (var j = 0; j < xn.length; j++) {
    var base = xn[j];
    valor = document.getElementById("funcion").value;
    var resul = "";
    for (var i = 0; i < valor.length; i++) {
      var subvalor = valor.substr(i, 1);

      //Evalua si el siguiente caracter es ^ (potencia)
      if (valor.substr(i + 1, 1) == "^") {
        //Pregunta si el caracter anterior a la x es un signo, si lo es, se procede normal, y si es un número, se agrega el *
        if (i > 0) {
          if (
            valor.substr(i - 1, 1) == "+" ||
            valor.substr(i - 1, 1) == "-" ||
            valor.substr(i - 1, 1) == "*" ||
            valor.substr(i - 1, 1) == "/" ||
            valor.substr(i - 1, 1) == "(" ||
            valor.substr(i - 1, 1) == ")" ||
            valor.substr(i - 1, 1) == ""
          ) {
          } else {
            //Si el caracter anterior no es un signo, se asigna el signo de multiplicar antes del reemplazo de la variable x
            numAnt = true;
          }
        }

        x = i + 2;
        exponente = "";

        //Se asegura que no agarre solo 1 caracter como número, sino los que haya como exponente
        while (expon == true) {
          //Evalua si el siguiente caracter es un signo, si lo es, detiene el ciclo
          if (
            valor.substr(x, 1) == "+" ||
            valor.substr(x, 1) == "-" ||
            valor.substr(x, 1) == "*" ||
            valor.substr(x, 1) == "/" ||
            valor.substr(x, 1) == "(" ||
            valor.substr(x, 1) == ")"
          ) {
            expon = false;
          } else {
            //Si el siguiente caracter no es un signo, asigna ese caracter a la cadena exponente, e incrementa x para evaluar el siguiente
            exponente += valor.substr(x, 1);
            x++;
            //Si el exponente está a lo último, termina ahí, ya que si no se termina, seguirá aumentado la x y da error
            if (x >= valor.length) {
              expon = false;
            }
          }
        }
        //Se vuelve a asignar true a la variable expon, ya que si no se asigna otra vez y se arranca de nuevo el programa, marca error
        expon = true;

        //Se hace la operacion de la potencia con la base (que se asigna arriba) y se parsea a entero la cadena exponente
        operacion = Math.pow(base, parseInt(exponente));
        //Se parsea a String la operación realizada anteriormente

        //Se evalua el booleano que se asigno en el condicional de si la x antes tiene un número
        //Si es verdadero, añade un * al resultado de la potencia, si no lo es, entonces se deja igual
        if (numAnt == true) {
          subvalor = "*" + operacion.toString();
          numAnt = false;
        } else {
          subvalor = operacion.toString();
        }

        //Se incrementa en 2 el contador, para avanzar 2 posiciones luego del ^, si no se hace asi, el for evaluará el exponente otra vez
        i = i + 2;
      }

      if (subvalor == "x") {
        if (
          //Pregunta si el caracter anterior a la x es un signo, si lo es, se reemplaza la x normal.
          valor.substr(i - 1, 1) == "+" ||
          valor.substr(i - 1, 1) == "-" ||
          valor.substr(i - 1, 1) == "*" ||
          valor.substr(i - 1, 1) == "/" ||
          valor.substr(i - 1, 1) == ""  ||
          valor.substr(i - 1, 1) == " " ||
          (i == 0)
        ) {
          subvalor = base.toString();
        } else {
          //Si el caracter anterior no es un signo, se asigna el signo de multiplicar antes del reemplazo de la variable x
          subvalor = "*" + base.toString();

        }
      }
      resul += subvalor;
    }

    var resultado = eval(resul);

    if (terminado == true) {
      fn[j] = parseFloat(resultado);
    } else {
      debugger;
      accionarGrafico(resultado);
    }
  }
  if (finPrograma == false) {
      evaluar();
  }
}

function evaluar() {

  fxf = fn[0]*fn[2];

  eA();

}

function eA() {

  raiz[iteracion] = xn[2];
  errorV[iteracion] =  (Math.abs(1 - raiz[iteracion]))*100;  

  if (iteracion > 1)
    errorAprox[iteracion] = Math.abs(
    ((raiz[iteracion] - raiz[iteracion - 1]) / raiz[iteracion]) * 100
    );

  generaTabla1(iteracion);
  iteracion++;

  if(fxf > 0){
    xn[0] = xn[2];
  }else{
    if(fxf < 0){
      xn[1] = xn[2];
    }
  }

  xn[2] = ((xn[0] + xn[1])/2);

  if (iteracion < tam + 1) {
    leer(iteracion);
  } else {
    mostrar();
  }
}

function mostrar() {
  finPrograma = true;
}

function entrar() {
  if (terminado == true) {
    if (finPrograma == true) {
      document.getElementById("erorrAbsoluto-table").innerHTML = "";
    }
    document.body.querySelector('.container-table').style.display = 'flex';
    iteracion = 1;
    finPrograma = false;
    num = document.getElementById("i").value;
    tam = parseInt(num);

    aux = document.getElementById("x0").value;
    xn[0] = parseFloat(aux);
    aux = document.getElementById("x1").value;
    xn[1] = parseFloat(aux);

    xn[2] = ((xn[0] + xn[1])/2);


    leer();
  } else {
    while (cont < contAbs) {
      xn[0] = cont;
      leer();
    }
  }
}

function graficoClick() {
  terminado = false;
  finPrograma = false;
  cont = -5;
  entrar();
}

function accionarGrafico(resultadoOperacion) {
  x1.push(cont);
  fx.push(resultadoOperacion);
  cont = cont + 0.1;
  if (cont < contAbs) {
    entrar();
  } else {
    showResults();
    debugger;
    finPrograma = true;
    terminado = true;
    firstTrace = true;
    xn = [];
    x1 = [];
    fx = [];
  }
}

function showResults() {


  var data  = [
    {
      x: x1,
      y: fx,
      type: "scatter",
    },
  ];
  var layout = {
    hovermode: "closest",
    autosize: false,
    width: 1000,
    height: 1000,
    margin: {
      pad: 2
    },
    paper_bgcolor: '#f1f1e5',
    //  plot_bgcolor: '#393e46',

    xaxis: {
      showspikes: true,
      autotick: false,
      showlegend: false,
      ticks: "outside",
      tick0: 0,
      dtick: 1,
      ticklen: 8,
      tickwidth: 4,
      tickcolor: "black",
    },
    yaxis: {
      showspikes: true,
      autotick: false,
      ticks: "outside",
      tick0: 0,
      dtick: 4,
      ticklen: 8,
      tickwidth: 4,
      tickcolor: "black",
    },

  };

  var config = {
    responsive: true
  };
  Plotly.newPlot("grafico", data, layout, { displayModeBar: true }, config);
}

function generaTabla1(iteracion){
  let incrementoArray = 0;
  let incrementoArrayValores = 0;

  var m = [];

   m[0]  = iteracion;
   m[1]  = (xn[0]);
   m[2]  = (xn[1]);
   m[3]  = (xn[2]);
   m[4]  = (fn[0]);
   m[5]  = (fn[2]);
   m[6]  = (fxf);
   m[7]  = (errorAprox[iteracion]);
   m[8]  = (errorV[iteracion]);


   for(var i = 0; i < m.length; i++){
     if(isNaN(m[i])){
       m[i] = '#NUM';
     }
   }

  var valoresTable = new Array(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8]);
  var title = new Array("iteraciones","Xa","Xb","Xr","F(Xa)","F(Xr)","F(Xa)*F(Xr)","Ea(%)","Et(%)");                    

  let tableDiv = document.getElementById("erorrAbsoluto-table");
  
  let table = document.createElement('table');
  
  let tableBody = document.createElement('body');
  table.appendChild(tableBody);

  for (let i = 0;  i<2; i++) {
    let tr = document.createElement('tr');
    tableBody.appendChild(tr);
    for (let j = 0;  j< m.length; j++) {
      let td = document.createElement('td');
      if(i==0){
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(title[incrementoArray]));
        incrementoArray++;
        tr.appendChild(th);
      }else{
          td.appendChild(document.createTextNode(valoresTable[incrementoArrayValores]));
          incrementoArrayValores++;
        tr.appendChild(td);
      }
    }
  }
  tableDiv.appendChild(table);
}


