let chartPadLosses;
let chartBoosterLosses;
let chartShipLosses;

function initialiseCharts() {
  const ctxPadLoss = document.getElementById('pad-loss-distribution-chart');
  const ctxBoosterLoss = document.getElementById('booster-loss-distribution-chart');
  const ctxShipLoss = document.getElementById('ship-loss-distribution-chart');
  
  let labels = [0,1,2,3,4,5,6,7,8,9,10];
  let data = {
    labels: labels,
    datasets: [{
      label: 'Number of launch campaigns',
      data: [],
      backgroundColor: [
        'rgba(75, 192, 87, 1)',
        'rgb(255, 159, 64)',
        'rgb(255, 159, 64)',
        'rgb(255, 159, 64)',
        'rgb(255, 99, 132)',
        'rgb(255, 99, 132)',
        'rgb(255, 99, 132)',
        'rgb(255, 99, 132)',
        'rgb(255, 99, 132)',
        'rgb(255, 99, 132)',
        'rgb(255, 99, 132)'
      ]
    }]
  };

  const configPad = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Pads damaged'
          }
        },
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const configBooster = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Boosters lost'
          }
        },
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const configShip = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Ships lost'
          }
        },
        y: {
          beginAtZero: true
        }
      }
    },
  };
  
  chartPadLosses = new Chart(ctxPadLoss, configPad);
  chartBoosterLosses = new Chart(ctxBoosterLoss, configBooster);
  chartShipLosses = new Chart(ctxShipLoss, configShip);
}

function renderResults(simulation_params, simulation_results) {
  chartPadLosses.data.datasets[0].backgroundColor = generateBackgroundColorArray(simulation_params.num_pads, simulation_results.lost_pad_distribution.length);
  chartPadLosses.data.datasets[0].data = simulation_results.lost_pad_distribution;
  if (simulation_results.lost_pad_distribution.length > 11) {
    chartPadLosses.data.labels = [...Array(simulation_results.lost_pad_distribution.length).keys()];
  } else {
    chartPadLosses.data.labels = [...Array(11).keys()];
  }
  chartPadLosses.update();

  chartBoosterLosses.data.datasets[0].backgroundColor = generateBackgroundColorArray(simulation_params.num_boosters, simulation_results.lost_booster_distribution.length);
  chartBoosterLosses.data.datasets[0].data = simulation_results.lost_booster_distribution;
  if (simulation_results.lost_booster_distribution.length > 11) {
    chartBoosterLosses.data.labels = [...Array(simulation_results.lost_booster_distribution.length).keys()];
  } else {
    chartBoosterLosses.data.labels = [...Array(11).keys()];
  }
  chartBoosterLosses.update();

  chartShipLosses.data.datasets[0].backgroundColor = generateBackgroundColorArray(simulation_params.num_ships, simulation_results.lost_ship_distribution.length);
  chartShipLosses.data.datasets[0].data = simulation_results.lost_ship_distribution;
  if (simulation_results.lost_ship_distribution.length > 11) {
    chartShipLosses.data.labels = [...Array(simulation_results.lost_ship_distribution.length).keys()];
  } else {
    chartShipLosses.data.labels = [...Array(11).keys()];
  }
  chartShipLosses.update();
}

function generateBackgroundColorArray(failure_threshold, max_value) {
  let backgroundColor = [
    'rgb(75, 192, 87)'
  ]

  for (i = 0; i < failure_threshold - 1; i++) {
    backgroundColor.push('rgb(255, 159, 64)');
  }

  for (i = 0; i < max_value - failure_threshold; i++) {
    backgroundColor.push('rgb(255, 99, 132)');
  }

  return backgroundColor;
}