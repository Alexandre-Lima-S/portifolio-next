import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCopy } from "react-icons/fi";
import { SiBitcoin } from "react-icons/si";

type PaymentMethod = "card" | "crypto";

export default function PaymentPopup({
  isOpen,
  onClose,
  plan,
}: {
  isOpen: boolean;
  onClose: () => void;
  plan: "detective" | "explorer" | "support";
}) {
  /* ───────── state ───────── */
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");
  const [showQR, setShowQR] = useState("");

  /* ───────── effects ───────── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ───────── helpers ───────── */
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  const handleRedirectToCheckout = async () => {
    setLoading(true);
    try {
      // Obter os detalhes do plano
      const amount = plan === "detective" ? 30 : plan === "explorer" ? 199 : 0;

      // Definir URLs fixas para testes
      const successUrl = "https://thegpx.vercel.app/payment/success";
      const failureUrl = "http://localhost:3000/payment/failure";
      const pendingUrl = "http://localhost:3000/payment/pending";

      // Criação da preferência no backend
      const preference = {
        items: [
          {
            id: plan,
            title: `${planDetails.name} Plan`,
            description: `Subscription to ${planDetails.name} plan`,
            quantity: 1,
            unit_price: amount,
            currency_id: "BRL", // Ou USD, dependendo da sua moeda
          },
        ],
        payer: {
          // Dados adicionais do pagador podem ser enviados aqui
          // email: "user@email.com" // Opcional
        },
        back_urls: {
          success: successUrl,
          failure: failureUrl,
          pending: pendingUrl,
        },
        auto_return: "approved", // Redirecionamento automático após pagamento aprovado
        statement_descriptor: "APP TRACER", // Nome que aparecerá no extrato do cartão
      };

      // Log para verificar os dados enviados
      console.log("Dados enviados para o backend:", preference);

      const res = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preference),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const data = await res.json();
      console.log("Resposta do backend:", data);

      // Redirecionar para o checkout do Mercado Pago
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  /* ───────── static data ───────── */
  const wallets: Record<string, { address: string; network: string }> = {
    "Bitcoin (BTC)": {
      address: "bc1qm83fg2fahk698908qglqngy020rkp2aetvanyy",
      network: "Bitcoin",
    },
    "Tether (USDT)": {
      address: "0x7B76EC1Fe7CB0b01D1e4BeE00Ea7a0E8e237F435",
      network: "Ethereum (ERC-20)",
    },
  };

  const planDetails = {
    detective: {
      name: "DETECTIVE",
      price: "$30",
      period: "per month",
      initialPrice: "$120 (Mini GPS included)",
    },
    explorer: {
      name: "EXPLORER",
      price: "$199",
      period: "per month",
      initialPrice: "$500 (GPS Global + Satellite App + Remote Support)",
    },
    support: {
      name: "SUPPORT & SERVICES",
      price: "Contact",
      period: "on-demand",
      initialPrice: "",
    },
  }[plan];

  if (!isOpen) return null;

  /* ───────── UI ───────── */
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <motion.div
          className="relative w-full max-w-md overflow-hidden bg-white rounded-lg shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
        >
          {/* close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* banner */}
          <div className="bg-red-400 p-6">
            <h2 className="text-xl font-medium text-white">{planDetails.name}</h2>
            <div className="flex items-baseline mt-2">
              <span className="text-3xl font-bold text-white">{planDetails.price}</span>
              {planDetails.period && (
                <span className="ml-2 text-sm text-white/80">{planDetails.period}</span>
              )}
            </div>
            {planDetails.initialPrice && (
              <p className="mt-1 text-sm text-white/80">
                First payment: {planDetails.initialPrice}
              </p>
            )}
          </div>

          {/* body */}
          <div className="p-6">
            {plan === "support" ? (
              <div className="text-center">
                <h3 className="text-xl font-medium mb-4">Contact Support</h3>
                <a
                  href="https://wa.me/+1234567890?text=Hello, I need assistance with Support & Services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-400 text-white py-3 px-4 rounded-md hover:bg-red-500 inline-block"
                >
                  Contact via WhatsApp
                </a>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-medium mb-4">Payment method</h3>

                {/* methods */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { id: "card", label: "Credit card or Pix", icon: <span className="text-base">CC</span> },
                    { id: "crypto", label: "Cryptocurrency", icon: <SiBitcoin /> },
                  ].map(({ id, label, icon }) => (
                    <div
                      key={id}
                      onClick={() => setSelectedMethod(id as PaymentMethod)}
                      className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedMethod === id
                          ? "border-red-400 bg-white"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="mb-1 w-5 h-5">{icon}</div>
                      <span className="text-xs font-medium">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Credit Card - Simple button */}
                {selectedMethod === "card" && (
                  <div className="space-y-3">
                    <button
                      onClick={handleRedirectToCheckout}
                      disabled={loading}
                      className={`w-full py-3 rounded-md text-white text-lg font-bold flex items-center justify-center gap-2
                        ${
                          loading
                            ? "bg-red-700 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                            <path d="M22 12a10 10 0 0 1-10 10" />
                          </svg>
                          Processando...
                        </>
                      ) : (
                        "PAY WITH MERCADO PAGO"
                      )}
                    </button>
                  </div>
                )}

                {/* ---------- CRYPTO ---------- */}
                {selectedMethod === "crypto" && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium mb-3">
                      Accepted cryptocurrencies
                    </label>

                    {Object.entries(wallets).map(([crypto, { address, network }]) => (
                      <div key={crypto} className="border rounded-md overflow-hidden mb-3">
                        <div className="flex items-center justify-between p-2">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                                crypto.includes("Bitcoin") ? "bg-orange-500" : "bg-green-500"
                              }`}
                            >
                              {crypto.includes("Bitcoin") ? "₿" : "₮"}
                            </div>
                            <span className="text-sm font-medium">{crypto}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(address, crypto)}
                            className="text-red-400 hover:text-red-500"
                          >
                            <FiCopy size={16} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowQR(showQR === crypto ? "" : crypto)}
                          className="w-full text-left p-2 text-xs text-red-400 bg-gray-50 border-t"
                        >
                          {showQR === crypto ? "Hide QR code" : "Show QR code"}
                        </button>

                        {showQR === crypto && (
                          <div className="p-4 bg-gray-50 flex justify-center">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${
                                crypto.includes("Bitcoin") ? "bitcoin" : "ethereum"
                              }:${address}`}
                              alt="QR"
                              className="border rounded-md"
                            />
                          </div>
                        )}

                        {copied === crypto && (
                          <div className="p-2 bg-green-100 text-center text-xs">
                            Address copied!
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="bg-red-50 p-3 rounded-md text-sm text-red-600">
                      Send on the correct network ({wallets[showQR]?.network || "specified"}). After
                      sending, e-mail us the transaction hash.
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}