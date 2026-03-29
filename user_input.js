function getDefaultSimulationParams() {
  return {
    num_launches: 15,
    num_pads: 4,
    num_boosters: 8,
    num_ships: 8,
    booster_chance_catch_attempt: 0.99,
    booster_chance_catch_success: 0.99,
    ship_chance_catch_attempt: 0.99,
    ship_chance_catch_success: 0.99,
  }
}

function setInputToDefault() {
  setInputValues(getDefaultSimulationParams());
}

function setInputValues(simulation_params) {
  document.getElementById("num_launches").value = simulation_params.num_launches;
  document.getElementById("num_pads").value = simulation_params.num_pads;
  document.getElementById("num_boosters").value = simulation_params.num_boosters;
  document.getElementById("num_ships").value = simulation_params.num_ships;
  document.getElementById("booster_chance_catch_attempt").value = (simulation_params.booster_chance_catch_attempt * 100).toFixed(1);
  document.getElementById("booster_chance_catch_success").value = (simulation_params.booster_chance_catch_success * 100).toFixed(1);
  document.getElementById("ship_chance_catch_attempt").value = (simulation_params.ship_chance_catch_attempt * 100).toFixed(1);
  document.getElementById("ship_chance_catch_success").value = (simulation_params.ship_chance_catch_success * 100).toFixed(1);
}

function getInputValues() {
  return {
    num_launches: parseInt(document.getElementById("num_launches").value),
    num_pads: parseInt(document.getElementById("num_pads").value),
    num_boosters: parseInt(document.getElementById("num_boosters").value),
    num_ships: parseInt(document.getElementById("num_ships").value),
    booster_chance_catch_attempt: document.getElementById("booster_chance_catch_attempt").value / 100,
    booster_chance_catch_success: document.getElementById("booster_chance_catch_success").value / 100,
    ship_chance_catch_attempt: document.getElementById("ship_chance_catch_attempt").value / 100,
    ship_chance_catch_success: document.getElementById("ship_chance_catch_success").value / 100,
  }
}
