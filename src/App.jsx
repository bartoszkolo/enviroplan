import React, { useState, useEffect } from 'react';
import {
  Leaf, FileCheck, Building2, Zap, ArrowRight, Phone, Mail,
  BarChart3, ShieldCheck, MapPin, ChevronRight, Menu, X, CheckCircle2,
  ChevronDown, MessageCircle, HeartHandshake, Calculator
} from 'lucide-react';
import { send } from '@emailjs/browser';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { emailjsConfig } from './config/emailjs';
import { FUNDING_AMOUNTS, PROGRAM_DESCRIPTIONS } from './config/constants';
import { ScrollReveal, SlideFromLeft, SlideFromRight, staggerContainer } from './components/animations';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivacyModal from './components/PrivacyModal';
import DPSPage from './pages/DPSPage';
import GrantCalculatorModal from './components/GrantCalculatorModal';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  // FAQ states
  const [openFAQ, setOpenFAQ] = useState(null);

  // Privacy Policy modal state
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Grant Calculator modal state
  const [showCalculator, setShowCalculator] = useState(false);

  // Efekt dla nawigacji przy scrollowaniu
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowMobileCTA(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      await send(
        emailjsConfig.SERVICE_ID,
        emailjsConfig.TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        emailjsConfig.PUBLIC_KEY
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('error');
    }
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const navLinks = [
    { name: 'O nas', href: '#o-nas' },
    { name: 'Usługi', href: '#uslugi' },
    { name: 'Proces', href: '#proces' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/ekologia-dla-spoleczenstwa" element={<DPSPage />} />
        <Route path="/" element={
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">

      {/* --- NAVBAR --- */}
      <Navbar
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navLinks={navLinks}
        onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* --- HERO SECTION --- */}
      <header className="relative bg-enviro-900 text-white pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Enhanced Background with Photo */}
        <div className="absolute inset-0">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
            }}
          ></div>

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-enviro-900/80"></div>

          {/* Subtle green tint for brand consistency */}
          <div className="absolute inset-0 bg-enviro-900/20 mix-blend-multiply"></div>

          {/* Accent glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-3xl"></div>

          {/* Animated gradient shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-accent-400/0 via-accent-400/5 to-accent-400/0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ backgroundSize: '200% 200%' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-enviro-800/50 border border-enviro-700/50 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-enviro-400 animate-pulse"></span>
              <span className="text-xs font-medium text-enviro-100 uppercase tracking-wide">Profesjonalne doradztwo środowiskowe</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6 leading-[1.1]">
              Odzyskaj do {FUNDING_AMOUNTS.CZYSTE_POWIETRZE_MAX} <br /> z Twojej <span className="text-transparent bg-clip-text bg-gradient-to-r from-enviro-400 to-emerald-200">inwestycji</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Skuteczne pozyskiwanie dotacji i audyty energetyczne.
              Specjalizujemy się w Czystym Powietrzu, Mój Prąd 7.0 oraz dotacjach ZUS dla firm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setShowCalculator(true)}
                className="bg-accent-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-600 transition flex items-center justify-center gap-2 shadow-xl"
              >
                Sprawdź ile zyskasz <Calculator className="h-5 w-5"/>
              </button>
              <a href="#kontakt" className="bg-enviro-800 text-white border border-enviro-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-enviro-700 transition flex items-center justify-center">
                Skontaktuj się
              </a>
            </div>
            </div>
          </ScrollReveal>

          {/* Ozdobny element graficzny (Raport zgodności) */}
          <SlideFromRight>
          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-enviro-500/20 rounded-full blur-3xl"></div>
            <motion.div
              className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 shadow-2xl"
              initial={{ rotate: 3, scale: 0.95 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.02, rotate: -1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="h-14 w-14 rounded-full bg-gradient-to-br from-enviro-500 to-enviro-700 flex items-center justify-center shadow-lg shadow-enviro-600/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <ShieldCheck className="h-7 w-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-xl text-white">Raport zgodności</h3>
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-sm text-gray-400">Status: <span className="text-green-400 font-semibold">Zatwierdzony</span></p>
                  </motion.div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <motion.div
                  className="h-2 bg-gradient-to-r from-enviro-600 to-enviro-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                ></motion.div>
                <motion.div
                  className="h-2 bg-slate-700 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                ></motion.div>
                <motion.div
                  className="h-2 bg-slate-700 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "83%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                ></motion.div>
              </div>

              <motion.div
                className="mt-6 flex justify-between items-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Oszczędności</p>
                  <motion.div
                    className="flex items-baseline gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <motion.span
                      className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      +24%
                    </motion.span>
                    <span className="text-lg text-gray-400 font-medium">r/r</span>
                  </motion.div>
                </div>
                <motion.div
                  className="h-16 w-20 bg-gradient-to-br from-enviro-600/30 to-enviro-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-enviro-500/20"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <BarChart3 className="text-enviro-400 h-8 w-8" />
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-4 pt-4 border-t border-slate-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Audyt zakończony</span>
                  <motion.span
                    className="text-enviro-400 font-semibold"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✓ Weryfikacja pozytywna
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          </SlideFromRight>
        </div>
      </header>

      {/* --- STATS / TRUST STRIP --- */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 font-semibold text-sm uppercase tracking-wider mb-8">
            Współpracujemy z rządowymi programami dotacyjnymi
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
            {/* Czyste Powietrze */}
            <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <Leaf className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Czyste Powietrze</p>
                <p className="text-xs text-gray-500">Program Priorytetowy</p>
              </div>
            </div>

            {/* Mój Prąd */}
            <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                <Zap className="h-10 w-10 text-yellow-600" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Mój Prąd</p>
                <p className="text-xs text-gray-500">NFOŚiGW</p>
              </div>
            </div>

            {/* NFOŚiGW */}
            <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <Building2 className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">NFOŚiGW</p>
                <p className="text-xs text-gray-500">Narodowy Fundusz</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT US (Dlaczego my?) --- */}
      <section id="o-nas" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <SlideFromLeft>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-enviro-100 rounded-full z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-100 rounded-full z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Konsultacje biznesowe"
                className="relative z-10 rounded-xl shadow-2xl"
              />
            </div>
            </SlideFromLeft>

            <SlideFromRight>
            <div>
              <h2 className="text-sm font-bold text-enviro-600 uppercase tracking-widest mb-2">O Enviroplan</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Twoje wsparcie w ekologii, finansowaniu i zamówieniach.</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Łączymy kompetencje inżynierskie z wiedzą finansową. Pomagamy przedsiębiorstwom budować przewagę konkurencyjną poprzez audyty, skuteczne zdobywanie zamówień publicznych oraz optymalne montaże finansowe inwestycji.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Finansowanie: Obsługa dotacji, kredytów i pożyczek wraz z monitoringiem rynku",
                  "Zamówienia publiczne: Skuteczne pozyskiwanie zamówień dla Twojej firmy",
                  "Audyty: Ponad 10 lat doświadczenia w audytach środowiskowych i przygotowawczych",
                  "Indywidualne podejście: Strategie dopasowane do specyfiki przedsiębiorstwa"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-enviro-600 shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            </SlideFromRight>
          </div>
        </div>
      </section>

      {/* --- OFERTA (SERVICES) --- */}
      <section id="uslugi" className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-enviro-600 uppercase tracking-widest mb-2">Nasza Oferta</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Kompleksowe wsparcie Twojego biznesu</h3>
            <p className="text-lg text-gray-600">Od obowiązkowej sprawozdawczości po pozyskiwanie środków na rozwój. Wybierz obszar, w którym potrzebujesz pomocy.</p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* NOWY KAFELEK DPS */}
            <Link to="/ekologia-dla-spoleczenstwa" className="cursor-pointer">
              <ServiceCard
                icon={<HeartHandshake />}
                title="Ekologia dla Społeczeństwa (DPS, Kultura, Sport)"
                desc="Specjalny nabór 2026. Termomodernizacja, windy i OZE dla budynków użyteczności publicznej. Do 300 000 zł dotacji."
                highlight="Nowy Nabór 2026"
              />
            </Link>

            {/* Service Card Component */}
            <ServiceCard
              icon={<FileCheck />}
              title="Wygrywaj przetargi i buduj stabilny portfel zleceń"
              desc="Zwiększamy szanse na zamówienia publiczne o 40%. Kompleksowa obsługa od przygotowania oferty po odwołania."
              highlight="+40% skuteczności"
            />
            <ServiceCard
              icon={<BarChart3 />}
              title="Pozyskaj do 100k zł dotacji na rozwój firmy"
              desc="Monitorujemy 50+ programów dotacyjnych. Nie trać czasu na formalności - my zajmiemy się wszystkim."
              highlight="Do 100 000 zł"
            />
            <ServiceCard
              icon={<Zap />}
              title="Obniż rachunki za energię o 30%"
              desc="Audyty energetyczne wymagane do Czyste Powietrze i premii termomodernizacyjnych. Zwrot inwestycji w 2-3 lata."
              highlight="-30% rachunków"
            />
            <ServiceCard
              icon={<Building2 />}
              title="Uzyskaj preferencyjny kredyt ekologiczny"
              desc="Audyty przygotowawcze pod inwestycje zielone. Pomagamy uzyskać finansowanie na atrakcyjnych warunkach."
              highlight="Oprocentowanie 2-4%"
            />
            <ServiceCard
              icon={<ShieldCheck />}
              title={`Zyskaj do 300k zł na poprawę warunków pracy`}
              desc="Dotacje ZUS na BHP z nowego naboru 2026. Zmniejsz wypadkowość i zmodernizuj zakład przy minimalnym wkładzie własnym."
              highlight={FUNDING_AMOUNTS.ZUS_MAX}
            />
            <ServiceCard
              icon={<Leaf />}
              title={`Otrzymaj do ${FUNDING_AMOUNTS.CZYSTE_POWIETRZE_MAX} dofinansowania na termomodernizację`}
              desc={`Kompleksowa obsługa Czyste Powietrze. ${PROGRAM_DESCRIPTIONS.AUDYT_REFUNDOWANY}. Maksymalizujemy Twój zwrot.`}
              highlight={FUNDING_AMOUNTS.CZYSTE_POWIETRZE_MAX}
            />
            <ServiceCard
              icon={<FileCheck />}
              title={PROGRAM_DESCRIPTIONS.AUDYT_REFUNDOWANY}
              desc="Audyt energetyczny wymagany do uzyskania najwyższej dotacji. Koszt do 1200 zł w pełni pokrywany przez NFOŚiGW przy realizacji inwestycji."
              highlight="100% Refund"
            />
          </motion.div>
        </div>
      </section>

      {/* --- PROCES (Jak działamy) --- */}
      <section id="proces" className="py-24 bg-enviro-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif font-bold mb-4">Prosty proces współpracy</h3>
            <p className="text-enviro-200">Działamy według sprawdzonych standardów</p>
          </div>

          <motion.div
            className="grid md:grid-cols-4 gap-8 relative"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <Step number="01" title="Kontakt" desc="Krótka rozmowa telefoniczna lub mailowa w celu poznania Twoich potrzeb." />
            <Step number="02" title="Analiza" desc="Weryfikujemy dokumentację i sprawdzamy możliwości dotacyjne lub obowiązki prawne." />
            <Step number="03" title="Realizacja" desc="Przygotowujemy wnioski, raporty i audyty. Składamy dokumenty w urzędach." />
            <Step number="04" title="Sukces" desc="Otrzymujesz decyzję, dotację lub potwierdzenie złożenia sprawozdania." />
          </motion.div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-enviro-600 uppercase tracking-widest mb-2">FAQ</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Najczęściej zadawane pytania</h3>
            <p className="text-lg text-gray-600">Odpowiedzi na pytania, które najczęściej słyszymy od klientów</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Ile czasu zajmuje pozyskanie dotacji?",
                a: "Standardowy proces trwa 2-4 miesiące od złożenia wniosku do otrzymania decyzji. W programach priorytetowych (Czyste Powietrze, Mój Prąd) czas może być skrócony do 6-8 tygodni. Wcześniejsze przygotowanie dokumentacji z naszą pomocą skraca ten czas o połowę."
              },
              {
                q: "Jakie są szanse na otrzymanie dofinansowania?",
                a: "Średnia szansa na otrzymanie dotacji to 60-80% przy poprawnie przygotowanym wniosku. Nasi klienci odnoszą sukces w 85% przypadków dzięki dokładnej analizie przed złożeniem wniosku. Przeprowadzamy bezpłatną wstępną ocenę szans."
              },
              {
                q: "Czy audyt energetyczny jest obowiązkowy?",
                a: "Tak, audyt energetyczny jest obowiązkowy dla: 1) Firm ubiegających się o premię termomodernizacyjną, 2) Budynków objętych programem Czyste Powietrze, 3) Wielkich odbiorców energii (powyżej 200 GWh/rok). Koszt audytu można często wliczyć w koszty dotacji."
              },
              {
                q: "Ile mogę zyskać na dofinansowaniu fotowoltaiki?",
                a: `Nabór Mój Prąd 6.0 został zakończony. Przygotuj się do Mój Prąd 7.0 (start: I kwartał 2026). Nowy program wymaga magazynu energii. Szacowana dotacja: do ${FUNDING_AMOUNTS.MOJ_PRAD_MAX} na PV + magazyn. Dla firm dostępne są dotacje do ${FUNDING_AMOUNTS.CZYSTE_POWIETRZE_MAX} zł w ramach programów NFOŚiGW.`
              },
              {
                q: "Czy pomagacie również przy odwołaniach?",
                a: "Tak, świadczymy pełną obsługę postępowań odwoławczych. W przypadku odrzucenia wniosku przygotowujemy odwołanie i reprezentujemy klienta przed instytucją przyznającą dotacje. Nasze skuteczność w postępowaniach odwoławczych wynosi 70%."
              },
              {
                q: "Jakie dokumenty są potrzebne do złożenia wniosku?",
                a: "Podstawowe dokumenty to: 1) Dowód osobisty / KRS firmy, 2) Potwierdzenie własności nieruchomości, 3) Faktury za inwestycje, 4) Audyt energetyczny (wymagany w niektórych programach), 5) Wniosek o dotację. Przygotowujemy kompletną listę po wstępnej konsultacji."
              },
              {
                q: "Czy wycena jest płatna?",
                a: "Wstępna konsultacja telefoniczna lub mailowa jest zawsze darmowa. Przygotowanie pełnej analizy i strategii dotacyjnej kosztuje 200-500 zł (zależnie od zakresu). Kwota ta jest zwracana przy podpisaniu umowy na obsługę wniosku."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 pr-8">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-enviro-600" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? 'auto' : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA / KONTAKT --- */}
      <section id="kontakt" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Specjaliści */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-enviro-600 uppercase tracking-widest mb-2">Nasz Zespół</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Skontaktuj się ze specjalistą</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Wybierz eksperta w swojej dziedzinie i skorzystaj z profesjonalnej pomocy</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Monika Kaczmarek */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="bg-enviro-100 w-20 h-20 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-3xl font-bold text-enviro-700">MK</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">Monika Kaczmarek</h4>
                  <p className="text-enviro-600 font-semibold mb-4">Specjalista ds. Zamówień i Dotacji</p>
                  <div className="space-y-3">
                    <a href="tel:+48669425761" className="flex items-center gap-3 text-gray-700 hover:text-enviro-600 transition">
                      <Phone className="h-5 w-5 text-enviro-500" />
                      <span className="font-medium">+48 669 425 761</span>
                    </a>
                    <a href="mailto:m.kaczmarek@enviroplan.pl" className="flex items-center gap-3 text-gray-700 hover:text-enviro-600 transition">
                      <Mail className="h-5 w-5 text-enviro-500" />
                      <span className="font-medium">m.kaczmarek@enviroplan.pl</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bartosz Kołodziej */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="bg-enviro-100 w-20 h-20 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-3xl font-bold text-enviro-700">BK</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">Bartosz Kołodziej</h4>
                  <p className="text-enviro-600 font-semibold mb-4">Specjalista ds. Audytów Energetycznych i Środowiska</p>
                  <div className="space-y-3">
                    <a href="tel:+48579517423" className="flex items-center gap-3 text-gray-700 hover:text-enviro-600 transition">
                      <Phone className="h-5 w-5 text-enviro-500" />
                      <span className="font-medium">+48 579 517 423</span>
                    </a>
                    <a href="mailto:b.kolodziej@enviroplan.pl" className="flex items-center gap-3 text-gray-700 hover:text-enviro-600 transition">
                      <Mail className="h-5 w-5 text-enviro-500" />
                      <span className="font-medium">b.kolodziej@enviroplan.pl</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-enviro-50 rounded-3xl overflow-hidden shadow-sm border border-enviro-100 flex flex-col md:flex-row">
            <div className="p-10 md:p-16 md:w-1/2">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Skontaktuj się z ekspertem</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Nie wiesz od czego zacząć? Zadzwoń do nas lub napisz. Wstępna konsultacja jest zawsze darmowa.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="bg-white p-3 rounded-full shadow-sm group-hover:bg-enviro-600 group-hover:text-white transition duration-300">
                    <Phone className="h-6 w-6 text-enviro-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Zadzwoń do nas</p>
                    <p className="text-xl font-bold text-gray-900">+48 579 517 423</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="bg-white p-3 rounded-full shadow-sm group-hover:bg-enviro-600 group-hover:text-white transition duration-300">
                    <Mail className="h-6 w-6 text-enviro-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Napisz wiadomość</p>
                    <p className="text-xl font-bold text-gray-900">kontakt@enviroplan.pl</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="bg-white p-3 rounded-full shadow-sm group-hover:bg-enviro-600 group-hover:text-white transition duration-300">
                    <MapPin className="h-6 w-6 text-enviro-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Biuro</p>
                    <p className="text-lg font-bold text-gray-900">ul. św. Michala 30<br/>62-200 Gniezno</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-enviro-600 p-10 md:p-16 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Formularz kontaktowy</h3>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div>
                    <label className="block text-sm font-medium mb-1 opacity-90">Imię i Nazwisko</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-enviro-700/50 border border-enviro-500 focus:outline-none focus:border-white transition text-white placeholder-enviro-300"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 opacity-90">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-enviro-700/50 border border-enviro-500 focus:outline-none focus:border-white transition text-white placeholder-enviro-300"
                      placeholder="jan@firma.pl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 opacity-90">Wiadomość</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-enviro-700/50 border border-enviro-500 focus:outline-none focus:border-white transition text-white placeholder-enviro-300 h-32"
                      placeholder="W czym możemy pomóc?"
                    ></textarea>
                  </div>

                  {/* Status Messages */}
                  {formStatus === 'success' && (
                    <div className="bg-green-500/20 border border-green-400 text-white px-4 py-3 rounded-lg text-sm">
                      ✓ Wiadomość wysłana! Skontaktujemy się wkrótce.
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="bg-red-500/20 border border-red-400 text-white px-4 py-3 rounded-lg text-sm">
                      Wystąpił błąd. Spróbuj ponownie lub zadzwoń: +48 579 517 423
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-white text-enviro-800 font-bold py-3 rounded-lg hover:bg-gray-100 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-enviro-800 border-t-transparent rounded-full"></div>
                        Wysyłanie...
                      </>
                    ) : (
                      'Wyślij wiadomość'
                    )}
                  </button>
                </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer onPrivacyClick={() => setPrivacyModalOpen(true)} />

      {/* Privacy Policy Modal */}
      <PrivacyModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />

      {/* Grant Calculator Modal */}
      <GrantCalculatorModal
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />

      {/* Mobile Sticky CTA */}
      <motion.a
        href="tel:+48579517423"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: showMobileCTA ? 0 : 100,
          opacity: showMobileCTA ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 left-6 right-6 md:hidden z-40"
      >
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white py-4 px-6 rounded-full shadow-2xl flex items-center justify-center gap-3">
          <Phone className="h-5 w-5 animate-pulse" />
          <span className="font-bold text-lg">Zadzwoń teraz</span>
          <span className="text-accent-100 text-sm ml-1">+48 579 517 423</span>
        </div>
      </motion.a>
    </div>
  }
        />
      </Routes>
    </Router>
  );
}

// Komponent Pomocniczy: Karta Usługi
function ServiceCard({ icon, title, desc, highlight }) {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      {/* Highlight Badge */}
      {highlight && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {highlight}
        </div>
      )}

      <div className="bg-enviro-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-enviro-600 transition-colors duration-300">
        <div className="text-enviro-600 group-hover:text-white transition-colors duration-300 h-7 w-7 [&>svg]:h-7 [&>svg]:w-7">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-enviro-700 transition-colors leading-tight pr-12">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4 text-sm">{desc}</p>
      <div className="flex items-center text-enviro-600 font-semibold text-sm group-hover:translate-x-2 transition-transform cursor-pointer">
        Więcej <ChevronRight className="h-4 w-4 ml-1" />
      </div>
    </div>
  )
}

// Komponent Pomocniczy: Krok Procesu
function Step({ number, title, desc }) {
  return (
    <div className="relative z-10">
      <div className="text-7xl lg:text-8xl font-serif font-bold text-white mb-4 opacity-80">{number}</div>
      <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
      <p className="text-enviro-200 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

export default App;
