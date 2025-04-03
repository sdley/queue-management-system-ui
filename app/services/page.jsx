'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:8080/api/services')
            .then(async res => {
                const text = await res.text();
                try {
                    const data = JSON.parse(text);
                    setServices(data);
                } catch (error) {
                    console.error("Erreur de parsing JSON :", error.message);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Erreur lors du chargement des services', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Header + Bouton */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#b26148]">Liste des Services</h1>
                <button
                    className="bg-[#00a8e2] hover:bg-[#008dc1] 
                    text-white font-medium py-2 px-4 rounded
                    cursor-pointer shadow-md
                    transition duration-300 ease-in-out
                    "
                    onClick={() => router.push('/services/add')}
                >
                    Ajouter un service
                </button>
            </div>

            {loading ? (
                <p className="text-gray-600">Chargement en cours...</p>
            ) : services.length === 0 ? (
                <p className="text-gray-600">Aucun service trouvé.</p>
            ) : (
                <ul className="space-y-4">
                    {services.map(service => (
                        <li key={service.nom} className="border rounded-lg p-4 shadow-sm bg-white">
                            <p className="text-lg font-semibold text-[#00a8e2]">{service.nom}</p>
                            <p className="text-gray-700 mb-2">Description : {service.description}</p>

                            {service.localisations?.length > 0 ? (
                                <div>
                                    <p className="font-medium text-gray-800">Localisations :</p>
                                    <ul className="list-disc ml-6 text-gray-700">
                                        {service.localisations.map(loc => (
                                            <li key={loc.id}>{loc.nom}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">Aucune localisation liée</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
