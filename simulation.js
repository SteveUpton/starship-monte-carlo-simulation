function runSimulation() {
  const simulation_params = getInputValues();
  
  let simulation_results = {
    lost_booster_distribution: new Array(simulation_params.num_launches + 1).fill(0),
    lost_ship_distribution: new Array(simulation_params.num_launches + 1).fill(0),
    lost_pad_distribution: new Array(simulation_params.num_launches * 2 + 1).fill(0)
  }
  
  const boosterCatchAttemptChance = simulation_params.booster_chance_catch_attempt;
  const boosterCatchSuccessChance = simulation_params.booster_chance_catch_success;
  const shipCatchAttemptChance = simulation_params.ship_chance_catch_attempt;
  const shipCatchSuccessChance = simulation_params.ship_chance_catch_success;
  const numLaunches = simulation_params.num_launches;
  const numSimulations = 10000;

  // Monte Carlo simulation
  for (let i = 0; i < numSimulations; i++) {
    let campaignBoosterLosses = 0;
    let campaignShipLosses = 0;
    let campaignPadLosses = 0;
    
    // Simulate a campaign of launches
    for (let launch = 0; launch < numLaunches; launch++) {
      // Booster mission
      if (Math.random() > boosterCatchAttemptChance) {
        campaignBoosterLosses++;
      } else {
        if (Math.random() > boosterCatchSuccessChance) {
          campaignBoosterLosses++;
          campaignPadLosses++;
        }
        // Booster catch succeeded (no action needed)
      }

      // Ship mission
      if (Math.random() > shipCatchAttemptChance) {
        campaignShipLosses++;
      } else {
        if (Math.random() > shipCatchSuccessChance) {
          campaignShipLosses++;
          campaignPadLosses++;
        }
        // Ship catch succeeded (no action needed)
      }
    }
    
    // Update distributions 
    simulation_results.lost_booster_distribution[campaignBoosterLosses]++;
    simulation_results.lost_ship_distribution[campaignShipLosses]++;
    simulation_results.lost_pad_distribution[campaignPadLosses]++;
  }

  renderResults(simulation_params, processResults(simulation_results, numSimulations));
}

function processResults(simulation_results, num_simulations) {
  let processedResults = {};

  // Remove trailing zeros from distributions
  processedResults.lost_booster_distribution = simulation_results.lost_booster_distribution.slice(0, simulation_results.lost_booster_distribution.findLastIndex(x => x > 0) + 1);
  processedResults.lost_ship_distribution = simulation_results.lost_ship_distribution.slice(0, simulation_results.lost_ship_distribution.findLastIndex(x => x > 0) + 1);
  processedResults.lost_pad_distribution = simulation_results.lost_pad_distribution.slice(0, simulation_results.lost_pad_distribution.findLastIndex(x => x > 0) + 1);

  // Convert to distributions to percentages
  processedResults.lost_booster_distribution = processedResults.lost_booster_distribution.map(losses => ((losses/num_simulations) * 100).toFixed(2));
  processedResults.lost_ship_distribution = processedResults.lost_ship_distribution.map(losses => ((losses/num_simulations) * 100).toFixed(2));
  processedResults.lost_pad_distribution = processedResults.lost_pad_distribution.map(losses => ((losses/num_simulations) * 100).toFixed(2));

  return processedResults;
}
