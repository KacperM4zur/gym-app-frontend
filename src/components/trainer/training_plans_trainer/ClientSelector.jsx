import React from 'react';

const ClientSelector = ({ clients, onSelectClient, selectedClientId }) => {
    return (
        <div className="mb-4">
            <label htmlFor="clientSelector" className="block text-lg font-semibold mb-2">Wybierz klienta:</label>
            <select
                id="clientSelector"
                value={selectedClientId || ''}
                onChange={(e) => onSelectClient(e.target.value)}
                className="w-full p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="" disabled>Wybierz klienta</option>
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
