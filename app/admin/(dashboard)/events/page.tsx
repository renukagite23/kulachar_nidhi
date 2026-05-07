'use client';

import { useEffect, useState } from 'react';
import {
    CalendarDays,
    Plus,
    Eye,
    Trash2,
    MapPin,
    X,
    CheckCircle2,
    AlertCircle,
    Pencil,
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

// Toast Component
const Toast = ({ message, type, onClose }: any) => {
    useEffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-xl text-white font-bold shadow-lg z-50 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {message}
        </div>
    );
};

export default function EventsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [showCreate, setShowCreate] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const [toast, setToast] = useState<any>(null);
    const [editId, setEditId] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        image: '',
    });

    // STATUS
    const getStatus = (start: string, end: string) => {
        const now = new Date();
        const s = new Date(start);
        const e = new Date(end);

        if (now < s) return 'upcoming';
        if (now >= s && now <= e) return 'ongoing';
        return 'completed';
    };

    // FETCH EVENTS
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events', {
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('Failed to fetch events');
                const data = await res.json();
                setEvents(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // CREATE OR UPDATE EVENT
    const handleCreate = async () => {
        try {
            const method = editId ? 'PATCH' : 'POST';
            const url = editId ? `/api/events/${editId}` : '/api/events';

            const res = await fetch(url, {
                method,
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Failed');

            const savedEvent = await res.json();

            if (editId) {
                setEvents(events.map((e) => (e._id === editId ? savedEvent : e)));
                setToast({ message: 'Event updated successfully', type: 'success' });
            } else {
                setEvents([savedEvent, ...events]);
                setToast({ message: 'Event created successfully', type: 'success' });
            }

            setShowCreate(false);
            setEditId(null);
            setForm({
                name: '',
                description: '',
                startDate: '',
                endDate: '',
                location: '',
                image: '',
            });
        } catch {
            setToast({ message: editId ? 'Failed to update event' : 'Failed to create event', type: 'error' });
        }
    };

    // HANDLE EDIT CLICK
    const handleEditClick = (event: any) => {
        setEditId(event._id);
        setForm({
            name: event.name || '',
            description: event.description || '',
            startDate: event.startDate ? format(new Date(event.startDate), 'yyyy-MM-dd') : '',
            endDate: event.endDate ? format(new Date(event.endDate), 'yyyy-MM-dd') : '',
            location: event.location || '',
            image: event.image || '',
        });
        setShowCreate(true);
    };

    // DELETE EVENT
    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`/api/events/${deleteId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!res.ok) throw new Error('Delete failed');

            setEvents(events.filter((e) => e._id !== deleteId));
            setDeleteId(null);
            setToast({ message: 'Event deleted', type: 'success' });
        } catch {
            setToast({ message: 'Delete failed', type: 'error' });
        }
    };

    if (loading) {
        return (
            <div className="p-12 flex justify-center">
                <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-[1400px] mx-auto">

            {toast && <Toast {...toast} onClose={() => setToast(null)} />}

            {/* HEADER */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-primary mb-1">
                        Temple Events
                    </div>
                    <h1 className="text-4xl font-black text-secondary">
                        Events Management
                    </h1>
                </div>

                <button
                    onClick={() => setShowCreate(true)}
                    className="spiritual-button flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Event
                </button>
            </div>

            {/* TABLE */}
            <div className="spiritual-card bg-white border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 border-b border-border">
                            <tr>
                                <th className="p-4 text-xs font-bold uppercase">Event</th>
                                <th className="p-4 text-xs font-bold uppercase">Date</th>
                                <th className="p-4 text-xs font-bold uppercase">Location</th>
                                <th className="p-4 text-xs font-bold uppercase">Status</th>
                                <th className="p-4 text-xs font-bold uppercase text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border/50">
                            {events.map((e) => {
                                const status = getStatus(e.startDate, e.endDate);

                                return (
                                    <tr key={e._id} className="hover:bg-muted/20">
                                        <td className="p-4">
                                            <div className="font-bold text-secondary">{e.name}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {e.description}
                                            </div>
                                        </td>

                                        <td className="p-4 text-sm text-secondary">
                                            {format(new Date(e.startDate), 'dd MMM')} -{' '}
                                            {format(new Date(e.endDate), 'dd MMM yyyy')}
                                        </td>

                                        <td className="p-4 flex items-center gap-1 text-muted-foreground text-sm">
                                            <MapPin className="w-3 h-3" />
                                            {e.location}
                                        </td>

                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded border ${status === 'upcoming'
                                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                : status === 'ongoing'
                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                                }`}>
                                                {status}
                                            </span>
                                        </td>

                                        <td className="p-4 flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEditClick(e)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => setSelectedEvent(e)}
                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => setDeleteId(e._id)}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CREATE MODAL */}
            <AnimatePresence>
                {showCreate && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <motion.div className="bg-white rounded-2xl w-full max-w-md p-6">
                            <h2 className="font-bold text-lg mb-4">{editId ? 'Edit Event' : 'Create Event'}</h2>

                            <div className="space-y-3">
                                <input placeholder="Event Name" className="spiritual-input w-full"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                                <input placeholder="Location" className="spiritual-input w-full"
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                />
                                <input type="date" className="spiritual-input w-full"
                                    value={form.startDate}
                                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                />
                                <input type="date" className="spiritual-input w-full"
                                    value={form.endDate}
                                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                />
                                <input placeholder="Image URL (optional)" className="spiritual-input w-full"
                                    value={form.image}
                                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                                />
                                <textarea placeholder="Description" className="spiritual-input w-full"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button onClick={() => { setShowCreate(false); setEditId(null); }} className="flex-1 border py-2 rounded-xl">
                                    Cancel
                                </button>
                                <button onClick={handleCreate} className="flex-1 spiritual-button">
                                    {editId ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* VIEW MODAL */}
            <AnimatePresence>
                {selectedEvent && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <motion.div className="bg-white rounded-2xl w-full max-w-lg p-6">
                            <div className="flex justify-between mb-4">
                                <h2 className="font-bold text-lg">{selectedEvent.name}</h2>
                                <button onClick={() => setSelectedEvent(null)}><X /></button>
                            </div>

                            <img src={selectedEvent.image || '/devi.png'} className="rounded-xl mb-4" />

                            <p className="text-sm mb-3">{selectedEvent.description}</p>

                            <div className="text-sm text-muted-foreground space-y-2">
                                <div>📅 {selectedEvent.startDate} → {selectedEvent.endDate}</div>
                                <div>📍 {selectedEvent.location}</div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* DELETE MODAL */}
            <AnimatePresence>
                {deleteId && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <motion.div className="bg-white p-6 rounded-2xl text-center">
                            <h3 className="font-bold mb-3">Delete Event?</h3>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteId(null)} className="flex-1 border py-2 rounded-xl">
                                    Cancel
                                </button>
                                <button onClick={handleDelete} className="flex-1 bg-red-600 text-white rounded-xl">
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}