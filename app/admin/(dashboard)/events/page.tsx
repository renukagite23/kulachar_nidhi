'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventType {
    _id?: string;
    title_en: string;
    title_mr: string;
    desc_en: string;
    desc_mr: string;
    date: string;
    image: string;
}

export default function AdminEventsPage() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

    const [form, setForm] = useState<EventType>({
        title_en: '',
        title_mr: '',
        desc_en: '',
        desc_mr: '',
        date: '',
        image: '',
    });

    const [editEvent, setEditEvent] = useState<EventType>({
        title_en: '',
        title_mr: '',
        desc_en: '',
        desc_mr: '',
        date: '',
        image: '',
    });

    // FETCH EVENTS
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch('/api/events');

            if (!res.ok) {
                throw new Error('Failed to fetch events');
            }

            const data = await res.json();

            setEvents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('FETCH EVENTS ERROR:', error);
            setEvents([]);
        }
    };

    // ADD EVENT
    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error('Failed to create event');
            }

            const data = await res.json();

            setEvents((prev) => [data, ...prev]);

            setForm({
                title_en: '',
                title_mr: '',
                desc_en: '',
                desc_mr: '',
                date: '',
                image: '',
            });

            setShowModal(false);
        } catch (error) {
            console.error('CREATE EVENT ERROR:', error);
        }
    };

    // DELETE EVENT
    const handleDelete = async (id?: string) => {
        if (!id) return;

        const confirmDelete = confirm(
            'Are you sure you want to delete this event?'
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/events/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete event');
            }

            setEvents((prev) => prev.filter((event) => event._id !== id));
        } catch (error) {
            console.error('DELETE EVENT ERROR:', error);
        }
    };

    // OPEN EDIT MODAL
    const handleEditClick = (event: EventType) => {
        setEditEvent({
            _id: event._id,
            title_en: event.title_en || '',
            title_mr: event.title_mr || '',
            desc_en: event.desc_en || '',
            desc_mr: event.desc_mr || '',
            date: event.date || '',
            image: event.image || '',
        });

        setShowEditModal(true);
    };

    // UPDATE EVENT
    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/events/${editEvent._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editEvent),
            });

            if (!res.ok) {
                throw new Error('Failed to update event');
            }

            const updatedEvent = await res.json();

            setEvents((prev) =>
                prev.map((event) =>
                    event._id === updatedEvent._id
                        ? updatedEvent
                        : event
                )
            );

            setShowEditModal(false);
        } catch (error) {
            console.error('UPDATE EVENT ERROR:', error);
        }
    };

    return (
        <div className="p-6 md:p-10 bg-[#f8f6f4] min-h-screen">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-xs font-bold text-orange-600 uppercase">
                        Temple Events
                    </p>

                    <h1 className="text-3xl font-black text-gray-800">
                        Events Management
                    </h1>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl shadow hover:bg-orange-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    Create Event
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-orange-100">

                <table className="w-full text-left">

                    {/* TABLE HEADER */}
                    <thead className="bg-orange-50 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="p-4">Event</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    {/* TABLE BODY */}
                    <tbody className="divide-y divide-orange-50">

                        {events.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center p-6 text-gray-500"
                                >
                                    No events found
                                </td>
                            </tr>
                        ) : (
                            events.map((e, index) => {

                                const today = new Date();

                                const eventDate = e.date
                                    ? new Date(e.date)
                                    : new Date();

                                let status = 'Upcoming';

                                if (eventDate < today) {
                                    status = 'Completed';
                                }

                                return (
                                    <tr
                                        key={e._id || index}
                                        className="hover:bg-orange-50/40 transition"
                                    >

                                        {/* EVENT */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">

                                                <img
                                                    src={
                                                        e.image ||
                                                        '/festival-placeholder.jpg'
                                                    }
                                                    alt={e.title_en}
                                                    className="w-14 h-14 rounded-xl object-cover"
                                                />

                                                <div>
                                                    <div className="font-bold text-gray-800">
                                                        {e.title_en ||
                                                            'Untitled Event'}
                                                    </div>

                                                    <div className="text-xs text-gray-500 line-clamp-2 max-w-xs">
                                                        {e.desc_en ||
                                                            'No description'}
                                                    </div>
                                                </div>

                                            </div>
                                        </td>

                                        {/* DATE */}
                                        <td className="p-4 text-sm text-gray-700">
                                            {e.date || 'No Date'}
                                        </td>

                                        {/* STATUS */}
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 text-xs rounded-full font-semibold ${
                                                    status === 'Completed'
                                                        ? 'bg-gray-100 text-gray-600'
                                                        : 'bg-orange-100 text-orange-700'
                                                }`}
                                            >
                                                {status}
                                            </span>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">

                                                <button
                                                    onClick={() =>
                                                        handleEditClick(e)
                                                    }
                                                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setSelectedEvent(e);
                                                        setShowViewModal(true);
                                                    }}
                                                    className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(e._id)
                                                    }
                                                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                );
                            })
                        )}

                    </tbody>

                </table>
            </div>

            {/* ADD MODAL */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-6 w-full max-w-md"
                        >

                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-xl font-bold text-gray-800">
                                    Create Event
                                </h2>

                                <button onClick={() => setShowModal(false)}>
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-3">

                                <input
                                    placeholder="Title (English)"
                                    value={form.title_en}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            title_en: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:border-orange-500"
                                />

                                <input
                                    placeholder="Title (Marathi)"
                                    value={form.title_mr}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            title_mr: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:border-orange-500"
                                />

                                <textarea
                                    placeholder="Description (English)"
                                    value={form.desc_en}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            desc_en: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:border-orange-500"
                                />

                                <textarea
                                    placeholder="Description (Marathi)"
                                    value={form.desc_mr}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            desc_mr: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:border-orange-500"
                                />

                                <input
                                    type="date"
                                    value={form.date}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            date: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:border-orange-500"
                                />

                                <input
                                    placeholder="Image URL"
                                    value={form.image}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            image: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:border-orange-500"
                                />

                            </div>

                            <div className="flex gap-3 mt-5">

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 border border-orange-200 py-3 rounded-xl font-medium"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 font-medium transition"
                                >
                                    Add Event
                                </button>

                            </div>

                        </motion.div>

                    </div>
                )}
            </AnimatePresence>

            {/* VIEW MODAL */}
            <AnimatePresence>
                {showViewModal && selectedEvent && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl overflow-hidden w-full max-w-lg"
                        >

                            <img
                                src={
                                    selectedEvent.image ||
                                    '/festival-placeholder.jpg'
                                }
                                alt={selectedEvent.title_en}
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-6">

                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {selectedEvent.title_en}
                                </h2>

                                <p className="text-orange-600 font-medium mb-4">
                                    {selectedEvent.date}
                                </p>

                                <p className="text-gray-600 leading-relaxed">
                                    {selectedEvent.desc_en}
                                </p>

                                <button
                                    onClick={() =>
                                        setShowViewModal(false)
                                    }
                                    className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl transition"
                                >
                                    Close
                                </button>

                            </div>

                        </motion.div>

                    </div>
                )}
            </AnimatePresence>

            {/* EDIT MODAL */}
            <AnimatePresence>
                {showEditModal && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-6 w-full max-w-md"
                        >

                            <h2 className="text-xl font-bold mb-5 text-gray-800">
                                Edit Event
                            </h2>

                            <div className="space-y-3">

                                <input
                                    value={editEvent.title_en || ''}
                                    onChange={(e) =>
                                        setEditEvent({
                                            ...editEvent,
                                            title_en: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl"
                                />

                                <input
                                    value={editEvent.title_mr || ''}
                                    onChange={(e) =>
                                        setEditEvent({
                                            ...editEvent,
                                            title_mr: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl"
                                />

                                <textarea
                                    value={editEvent.desc_en || ''}
                                    onChange={(e) =>
                                        setEditEvent({
                                            ...editEvent,
                                            desc_en: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl"
                                />

                                <textarea
                                    value={editEvent.desc_mr || ''}
                                    onChange={(e) =>
                                        setEditEvent({
                                            ...editEvent,
                                            desc_mr: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl"
                                />

                                <input
                                    type="date"
                                    value={editEvent.date || ''}
                                    onChange={(e) =>
                                        setEditEvent({
                                            ...editEvent,
                                            date: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl"
                                />

                                <input
                                    value={editEvent.image || ''}
                                    onChange={(e) =>
                                        setEditEvent({
                                            ...editEvent,
                                            image: e.target.value,
                                        })
                                    }
                                    className="w-full border border-orange-200 p-3 rounded-xl"
                                />

                            </div>

                            <div className="flex gap-3 mt-5">

                                <button
                                    onClick={() =>
                                        setShowEditModal(false)
                                    }
                                    className="flex-1 border border-orange-200 py-3 rounded-xl"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleUpdate}
                                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 transition"
                                >
                                    Update
                                </button>

                            </div>

                        </motion.div>

                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}