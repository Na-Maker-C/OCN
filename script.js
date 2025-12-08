const form = document.getElementById("searchForm");
const homologationInput = document.getElementById("homologationInput");
const mecInput = document.getElementById("mecInput");
const messageDiv = document.getElementById("message");
const resultDiv = document.getElementById("result");

// Champs venant du formulaire
const champsDynamiques = [
  { label: "Numéro d'homologation", source: "homologation" },
  { label: "1ère mise en circulation", source: "mec" }
];

// Champs fixes (repris de ton document Word)
const champsFixes = [
  {
    label: "Aménagement intérieur",
    text: "Art. 71, 72 & 104a à 106"
  },
  {
    label: "Antidérapant (pédales)",
    text: "Art. 108"
  },
  {
    label: "Antipollution",
    text: "Art. 35, 36 OETV & 59a OCR, OECGF + Organigramme, dès le 01.01.1976, sauf >Euro3 (moteurs essence ou gaz) et >Euro4 dès 01.10.2006 (moteurs Diesel) + Info OFROU OBD reconnus"
  },
  {
    label: "Antivol",
    text: "Art. 115 (01.07.1971 voit. tourisme)"
  },
  {
    label: "Application des prescriptions",
    text: "Art. 37"
  },
  {
    label: "Appuie tête à l'avant",
    text: "Art. 106 al. 4 (01.10.1999 récept.), constr. ou importé 01.10.2001, N1+M2 dès le 15.01.2017"
  },
  {
    label: "Assurance (obligation de s'assurer)",
    text: "Art. 44 et suiv. OAV"
  },
  {
    label: "Attelage (dispositif d')",
    text: "Art. 91 & 34 al. 2h, Note 3 I Admin. Dispos. Attelage + asa KT 6/2008 + 3 F 1799 + PV ECH 2019/01"
  },
  {
    label: "Atteler une remorque + mesures de sécurité",
    text: "Art. 30 al. 3 LCR, 70 al. 1 OCR"
  },
  {
    label: "Atteler une remorque et permis d’élève",
    text: "Art. 15 al. 3 OAC"
  },
  {
    label: "Attestation de carrossage",
    text: "Art. 103 al. 2"
  },
  {
    label: "Attestation d’assurance (délivrance)",
    text: "Art. 5 OAV"
  },
  {
    label: "Augmentation de puissance",
    text: "Art. 97 al. 3 + v. 13.20 Bpuiss"
  },
  {
    label: "Avertisseur acoustique",
    text: "Art. 82 + annexe 11 + 93/30 CEE"
  },
  {
    label: "Avertisseur pour piétons",
    text: "Art. 82 al. 1bis"
  },
  {
    label: "Avertisseur optique",
    text: "Art. 74 al. 3 & 110 al. 1d"
  },
  {
    label: "Avertisseurs de panne (clignotant)",
    text: "Art. 78 al. 1, 2 + annexe 10"
  },
  {
    label: "Barre anti-rapprochement",
    text: "Dir asa 2a point 4.6.3 p. 80"
  },
  {
    label: "Batterie",
    text: "Art. 80 al. 2"
  },
  {
    label: "Bavettes",
    text: "Art. 66 al. 2 + Art. 104 al. 1 (M1 seul, max 15cm au dessus axe roue)"
  },
  {
    label: "Braquage (diamètre) mouvement giratoire",
    text: "Art. 40 OETV & 65a OCR"
  },
  {
    label: "Bruit",
    text: "Art. 53, 222a al. 8 + annexe 6 + OCE 3.97 + asa KT 06/09 p. 4"
  },
  {
    label: "Bruit (accessoires divers)",
    text: "Art. 66 al. 4"
  },
  {
    label: "Bruit (à éviter)",
    text: "Art. 33 OCR"
  },
  {
    label: "Bruit max. vhc anciens (84 + tol. 2 dB/A)",
    text: "Note 3 I lég. Mes. Bruit vétéran"
  },
  {
    label: "Bruit (mesure au passage)",
    text: "à partir du 01.10.1977 + Note 3 I Org. Mes. Bruit passage Aigle"
  },
  {
    label: "Cale",
    text: "Art. 90 al. 3 + dimensions et nombre"
  },
  {
    label: "Cale (voit autom. lourde)",
    text: "Art. 114 al. 1 + dimensions et nombre"
  },
  {
    label: "Carrosserie",
    text: "Art. 66 à 68 & 104a à 104c + annexe 8"
  },
  {
    label: "Catadioptres",
    text: "Art. 77 al. 2, 3 & 109 al. 1b"
  },
  {
    label: "Catadioptres latéraux",
    text: "Art. 109 al. 2 (+ de 8m)"
  },
  {
    label: "Catalyseur",
    text: "Art. 52 al. 6"
  }
];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const homologation = homologationInput.value.trim().toUpperCase();
  const mec = mecInput.value; // AAAA-MM-JJ

  // Reset
  messageDiv.textContent = "";
  resultDiv.innerHTML = "";

  if (!homologation || !mec) {
    messageDiv.textContent = "Merci de remplir les deux champs.";
    return;
  }

  messageDiv.textContent = "Fiche générée :";

  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  ["Champ", "Valeur"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  // Champs venant du formulaire
  champsDynamiques.forEach((champ) => {
    const row = document.createElement("tr");
    const cellKey = document.createElement("td");
    const cellValue = document.createElement("td");

    cellKey.textContent = champ.label;

    if (champ.source === "homologation") {
      cellValue.textContent = homologation;
    } else if (champ.source === "mec") {
      cellValue.textContent = mec;
    }

    row.appendChild(cellKey);
    row.appendChild(cellValue);
    tbody.appendChild(row);
  });

  // Champs fixes de ton Word
  champsFixes.forEach((champ) => {
    const row = document.createElement("tr");
    const cellKey = document.createElement("td");
    const cellValue = document.createElement("td");

    cellKey.textContent = champ.label;
    cellValue.textContent = champ.text;

    row.appendChild(cellKey);
    row.appendChild(cellValue);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  resultDiv.appendChild(table);
});
