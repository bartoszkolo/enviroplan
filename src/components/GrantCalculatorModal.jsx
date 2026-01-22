import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, Home, Building2 } from 'lucide-react';
import { FUNDING_AMOUNTS, GRANT_RANGES } from '../config/constants';

export default function GrantCalculatorModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [clientType, setClientType] = useState(''); // 'dom' | 'firma'
  const [incomeLevel, setIncomeLevel] = useState('');
  const [investments, setInvestments] = useState([]);

  if (!isOpen) return null;

  const handleInvestmentToggle = (item) => {
    setInvestments(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const calculateGrant = () => {
    if (clientType === 'dom') {
      if (incomeLevel === 'najwyzszy') return GRANT_RANGES.DOM_NAJWYŻSZY;
      if (incomeLevel === 'podwyzszony') return GRANT_RANGES.DOM_PODWYŻSZONY;
      return GRANT_RANGES.DOM_PODSTAWOWY;
    } else {
      // Firma - base calculation
      let base = 0;
      if (investments.includes('zus')) base += 300000;
      if (investments.includes('termomodernizacja')) base += 136200;
      if (investments.includes('pv')) base += 28000;
      if (investments.includes('audyt')) base += 1200;

      if (base === 0) return "50 000 - 100 000 zł";
      if (base > 400000) return "ponad 400 000 zł";

      return base.toLocaleString('pl-PL') + ' zł';
    }
  };

  const resetCalculator = () => {
    setStep(1);
    setClientType('');
    setIncomeLevel('');
    setInvestments([]);
  };

  const handleClose = () => {
    resetCalculator();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-enviro-900 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-enviro-200 transition"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold">Kalkulator Dotacji</h2>
          <p className="text-enviro-200 text-sm mt-1">Sprawdź ile możesz zyskać</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 h-1">
          <motion.div
            className="bg-accent-500 h-full"
            initial={{ width: '25%' }}
            animate={{ width: `${step * 25}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Body - Step based */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900">Czy inwestycja jest dla domu czy firmy?</h3>

              <button
                onClick={() => { setClientType('dom'); setStep(2); }}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-enviro-500 hover:bg-enviro-50 transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-enviro-100 p-3 rounded-lg group-hover:bg-enviro-600 transition">
                    <Home className="h-8 w-8 text-enviro-700 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Dla domu</h4>
                    <p className="text-sm text-gray-600">Osoba fizyczna - dom jednorodzinny</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => { setClientType('firma'); setStep(3); }}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-enviro-500 hover:bg-enviro-50 transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-enviro-100 p-3 rounded-lg group-hover:bg-enviro-600 transition">
                    <Building2 className="h-8 w-8 text-enviro-700 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Dla firmy / instytucji</h4>
                    <p className="text-sm text-gray-600">Przedsiębiorstwo, DPS, szkoła, NGO</p>
                  </div>
                </div>
              </button>
            </motion.div>
          )}

          {step === 2 && clientType === 'dom' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Jakie jest Twoje zagregowanie dochodu?</h3>

              <button
                onClick={() => { setIncomeLevel('podstawowy'); setStep(4); }}
                className="w-full p-5 border-2 border-gray-200 rounded-xl hover:border-enviro-500 hover:bg-enviro-50 transition-all text-left"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-900">Próg podstawowy</h4>
                    <p className="text-sm text-gray-600 mt-1">Poniżej 135 000 zł rocznie</p>
                  </div>
                  <span className="text-2xl">💰</span>
                </div>
              </button>

              <button
                onClick={() => { setIncomeLevel('podwyzszony'); setStep(4); }}
                className="w-full p-5 border-2 border-gray-200 rounded-xl hover:border-enviro-500 hover:bg-enviro-50 transition-all text-left"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-900">Próg podwyższony</h4>
                    <p className="text-sm text-gray-600 mt-1">Wymagane zaświadczenie z gminy</p>
                  </div>
                  <span className="text-2xl">📋</span>
                </div>
              </button>

              <button
                onClick={() => { setIncomeLevel('najwyzszy'); setStep(4); }}
                className="w-full p-5 border-2 border-gray-200 rounded-xl hover:border-enviro-500 hover:bg-enviro-50 transition-all text-left"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-900">Próg najwyższy</h4>
                    <p className="text-sm text-gray-600 mt-1">Wymagane zaświadczenie z gminy</p>
                  </div>
                  <span className="text-2xl">⭐</span>
                </div>
              </button>

              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-500 hover:text-enviro-600 transition mt-4"
              >
                ← Wróć
              </button>
            </motion.div>
          )}

          {step === 3 && clientType === 'firma' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Co planujesz zrealizować?</h3>
              <p className="text-sm text-gray-600 mb-4">Zaznacz wszystkie zastosowania:</p>

              <div className="space-y-3">
                {[
                  { key: 'zus', label: 'Dotacja ZUS na BHP', amount: `do ${FUNDING_AMOUNTS.ZUS_MAX}`, icon: '🦺' },
                  { key: 'termomodernizacja', label: 'Termomodernizacja', amount: `do ${FUNDING_AMOUNTS.CZYSTE_POWIETRZE_MAX}`, icon: '🏠' },
                  { key: 'pv', label: 'Instalacja PV + magazyn', amount: `do ${FUNDING_AMOUNTS.MOJ_PRAD_MAX}`, icon: '⚡' },
                  { key: 'audyt', label: 'Audyt energetyczny', amount: 'refundowany', icon: '📊' },
                ].map((item) => (
                  <label
                    key={item.key}
                    className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      investments.includes(item.key)
                        ? 'border-enviro-500 bg-enviro-50'
                        : 'border-gray-200 hover:border-enviro-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={investments.includes(item.key)}
                        onChange={() => handleInvestmentToggle(item.key)}
                        className="w-5 h-5 rounded text-enviro-600 focus:ring-enviro-500"
                      />
                      <div>
                        <span className="font-semibold text-gray-900">{item.icon} {item.label}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{item.amount}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  ← Wróć
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-enviro-600 text-white py-3 rounded-lg font-bold hover:bg-enviro-700 transition flex items-center justify-center gap-2"
                >
                  Oblicz dotację <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center space-y-6"
            >
              <div className="bg-gradient-to-br from-enviro-50 to-emerald-50 p-8 rounded-2xl border border-enviro-200">
                <p className="text-sm font-semibold text-enviro-700 uppercase tracking-wider mb-2">
                  Twoja szacunkowa dotacja
                </p>
                <h3 className="text-3xl md:text-4xl font-black text-enviro-600">
                  {calculateGrant()}
                </h3>
                <p className="text-sm text-gray-600 mt-4 max-w-md mx-auto">
                  To wstępna wycena. Kwota zależy od szczegółów inwestycji i aktualnych przepisów programu.
                </p>
              </div>

              {clientType === 'dom' && incomeLevel !== 'podstawowy' && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm text-amber-800">
                  <strong>💡 Wskazówka:</strong> Wybrany próg wymaga zaświadczenia z gminy o dochodach. Pomożemy Ci je uzyskać.
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#kontakt"
                  onClick={handleClose}
                  className="flex-1 bg-enviro-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-enviro-700 transition flex items-center justify-center gap-2"
                >
                  Zamów bezpłatną konsultację <ArrowRight className="h-5 w-5" />
                </a>
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Oblicz ponownie
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer note */}
        <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500 text-center border-t">
          Kalkulator podaje szacunkowe wartości. Rzeczywista kwota zależy od szczegółów inwestycji.
        </div>
      </motion.div>
    </motion.div>
  );
}
