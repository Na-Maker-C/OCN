const form = document.getElementById("searchForm");
const vinInput = document.getElementById("vinInput");  // on garde le champ mais le nom n'a pas d’importance
const mecInput = document.getElementById("mecInput");
const messageDiv = document.getElementById("message");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const homologation = vinInput.value.trim().toUpperCase(); // anciennement VIN
  const mec = mecInput.value; 

  // On efface les anciens messages / résultats
  messageDiv.textContent = "";
  resultDiv.innerHTML = "";

  // Vérifie que les deux champs sont remplis
  if (!homologation || !mec) {
    messageDiv.textContent = "Merci de remplir les deux champs.";
    return;
  }

  // Message au-dessus du tableau
  messageDiv.textContent = "Fiche générée :";

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

  // Ligne 1 : Numéro d'homologation
  const rowHom = document.createElement("tr");
  const cellKeyHom = document.createElement("td");
  const cellValueHom = document.createElement("td");
  cellKeyHom.textContent = "Numéro d'homologation";
  cellValueHom.textContent = homologation;
  rowHom.appendChild(cellKeyHom);
  rowHom.appendChild(cellValueHom);
  tbody.appendChild(rowHom);

  // Ligne 2 : 1ère mise en circulation
  const rowMec = document.createElement("tr");
  const cellKeyMec = document.createElement("td");
  const cellValueMec = document.createElement("td");
  cellKeyMec.textContent = "1ère mise en circulation";
  cellValueMec.textContent = mec;
  rowMec.appendChild(cellKeyMec);
  rowMec.appendChild(cellValueMec);
  tbody.appendChild(rowMec);

  // Ligne 3 : Éclairage
  const rowEclairage = document.createElement("tr");
  const cellKeyE = document.createElement("td");
  const cellValueE = document.createElement("td");

  cellKeyE.textContent = "Éclairage";

  // Lien cliquable vers l'article OETV, art. 72 a
  const linkE = document.createElement("a");
  linkE.href = "https://www.fedlex.admin.ch/eli/cc/1995/4425_4425_4425/fr#art_72_a";
  linkE.target = "_blank";
  linkE.rel = "noopener noreferrer";
  linkE.textContent = "OETV, art. 72 a (lien)";

  cellValueE.appendChild(linkE);

  rowEclairage.appendChild(cellKeyE);
  rowEclairage.appendChild(cellValueE);
  tbody.appendChild(rowEclairage);

  table.appendChild(tbody);
  resultDiv.appendChild(table);
});
