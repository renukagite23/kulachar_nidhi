'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Trash2, 
  Eye, 
  Mail, 
  Calendar, 
  Filter, 
  MoreVertical,
  CheckCircle2,
  Clock,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useGetContactsQuery, 
  useDeleteContactMutation, 
  useUpdateContactMutation 
} from '@/redux/api/contactApiSlice';
import { format } from 'date-fns';

export default function ContactsAdminPage() {
  const { data: contacts, isLoading, isError } = useGetContactsQuery({});
  const [deleteContact] = useDeleteContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredContacts = contacts?.filter((contact: any) => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'unread') return matchesSearch && !contact.isRead;
    if (filterStatus === 'read') return matchesSearch && contact.isRead;
    return matchesSearch;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await deleteContact(id);
      if (selectedContact?._id === id) setSelectedContact(null);
    }
  };

  const handleView = async (contact: any) => {
    setSelectedContact(contact);
    if (!contact.isRead) {
      await updateContact({ id: contact._id, isRead: true });
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-muted/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">Contact <span className="text-primary">Messages</span></h1>
          <p className="text-muted-foreground text-sm font-medium mt-1">Manage and respond to website enquiries</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search messages..."
              className="pl-10 pr-4 h-11 w-full md:w-64 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex p-1 bg-white rounded-xl border border-border shadow-sm">
            <button 
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filterStatus === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-secondary'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterStatus('unread')}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filterStatus === 'unread' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-secondary'}`}
            >
              Unread
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* List Column */}
        <div className="lg:col-span-7 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredContacts?.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-border">
              <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-bold">No messages found matching your criteria.</p>
            </div>
          ) : (
            filteredContacts?.map((contact: any) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={contact._id}
                onClick={() => handleView(contact)}
                className={`group cursor-pointer bg-white p-5 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-secondary/5 relative overflow-hidden ${
                  selectedContact?._id === contact._id 
                    ? 'border-primary ring-1 ring-primary/20' 
                    : 'border-border hover:border-primary/30'
                } ${!contact.isRead ? 'border-l-4 border-l-primary' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      contact.isRead ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary flex items-center gap-2">
                        {contact.name}
                        {!contact.isRead && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                      </h3>
                      <p className="text-[11px] text-muted-foreground font-medium">{contact.email}</p>
                      <p className="text-sm font-black text-secondary/80 mt-1 line-clamp-1">{contact.subject}</p>
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {format(new Date(contact.createdAt), 'MMM dd, p')}
                    </p>
                    <div className="mt-2 flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(contact._id); }}
                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Detail Column */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            {selectedContact ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-3xl border border-border shadow-2xl sticky top-24 overflow-hidden"
              >
                <div className="bg-secondary p-8 text-white relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        selectedContact.isRead ? 'bg-white/10 text-white/60' : 'bg-primary text-white'
                      }`}>
                        {selectedContact.isRead ? 'Read' : 'Unread'}
                      </span>
                      <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                        Ref: {selectedContact._id.slice(-6).toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black">{selectedContact.subject}</h2>
                    <div className="flex items-center gap-4 mt-6">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary font-black border border-white/10">
                        {selectedContact.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-white">{selectedContact.name}</p>
                        <p className="text-xs text-white/60">{selectedContact.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Message Content</h4>
                    <div className="p-6 bg-muted/30 rounded-2xl border border-border text-sm font-medium text-secondary leading-relaxed whitespace-pre-wrap">
                      {selectedContact.message}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <a 
                      href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                      className="flex-grow h-12 bg-primary text-white rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                    >
                      <Mail className="w-4 h-4" /> Reply via Email
                    </a>
                    <button 
                      onClick={() => handleDelete(selectedContact._id)}
                      className="w-12 h-12 rounded-xl bg-red-50 text-red-500 border border-red-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-border p-6 bg-muted/10">
                  <div className="flex items-center justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      Received on {format(new Date(selectedContact.createdAt), 'MMMM dd, yyyy')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {format(new Date(selectedContact.createdAt), 'p')}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-border border-dashed text-center space-y-4">
                <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center text-muted-foreground/30">
                  <Eye className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-black text-secondary">Select a Message</h3>
                  <p className="text-xs font-medium text-muted-foreground mt-1 max-w-[200px]">Click on a message from the list to view its full details and respond.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
