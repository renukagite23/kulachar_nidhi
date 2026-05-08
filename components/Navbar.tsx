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
  HandHeart, Sparkles, User, History, LogOut, LayoutDashboard, Users2, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showTempleMenu, setShowTempleMenu] = React.useState(false);
  const [showTrustMenu, setShowTrustMenu] = React.useState(false);
  const [isTempleOpen, setIsTempleOpen] = React.useState(false);
  const [isTrustOpen, setIsTrustOpen] = React.useState(false);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [mounted, setMounted] = React.useState(false);
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
    <header className="w-full relative z-[100]">
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block bg-secondary text-white/70 py-1.5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[11px] font-medium tracking-tight">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 italic text-accent font-semibold">{t('hero.mantra')}</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-accent" /> {t('hero.info.phone')}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-accent" /> {t('hero.info.darshan')}: {t('hero.info.darshan_time')}</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-accent" /> {t('hero.title_1')} {t('hero.title_2')}, {t('hero.info.place')}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center p-2 shadow-lg shadow-primary/10">
                  <img src="/devi.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base md:text-lg font-black text-secondary leading-tight">{t('nav.logo_title')}</span>
                  <span className="text-[10px] text-accent font-black uppercase tracking-[0.2em]">{t('nav.logo_subtitle')}</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="text-secondary/80 hover:text-primary font-bold transition-colors px-4 py-2 text-sm rounded-xl hover:bg-muted/50">
                {t('nav.home')}
              </Link>

              {/* About Temple Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowTempleMenu(true)}
                onMouseLeave={() => setShowTempleMenu(false)}
              >
                <button className="text-secondary/80 hover:text-primary font-bold transition-colors px-4 py-2 text-sm rounded-xl hover:bg-muted/50 flex items-center gap-1">
                  {t('nav.about_temple')}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showTempleMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showTempleMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-border py-3 z-[110] overflow-hidden"
                    >
                      {[
                        { key: 'history', href: '/about/history' },
                        { key: 'schedule', href: '/about/schedule' },
                        { key: 'pooja', href: '/about/pooja' },
                        { key: 'reach', href: '/about/reach' },
                        { key: 'facilities', href: '/about/facilities' },
                        { key: 'rti', href: '/about/rti' },
                        { key: 'charges', href: '/about/charges' }
                      ].map(item => (
                        <Link key={item.key} href={item.href} className="block px-4 py-2 text-sm text-secondary hover:bg-primary/5 hover:text-primary font-bold transition-colors">
                          {t(`about.${item.key}`)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About Trust Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowTrustMenu(true)}
                onMouseLeave={() => setShowTrustMenu(false)}
              >
                <button className="text-secondary/80 hover:text-primary font-bold transition-colors px-4 py-2 text-sm rounded-xl hover:bg-muted/50 flex items-center gap-1">
                  {t('nav.about_trust')}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showTrustMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showTrustMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-border py-3 z-[110] overflow-hidden"
                    >
                      <Link href="/about#presidential-message" className="flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:bg-primary/5 hover:text-primary font-bold transition-colors">
                        <User className="w-4 h-4 text-primary" /> {t('about.president_msg')}
                      </Link>
                      <Link href="/trustees" className="flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:bg-primary/5 hover:text-primary font-bold transition-colors">
                        <Users2 className="w-4 h-4 text-primary" /> {t('trustees.title')}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/gallery" className="text-secondary/80 hover:text-primary font-bold transition-colors px-4 py-2 text-sm rounded-xl hover:bg-muted/50">
                {t('nav.gallery')}
              </Link>

              <Link href="/festivals" className="text-secondary/80 hover:text-primary font-bold transition-colors px-4 py-2 text-sm rounded-xl hover:bg-muted/50">
                {t('nav.festivals')}
              </Link>

              <Link href="/contact" className="text-secondary/80 hover:text-primary font-bold transition-colors px-4 py-2 text-sm rounded-xl hover:bg-muted/50">
                {t('nav.contact')}
              </Link>

              {/* Actions */}

              <div className="flex items-center gap-3 ml-6 border-l border-border/50 pl-6">
                {/* Highlighted Language Toggle */}
                <button
                  onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
                  className="flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-secondary rounded-xl transition-all border border-primary/20 hover:border-primary/40 group relative overflow-hidden"
                  title={lang === 'en' ? 'Switch to Marathi' : 'इंग्रजीमध्ये बदला'}
                >
                  <div className="absolute inset-0 bg-primary/5 group-hover:scale-110 transition-transform duration-500" />
                  <Languages className="w-4 h-4 text-primary relative z-10" />
                  <span className="text-[11px] font-black uppercase tracking-tight relative z-10">
                    {lang === 'en' ? 'मराठी' : 'English'}
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent/20 rounded-full blur-md group-hover:bg-accent/40 transition-all" />
                </button>
