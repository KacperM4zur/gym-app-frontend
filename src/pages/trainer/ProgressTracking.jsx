import React, { useState } from 'react';
import ClientList from "../../components/trainer/progress_tracking/ClientList.jsx";
import ProgressDetails from "../../components/trainer/progress_tracking/ProgressDetails.jsx";
import AddNoteForm from "../../components/trainer/progress_tracking/AddNoteForm.jsx";
import AddProgressForm from "../../components/trainer/progress_tracking/AddProgressForm.jsx";

const ProgressTracking = () => {
    const [selectedClientId, setSelectedClientId] = useState(null);

    const clients = [
        { id: 1, name: 'Jan Kowalski' },
        { id: 2, name: 'Anna Nowak' },
    ];

    const [progressData, setProgressData] = useState({
        1: [
            { date: '2024-01-01', weight: 80, note: 'Przyrost masy, stabilny progres.' },
            { date: '2024-02-01', weight: 78, note: 'Lekki spadek wagi, zwiększona intensywność treningu.' }
        ],
        2: [
            { date: '2024-01-01', weight: 65, note: 'Start programu, dobra forma.' },
            { date: '2024-02-01', weight: 67, note: 'Zwiększona masa mięśniowa.' }
        ],
    });

    const [notes, setNotes] = useState({
        1: [{ id: 1, content: 'Jan Kowalski - Pierwsza notatka.' }],
        2: [{ id: 2, content: 'Anna Nowak - Pierwsza notatka.' }],
    });

    const handleClientSelect = (clientId) => {
        setSelectedClientId(clientId);
    };

    const handleAddProgress = (clientId, newProgress) => {
        setProgressData((prevData) => ({
            ...prevData,
            [clientId]: [...(prevData[clientId] || []), newProgress]
        }));
    };

    const handleAddNote = (clientId, newNote) => {
        setNotes((prevNotes) => ({
            ...prevNotes,
            [clientId]: [...(prevNotes[clientId] || []), { id: prevNotes[clientId].length + 1, content: newNote }]
        }));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-5xl font-bold mb-6 text-center">Monitorowanie Postępów</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <ClientList clients={clients} onSelect={handleClientSelect} selectedClientId={selectedClientId} />
                </div>
                <div className="md:col-span-2">
                    {selectedClientId ? (
                        <>
                            <ProgressDetails
                                clientId={selectedClientId}
                                notes={notes[selectedClientId] || []}
                                progressData={progressData[selectedClientId] || []}
                            />
                            <AddProgressForm clientId={selectedClientId} onAddProgress={handleAddProgress} />
                            <AddNoteForm clientId={selectedClientId} onAddNote={handleAddNote} />
                        </>
                    ) : (
                        <div className="text-center bg-white shadow-md rounded-lg p-6">
                            <p>Wybierz klienta, aby wyświetlić jego postęp.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProgressTracking;
