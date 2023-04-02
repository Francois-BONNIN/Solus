import React, { useState } from "react";

type Materiel = {
  processeur: string;
  carteGraphique: string;
  ram: string;
  stockage: string;
  prix: number;
};

type Besoin =
  | { nom: "Gaming"; materiel: Materiel }
  | { nom: "Montage"; materiel: Materiel }
  | { nom: "Développement"; materiel: Materiel }
  | { nom: "Bureautique"; materiel: Materiel };

const besoins: Besoin[] = [
  {
    nom: "Gaming",
    materiel: {
      processeur: "Intel Core i9",
      carteGraphique: "Nvidia RTX 3080",
      ram: "32 Go DDR4",
      stockage: "SSD 1 To",
      prix: 2000,
    },
  },
  {
    nom: "Montage",
    materiel: {
      processeur: "AMD Ryzen 9",
      carteGraphique: "Nvidia RTX 3070",
      ram: "64 Go DDR4",
      stockage: "SSD 2 To + HDD 4 To",
      prix: 2500,
    },
  },
  {
    nom: "Développement",
    materiel: {
      processeur: "Intel Core i7",
      carteGraphique: "Nvidia GTX 1660",
      ram: "16 Go DDR4",
      stockage: "SSD 512 Go",
      prix: 1500,
    },
  },
  {
    nom: "Bureautique",
    materiel: {
      processeur: "Intel Core i5",
      carteGraphique: "Intégrée",
      ram: "8 Go DDR4",
      stockage: "HDD 1 To",
      prix: 800,
    },
  },
];

const Algo = () => {
  const [besoinSelectionne, setBesoinSelectionne] = useState<Besoin | null>(
    null
  );

  const selectBesoin = (besoin: Besoin) => {
    setBesoinSelectionne(besoin);
  };

  return (
    <div>
      <h2>Sélectionnez votre besoin:</h2>
      {besoins.map((besoin) => (
        <button key={besoin.nom} onClick={() => selectBesoin(besoin)}>
          {besoin.nom}
        </button>
      ))}
      {besoinSelectionne && (
        <div>
          <h2>Materiel sélectionné pour le besoin {besoinSelectionne.nom}</h2>
          <ul>
            <li>Processeur: {besoinSelectionne.materiel.processeur}</li>
            <li>
              Carte graphique: {besoinSelectionne.materiel.carteGraphique}
            </li>
            <li>RAM: {besoinSelectionne.materiel.ram}</li>
            <li>Stockage: {besoinSelectionne.materiel.stockage}</li>
            <li>Prix: {besoinSelectionne.materiel.prix} €</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Algo;