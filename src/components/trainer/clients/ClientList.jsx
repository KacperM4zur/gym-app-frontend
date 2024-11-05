import React from 'react';

const ClientList = ({ clients, onSelectClient, selectedClient }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Lista klientów</h2>
            <ul className="space-y-4">
                {clients.map(client => (
                    <li
                        key={client.id}
                        className={`p-4 bg-white shadow-lg rounded-lg cursor-pointer 
                            ${selectedClient === client.id ? 'bg-blue-300' : 'hover:bg-blue-100'}`}
                        onClick={() => onSelectClient(client.id)}
                    >
                        <div className="flex justify-between items-center">
                            <span>{client.name}</span>
                            <span className="text-gray-500">{client.email}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;
