"use client";

import { useState } from "react";
import { getAccountInfo, getAccountEvents } from "@/utils/tonApi";
//import Image from "next/image";
export default function WalletViewer() {
  const [addr, setAddr] = useState("");
  const [info, setInfo] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWallet = async () => {
    setLoading(true);
    try {
      const acc = await getAccountInfo(addr);
      const ev = await getAccountEvents(addr);
      setInfo(acc);
      setEvents(ev);
    } catch (e) {
      alert("Error fetching data");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#111] text-white px-4 py-16 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-14">
        {/* Header */}
        <header className="text-center space-y-2">

          <h2 className="text-lg sm:text-xl text-gray-400">Explore the TON Blockchain</h2>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0098ea] drop-shadow">
            TON Wallet Smart Viewer
          </h1>
        </header>

        {/* Input Section */}
        <section className="bg-[#1c1c1c] border border-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              placeholder="Enter TON wallet address"
              className="w-full flex-1 text-base px-4 py-3 bg-[#111] border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0098ea]"
            />
            <button
              disabled={!addr || loading}
              onClick={fetchWallet}
              className="w-full sm:w-auto px-6 py-3 text-base font-semibold bg-[#0098ea] hover:bg-[#0aa8ff] disabled:opacity-50 rounded-lg transition-all"
            >
              {loading ? "Loading..." : "Fetch"}
            </button>
          </div>
        </section>

        {/* Wallet Info */}
        {info && (
          <section className="bg-[#1c1c1c] border border-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-[#00c3ff] mb-5">Wallet Info</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-base text-gray-300">
              <p><span className="font-semibold text-white">Address:</span> {info.address}</p>
              <p><span className="font-semibold text-white">Balance:</span> {(info.balance / 1e9).toFixed(4)} TON</p>
              <p><span className="font-semibold text-white">Status:</span> {info.status}</p>
              <p><span className="font-semibold text-white">Wallet Type:</span> {info.account_type}</p>
              <p><span className="font-semibold text-white">Last Activity:</span> {new Date(info.last_activity * 1000).toLocaleString()}</p>
              <p><span className="font-semibold text-white">Tx Count:</span> {info.tx_count}</p>
            </div>
          </section>
        )}

        {/* Recent Events */}
        {events.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-[#00c3ff] mb-4">Recent Events</h2>
            <div className="space-y-6">
              {events.map((e, i) => (
                <div
                  key={i}
                  className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800 shadow-lg hover:shadow-blue-500/20 transition"
                >
                  <p className="text-gray-300"><strong className="text-white">Time:</strong> {new Date(e.timestamp * 1000).toLocaleString()}</p>
                  <p className="text-gray-300"><strong className="text-white">Type:</strong> {e.event_type}</p>

                  {e.actions.map((action: any, idx: number) => (
                    <div key={idx} className="ml-4 mt-2 text-sm text-gray-400">
                      <p><strong>Action:</strong> {action.simple_preview?.name || "N/A"}</p>
                      <p><strong>Value:</strong> {action.simple_preview?.value || "N/A"}</p>
                    </div>
                  ))}

                  {e.incoming_message && (
                    <div className="mt-3 text-sm text-gray-400">
                      <p><strong>From:</strong> {e.incoming_message.source?.address}</p>
                      <p><strong>Message:</strong> {e.incoming_message.comment || "No comment"}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer/Brand */}
        <footer className="pt-10 text-center text-sm text-gray-500">
          Built with ❤️ using <span className="text-[#0098ea] font-medium">TON API</span> {" "}
         
        </footer>
      </div>
    </main>
  );
}
