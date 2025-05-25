"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function TicketDetails() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticketId");
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    if (ticketId) {
      fetch(`http://localhost:8080/api/tickets/${ticketId}`)
        .then((res) => res.json())
        .then(setTicketInfo)
        .catch(console.error);
    }
  }, [ticketId]);

  if (!ticketInfo) {
    return (
      <p className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
        Chargement...
      </p>
    );
  }
  if (ticketInfo.error) {
    return (
      <p className="max-w-2xl mx-auto p-4 bg-white text-red-300 rounded shadow">
        {ticketInfo.error}
      </p>
    );
  }

  const { ticket, numTicketEnCours, nomService } = ticketInfo;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-[#b26148] mb-4">Ticket Généré</h1>
      {/* <p><strong>Service:</strong> {ticket.nom_service}</p> */}
      <p>
        <strong>Service:</strong> {nomService}
      </p>
      <p>
        <strong>Localisation:</strong> {ticket.localisation}
      </p>
      <p>
        <strong>Client:</strong> {ticket.client.prenom} {ticket.client.nom}
      </p>
      <p>
        <strong>Numéro e-Ticket:</strong> {ticket.numero}
      </p>
      <p>
        <strong>Status:</strong> {ticket.status}
      </p>
      <p>
        <strong>Position dans la file:</strong> {ticket.positionDansFile}
      </p>
      <p>
        <strong>Nombre de personnes devant:</strong> {ticket.nombreDevant}
      </p>
      <p>
        <strong>Numéro en cours de traitement:</strong>{" "}
        {numTicketEnCours || "Aucun"}
      </p>

      <button
        onClick={() => window.history.back()}
        className="mt-4 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
      >
        Retour à la page précédente
      </button>
    </div>
  );
}
