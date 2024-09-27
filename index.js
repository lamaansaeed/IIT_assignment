const chemicalData = [
    { id: 1, chemicalName: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 6495.18 },
    { id: 2, chemicalName: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 8751.90 },
    { id: 3, chemicalName: "Dimethylaminopropylamino", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", packSize: 75.00, unit: "L", quantity: 5964.61 },
    { id: 4, chemicalName: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: 105.00, unit: "kg", quantity: 8183.73 },
    { id: 5, chemicalName: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: 105.00, unit: "kg", quantity: 4154.33 },
    { id: 6, chemicalName: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", packSize: "N/A", unit: "t", quantity: 6272.34 },
    { id: 7, chemicalName: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: 250.00, unit: "kg", quantity: 8749.54 },
    { id: 8, chemicalName: "Sodium Hydroxide", vendor: "BASF", density: 2278.63, viscosity: 18.33, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 3542.67 },
    { id: 9, chemicalName: "Toluene", vendor: "DowDuPont", density: 876.50, viscosity: 10.11, packaging: "Drum", packSize: 200.00, unit: "L", quantity: 5257.83 },
    { id: 10, chemicalName: "Acetone", vendor: "LG Chem", density: 792.00, viscosity: 4.23, packaging: "Drum", packSize: 150.00, unit: "L", quantity: 3127.19 },
    { id: 11, chemicalName: "Sulfuric Acid", vendor: "Formosa", density: 1823.45, viscosity: 37.90, packaging: "Barrel", packSize: 80.00, unit: "L", quantity: 6847.62 },
    { id: 12, chemicalName: "Methanol", vendor: "Sinopec", density: 790.12, viscosity: 5.77, packaging: "Drum", packSize: 210.00, unit: "L", quantity: 2297.80 },
    { id: 13, chemicalName: "Isopropyl Alcohol", vendor: "Formosa", density: 803.12, viscosity: 5.83, packaging: "Drum", packSize: 180.00, unit: "L", quantity: 1827.93 },
    { id: 14, chemicalName: "Hydrochloric Acid", vendor: "DowDuPont", density: 1049.60, viscosity: 32.58, packaging: "Drum", packSize: 200.00, unit: "L", quantity: 4927.91 },
    { id: 15, chemicalName: "Phosphoric Acid", vendor: "LG Chem", density: 1685.12, viscosity: 25.40, packaging: "Barrel", packSize: 50.00, unit: "L", quantity: 7123.44 }
  ];
  let currentData = [...chemicalData];
let editingRowId = null;  // To track which row is being edited

// Function to render table data
function renderTable(data) {
  const tbody = document.querySelector('#chemicalTable tbody');
  tbody.innerHTML = '';  // Clear existing rows

  data.forEach(item => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td><input type="checkbox" data-id="${item.id}"></td>
      <td>${item.id}</td>
      <td>${item.chemicalName}</td>
      <td>${item.vendor}</td>
      <td>${item.density}</td>
      <td>${item.viscosity}</td>
      <td>${item.packaging}</td>
      <td>${item.packSize}</td>
      <td>${item.unit}</td>
      <td>${item.quantity}</td>
    `;
    
    tbody.appendChild(row);
  });

  updateButtonStates();  // Enable/disable buttons based on selection
}

// Sort functionality
function sortTableBy(column, order) {
  currentData.sort((a, b) => {
    if (order === 'asc') {
      return a[column] - b[column];
    } else {
      return b[column] - a[column];
    }
  });
  renderTable(currentData);
}

// Add a new row
document.getElementById('addButton').addEventListener('click', () => {
  document.getElementById('addRowForm').style.display = 'block';
  editingRowId = null; // Clear editing state
});

// Save new or edited row
document.getElementById('saveRowButton').addEventListener('click', () => {
  const chemicalName = document.getElementById('chemicalName').value;
  const vendor = document.getElementById('vendor').value;
  const density = parseFloat(document.getElementById('density').value);
  const viscosity = parseFloat(document.getElementById('viscosity').value);
  const packaging = document.getElementById('packaging').value;
  const packSize = parseInt(document.getElementById('packSize').value);
  const unit = document.getElementById('unit').value;
  const quantity = parseInt(document.getElementById('quantity').value);

  if (editingRowId === null) {
    // Add new row
    const newRow = {
      id: currentData.length + 1,
      chemicalName: chemicalName,
      vendor: vendor,
      density: density,
      viscosity: viscosity,
      packaging: packaging,
      packSize: packSize,
      unit: unit,
      quantity: quantity
    };
    currentData.push(newRow);
  } else {
    // Edit existing row
    const rowIndex = currentData.findIndex(item => item.id === editingRowId);
    currentData[rowIndex] = {
      id: editingRowId,
      chemicalName: chemicalName,
      vendor: vendor,
      density: density,
      viscosity: viscosity,
      packaging: packaging,
      packSize: packSize,
      unit: unit,
      quantity: quantity
    };
  }

  document.getElementById('addRowForm').style.display = 'none';
  renderTable(currentData);
});

// Cancel adding/editing row
document.getElementById('cancelAddButton').addEventListener('click', () => {
  document.getElementById('addRowForm').style.display = 'none';
});

// Delete selected rows
document.getElementById('deleteButton').addEventListener('click', () => {
  const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const selectedIds = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.getAttribute('data-id')));
  currentData = currentData.filter(item => !selectedIds.includes(item.id));
  renderTable(currentData);
});

// Edit selected row
document.getElementById('editButton').addEventListener('click', () => {
  const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  if (selectedCheckboxes.length === 1) {
    editingRowId = parseInt(selectedCheckboxes[0].getAttribute('data-id'));
    const selectedRow = currentData.find(item => item.id === editingRowId);

    // Pre-fill form with selected row data
    document.getElementById('chemicalName').value = selectedRow.chemicalName;
    document.getElementById('vendor').value = selectedRow.vendor;
    document.getElementById('density').value = selectedRow.density;
    document.getElementById('viscosity').value = selectedRow.viscosity;
    document.getElementById('packaging').value = selectedRow.packaging;
    document.getElementById('packSize').value = selectedRow.packSize;
    document.getElementById('unit').value = selectedRow.unit;
    document.getElementById('quantity').value = selectedRow.quantity;

    document.getElementById('addRowForm').style.display = 'block';
  }
});

// Enable/Disable delete and edit buttons
function updateButtonStates() {
  const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  document.getElementById('deleteButton').disabled = selectedCheckboxes.length === 0;
  document.getElementById('editButton').disabled = selectedCheckboxes.length !== 1;
}

// Add event listener to checkboxes to update buttons' states
document.querySelector('#chemicalTable').addEventListener('change', () => {
  updateButtonStates();
});

// Sort event listeners
document.getElementById('sortAscending').addEventListener('click', () => {
  const selectedOption = document.getElementById('sortOption').value;
  sortTableBy(selectedOption, 'asc');
});

document.getElementById('sortDescending').addEventListener('click', () => {
  const selectedOption = document.getElementById('sortOption').value;
  sortTableBy(selectedOption, 'desc');
});

// Refresh functionality
document.getElementById('refreshButton').addEventListener('click', () => {
  currentData = [...chemicalData];
  renderTable(currentData);
});

// Initial render
renderTable(currentData);