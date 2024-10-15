import React, { useState } from 'react';
import ClientList from '../../components/trainer/progress_tracking/ClientList.jsx';
import ProgressDetails from '../../components/trainer/progress_tracking/ProgressDetails.jsx';
import AddNoteForm from '../../components/trainer/progress_tracking/AddNoteForm.jsx';

const ProgressTracking = () => {
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [clientNotes, setClientNotes] = useState([]);
    const [clientProgress, setClientProgress] = useState([]);

    const clients = [
        { id: 1, name: 'Jan Kowalski', email: 'jan.kowalski@gmail.com' },
        { id: 2, name: 'Anna Nowak', email: 'anna.nowak@gmail.com' }
    ];

    const handleClientSelect = (clientId) => {
        setSelectedClientId(clientId);
        // Można tutaj pobrać notatki i postępy z backendu
        setClientNotes([
            { date: '2024-10-01', note: 'Jan wykonał świetną sesję z podnoszeniem ciężarów.' },
            { date: '2024-09-20', note: 'Jan poprawił swoją wytrzymałość o 10%.' },
        ]);
        setClientProgress([
            { date: '2024-10-01', weight: 80, benchPress: 100, squat: 120 },
            { date: '2024-09-20', weight: 81, benchPress: 95, squat: 115 },
        ]);
    };

    const addNote = (newNote) => {
        setClientNotes([...clientNotes, { date: new Date().toISOString().split('T')[0], note: newNote }]);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Monitorowanie Postępów</h1>

            {/* Lista klientów */}
            <ClientList clients={clients} onSelect={handleClientSelect} />

            {/* Szczegóły postępów klienta */}
            {selectedClientId && (
                <>
                    <ProgressDetails progress={clientProgress} />
                    <AddNoteForm onAddNote={addNote} />
                </>
            )}
        </div>
    );
};

export default ProgressTracking;
