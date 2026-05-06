'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Copy, Check } from 'lucide-react';

interface CollectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  collector?: any;
  loading?: boolean;
}

export default function CollectorModal({
  isOpen,
  onClose,
  onSubmit,
  collector,
  loading
}: CollectorModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    isActive: true
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (collector) {
      setFormData({
        name: collector.name || '',
        email: collector.email || '',
        phone: collector.phone || '',
        password: '', // Don't populate password
        isActive: collector.isActive !== false
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        isActive: true
      });
    }
  }, [collector, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const referralLink = collector?.referralCode 
    ? `${window.location.origin}/register?ref=${collector.referralCode}`
    : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b shrink-0">
          <h2 className="text-xl font-bold text-secondary">
            {collector ? 'Edit Collector' : 'Add New Collector'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">
                {collector ? 'New Password (leave blank to keep current)' : 'Password *'}
              </label>
              <input
                type="password"
                required={!collector}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-secondary">
                Collector is Active
              </label>
            </div>

            {collector?.referralCode && (
              <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2">Referral Link</label>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={referralLink}
                    className="flex-grow bg-white border border-primary/20 px-3 py-2 rounded-lg text-xs font-mono text-secondary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="shrink-0 w-9 h-9 flex items-center justify-center bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground italic">
                  Referral Code: <span className="font-bold text-secondary">{collector.referralCode}</span>
                </p>
              </div>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-4 border-t border-gray-100 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition text-secondary text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-primary/20 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : collector ? 'Update Collector' : 'Create Collector'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
