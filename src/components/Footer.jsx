import React from 'react';
import { Leaf, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({
  onPrivacyClick = () => {}
}) {
  return (
    <>
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
                <li><button onClick={onPrivacyClick} className="hover:text-enviro-400 transition text-left w-full">Polityka Prywatności</button></li>
                <li><a href="#" className="hover:text-enviro-400 transition">Regulamin</a></li>
              </ul>
            </div>

            {/* Kolumna 4: Kontakt Szybki */}
            <div>
              <h4 className="text-white font-bold mb-6">Kontakt</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-enviro-500 shrink-0" />
                  <span>ul. św. Michala 30<br/>62-200 Gniezno</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-enviro-500 shrink-0" />
                  <span>+48 579 517 423</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-enviro-500 shrink-0" />
                  <span>kontakt@enviroplan.pl</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Enviroplan. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
