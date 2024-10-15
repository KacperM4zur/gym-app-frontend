import React from 'react';

const ProgressDetails = ({ progressData, notes }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Historia Postępów</h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold">Dane z monitoringu:</h3>
                {progressData.length > 0 ? (
                    <ul className="space-y-4">
                        {progressData.map((progress, index) => (
                            <li key={index} className="p-4 border rounded-lg bg-gray-100">
                                <strong>Data:</strong> {progress.date} <br />
                                <strong>Waga:</strong> {progress.weight} kg <br />
                                <strong>Notatka:</strong> {progress.note}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Brak zapisanych postępów dla tego klienta.</p>
                )}
            </div>

            <h3 className="text-xl font-semibold">Notatki:</h3>
            {notes.length > 0 ? (
                <ul className="space-y-4">
                    {notes.map((note) => (
                        <li key={note.id} className="p-4 border rounded-lg bg-gray-100">
                            {note.content}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak zapisanych notatek dla tego klienta.</p>
            )}
        </div>
    );
};

export default ProgressDetails;
