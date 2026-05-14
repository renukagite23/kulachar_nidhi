'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, Trash2, Globe, Loader2, Plus, X,
  Clock, CheckCircle, AlertCircle, Eye, EyeOff,
  ChevronUp, ChevronDown, List, Layout, Sparkles, Copy
} from 'lucide-react';
import axios from 'axios';

interface ScheduleItem {
  time: string;
  heading: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

interface LanguageData {
  title: string;
  subtitle: string;
  schedules: ScheduleItem[];
}

export default function ScheduleForm() {
  const [activeTab, setActiveTab] = useState<'english' | 'marathi'>('english');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<{ english: LanguageData; marathi: LanguageData }>({
    english: { title: 'Daily Schedule', subtitle: 'Temple Timing Management', schedules: [] },
    marathi: { title: 'दैनंदिन कार्यक्रम', subtitle: 'मंदिर वेळापत्रक व्यवस्थापन', schedules: [] }
  });
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/about/temple/daily-schedule');
      if (res.data && res.data.english) {
        setData(res.data);
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await axios.post('/api/admin/about/temple/daily-schedule', data);
      if (res.status === 200) {
        setNotification({ type: 'success', message: activeTab === 'marathi' ? 'वेळापत्रक यशस्वीरित्या जतन केले!' : 'Schedule updated successfully!' });
      }
    } catch (error: any) {
      console.error('Error saving schedule:', error);
      const errorMsg = error.response?.data?.error || error.message;
      setNotification({
        type: 'error',
        message: activeTab === 'marathi' ? `त्रुटी: ${errorMsg}` : `Error: ${errorMsg}`
      });
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const addScheduleItem = () => {
    const newItem: ScheduleItem = {
      time: activeTab === 'marathi' ? 'सकाळी ६:००' : '06:00 AM',
      heading: '',
      description: '',
      icon: 'Clock',
      order: data[activeTab].schedules.length,
      isActive: true
    };

    setData({
      ...data,
      [activeTab]: {
        ...data[activeTab],
        schedules: [...data[activeTab].schedules, newItem]
      }
    });
  };

  const copyFromEnglish = () => {
    if (confirm('This will replace Marathi items with English items. Continue?')) {
      setData({
        ...data,
        marathi: {
          ...data.marathi,
          schedules: data.english.schedules.map(item => ({ ...item }))
        }
      });
      setNotification({ type: 'success', message: 'Copied from English! Please translate now.' });
    }
  };

  const removeScheduleItem = (index: number) => {
    const updatedSchedules = data[activeTab].schedules.filter((_, i) => i !== index);
    setData({
      ...data,
      [activeTab]: {
        ...data[activeTab],
        schedules: updatedSchedules
      }
    });
  };

  const updateScheduleItem = (index: number, field: keyof ScheduleItem, value: any) => {
    const updatedSchedules = [...data[activeTab].schedules];
    updatedSchedules[index] = { ...updatedSchedules[index], [field]: value };
    setData({
      ...data,
      [activeTab]: {
        ...data[activeTab],
        schedules: updatedSchedules
      }
    });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newSchedules = [...data[activeTab].schedules];
    if (direction === 'up' && index > 0) {
      [newSchedules[index], newSchedules[index - 1]] = [newSchedules[index - 1], newSchedules[index]];
    } else if (direction === 'down' && index < newSchedules.length - 1) {
      [newSchedules[index], newSchedules[index + 1]] = [newSchedules[index + 1], newSchedules[index]];
    }

    const reordered = newSchedules.map((item, idx) => ({ ...item, order: idx }));

    setData({
      ...data,
      [activeTab]: {
        ...data[activeTab],
        schedules: reordered
      }
    });
  };

  const labels = {
    english: {
      title: 'Daily Schedule',
      subtitle: 'Temple Timing Management',
      sync: 'Sync Schedule',
      secTitle: 'Section Title',
      secSubtitle: 'Section Subtitle',
      entries: 'Schedule Entries',
      add: 'Add Entry',
      time: 'Time',
      heading: 'Heading',
      icon: 'Icon (Lucide)',
      desc: 'Description (Optional)',
      noItems: 'No schedule items added yet.',
      copy: 'Copy from English'
    },
    marathi: {
      title: 'दैनंदिन कार्यक्रम',
      subtitle: 'मंदिर वेळापत्रक व्यवस्थापन',
      sync: 'वेळापत्रक जतन करा',
      secTitle: 'विभागाचे शीर्षक',
      secSubtitle: 'उपशीर्षक',
      entries: 'वेळापत्रक यादी',
      add: 'नवीन जोडा',
      time: 'वेळ',
      heading: 'शीर्षक',
      icon: 'आयकॉन (Lucide)',
      desc: 'तपशील (ऐच्छिक)',
      noItems: 'अद्याप कोणतेही आयटम जोडलेले नाहीत.',
      copy: 'इंग्रजीमधून कॉपी करा'
    }
  };

  const L = activeTab === 'marathi' ? labels.marathi : labels.english;

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-secondary tracking-tight uppercase">{L.title}</h2>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest italic">{L.subtitle}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
          {saving ? (activeTab === 'marathi' ? 'प्रक्रिया सुरू आहे...' : 'Processing...') : L.sync}
        </button>
      </div>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold border ${notification.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
              }`}
          >
            {notification.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        {/* Tab Switcher */}
        <div className="flex border-b border-gray-100">
          {(['english', 'marathi'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                ? 'text-primary bg-primary/5 border-b-2 border-primary'
                : 'text-muted-foreground hover:bg-gray-50'
                }`}
            >
              <Globe className={`w-3 h-3 ${activeTab === tab ? 'text-primary' : 'text-muted-foreground'}`} />
              {tab === 'english' ? 'ENGLISH' : 'मराठी'}
            </button>
          ))}
        </div>

        <div className="p-8 space-y-8">
          {/* Title & Subtitle Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{L.secTitle}</label>
              <input
                type="text"
                className="w-full bg-white border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                value={data[activeTab].title}
                onChange={(e) => setData({
                  ...data,
                  [activeTab]: { ...data[activeTab], title: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{L.secSubtitle}</label>
              <input
                type="text"
                className="w-full bg-white border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                value={data[activeTab].subtitle}
                onChange={(e) => setData({
                  ...data,
                  [activeTab]: { ...data[activeTab], subtitle: e.target.value }
                })}
              />
            </div>
          </div>

          {/* Schedule List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-2">
                <List className="w-3 h-3 text-primary" />
                {L.entries} ({data[activeTab].schedules.length})
              </h3>
              <div className="flex items-center gap-4">
                {activeTab === 'marathi' && data.english.schedules.length > 0 && (
                  <button
                    onClick={copyFromEnglish}
                    className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{L.copy}</span>
                  </button>
                )}
                <button
                  onClick={addScheduleItem}
                  className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{L.add}</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {data[activeTab].schedules.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50/50">
                  <Clock className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                  <p className="text-xs font-bold text-gray-400 italic">{L.noItems}</p>
                </div>
              ) : (
                data[activeTab].schedules
                  .sort((a, b) => a.order - b.order)
                  .map((item, idx) => (
                    <motion.div
                      layout
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-[2rem] border transition-all ${item.isActive ? 'bg-white border-gray-100 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        {/* Time & Icon */}
                        <div className="md:col-span-3 space-y-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{L.time}</label>
                            <div className="relative">
                              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                              <input
                                type="text"
                                placeholder={activeTab === 'marathi' ? 'सकाळी ६:००' : '6:00 AM'}
                                className="w-full bg-gray-50 border-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none border"
                                value={item.time}
                                onChange={(e) => updateScheduleItem(idx, 'time', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{L.icon}</label>
                            <div className="relative">
                              <Layout className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                              <input
                                type="text"
                                placeholder="Clock, Sparkles, etc."
                                className="w-full bg-gray-50 border-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none border"
                                value={item.icon}
                                onChange={(e) => updateScheduleItem(idx, 'icon', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="md:col-span-7 space-y-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{L.heading}</label>
                            <input
                              type="text"
                              placeholder={activeTab === 'marathi' ? 'अभिषेक आणि आरती' : 'Opening & Aarti'}
                              className="w-full bg-gray-50 border-gray-100 rounded-xl py-3 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none border"
                              value={item.heading}
                              onChange={(e) => updateScheduleItem(idx, 'heading', e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{L.desc}</label>
                            <textarea
                              rows={2}
                              placeholder={activeTab === 'marathi' ? 'थोडक्यात माहिती...' : 'Brief devotional details...'}
                              className="w-full bg-gray-50 border-gray-100 rounded-xl py-3 px-5 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none border resize-none"
                              value={item.description}
                              onChange={(e) => updateScheduleItem(idx, 'description', e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-2 flex flex-row md:flex-col items-center justify-end gap-2 h-full pt-6">
                          <div className="flex md:flex-col gap-2">
                            <button
                              onClick={() => moveItem(idx, 'up')}
                              disabled={idx === 0}
                              className="p-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all disabled:opacity-20"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => moveItem(idx, 'down')}
                              disabled={idx === data[activeTab].schedules.length - 1}
                              className="p-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all disabled:opacity-20"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex md:flex-col gap-2">
                            {/* <button
                              onClick={() => updateScheduleItem(idx, 'isActive', !item.isActive)}
                              className={`p-2 rounded-lg transition-all ${item.isActive ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                }`}
                            >
                              {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button> */}
                            <button
                              onClick={() => removeScheduleItem(idx)}
                              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all"
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
          </div>
        </div>
      </div>
    </div>
  );
}
