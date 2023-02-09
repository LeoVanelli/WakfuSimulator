const LimiteResistenciaEmPorcentagem = 90;
const MultiplicadorFrente = 1;
const MultiplicadorLado = 1.1;
const MultiplicadorCostas = 1.25;
const MultiplicadorResistenciaAlvo = 0.8;
const MultiplicadorParada = 1.2;
const MultiplicadorCritico = 1.25;
const DanoFixo = 0;

const inputDanoBaseFeitico = document.getElementById("danoBaseFeitico");
const inputDominioTotal = document.getElementById("dominioTotal");
const inputDanosCausados = document.getElementById("danosCausados");
const inputBarreira = document.getElementById("barreira");
const inputResistenciaBruta = document.getElementById("resistenciaBruta");

const btnCritico = document.getElementById("golpeCritico");
const btnParada = document.getElementById("parada");
const btnCalcular = document.getElementById("calcular");
const labelResultado = document.getElementById("resultado");

let coeficienteGolpeCritico = 1;
let coeficienteParada = 1;


btnCritico.addEventListener("change", function() {
  coeficienteGolpeCritico = btnCritico.checked ? MultiplicadorCritico : 1;
});

btnParada.addEventListener("change", function() {
  coeficienteParada = btnParada.checked ? MultiplicadorParada : 1;
});

btnCalcular.addEventListener("click", function(){
    CalcularDanoTotal();
})

class DanoCausado{
  constructor(){
    this.danoBaseFeitico = inputDanoBaseFeitico.value * coeficienteGolpeCritico;
    this.dominioTotal = inputDominioTotal.value;
    this.multiplicadorOrientacao = MultiplicadorFrente;
    this.danosCausados = inputDanosCausados.value;
    this.porcentagemResistenciaAlvo = CalcularPorcentagemResistenciaAlvo(inputResistenciaBruta.value);
    this.danoFixo = DanoFixo;
    this.coeficienteParadaAlvo = coeficienteParada;
    this.barreira = inputBarreira.value;
    this.danoFixo = DanoFixo;
  }
}

function CalcularDanoTotal() {  
  let danoTotal = AplicarFormulaDeDanoTotal(new DanoCausado());
  resultado.innerHTML = danoTotal;
}

function CalcularPorcentagemResistenciaAlvo(resistenciaBruta){
  return Math.floor(((resistenciaBruta/100) ** MultiplicadorResistenciaAlvo) > 90 ? LimiteResistenciaEmPorcentagem : ((resistenciaBruta/100) ** MultiplicadorResistenciaAlvo));
} 

function AplicarFormulaDeDanoTotal(parametrosCalculo){
  return Math.floor(((parametrosCalculo.danoBaseFeitico * (1 + (parametrosCalculo.dominioTotal / 100)) * parametrosCalculo.multiplicadorOrientacao * (1 + (parametrosCalculo.danosCausados / 100))* (1 - (parametrosCalculo.porcentagemResistenciaAlvo / 100))) + parametrosCalculo.danoFixo) * parametrosCalculo.coeficienteParadaAlvo - parametrosCalculo.barreira);
}