import React, { useState, useEffect } from 'react';
import { Leaf, ArrowRight, ChevronRight } from 'lucide-react';
import { send } from '@emailjs/browser';
import { emailjsConfig } from '../config/emailjs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DPSPage() {
  const [auditData, setAuditData] = useState({
    nazwa: '', nip: '', formaPrawna: '', adres: '', osoba: '', telefon: '',
    vat: 'czynny',
    cele: [],
    posiadaAudyt: 'nie', posiadaKosztorys: 'nie', posiadaOferty: 'nie',
    posiadaPozwolenie: 'nie', posiadaZgloszenie: 'nie'
  });
  const [status, setStatus] = useState('idle');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'O nas', href: '#o-nas' },
    { name: 'Usługi', href: '#uslugi' },
    { name: 'Proces', href: '#proces' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const celInwestycyjnyOptions = [
    "Instalacja PV z magazynem energii",
    "Inne OZE (np. pompy ciepła)",
    "Magazyny energii (dla istniejących OZE)",
    "Modernizacja oświetlenia (LED + sterowanie)",
    "Modernizacja źródła ciepła (bez paliw kopalnych)",
    "Termomodernizacja (ocieplenie, okna)",
    "Modernizacja C.O. lub C.W.U.",
    "Rekuperacja z odzyskiem ciepła",
    "Dostępność (windy) / Zielone dachy / Deszczówka"
  ];

  const handleCheckbox = (cel) => {
    setAuditData(prev => {
      const exists = prev.cele.includes(cel);
      return {
        ...prev,
        cele: exists ? prev.cele.filter(c => c !== cel) : [...prev.cele, cel]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const message = `
ANKIETA DPS - Ekologia dla Społeczeństwa

1. DANE PODMIOTU:
Nazwa: ${auditData.nazwa}
NIP: ${auditData.nip}
Forma prawna: ${auditData.formaPrawna || 'Nie podano'}
Adres: ${auditData.adres}
Osoba do kontaktu: ${auditData.osoba}
Telefon/Email: ${auditData.telefon}
Status VAT: ${auditData.vat === 'czynny' ? 'Czynny' : 'Zwolniony'}

2. ZAKRES INWESTYCJI:
${auditData.cele.length > 0 ? auditData.cele.map(c => '• ' + c).join('\n') : 'Nie wybrano żadnych celów'}

3. DOKUMENTACJA:
Audyt energetyczny: ${auditData.posiadaAudyt === 'tak' ? '✓ Tak' : '✗ Nie'}
Kosztorys inwestorski: ${auditData.posiadaKosztorys === 'tak' ? '✓ Tak' : '✗ Nie'}
Oferty cenowe: ${auditData.posiadaOferty === 'tak' ? '✓ Tak' : '✗ Nie'}
Pozwolenie na budowę: ${auditData.posiadaPozwolenie === 'tak' ? '✓ Tak' : '✗ Nie'}
Zgłoszenie robót: ${auditData.posiadaZgloszenie === 'tak' ? '✓ Tak' : '✗ Nie'}
      `.trim();

      await send(
        emailjsConfig.SERVICE_ID,
        emailjsConfig.TEMPLATE_ID,
        {
          from_name: auditData.nazwa,
          reply_to: auditData.telefon,
          message: message,
        },
        emailjsConfig.PUBLIC_KEY
      );

      setStatus('success');
      setAuditData({
        nazwa: '', nip: '', formaPrawna: '', adres: '', osoba: '', telefon: '',
        vat: 'czynny',
        cele: [],
        posiadaAudyt: 'nie', posiadaKosztorys: 'nie', posiadaOferty: 'nie',
        posiadaPozwolenie: 'nie', posiadaZgloszenie: 'nie'
      });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navLinks={navLinks}
        onLogoClick={() => window.location.href = '/'}
      />

      <div className="flex-1 pt-24 pb-12 animate-in fade-in duration-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <a href="/" className="flex items-center text-enviro-600 font-semibold mb-8 hover:underline">
          <ChevronRight className="rotate-180 mr-1 h-5 w-5" /> Powrót do strony głównej
        </a>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          <div className="bg-enviro-900 text-white p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Nabór 2026</span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Ekologia dla Społeczeństwa</h1>
              <p className="text-enviro-100 text-lg max-w-2xl">
                Program dedykowany dla <strong>DPS, Instytucji Kultury oraz Obiektów Sportowych</strong>.
                Zyskaj nowoczesny budynek i obniż koszty eksploatacyjne.
              </p>
            </div>
            <Leaf className="absolute top-10 right-10 text-enviro-800 h-64 w-64 opacity-20 rotate-12" />
          </div>

          <div className="p-8 md:p-12 grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Maksymalna dotacja</p>
              <p className="text-4xl font-bold text-enviro-600 mt-2">300 000 zł</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Poziom dofinansowania</p>
              <p className="text-4xl font-bold text-enviro-600 mt-2">do 60%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Termin realizacji</p>
              <p className="text-lg font-bold text-gray-800 mt-2">01.01.2026 - 10.11.2026</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12" id="ankieta-dps">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Ankieta Wstępna (Audyt)</h2>
            <p className="text-gray-600">Wypełnij formularz, abyśmy mogli ocenić Twoje szanse i przygotować strategię.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-enviro-800 border-b border-gray-100 pb-2">1. Dane Podmiotu</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input required placeholder="Nazwa podmiotu" className="p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-enviro-500 outline-none"
                  value={auditData.nazwa}
                  onChange={e => setAuditData({...auditData, nazwa: e.target.value})} />
                <input required placeholder="NIP" className="p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-enviro-500 outline-none"
                  value={auditData.nip}
                  onChange={e => setAuditData({...auditData, nip: e.target.value})} />
                <input placeholder="Forma prawna" className="p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-enviro-500 outline-none"
                  value={auditData.formaPrawna}
                  onChange={e => setAuditData({...auditData, formaPrawna: e.target.value})} />
                <input required placeholder="Adres siedziby" className="p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-enviro-500 outline-none"
                  value={auditData.adres}
                  onChange={e => setAuditData({...auditData, adres: e.target.value})} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input required placeholder="Osoba do kontaktu" className="p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-enviro-500 outline-none"
                  value={auditData.osoba}
                  onChange={e => setAuditData({...auditData, osoba: e.target.value})} />
                <input required placeholder="Telefon / Email" className="p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-enviro-500 outline-none"
                  value={auditData.telefon}
                  onChange={e => setAuditData({...auditData, telefon: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status podatnika VAT </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="vat" value="czynny" checked={auditData.vat === 'czynny'} onChange={e => setAuditData({...auditData, vat: e.target.value})} className="text-enviro-600 focus:ring-enviro-500" />
                    <span>Czynny</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="vat" value="zwolniony" checked={auditData.vat === 'zwolniony'} onChange={e => setAuditData({...auditData, vat: e.target.value})} className="text-enviro-600 focus:ring-enviro-500" />
                    <span>Zwolniony</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-enviro-800 border-b border-gray-100 pb-2">2. Planowany zakres inwestycji</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {celInwestycyjnyOptions.map((opcja, idx) => (
                  <label key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-enviro-50 transition cursor-pointer border border-transparent hover:border-enviro-100">
                    <input type="checkbox"
                      checked={auditData.cele.includes(opcja)}
                      onChange={() => handleCheckbox(opcja)}
                      className="mt-1 rounded text-enviro-600 focus:ring-enviro-500 h-5 w-5" />
                    <span className="text-sm text-gray-700">{opcja}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-enviro-800 border-b border-gray-100 pb-2">3. Posiadana dokumentacja</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: "Audyt energetyczny", key: 'posiadaAudyt' },
                  { label: "Kosztorys inwestorski", key: 'posiadaKosztorys' },
                  { label: "Oferty cenowe", key: 'posiadaOferty' },
                  { label: "Pozwolenie na budowę", key: 'posiadaPozwolenie' },
                  { label: "Zgłoszenie robót", key: 'posiadaZgloszenie' }
                ].map((item) => (
                  <div key={item.key}>
                    <p className="text-sm font-medium text-gray-700 mb-2">{item.label}</p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name={item.key} value="tak"
                          checked={auditData[item.key] === 'tak'}
                          onChange={e => setAuditData({...auditData, [item.key]: e.target.value})} className="text-enviro-600" /> Tak
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name={item.key} value="nie"
                          checked={auditData[item.key] === 'nie'}
                          onChange={e => setAuditData({...auditData, [item.key]: e.target.value})} className="text-enviro-600" /> Nie
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              {status === 'success' ? (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-bold animate-pulse">
                  Dziękujemy! Ankieta została przesłana. Skontaktujemy się wkrótce.
                </div>
              ) : status === 'error' ? (
                <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center font-bold mb-4">
                  Wystąpił błąd. Spróbuj ponownie lub zadzwoń: +48 579 517 423
                </div>
              ) : (
                <button type="submit" disabled={status === 'submitting'} className="w-full bg-enviro-600 text-white font-bold py-4 rounded-xl hover:bg-enviro-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex justify-center items-center gap-2">
                  {status === 'submitting' ? 'Przetwarzanie...' : <>Wyślij ankietę do analizy <ArrowRight/></>}
                </button>
              )}
            </div>
          </form>
        </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
