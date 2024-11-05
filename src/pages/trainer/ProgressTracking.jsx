import React, { useState, useEffect } from 'react';
import ClientList from "../../components/trainer/progress_tracking/ClientList.jsx";
import WeightChart from "../../components/trainer/progress_tracking/WeightChart.jsx";
import MeasurementChart from "../../components/trainer/progress_tracking/MeasurementChart.jsx";
import MaxLiftChart from "../../components/trainer/progress_tracking/MaxLiftChart.jsx";
import AddNoteForm from "../../components/trainer/progress_tracking/AddNoteForm.jsx";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

const ProgressTracking = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [weights, setWeights] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [maxLifts, setMaxLifts] = useState([]);
    const [notes, setNotes] = useState([]);
    const [isWeightChartOpen, setIsWeightChartOpen] = useState(false);
    const [isMeasurementChartOpen, setIsMeasurementChartOpen] = useState(false);
    const [isMaxLiftChartOpen, setIsMaxLiftChartOpen] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    useEffect(() => {
        if (selectedClient) {
            fetchWeights(selectedClient);
            fetchMeasurements(selectedClient);
            fetchMaxLifts(selectedClient);
            fetchNotes(selectedClient);
        }
    }, [selectedClient]);

    const fetchClients = async () => {
        const response = await fetch('http://gym-app.test/api/clients', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        setClients(data);
    };

    const fetchWeights = async (clientId) => {
        const response = await fetch(`http://gym-app.test/api/clients/${clientId}/weights`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        setWeights(data.data);
    };

    const fetchMeasurements = async (clientId) => {
        const response = await fetch(`http://gym-app.test/api/clients/${clientId}/measurements`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        setMeasurements(data.data);
    };

    const fetchMaxLifts = async (clientId) => {
        const response = await fetch(`http://gym-app.test/api/clients/${clientId}/max-lifts`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        setMaxLifts(data.data);
    };

    const fetchNotes = async (clientId) => {
        const response = await fetch(`http://gym-app.test/api/clients/${clientId}/advices`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        setNotes(data.data);
    };

    const handleSelectClient = (clientId) => {
        setSelectedClient(clientId);
    };

    const handleAddNote = async (noteContent) => {
        const response = await fetch(`http://gym-app.test/api/clients/${selectedClient}/advices`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: noteContent }),
        });
        const data = await response.json();
        setNotes([...notes, data.data]);
    };

    return (
        <div className="flex">
            <div className="w-1/4 p-4">
                <ClientList
                    clients={clients}
                    onSelectClient={handleSelectClient}
                    selectedClient={selectedClient}
                />
            </div>
            <div className="w-3/4 p-4 space-y-4">
                {selectedClient && (
                    <>
                        <div>
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => setIsWeightChartOpen(!isWeightChartOpen)}
                            >
                                <h3 className="text-xl font-bold">Wykres Wagi</h3>
                                {isWeightChartOpen ? (
                                    <ChevronUpIcon className="w-6 h-6 text-gray-500" />
                                ) : (
                                    <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                                )}
                            </div>
                            {isWeightChartOpen && <WeightChart weights={weights} />}
                        </div>

                        <div>
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => setIsMeasurementChartOpen(!isMeasurementChartOpen)}
                            >
                                <h3 className="text-xl font-bold">Wykres Pomiarów</h3>
                                {isMeasurementChartOpen ? (
                                    <ChevronUpIcon className="w-6 h-6 text-gray-500" />
                                ) : (
                                    <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                                )}
                            </div>
                            {isMeasurementChartOpen && <MeasurementChart measurements={measurements} />}
                        </div>

                        <div>
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => setIsMaxLiftChartOpen(!isMaxLiftChartOpen)}
                            >
                                <h3 className="text-xl font-bold">Wykres Ciężarów Maksymalnych</h3>
                                {isMaxLiftChartOpen ? (
                                    <ChevronUpIcon className="w-6 h-6 text-gray-500" />
                                ) : (
                                    <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                                )}
                            </div>
                            {isMaxLiftChartOpen && <MaxLiftChart maxLifts={maxLifts} />}
                        </div>

                        <AddNoteForm onAddNote={handleAddNote} />
                        <div className="mt-4">
                            <h2 className="text-xl font-bold mb-2">Notatki</h2>
                            <ul>
                                {notes.map((note) => (
                                    <li key={note.id} className="mb-2 p-2 border rounded flex justify-between">
                                        <span>{note.content}</span>
                                        <span className="text-gray-500 text-sm">{new Date(note.created_at).toLocaleDateString()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProgressTracking;
