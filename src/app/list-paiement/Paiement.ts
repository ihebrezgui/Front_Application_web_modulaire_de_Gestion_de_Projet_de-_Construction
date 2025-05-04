export class Paiement {
  idPaiement!: number; // ID du paiement
  montantPaye!: number; // Montant payé
  datePaiement!: string; // Format string (YYYY-MM-DD)
  modePaiement!: string; // Ex: "Carte", "Virement", "Espèces"
  facture!: number; // ID de la facture associée
  echeance?: number; // Optionnel, car un paiement peut ne pas être lié à une échéance
  nbreEcheances?: number; // Optionnel, nombre d'échéances pour les paiements échelonnés
}
