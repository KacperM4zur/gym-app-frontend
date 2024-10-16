import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TrainerCalendar = () => {
    const [value, setValue] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ date: '', name: '' });

    const handleDateChange = (date) => {
        setValue(date);
    };

    const openModal = () => {
        setShowModal(true);
        setNewEvent({ ...newEvent, date: value });
    };

    const closeModal = () => {
        setShowModal(false);
        setNewEvent({ date: '', name: '' });
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (newEvent.name) {
            setEvents([...events, { date: value, name: newEvent.name }]);
            closeModal();
        }
    };

    const getEventsForDate = (date) => {
        return events.filter(event => event.date.toDateString() === date.toDateString());
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
                        <h3 className="text-xl font-semibold mb-2">Wydarzenia na {value.toDateString()}</h3>
                        <ul className="list-disc ml-5">
                            {getEventsForDate(value).length > 0 ? (
                                getEventsForDate(value).map((event, index) => (
                                    <li key={index}>{event.name}</li>
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

            {/* Modal do dodawania wydarzeń */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Dodaj Wydarzenie</h3>
                        <form onSubmit={handleAddEvent}>
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">Nazwa Wydarzenia</label>
                                <input
                                    type="text"
                                    value={newEvent.name}
                                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
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
