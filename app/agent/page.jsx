"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AgentPage() {
  const [agents, setAgents] = useState([]);
  const [services, setServices] = useState([]);
  const [localisations, setLocalisations] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocalisation, setSelectedLocalisation] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/api/agents")
      .then((res) => res.json())
      .then(setAgents)
      .catch(console.error);

    fetch("http://localhost:8080/api/services")
      .then((res) => res.json())
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleServiceChange = (e) => {
    const serviceNom = e.target.value;
    setSelectedService(serviceNom);
    setSelectedLocalisation("");

    fetch(
      `http://localhost:8080/api/services/localisations?service=${serviceNom}`
    )
      .then((res) => res.json())
      .then(setLocalisations)
      .catch(console.error);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAgent && selectedService && selectedLocalisation) {
      setIsSubmitting(true); // ← Désactive le bouton
      router.push(
        `/agent/dashboard?agentId=${selectedAgent}&service=${selectedService}&localisation=${selectedLocalisation}`
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-[#b26148] mb-6">
        Accéder à la page Agent
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        {/* AGENT */}
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Choisir un agent --</option>
          {agents?.length > 0 ? (
            agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.prenom} {agent.nom}
              </option>
            ))
          ) : (
            <option disabled>Aucun agent disponible</option>
          )}
        </select>

        {/* SERVICE */}
        <select
          value={selectedService}
          onChange={handleServiceChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Choisir un service --</option>
          {services?.length > 0 ? (
            services.map((service) => (
              <option key={service.nom} value={service.nom}>
                {service.nom}
              </option>
            ))
          ) : (
            <option disabled>Aucun service disponible</option>
          )}
        </select>

        {/* LOCALISATION */}
        <select
          value={selectedLocalisation}
          onChange={(e) => setSelectedLocalisation(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Choisir une localisation --</option>
          {localisations?.length > 0
            ? localisations.map((loc) => (
                <option key={loc.id} value={loc.nom}>
                  {loc.nom}
                </option>
              ))
            : selectedService && (
                <option disabled>
                  Aucune localisation trouvée pour ce service
                </option>
              )}
        </select>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            !selectedAgent ||
            !selectedService ||
            !selectedLocalisation
          }
          className={`px-4 py-2 rounded transition duration-300 ease-in-out shadow-md
                        ${
                          !selectedAgent ||
                          !selectedService ||
                          !selectedLocalisation ||
                          isSubmitting
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-[#00a8e2] hover:bg-[#008dc1] text-white cursor-pointer"
                        }`}
        >
          {isSubmitting ? "Redirection..." : "Continuer"}
        </button>
      </form>

      {/* Liste des agents + Bouton */}
      <div className="flex items-center justify-between my-6">
        <h1 className="text-xl font-bold text-[#b26148]">Liste des Agents</h1>
        <button
          className="bg-[#00a8e2] hover:bg-[#008dc1] 
                    text-white font-medium py-2 px-4 rounded
                    cursor-pointer shadow-md
                    transition duration-300 ease-in-out"
          onClick={() => router.push("/agent/new")}
        >
          Ajouter un agent
        </button>
      </div>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          {agents?.length > 0 ? (
            <ul className="space-y-4 mb-8">
              {agents.map((agent) => (
                <li key={agent.id} className="border rounded-lg p-4 bg-white">
                  <p className="text-lg font-semibold text-[#00a8e2]">
                    {agent.prenom} {agent.nom}
                  </p>
                  <p className="text-gray-700">
                    Spécialité : {agent.specialite || "Non spécifié"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mb-8">Aucun agent trouvé.</p>
          )}
        </>
      )}
    </div>
  );
}
