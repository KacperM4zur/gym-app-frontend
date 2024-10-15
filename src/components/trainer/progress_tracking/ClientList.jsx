import React from 'react';

const ClientList = ({ clients, onSelect, selectedClientId }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Lista klientów</h2>
            <ul className="space-y-2">
                {clients.map((client) => (
                    <li
                        key={client.id}
                        onClick={() => onSelect(client.id)}
                        className={`p-3 cursor-pointer rounded-lg ${selectedClientId === client.id ? 'bg-blue-200' : 'bg-gray-100'} hover:bg-blue-100`}
                    >
                        {client.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;
