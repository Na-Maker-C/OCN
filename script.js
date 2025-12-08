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
  },
  {
    vin: "WAUCCCCCC13572468",
    mec: "2022-01-20",
    marque: "Audi",
    modele: "A3",
    energie: "Hybride",
    puissance: "150 ch",
    couleur: "Noir"
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
  const mec = mecInput.value; // format AAAA-MM-JJ

  // On efface les anciens messages / résultats
  messageDiv.textContent = "";
  resultDiv.innerHTML = "";

  if (!vin || !mec) {
    messageDiv.textContent = "Merci de remplir les deux champs.";
    return;
  }

  // On cherche le véhicule
  const vehicule = vehicules.find(
    v => v.vin.toUpperCase() === vin && v.mec === mec
  );

  if (!vehicule) {
    messageDiv.textContent = "Aucun véhicule trouvé avec ces informations.";
    return;
  }

  messageDiv.textContent = "Véhicule trouvé :";

  // Création du tableau type Excel
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

  // Lignes pour chaque propriété du véhicule
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

  // 🔽🔽🔽 AJOUT DU CHAMP "Éclairage" 🔽🔽🔽

  const rowEclairage = document.createElement("tr");

  const cellKeyE = document.createElement("td");
  cellKeyE.textContent = "Éclairage";

  const cellValueE = document.createElement("td");

  // Création d'un lien cliquable vers l'article OETV, art. 72 a
  const linkE = document.createElement("a");
  linkE.href = "https://www.fedlex.admin.ch/eli/cc/1995/4425_4425_4425/fr#art_72_a";
  linkE.target = "_blank";
  linkE.rel = "noopener noreferrer";
  linkE.textContent = "OETV, art. 72 a";

  // Si tu veux exactement le format texte "OETV, art,72 a (https://...)",
  // tu peux aussi faire :
  // cellValueE.textContent = "OETV, art. 72 a (https://www.fedlex.admin.ch/eli/cc/1995/4425_4425_4425/fr#art_72_a)";
  // mais là on fait un lien cliquable plus propre :
  cellValueE.appendChild(linkE);

  rowEclairage.appendChild(cellKeyE);
  rowEclairage.appendChild(cellValueE);
  tbody.appendChild(rowEclairage);

  // 🔼🔼🔼 FIN DU CHAMP "Éclairage" 🔼🔼🔼

  table.appendChild(tbody);
  resultDiv.appendChild(table);

  // (Optionnel) si tu as encore le code pour ouvrir l'Excel, tu le laisses ici
  // const excelFile = `excels/fiche-${mec}.xlsx`;
  // window.open(excelFile, "_blank");
});
