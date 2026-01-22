import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function PrivacyModal({
  isOpen = false,
  onClose = () => {}
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900">Polityka Prywatności</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-sm text-gray-700">
          <section>
            <h3 className="font-bold text-gray-900 mb-2">1. Administrator danych osobowych</h3>
            <p>Administratorem Pana/Pani danych osobowych jest Enviroplan, ul. św. Michala 30, 62-200 Gniezno.</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">2. Cel i podstawa przetwarzania</h3>
            <p>Przetwarzamy Pana/Pani dane osobowe w celu:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>udzielenia odpowiedzi na zapytania (podstawa: art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interes)</li>
              <li>realizacji usług doradczych (podstawa: art. 6 ust. 1 lit. b RODO - umowa)</li>
              <li>marketingu usług własnych (podstawa: art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interest)</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">3. Odbiorcy danych</h3>
            <p>Pana/Pani dane mogą być udostępnione:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>pracownikom i współpracownikom Enviroplan</li>
              <li>podmiotom przetwarzającym (np. usługi IT, usługi email)</li>
              <li>organizacjom rządowym przy realizacji dotacji (niezbędne do świadczenia usług)</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">4. Okres przechowywania</h3>
            <p>Dane będą przechowywane przez okres niezbędny do realizacji celów, dla których zostały zebrane, nie dłużej niż 5 lat po zakończeniu współpracy.</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">5. Prawa osób</h3>
            <p>Przysługuje Panu/Pani prawo do:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>dostępu do danych</li>
              <li>sprostowania danych</li>
              <li>usunięcia danych</li>
              <li>ograniczenia przetwarzania</li>
              <li>wniesienia sprzeciwu</li>
              <li>przenoszenia danych</li>
              <li>wniesienia skargi do UODO</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">6. Cookies</h3>
            <p>Strona używa niezbędnych cookies do prawidłowego funkcjonowania. Nie używamy marketingowych cookies bez zgody.</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">7. Kontakt</h3>
            <p>W sprawach ochrony danych osobowych prosimy o kontakt: kontakt@enviroplan.pl lub +48 579 517 423</p>
          </section>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 mb-4">Niniejsza Polityka obowiązuje od dnia 1 stycznia 2025 r.</p>
          <button
            onClick={onClose}
            className="w-full bg-enviro-600 text-white py-3 rounded-lg font-bold hover:bg-enviro-700 transition"
          >
            Rozumiem i akceptuję
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
