import React from 'react';

const ClientSelector = ({ clients, onSelectClient, selectedClientId }) => {
    return (
        <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Wybierz klienta:</label>
            <select
                className="w-full p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => onSelectClient(e.target.value)}
                value={selectedClientId || ''}
            >
                <option value="">-- Wybierz klienta --</option>
                {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                        {client.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ClientSelector;
