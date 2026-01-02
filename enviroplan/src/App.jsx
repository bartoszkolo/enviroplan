import React, { useState, useEffect } from 'react';
import {
  Leaf, FileCheck, Building2, Zap, ArrowRight, Phone, Mail,
  BarChart3, ShieldCheck, MapPin, ChevronRight, Menu, X, CheckCircle2
} from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Efekt dla nawigacji przy scrollowaniu
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O nas', href: '#o-nas' },
    { name: 'Usługi', href: '#uslugi' },
    { name: 'Proces', href: '#proces' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-enviro-600 p-2 rounded-lg group-hover:bg-enviro-700 transition">
              <Leaf className="text-white h-6 w-6" />
            </div>
            <span className={`text-2xl font-serif font-bold tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-900 lg:text-white'}`}>
              Enviro<span className="text-enviro-600">plan</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium hover:text-enviro-500 transition ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#kontakt"
              className="bg-enviro-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-enviro-700 transition shadow-lg shadow-enviro-600/30"
            >
              Darmowa Wycena
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 flex flex-col gap-4 px-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 font-medium py-2 border-b border-gray-50"
              >
                {link.name}
              </a>
            ))}
            <a href="#kontakt" className="text-enviro-700 font-bold py-2">Zamów wycenę</a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-enviro-900 text-white pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Tło abstrakcyjne / Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-enviro-800 via-enviro-900 to-slate-950 opacity-100"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-enviro-800/50 border border-enviro-700/50 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-enviro-400 animate-pulse"></span>
              <span className="text-xs font-medium text-enviro-100 uppercase tracking-wide">Profesjonalne doradztwo środowiskowe</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6 leading-[1.1]">
              Bezpieczny biznes <br /> w zgodzie ze <span className="text-transparent bg-clip-text bg-gradient-to-r from-enviro-400 to-emerald-200">środowiskiem</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Kompleksowa obsługa BDO, KOBiZE, audyty energetyczne i pozyskiwanie dotacji.
              Zdejmujemy ciężar formalności z Twojej firmy, gwarantując bezpieczeństwo prawne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#uslugi" className="bg-white text-enviro-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition flex items-center justify-center gap-2 shadow-xl shadow-black/10">
                Nasza oferta <ArrowRight className="h-5 w-5"/>
              </a>
              <a href="#kontakt" className="bg-enviro-800 text-white border border-enviro-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-enviro-700 transition flex items-center justify-center">
                Skontaktuj się
              </a>
            </div>
          </div>

          {/* Ozdobny element graficzny (Placeholder dla grafiki) */}
          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-enviro-500/20 rounded-full blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-enviro-600 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Raport zgodności</h3>
                  <p className="text-sm text-gray-400">Status: Zatwierdzony</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                <div className="h-2 bg-slate-700 rounded w-full"></div>
                <div className="h-2 bg-slate-700 rounded w-5/6"></div>
              </div>
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 uppercase">Oszczędności</p>
                  <p className="text-2xl font-bold text-white">+24% r/r</p>
                </div>
                <div className="h-10 w-24 bg-enviro-600/20 rounded flex items-center justify-center">
                   <BarChart3 className="text-enviro-500 h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- STATS / TRUST STRIP --- */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center lg:justify-between items-center gap-8 text-center text-gray-500 font-medium text-sm uppercase tracking-wider">
          <p>Zaufali nam liderzy branż</p>
          <div className="flex gap-8 lg:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholdery logotypów - normalnie tu byłyby SVG */}
            <span className="flex items-center gap-2"><Building2 className="h-6 w-6"/> Firma A</span>
            <span className="flex items-center gap-2"><Zap className="h-6 w-6"/> EnergoTech</span>
            <span className="flex items-center gap-2"><Leaf className="h-6 w-6"/> EcoGroup</span>
            <span className="flex items-center gap-2"><Building2 className="h-6 w-6"/> Bud-Invest</span>
          </div>
        </div>
      </section>

      {/* --- ABOUT US (Dlaczego my?) --- */}
      <section id="o-nas" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-enviro-100 rounded-full z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-100 rounded-full z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Konsultacje biznesowe"
                className="relative z-10 rounded-xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-enviro-600 uppercase tracking-widest mb-2">O Enviroplan</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Partnerstwo oparte na wiedzy i doświadczeniu.</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Jesteśmy zespołem ekspertów ochrony środowiska, inżynierów i specjalistów ds. dotacji. Naszą misją jest przeprowadzanie firm przez skomplikowane procesy legislacyjne w sposób prosty i transparentny.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Ponad 10 lat doświadczenia w audytach środowiskowych",
                  "100% skuteczność w raportowaniu BDO i KOBiZE",
                  "Indywidualne podejście do każdego przedsiębiorstwa"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-enviro-600 shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card Component */}
            <ServiceCard
              icon={<FileCheck />}
              title="BDO i Gospodarka Odpadami"
              desc="Pełna rejestracja, prowadzenie ewidencji odpadów, roczne sprawozdania. Uniknij kar i działaj zgodnie z prawem."
            />
            <ServiceCard
              icon={<BarChart3 />}
              title="KOBiZE i Opłaty Środowiskowe"
              desc="Raportowanie do Krajowego Ośrodka Bilansowania i Zarządzania Emisjami. Obliczanie opłat za korzystanie ze środowiska."
            />
            <ServiceCard
              icon={<Zap />}
              title="Audyty Energetyczne"
              desc="Niezbędne do programu Czyste Powietrze i premii termomodernizacyjnych. Zoptymalizuj koszty energii w firmie i domu."
            />
            <ServiceCard
              icon={<Building2 />}
              title="Decyzje Środowiskowe"
              desc="Karty Informacyjne Przedsięwzięcia (KIP) i Raporty Oddziaływania na Środowisko. Wsparcie przy inwestycjach."
            />
            <ServiceCard
              icon={<ShieldCheck />}
              title="Dotacje ZUS (BHP)"
              desc="Pozyskiwanie dofinansowania z ZUS na poprawę warunków pracy. Zmniejsz wypadkowość i zmodernizuj zakład."
            />
            <ServiceCard
              icon={<Leaf />}
              title="Czyste Powietrze i Mój Prąd"
              desc="Kompleksowa obsługa wniosków dla osób fizycznych i firm. Maksymalizuj zwroty z inwestycji ekologicznych."
            />
          </div>
        </div>
      </section>

      {/* --- PROCES (Jak działamy) --- */}
      <section id="proces" className="py-24 bg-enviro-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif font-bold mb-4">Prosty proces współpracy</h3>
            <p className="text-enviro-200">Działamy według sprawdzonych standardów</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <Step number="01" title="Kontakt" desc="Krótka rozmowa telefoniczna lub mailowa w celu poznania Twoich potrzeb." />
            <Step number="02" title="Analiza" desc="Weryfikujemy dokumentację i sprawdzamy możliwości dotacyjne lub obowiązki prawne." />
            <Step number="03" title="Realizacja" desc="Przygotowujemy wnioski, raporty i audyty. Składamy dokumenty w urzędach." />
            <Step number="04" title="Sukces" desc="Otrzymujesz decyzję, dotację lub potwierdzenie złożenia sprawozdania." />
          </div>
        </div>
      </section>

      {/* --- CTA / KONTAKT --- */}
      <section id="kontakt" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <p className="text-xl font-bold text-gray-900">+48 123 456 789</p>
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
                    <p className="text-lg font-bold text-gray-900">ul. Przykładowa 15, 00-001 Warszawa</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-enviro-600 p-10 md:p-16 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Formularz kontaktowy</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 opacity-90">Imię i Nazwisko</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-enviro-700/50 border border-enviro-500 focus:outline-none focus:border-white transition text-white placeholder-enviro-300" placeholder="Jan Kowalski" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 opacity-90">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg bg-enviro-700/50 border border-enviro-500 focus:outline-none focus:border-white transition text-white placeholder-enviro-300" placeholder="jan@firma.pl" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 opacity-90">Wiadomość</label>
                    <textarea className="w-full px-4 py-3 rounded-lg bg-enviro-700/50 border border-enviro-500 focus:outline-none focus:border-white transition text-white placeholder-enviro-300 h-32" placeholder="W czym możemy pomóc?"></textarea>
                  </div>
                  <button className="w-full bg-white text-enviro-800 font-bold py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">Wyślij wiadomość</button>
                </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER (Rozbudowany) --- */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Kolumna 1: Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="text-enviro-500 h-6 w-6" />
                <span className="text-2xl font-serif font-bold text-white tracking-tight">Enviroplan</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Profesjonalne doradztwo środowiskowe dla biznesu i osób prywatnych. Pomagamy w gąszczu przepisów, dbając o Twój spokój i rozwój firmy.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholder */}
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-enviro-600 transition cursor-pointer text-white">FB</div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-enviro-600 transition cursor-pointer text-white">IN</div>
              </div>
            </div>

            {/* Kolumna 2: Usługi */}
            <div>
              <h4 className="text-white font-bold mb-6">Usługi</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-enviro-400 transition">BDO i Sprawozdawczość</a></li>
                <li><a href="#" className="hover:text-enviro-400 transition">KOBiZE</a></li>
                <li><a href="#" className="hover:text-enviro-400 transition">Audyty Energetyczne</a></li>
                <li><a href="#" className="hover:text-enviro-400 transition">Decyzje Środowiskowe</a></li>
                <li><a href="#" className="hover:text-enviro-400 transition">Dotacje Czyste Powietrze</a></li>
              </ul>
            </div>

            {/* Kolumna 3: Firma */}
            <div>
              <h4 className="text-white font-bold mb-6">Firma</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#o-nas" className="hover:text-enviro-400 transition">O nas</a></li>
                <li><a href="#proces" className="hover:text-enviro-400 transition">Jak działamy</a></li>
                <li><a href="#" className="hover:text-enviro-400 transition">Kariera</a></li>
                <li><a href="#" className="hover:text-enviro-400 transition">Polityka Prywatności</a></li>
                <li><a href="#" className="hover:text-enviro-400 transition">Regulamin</a></li>
              </ul>
            </div>

             {/* Kolumna 4: Kontakt Szybki */}
             <div>
              <h4 className="text-white font-bold mb-6">Kontakt</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-enviro-500 shrink-0" />
                  <span>ul. Przykładowa 15<br/>00-001 Warszawa</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-enviro-500 shrink-0" />
                  <span>+48 123 456 789</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-enviro-500 shrink-0" />
                  <span>kontakt@enviroplan.pl</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Enviroplan. Wszelkie prawa zastrzeżone.</p>
            <p>Projekt i realizacja: Enviroplan Dev Team</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Komponent Pomocniczy: Karta Usługi
function ServiceCard({ icon, title, desc }) {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="bg-enviro-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-enviro-600 transition-colors duration-300">
        <div className="text-enviro-600 group-hover:text-white transition-colors duration-300 h-7 w-7 [&>svg]:h-7 [&>svg]:w-7">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-enviro-700 transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{desc}</p>
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
      <div className="text-5xl font-serif font-bold text-enviro-800 mb-4 opacity-50">{number}</div>
      <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
      <p className="text-enviro-200 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

export default App;
