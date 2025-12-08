// Liste de véhicules (exemple)
const vehicules = [
  {
    vin: "VF1AAAAAA12345678",
    mec: "2020-05-12",  // AAAA-MM-JJ
    marque: "Renault",
    modele: "Clio",
    energie: "Essence",
    puissance: "90 ch",
    couleur: "Rouge"
  },
  {
    vin: "WVWBBBBBB87654321",
    mec: "2018-10-03",
    marque: "Volkswagen",
    modele: "Golf",
    energie: "Diesel",
    puissance: "110 ch",
    couleur: "Bleu"
  }
];

const form = document.getElementById("searchForm");
const vinInput = document.getElementById("vinInput");
const mecInput = document.getElementById("mecInput");
const messageDiv = document.getElementById("message");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const vin = vinInput.value.trim().toUpperCase();
  const mec = mecInput.value;

  messageDiv.textContent = "";
  resultDiv.innerHTML = "";

  if (!vin || !mec) {
    messageDiv.textContent = "Merci de remplir les deux champs.";
    return;
  }

  const vehicule = vehicules.find(
    v => v.vin.toUpperCase() === vin && v.mec === mec
  );

  if (!vehicule) {
    messageDiv.textContent = "Aucun véhicule trouvé avec ces informations.";
    return;
  }

  messageDiv.textContent = "Véhicule trouvé :";

  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  ["Champ", "Valeur"].forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  for (const [key, value] of Object.entries(vehicule)) {
    const row = document.createElement("tr");

    const cellKey = document.createElement("td");
    const cellValue = document.createElement("td");

    let label;
    switch (key) {
      case "vin": label = "Numéro de châssis (VIN)"; break;
      case "mec": label = "1ère mise en circulation"; break;
      case "marque": label = "Marque"; break;
      case "modele": label = "Modèle"; break;
      case "energie": label = "Énergie"; break;
      case "puissance": label = "Puissance"; break;
      case "couleur": label = "Couleur"; break;
      default: label = key;
    }

    cellKey.textContent = label;
    cellValue.textContent = value;

    row.appendChild(cellKey);
    row.appendChild(cellValue);
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  resultDiv.appendChild(table);
});
