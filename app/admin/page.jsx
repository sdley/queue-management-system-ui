"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/dashboard")
      .then((res) => res.json())
      .then(setQueues)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#b26148]">
        Tableau de Bord de l'Administrateur
      </h1>
      <h2 className="text-xl font-semibold mb-4">
        Vue d'ensemble des Files d'Attente
      </h2>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Service</th>
              <th className="px-4 py-2 border">Localisation</th>
              <th className="px-4 py-2 border">Clients en Attente</th>
              <th className="px-4 py-2 border">Ticket en Cours</th>
              <th className="px-4 py-2 border">Prochain Ticket</th>
            </tr>
          </thead>
          <tbody>
            {queues.map((q, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{q.serviceNom}</td>
                <td className="px-4 py-2 border">{q.localisation}</td>
                <td className="px-4 py-2 border text-center">
                  {q.clientsEnAttente}
                </td>
                {/* <td className={`px-4 py-2 border ${q.ticketEnCours?.includes('Non') 
                                    ? 'text-red-500' : 'text-green-600'}`}>
                                    {q.ticketEnCours || 'Service Non Démarré'}
                                </td>
                                <td className={`px-4 py-2 border ${q.prochainTicket?.includes('Terminé') 
                                    ? 'text-green-600' : ''}`}>
                                    {q.prochainTicket || 'Néant'}
                                </td> */}
                <td
                  className="border px-4 py-2 text-center"
                  dangerouslySetInnerHTML={{ __html: q.numeroTicketEnCours }}
                />

                <td
                  className="border px-4 py-2 text-center"
                  dangerouslySetInnerHTML={{ __html: q.numeroProchainTicket }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
