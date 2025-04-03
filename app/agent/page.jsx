'use client'
import { useEffect, useState } from 'react';

export default function AgentPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/agents')
      .then(res => res.json())
      .then(data => {
        setAgents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des agents', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-[#b26148] mb-6">Liste des Agents</h1>

      {loading ? (
        <p className="text-gray-600">Chargement en cours...</p>
      ) : agents.length === 0 ? (
        <p className="text-gray-600">Aucun agent trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {agents.map(agent => (
            <li key={agent.id} className="border rounded-lg p-4 shadow-sm bg-white">
              <p className="text-lg font-semibold text-[#00a8e2]">{agent.prenom} {agent.nom}</p>
              <p className="text-gray-700">Spécialité : {agent?.specialite || 'Non spécifié'}</p>
              {/* <p className="text-gray-700">Email : {agent.email}</p>
              <p className="text-gray-700">Service : {agent.service?.nom || 'N/A'}</p> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
