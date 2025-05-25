"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AgentDashboard() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get("agentId");
  const service = searchParams.get("service");
  const localisation = searchParams.get("localisation");

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (agentId && service && localisation) {
      fetch(
        `http://localhost:8080/api/agents/${agentId}/dashboard?nomService=${service}&nomLocalisation=${localisation}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Dashboard data:", data);
          setDashboardData(data);
        })
        .catch((err) => console.error("Erreur récupération dashboard:", err));
    }
  }, [agentId, service, localisation]);

  const [loadingNextBtn, setLoadingNextBtn] = useState(false);
  const [loadingPrevBtn, setLoadingPrevBtn] = useState(false);

  const handleNextClient = () => {
    setLoadingNextBtn(true);
    fetch(
      `http://localhost:8080/api/agents/${agentId}/next?nomService=${service}&nomLocalisation=${localisation}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Nouveau client :", data);
        setDashboardData((prev) => ({
          ...prev,
          currentTicket: data.ticket,
          currentClient: data.client,
        }));
      })
      .catch((err) => console.error("Erreur next client:", err))
      .finally(() => setLoadingNextBtn(false));
  };

  const handlePreviousClient = () => {
    setLoadingPrevBtn(true);
    fetch(
      `http://localhost:8080/api/agents/${agentId}/previous?nomService=${service}&nomLocalisation=${localisation}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Client précédent :", data);
        setDashboardData((prev) => ({
          ...prev,
          currentTicket: data.ticket,
          currentClient: data.client,
        }));
      })
      .catch((err) => console.error("Erreur client précédent:", err))
      .finally(() => setLoadingPrevBtn(false));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#b26148] mb-6">
        Gestion des appels Agent
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Agent Informations</h2>
        <p>
          <strong>Agent :</strong> {dashboardData?.agent?.prenom}{" "}
          {dashboardData?.agent?.nom}
        </p>
        <p>
          <strong>Service :</strong> {dashboardData?.service?.nom}
        </p>
        <p>
          <strong>Localisation :</strong> {dashboardData?.localisation}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Client Actuellement en Cours</h2>
        {dashboardData?.currentTicket ? (
          <>
            <p>
              <strong>Nom :</strong> {dashboardData?.currentClient?.prenom}{" "}
              {dashboardData?.currentClient?.nom}
            </p>
            <p>
              <strong>Numéro de Ticket :</strong>{" "}
              {dashboardData?.currentTicket?.numero}
            </p>
            <p>
              <strong>Status :</strong> {dashboardData?.currentTicket?.status}
            </p>
          </>
        ) : (
          <p>Aucun client actuellement en cours de traitement.</p>
        )}
      </section>

      <div className="flex space-x-4">
        <button
          onClick={handlePreviousClient}
          disabled={loadingPrevBtn}
          className={`px-4 py-2 rounded transition duration-300 ease-in-out shadow-md 
                    ${
                      loadingPrevBtn
                        ? "bg-gray-300 text-black cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    }`}
        >
          {loadingPrevBtn ? "Chargement..." : "Client Précédent"}
        </button>

        <button
          onClick={handleNextClient}
          disabled={loadingNextBtn}
          className={`px-4 py-2 rounded text-white transition duration-300 ease-in-out shadow-md 
                    ${
                      loadingNextBtn
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-[#00a8e2] hover:bg-[#008dc1] cursor-pointer"
                    }`}
        >
          {loadingNextBtn ? "Chargement..." : "Client Suivant"}
        </button>
      </div>
    </div>
  );
}
