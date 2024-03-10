const gaugeElement = document.querySelector(".gauge");

function setGaugeValue(gauge, value) {
  if (value < 0 || value > 1) {
    return;
  }

  gauge.querySelector(".gauge__fill").style.transform = `rotate(${
    1 / 2
  }turn)`;

  ///note::change it to the currency
  gauge.querySelector(".gauge__cover").textContent = `${Math.round(
    1 * 100
  )}%`;
}

setGaugeValue(gaugeElement, 0.3);