<<<<<<< Updated upstream

                <Link href="/donation" className="spiritual-button !px-6 !py-2.5 text-xs">
                  <HandHeart className="w-4 h-4" /> {t('nav.donate')}
                </Link>

                {mounted && (
                  isAuthenticated ? (
                    <div className="relative">
                      <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border-2 border-border hover:border-primary transition-all overflow-hidden"
                      >
                        <User className="w-5 h-5 text-secondary" />
                      </button>

                      <AnimatePresence>
                        {showProfileMenu && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-border py-2 z-50 overflow-hidden"
                            >
                              <div className="px-4 py-3 bg-muted/30 border-b border-border/50">
                                <p className="text-xs font-black text-secondary uppercase tracking-tight truncate">{user?.name}</p>
                                <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                              </div>
                              {user?.role === 'admin' && (
                                <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary hover:bg-muted font-bold transition-colors">
                                  <LayoutDashboard className="w-4 h-4 text-primary" /> Admin Dashboard
                                </Link>
                              )}
                              <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary hover:bg-muted font-bold transition-colors">
                                <User className="w-4 h-4 text-primary" /> My Profile
                              </Link>
                              <Link href="/donations" className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary hover:bg-muted font-bold transition-colors">
                                <History className="w-4 h-4 text-primary" /> Donation History
                              </Link>
                              <div className="border-t border-border/50 mt-1 pt-1">
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors">
                                  <LogOut className="w-4 h-4" /> Logout
                                </button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link href="/login" className="spiritual-button-outline !px-6 !py-2.5 text-xs">
                      <User className="w-4 h-4" /> Login
                    </Link>
                  )
                )}
=======
                <Link href="/donation" className="spiritual-button !px-4 !py-2 text-xs">
                  <HandHeart className="w-3.5 h-3.5" /> {t('nav.donate')}
                </Link>
>>>>>>> Stashed changes
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              {mounted && !isAuthenticated && (
                <Link href="/login" className="text-secondary p-1">
                  <User className="w-6 h-6" />
                </Link>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-secondary hover:bg-muted transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
<<<<<<< Updated upstream
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border bg-white overflow-hidden"
=======
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white px-4 pt-2 pb-6 space-y-1 border-t border-border shadow-inner"
          >
            <Link href="/" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">{t('nav.home')}</Link>
            <a href="#about" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">{t('nav.about')}</a>
            <a href="#darshan" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">{t('nav.darshan')}</a>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">{t('nav.contact')}</Link>
            <Link href="/donation" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg">{t('nav.donate')}</Link>
            <button
              onClick={() => {
                setLanguage(language === 'en' ? 'mr' : 'en');
                setIsOpen(false);
              }}
              className="flex items-center gap-2 py-4 px-2 text-sm font-semibold text-secondary"
>>>>>>> Stashed changes
            >
              <div className="px-4 py-6 space-y-2">
                {/* Mobile Highlighted Language Toggle */}
                <button
                  onClick={() => {
                    setLang(lang === 'en' ? 'mr' : 'en');
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary/5 border-2 border-primary/20 text-secondary font-black rounded-2xl mb-6 shadow-sm shadow-primary/5 active:scale-95 transition-all"
                >
                  <Languages className="w-5 h-5 text-primary" />
                  <span className="uppercase tracking-widest text-xs">
                    {lang === 'en' ? 'मराठी मध्ये बदला' : 'Switch to English'}
                  </span>
                </button>

                <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm font-bold text-secondary hover:bg-muted rounded-xl transition-colors">
                  {t('nav.home')}
                </Link>

                {/* Mobile Temple Dropdown */}
                <div className="space-y-1">
                  <button
                    onClick={() => setIsTempleOpen(!isTempleOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 text-sm font-bold text-secondary hover:bg-muted rounded-xl transition-colors"
                  >
                    {t('nav.about_temple')}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isTempleOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isTempleOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-6 space-y-1 overflow-hidden"
                      >
                        {[
                          { key: 'history', href: '/about/history' },
                          { key: 'schedule', href: '/about/schedule' },
                          { key: 'pooja', href: '/about/pooja' },
                          { key: 'reach', href: '/about/reach' },
                          { key: 'facilities', href: '/about/facilities' },
                          { key: 'rti', href: '/about/rti' },
                          { key: 'charges', href: '/about/charges' }
                        ].map(item => (
                          <Link key={item.key} href={item.href} onClick={() => setIsOpen(false)} className="block px-4 py-2 text-xs font-bold text-secondary/60">
                            {t(`about.${item.key}`)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Trust Dropdown */}
                <div className="space-y-1">
                  <button
                    onClick={() => setIsTrustOpen(!isTrustOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 text-sm font-bold text-secondary hover:bg-muted rounded-xl transition-colors"
                  >
                    {t('nav.about_trust')}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isTrustOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isTrustOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-6 space-y-1 overflow-hidden"
                      >
                        <Link href="/about#presidential-message" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-xs font-bold text-secondary/60">{t('about.president_msg')}</Link>
                        <Link href="/trustees" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-xs font-bold text-secondary/60">{t('trustees.title')}</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/gallery" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm font-bold text-secondary hover:bg-muted rounded-xl transition-colors">
                  {t('nav.gallery')}
                </Link>

                <Link href="/festivals" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm font-bold text-secondary hover:bg-muted rounded-xl transition-colors">
                  {t('nav.festivals')}
                </Link>

                <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm font-bold text-secondary hover:bg-muted rounded-xl transition-colors">
                  {t('nav.contact')}
                </Link>

                <div className="h-px bg-border my-4" />

                <Link href="/donation" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20">
                  <HandHeart className="w-5 h-5" /> {t('nav.donate')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
