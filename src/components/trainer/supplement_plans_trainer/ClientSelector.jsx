import React from 'react';

const ClientSelector = ({ clients, selectedClientId, onSelect }) => {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Wybierz klienta</h2>
            <div className="flex flex-wrap gap-4">
                {clients.map((client) => (
                    <div
                        key={client.id}
                        onClick={() => onSelect(client.id)}
                        className={`cursor-pointer p-4 rounded-lg shadow-md 
                        ${client.id === selectedClientId ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >
                        <h3 className="text-lg font-semibold">{client.name}</h3>
                        <p>{client.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientSelector;
