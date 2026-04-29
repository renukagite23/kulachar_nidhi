'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Languages, Phone, Clock, MapPin, Menu, X,
  HandHeart, Sparkles, User, History, LogOut, LayoutDashboard, Users2
  HandHeart, Sparkles, User, History, LogOut, LayoutDashboard, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showAboutMenu, setShowAboutMenu] = React.useState(false);
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [mounted, setMounted] = React.useState(false);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
    setShowProfileMenu(false);
  };

  return (
    <header className="w-full">
      {/* Top Bar - Compact & Professional */}
      <div className="hidden md:block bg-secondary text-white/70 py-1.5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[11px] font-medium tracking-tight">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 italic text-accent font-semibold">{t('hero.mantra')}</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-accent" /> {t('hero.info.phone')}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-accent" /> {t('hero.info.darshan')}: {t('hero.info.darshan_time')}</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-accent" /> {t('hero.title_1')} {t('hero.title_2')}, {t('hero.info.place')}</span>
            <button
              onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
              className="flex items-center gap-1.5 hover:text-white transition-colors border-l border-white/10 pl-5 ml-2"
            >
              <Languages className="w-3 h-3 text-accent" />
              {language === 'en' ? 'मराठी' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar - Compact Height */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14 md:h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                  <img src="/devi.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-bold text-secondary leading-tight">श्री महालक्ष्मी मंदिर</span>
                  <span className="text-[9px] text-accent font-bold uppercase tracking-[0.15em]">मुंबई, महाराष्ट्र</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu - Compact & Minimal */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="text-secondary/80 hover:text-primary font-semibold transition-colors px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50">
                {t('nav.home')}
              </Link>

              <div
                className="relative group"
                onMouseEnter={() => setShowAboutMenu(true)}
                onMouseLeave={() => setShowAboutMenu(false)}
              >
                <button
                  className="text-secondary/80 hover:text-primary font-semibold transition-colors px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50 flex items-center gap-1"
                >
                  {t('nav.about')}
                  <motion.span
                    animate={{ rotate: showAboutMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence>
                  {showAboutMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-border py-2 z-50 overflow-hidden"
                    >
                      <Link
                        href="/about#presidential-message"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary hover:bg-muted font-bold transition-colors"
                        onClick={() => setShowAboutMenu(false)}
                      >
                        <User className="w-4 h-4 text-primary" /> {t('about.president_msg')}
                      </Link>
                      <Link
                        href="/trustees"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary hover:bg-muted font-bold transition-colors"
                        onClick={() => setShowAboutMenu(false)}
                      >
                        <Users2 className="w-4 h-4 text-primary" /> {t('trustees.title')}
                      </Link>
                      {/* About Dropdown - Desktop */}
                      <div
                        className="relative group"
                        onMouseEnter={() => setIsAboutOpen(true)}
                        onMouseLeave={() => setIsAboutOpen(false)}
                      >
                        <button className="flex items-center gap-1 text-secondary/80 hover:text-primary font-semibold transition-colors px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50">
                          {t('about.dropdown_title')} <ChevronDown className={`w-4 h-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isAboutOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-border py-2 z-50 overflow-hidden"
                            >
                              <Link href="/about/history" className="block px-4 py-2 text-sm text-secondary hover:bg-primary/5 hover:text-primary font-bold transition-colors">{t('about.history')}</Link>
                              <Link href="/about/schedule" className="block px-4 py-2 text-sm text-secondary hover:bg-primary/5 hover:text-primary font-bold transition-colors">{t('about.schedule')}</Link>
                              <Link href="/about/pooja" className="block px-4 py-2 text-sm text-secondary hover:bg-primary/5 hover:text-primary font-bold transition-colors">{t('about.pooja')}</Link>
                              <Link href="/about/reach" className="block px-4 py-2 text-sm text-secondary hover:bg-primary/5 hover:text-primary font-bold transition-colors">{t('about.reach')}</Link>
                              <Link href="/about/facilities" className="block px-4 py-2 text-sm text-secondary hover:bg-primary/5 hover:text-primary font-bold transition-colors">{t('about.facilities')}</Link>
                              <Link href="/about/rti" className="block px-4 py-2 text-sm text-secondary hover:bg-primary/5 hover:text-primary font-bold transition-colors">{t('about.rti')}</Link>
                              <Link href="/about/charges" className="block px-4 py-2 text-sm text-secondary hover:bg-primary/5 hover:text-primary font-bold transition-colors">{t('about.charges')}</Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <a href="#darshan" className="text-secondary/80 hover:text-primary font-semibold transition-colors px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50">
                        {t('nav.darshan')}
                      </a>
                      <a href="#gallery" className="text-secondary/80 hover:text-primary font-semibold transition-colors px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50">
                        {t('nav.gallery')}
                      </a>
                      <Link href="/contact" className="text-secondary/80 hover:text-primary font-semibold transition-colors px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50">
                        {t('nav.contact')}
                      </Link>

                      <div className="flex items-center gap-2 ml-4">
                        <button className="spiritual-button-outline !px-4 !py-2 text-xs">
                          <Sparkles className="w-3.5 h-3.5 text-primary" /> {t('nav.book_pooja')}
                        </button>
                        <Link href="/donation" className="spiritual-button !px-4 !py-2 text-xs">
                          <HandHeart className="w-3.5 h-3.5" /> {t('nav.donate')}
                        </Link>

                        {(!mounted || !isAuthenticated) ? (
                          <Link href="/login" className="spiritual-button-outline !px-4 !py-2 text-xs">
                            <User className="w-3.5 h-3.5 text-primary" /> Login
                          </Link>
                        ) : (
                          <div className="relative">
                            <button
                              onClick={() => setShowProfileMenu(!showProfileMenu)}
                              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border hover:border-primary/30 transition-all overflow-hidden"
                            >
                              <User className="w-5 h-5 text-secondary" />
                            </button>

                            <AnimatePresence>
                              {showProfileMenu && (
                                <>
                                  <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowProfileMenu(false)}
                                  />
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-border py-2 z-50 overflow-hidden"
                                  >
                                    <div className="px-4 py-3 border-b border-border/50 bg-muted/30">
                                      <p className="text-xs font-black text-secondary uppercase tracking-tight truncate">{user?.name}</p>
                                      <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                                    </div>

                                    {user?.role === 'admin' && (
                                      <Link
                                        href="/admin/dashboard"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary hover:bg-muted font-bold transition-colors"
                                        onClick={() => setShowProfileMenu(false)}
                                      >
                                        <LayoutDashboard className="w-4 h-4 text-primary" /> admin Dashboard
                                      </Link>
                                    )}

                                    <Link
                                      href="/profile"
                                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary hover:bg-muted font-bold transition-colors"
                                      onClick={() => setShowProfileMenu(false)}
                                    >
                                      <User className="w-4 h-4 text-primary" /> My Profile
                                    </Link>

                                    <Link
                                      href="/donations"
                                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary hover:bg-muted font-bold transition-colors"
                                      onClick={() => setShowProfileMenu(false)}
                                    >
                                      <History className="w-4 h-4 text-primary" /> Donation History
                                    </Link>

                                    <div className="border-t border-border/50 mt-1">
                                      <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors"
                                      >
                                        <LogOut className="w-4 h-4" /> Logout
                                      </button>
                                    </div>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </div>

          {/* Mobile menu button */}
                  <div className="md:hidden flex items-center gap-3">
                    {mounted && !isAuthenticated && (
                      <Link href="/login" className="p-1.5 rounded-lg text-secondary">
                        <User className="w-6 h-6" />
                      </Link>
                    )}
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="p-1.5 rounded-lg text-secondary"
                    >
                      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                  </div>
              </div>

              {/* Mobile Menu */}
              <AnimatePresence>
                {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white px-4 pt-2 pb-6 space-y-1 border-t border-border shadow-inner overflow-hidden"
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white px-4 pt-2 pb-6 space-y-1 border-t border-border shadow-inner"
            >
              <Link href="/" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">{t('nav.home')}</Link>
              
              <div className="border-b border-border/50">
                <button 
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  className="w-full py-3 px-2 flex justify-between items-center text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg"
                >
                  {t('about.dropdown_title')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-muted/20 pl-4 py-2"
                    >
                      <Link href="/about/history" onClick={() => setIsOpen(false)} className="block py-2 text-xs font-bold text-secondary/70">{t('about.history')}</Link>
                      <Link href="/about/schedule" onClick={() => setIsOpen(false)} className="block py-2 text-xs font-bold text-secondary/70">{t('about.schedule')}</Link>
                      <Link href="/about/pooja" onClick={() => setIsOpen(false)} className="block py-2 text-xs font-bold text-secondary/70">{t('about.pooja')}</Link>
                      <Link href="/about/reach" onClick={() => setIsOpen(false)} className="block py-2 text-xs font-bold text-secondary/70">{t('about.reach')}</Link>
                      <Link href="/about/facilities" onClick={() => setIsOpen(false)} className="block py-2 text-xs font-bold text-secondary/70">{t('about.facilities')}</Link>
                      <Link href="/about/rti" onClick={() => setIsOpen(false)} className="block py-2 text-xs font-bold text-secondary/70">{t('about.rti')}</Link>
                      <Link href="/about/charges" onClick={() => setIsOpen(false)} className="block py-2 text-xs font-bold text-secondary/70">{t('about.charges')}</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">{t('nav.contact')}</Link>
              <Link href="/donation" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg">{t('nav.donate')}</Link>
              <button
                onClick={() => {
                  setLanguage(language === 'en' ? 'mr' : 'en');
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 py-4 px-2 text-sm font-semibold text-secondary"
              >
                <Link href="/" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">{t('nav.home')}</Link>
                
                <div className="border-b border-border/50 pb-1">
                  <div className="px-2 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t('nav.about')}</div>
                  <Link href="/about#presidential-message" onClick={() => setIsOpen(false)} className="block py-3 px-6 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> {t('about.president_msg')}
                  </Link>
                  <Link href="/trustees" onClick={() => setIsOpen(false)} className="block py-3 px-6 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg flex items-center gap-2">
                    <Users2 className="w-4 h-4 text-primary" /> {t('trustees.title')}
                  </Link>
                </div>
                <a href="#darshan" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">{t('nav.darshan')}</a>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">{t('nav.contact')}</Link>
                <Link href="/donation" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg">{t('nav.donate')}</Link>
                
                <button
                  onClick={() => {
                    setLanguage(language === 'en' ? 'mr' : 'en');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 py-4 px-2 text-sm font-semibold text-secondary border-t border-border/50 mt-2"
                >
                  <Languages className="w-4 h-4 text-accent" /> {language === 'en' ? 'मराठी' : 'English'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
          </nav>
        </header>
        );
}
