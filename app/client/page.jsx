'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientPage() {
    const [services, setServices] = useState([]);
    const [localisations, setLocalisations] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [selectedLocalisation, setSelectedLocalisation] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const router = useRouter();

    useEffect(() => {
        Promise.all([
        fetch('http://localhost:8080/api/services').then(res => res.json()),
        fetch('http://localhost:8080/api/clients').then(res => res.json())
        ])
        .then(([servicesData, clientsData]) => {
            setServices(Array.isArray(servicesData) ? servicesData : []);
            setClients(Array.isArray(clientsData) ? clientsData : []);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    const handleServiceChange = (e) => {
        const nomService = e.target.value;
        setSelectedService(nomService);
        setSelectedLocalisation('');
        fetch(`http://localhost:8080/api/services/localisations?service=${nomService}`)
        .then(res => res.json())
        .then(data => setLocalisations(Array.isArray(data) ? data : []))
        .catch(console.error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedService || !selectedLocalisation || !selectedClient) return;
        setSubmitting(true);

        fetch('http://localhost:8080/api/tickets/generer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nomService: selectedService,
            nomLocalisation: selectedLocalisation,
            clientId: selectedClient
        }),
        })
        .then(res => res.json())
        .then(data => {
            alert(`Ticket généré: ${data.numero}`);
        })
        .catch(console.error)
        .finally(() => setSubmitting(false));
    };

    // Function to handle ticket generation
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleGenerateTicket = () => {
    if (!selectedClient || !selectedService || !selectedLocalisation) return;

    setIsSubmitting(true);

    fetch('http://localhost:8080/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        clientId: selectedClient,
        nomService: selectedService,
        nomLocalisation: selectedLocalisation
        })
    })
        .then(res => res.json())
        .then(data => {
        if (data.ticket?.id) {
            router.push(`/client/ticket-details?ticketId=${data.ticket.id}`);
        } else {
            alert(data.error || 'Erreur lors de la génération du ticket.');
        }
        })
        .catch(err => {
        console.error('Erreur lors de la génération du ticket:', err);
        })
        .finally(() => setIsSubmitting(false));
    };


  return (
    <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-[#b26148] mb-6">Générer un Ticket</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            <select
            value={selectedService}
            onChange={handleServiceChange}
            className="w-full border px-3 py-2 rounded"
            >
            <option value="">-- Choisir un service --</option>
            {services.length > 0 ? (
                services.map(service => (
                <option key={service.nom} value={service.nom}>{service.nom}</option>
                ))
            ) : (
                <option disabled>Aucun service disponible</option>
            )}
            </select>

            <select
            value={selectedLocalisation}
            onChange={(e) => setSelectedLocalisation(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            >
            <option value="">-- Choisir une localisation --</option>
            {localisations.length > 0 ? (
                localisations.map(loc => (
                <option key={loc.id} value={loc.nom}>{loc.nom}</option>
                ))
            ) : (
                selectedService && <option disabled>Aucune localisation pour ce service</option>
            )}
            </select>

            <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            >
            <option value="">-- Choisir un client --</option>
            {clients.length > 0 ? (
                clients.map(client => (
                <option key={client.id} value={client.id}>
                    {client.prenom} {client.nom}
                </option>
                ))
            ) : (
                <option disabled>Aucun client disponible</option>
            )}
            </select>

            <button
                onClick={handleGenerateTicket}
                disabled={!selectedClient || !selectedService || !selectedLocalisation || isSubmitting}
                className={`px-4 py-2 rounded shadow-md transition duration-300 ease-in-out 
                    ${!selectedClient || !selectedService || !selectedLocalisation || isSubmitting 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-[#00a8e2] text-white hover:bg-[#008dc1] cursor-pointer'
                    }`}
                >
                {isSubmitting ? 'Génération...' : 'Générer un Ticket'}
            </button>

        </form>

        {/* Liste des clients */}
        <div className="flex items-center justify-between mt-10 mb-4">
            <h2 className="text-xl font-bold text-[#b26148]">Liste des Clients</h2>
            <button
            className="bg-[#00a8e2] hover:bg-[#008dc1] 
                text-white py-2 px-4 rounded cursor-pointer 
                shadow-md transition duration-300 ease-in-out"
            onClick={() => router.push('/client/new')}
            >
            Ajouter un Client
            </button>
        </div>

        {clients.length === 0 ? (
            <p className="text-gray-600">Aucun client disponible.</p>
        ) : (
            <ul className="space-y-2">
            {clients.map(client => (
                <li key={client.id} className="p-4 bg-white rounded shadow border">
                <p className="text-[#00a8e2] font-semibold">{client.prenom} {client.nom}</p>
                </li>
            ))}
            </ul>
        )}
        </div>
  );
}
