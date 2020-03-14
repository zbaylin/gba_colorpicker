let definitions = [];

window.addEventListener("load", () => {
  setupSliders();
  setupDefinitions();
});

let setupSliders = () => {
  let callback = (event) => {
    updateSliderOutput(event.target);
    updateVis();
    updateHexString();
  }

  let redSlider = document.getElementById("red-slider");
  let greenSlider = document.getElementById("green-slider");
  let blueSlider = document.getElementById("blue-slider");

  window.sliders = [redSlider, greenSlider, blueSlider];

  sliders.forEach((slider, index) => {
    slider.value = 0;
    updateSliderOutput(slider);
    updateVis();
    updateHexString();
    slider.addEventListener("input", callback)
  });
};

let getColorFromSliders = () => {
  let red = parseInt(sliders[0].value) / 31 * 255;
  let green = parseInt(sliders[1].value) / 31 * 255;
  let blue = parseInt(sliders[2].value) / 31 * 255;
  return [red, green, blue];
}

let updateVis = () => {
  let [red, green, blue] = getColorFromSliders();
  let vis = document.getElementById("color-visual");

  vis.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

let updateHexString = () => {
  let red = parseInt(sliders[0].value);
  let green = parseInt(sliders[1].value);
  let blue = parseInt(sliders[2].value)
  let hexString = document.getElementById("color-hex-string");

  let hexValue = 0 | red | (green << 5) | (blue << 10);
  hexString.innerHTML = "0x" + hexValue.toString(16);
}

let updateSliderOutput = (element) => {
  let output = document.getElementById(element.id + "-output");
  output.innerHTML = "0x" + parseInt(element.value).toString(16);
}

let setupDefinitions = () => {
  let button = document.getElementById("color-name-button");
  button.addEventListener("click", (event) => pushDefinition());
}

let pushDefinition = () => {
  let input = document.getElementById("color-name-input");
  let red = parseInt(sliders[0].value);
  let green = parseInt(sliders[1].value);
  let blue = parseInt(sliders[2].value)
  let hexValue = 0 | red | (green << 5) | (blue << 10);

  let definition = {
    name: input.value,
    red: red,
    green: green,
    blue: blue,
    hexValue: hexValue
  };

  definitions.push(definition);
  updateDefinitions();
}

let definitionToString = (definition) => {
  return `#define ${definition.name} 0x${definition.hexValue.toString(16)} // Red=0x${definition.red.toString(16)}, Green=0x${definition.green.toString(16)} Blue=0x${definition.blue.toString(16)}`
}

let updateDefinitions = () => {
  let textarea = document.getElementById("definitions-textarea");
  textarea.innerHTML = "";
  definitions.forEach((definition) => {
    let definitionString = definitionToString(definition)
    textarea.innerHTML += definitionString + "\n"
  })
}

let copyDefinitions = () => {
  let textarea = document.getElementById("definitions-textarea");
  textarea.select();
  textarea.setSelectionRange(0, 99999);

  document.execCommand("copy");
}

