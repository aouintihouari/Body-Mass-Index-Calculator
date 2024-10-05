const heightWeightContainer = document.querySelector(
  ".height-weight-input-container"
);

const metricHeight = document.querySelector(".metric-height-container");
const metricWeight = document.querySelector(".metric-weight-container");
const imperialHeight = document.querySelector(".imperial-height-container");
const imperialWeight = document.querySelector(".imperial-weight-container");

const centimeterInput = document.querySelector(".centimeter-input");
const inchInput = document.querySelector(".inch-input");
const feetInput = document.querySelector(".feet-input");
const kilogramInput = document.querySelector(".kilogram-input");
const stoneInput = document.querySelector(".stone-input");
const poundInput = document.querySelector(".pound-input");

const metricRadioBtn = document.querySelector(".metric-radio");
const imperialRadioBtn = document.querySelector(".imperial-radio");

const welcomeMessage = document.querySelector(".welcome-message");
const bmiMessage = document.querySelector(".bmi-message");
const bmiTotalText = document.querySelector(".bmi-total");
const bmiDescriptionText = document.querySelector(".bmi-description");

let isMetric = true;

metricRadioBtn.addEventListener("click", () => {
  isMetric = true;
  heightWeightContainer.style.flexDirection = window.matchMedia(
    "(max-width: 48rem)"
  ).matches
    ? "column"
    : "row";
  metricHeight.style.display = "flex";
  metricWeight.style.display = "flex";
  imperialHeight.style.display = "none";
  imperialWeight.style.display = "none";
});

imperialRadioBtn.addEventListener("click", () => {
  isMetric = false;
  heightWeightContainer.style.flexDirection = "column";
  metricHeight.style.display = "none";
  metricWeight.style.display = "none";
  imperialHeight.style.display = "flex";
  imperialWeight.style.display = "flex";
});

function outputResult(bmi) {
  welcomeMessage.style.display = "none";
  bmiMessage.style.display = "flex";
  bmiTotalText.textContent = bmi;

  let description = "";
  const height = isMetric
    ? parseFloat(centimeterInput.value) / 100
    : getHeightInMeters();

  const minIdealWeightKg = (18.5 * Math.pow(height, 2)).toFixed(1);
  const maxIdealWeightKg = (24.9 * Math.pow(height, 2)).toFixed(1);

  let minIdealWeight, maxIdealWeight;

  if (isMetric) {
    minIdealWeight = `${minIdealWeightKg}kgs`;
    maxIdealWeight = `${maxIdealWeightKg}kgs`;
  } else {
    minIdealWeight = convertKgToStonesAndPounds(minIdealWeightKg);
    maxIdealWeight = convertKgToStonesAndPounds(maxIdealWeightKg);
  }

  if (bmi < 18.5)
    description = `Your BMI suggests you're underweight. Your ideal weight is between <span class="bmi-bold">${minIdealWeight} - ${maxIdealWeight}</span>.`;
  else if (bmi >= 18.5 && bmi <= 24.9)
    description = `Your BMI suggests you're a healthy weight. Your ideal weight is between <span class="bmi-bold">${minIdealWeight} - ${maxIdealWeight}</span>.`;
  else if (bmi >= 25 && bmi <= 29.9)
    description = `Your BMI suggests you're overweight. Your ideal weight is between <span class="bmi-bold">${minIdealWeight} - ${maxIdealWeight}</span>.`;
  else
    description = `Your BMI suggests you're obese. Your ideal weight is between <span class="bmi-bold">${minIdealWeight} - ${maxIdealWeight}</span>.`;
  bmiDescriptionText.innerHTML = description;
}

function getHeightInMeters() {
  const feet = parseFloat(feetInput.value) || 0;
  const inches = parseFloat(inchInput.value) || 0;
  return (feet * 30.48 + inches * 2.54) / 100;
}

function getWeightInKg() {
  const stones = parseFloat(stoneInput.value) || 0;
  const pounds = parseFloat(poundInput.value) || 0;
  return stones * 6.35029 + pounds * 0.453592;
}

function convertKgToStonesAndPounds(kg) {
  const totalPounds = kg * 2.20462;
  const stones = Math.floor(totalPounds / 14);
  const pounds = (totalPounds % 14).toFixed(1);
  return `${stones} st ${pounds} lbs`;
}

function calculateBMI() {
  let height, weight;

  if (isMetric) {
    height = parseFloat(centimeterInput.value) / 100;
    weight = parseFloat(kilogramInput.value);
  } else {
    height = getHeightInMeters();
    weight = getWeightInKg();
  }

  if (height > 0 && weight > 0) {
    const bmi = (weight / Math.pow(height, 2)).toFixed(1);
    outputResult(bmi);
  } else {
    welcomeMessage.style.display = "flex";
    bmiMessage.style.display = "none";
  }
}

centimeterInput.addEventListener("input", calculateBMI);
kilogramInput.addEventListener("input", calculateBMI);
feetInput.addEventListener("input", calculateBMI);
inchInput.addEventListener("input", calculateBMI);
stoneInput.addEventListener("input", calculateBMI);
poundInput.addEventListener("input", calculateBMI);
