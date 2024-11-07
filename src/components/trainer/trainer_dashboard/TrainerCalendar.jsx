import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TrainerCalendar = () => {
    const [value, setValue] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', time: '' });

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://gym-app.test/api/events', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const data = await response.json();
                console.log("Fetched events:", data);
                if (data.events && Array.isArray(data.events)) {
                    setEvents(data.events.map(event => ({
                        ...event,
                        date: new Date(event.date), // Ensure date is an object
                    })));
                } else {
                    console.error("Expected an array but received:", data);
                    setEvents([]);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const handleDateChange = (date) => {
        setValue(date);
        setNewEvent({ ...newEvent, date: date.toISOString().split('T')[0] });
    };

    const openModal = () => {
        const adjustedDate = new Date(value);
        adjustedDate.setDate(adjustedDate.getDate() + 1); // Adjust by adding one day
        setShowModal(true);
        setNewEvent(prevEvent => ({
            ...prevEvent,
            date: adjustedDate.toISOString().split('T')[0] // Ensure date is set correctly when opening modal
        }));
    };

    const closeModal = () => {
        setShowModal(false);
        setNewEvent({ title: '', description: '', date: '', time: '' });
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        if (newEvent.title && newEvent.description && newEvent.time && newEvent.date) {
            try {
                const response = await fetch('http://gym-app.test/api/events', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newEvent),
                });

                if (response.ok) {
                    const savedEvent = await response.json();
                    setEvents([...events, { ...savedEvent.event, date: new Date(savedEvent.event.date) }]);
                    closeModal();
                } else {
                    console.error("Failed to add event");
                }
            } catch (error) {
                console.error("Error adding event:", error);
            }
        } else {
            console.error("All fields must be filled out, including date");
        }
    };

    const getEventsForDate = (date) => {
        if (!Array.isArray(events)) return [];
        return events.filter(event => {
            if (!event.date) return false; // Check if `date` exists
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === date.toDateString();
        });
    };

    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Kalendarz</h2>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <Calendar onChange={handleDateChange} value={value} className="w-full" />
                    </div>

                    <div className="mt-4 lg:mt-0">
                        <h3 className="text-xl font-semibold mb-2">Wydarzenia</h3>
                        <ul className="list-disc ml-5">
                            {getEventsForDate(value).length > 0 ? (
                                getEventsForDate(value).map((event, index) => (
                                    <li key={index}>
                                        <strong>{event.title}</strong> - {event.description} o godzinie {event.time}
                                    </li>
                                ))
                            ) : (
                                <p>Brak wydarzeń na ten dzień.</p>
                            )}
                        </ul>

                        <button
                            onClick={openModal}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Dodaj Wydarzenie
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Dodaj Wydarzenie</h3>
                        <form onSubmit={handleAddEvent}>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Tytuł</label>
                                <input
                                    type="text"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Opis</label>
                                <textarea
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Data</label>
                                <input
                                    type="date"
                                    value={newEvent.date}
                                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Godzina</label>
                                <input
                                    type="time"
                                    value={newEvent.time}
                                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Anuluj</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Dodaj</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainerCalendar;
