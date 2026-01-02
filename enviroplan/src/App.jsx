import React from 'react';
import { Leaf, FileCheck, Building2, Zap, ArrowRight, Phone, Mail } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="text-green-600 h-8 w-8" />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Enviroplan</span>
          </div>
          <a href="#kontakt" className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition">
            Darmowa wycena
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="bg-green-900 text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Twoje wsparcie w świecie <br/>
            <span className="text-green-400">ochrony środowiska</span> i dotacji.
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Kompleksowa obsługa firm i osób prywatnych. Od BDO i audytów energetycznych po dotacje z ZUS i Czystego Powietrza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#oferta" className="bg-white text-green-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition flex items-center justify-center gap-2">
              Sprawdź ofertę <ArrowRight className="h-5 w-5"/>
            </a>
          </div>
        </div>
      </header>

      {/* --- OFERTA (SERVICES) --- */}
      <section id="oferta" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Czym się zajmujemy?</h2>
            <p className="text-lg text-gray-600">Przeprowadzimy Cię przez gąszcz przepisów i formalności.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Karta 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <FileCheck className="text-green-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">BDO i Sprawozdawczość</h3>
              <p className="text-gray-600">Pełna obsługa rejestru BDO. Ewidencja odpadów, roczne sprawozdania i bieżące doradztwo dla Twojej firmy.</p>
            </div>

            {/* Karta 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Audyty i Czyste Powietrze</h3>
              <p className="text-gray-600">Audyty energetyczne budynków niezbędne do programu Czyste Powietrze. Zmniejsz rachunki i uzyskaj zwrot kosztów.</p>
            </div>

            {/* Karta 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Building2 className="text-yellow-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Warunki Zabudowy</h3>
              <p className="text-gray-600">Pomoc w uzyskaniu decyzji o Warunkach Zabudowy. Analiza działki i przygotowanie niezbędnej dokumentacji.</p>
            </div>

             {/* Karta 4 */}
             <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <FileCheck className="text-purple-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Dotacje ZUS i NFOŚiGW</h3>
              <p className="text-gray-600">Pozyskiwanie środków na poprawę BHP (ZUS) oraz inwestycje proekologiczne z funduszy krajowych.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA / KONTAKT --- */}
      <section id="kontakt" className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Gotowy na współpracę?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Skontaktuj się z nami, aby omówić szczegóły Twojego projektu lub audytu.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 text-lg">
            <div className="flex items-center justify-center gap-3">
              <Phone className="text-green-400" />
              <span>+48 123 456 789</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mail className="text-green-400" />
              <span>kontakt@enviroplan.pl</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-950 text-gray-500 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Enviroplan. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}

export default App;
