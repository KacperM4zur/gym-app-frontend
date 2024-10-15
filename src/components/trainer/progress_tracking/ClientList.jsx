import React from 'react';

const ClientList = ({ clients, onSelect }) => {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Lista Klientów</h2>
            <ul className="bg-white shadow-md rounded-lg">
                {clients.map((client) => (
                    <li
                        key={client.id}
                        className="p-4 border-b cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => onSelect(client.id)}
                    >
                        <h3 className="text-lg font-semibold">{client.name}</h3>
                        <p className="text-gray-500">{client.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;
