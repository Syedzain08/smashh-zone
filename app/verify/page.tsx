'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { QrCode, Lock, CheckCircle2, RefreshCw, Camera, XCircle, UserCheck } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface VerifiedTicketData {
  ticketCode: string;
  attendeeName: string;
  attendeeCnic?: string;
  attendeePhone?: string;
  passTier: string;
  orderNumber: string;
}

interface ScanResponse {
  type: 'SUCCESS' | 'INVALID';
  message: string;
  ticket?: VerifiedTicketData;
}

export default function VerifyPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResponse | null>(null);
  const [useCamera, setUseCamera] = useState(false);

  const scanBuffer = useRef<string>('');
  const isProcessing = useRef<boolean>(false);

  const verifyTicket = useCallback(async (code: string) => {
    if (isProcessing.current) return;
    isProcessing.current = true;
    setValidating(true);

    try {
      const res = await fetch('/api/verify/check/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketCode: code }),
      });

      const data = await res.json();

      if (res.ok && data.status === 'VALID') {
        setScanResult({
          type: 'SUCCESS',
          message: 'VERIFIED TICKET',
          ticket: data.ticket,
        });
      } else {
        setScanResult({
          type: 'INVALID',
          message: data.error || 'INVALID TICKET CODE',
        });
      }
    } catch {
      setScanResult({
        type: 'INVALID',
        message: 'Network error verifying ticket',
      });
    } finally {
      setValidating(false);
      setTimeout(() => {
        isProcessing.current = false;
      }, 1000);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await fetch('/api/verify/check');
        if (res.ok && isMounted) {
          setIsAuthenticated(true);
        }
      } catch {
        // Auth check failed
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (scanBuffer.current.trim().length > 0) {
          const code = scanBuffer.current.trim();
          scanBuffer.current = '';
          verifyTicket(code);
        }
      } else if (e.key.length === 1) {
        scanBuffer.current += e.key;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, verifyTicket]);

  useEffect(() => {
    if (!isAuthenticated || !useCamera) return;

    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 220, height: 220 },
        aspectRatio: 1.0,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        verifyTicket(decodedText);
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [isAuthenticated, useCamera, verifyTicket]);

  const handleAuthenticate = async () => {
    const pass = prompt('Enter 22-digit access code to unlock scanner:');
    if (!pass) return;

    setLoading(true);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pass }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        alert(`Access denied: ${data.error || 'Incorrect code'}`);
      }
    } catch {
      alert('Authentication request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050806] text-white flex flex-col items-center justify-center p-4">
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      {scanResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm rounded-3xl p-6 text-center border shadow-2xl transition-all ${
              scanResult.type === 'SUCCESS'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100'
                : 'bg-rose-950/90 border-rose-500/50 text-rose-100'
            }`}
          >
            <div className="flex justify-center mb-4">
              {scanResult.type === 'SUCCESS' ? (
                <div className="rounded-full bg-emerald-500/20 p-4 border border-emerald-500/40 text-emerald-400">
                  <UserCheck className="h-12 w-12" />
                </div>
              ) : (
                <div className="rounded-full bg-rose-500/20 p-4 border border-rose-500/40 text-rose-400">
                  <XCircle className="h-12 w-12" />
                </div>
              )}
            </div>

            <h2 className="text-2xl font-black tracking-wider uppercase mb-1">
              {scanResult.message}
            </h2>

            {scanResult.ticket && (
              <div className="mt-4 rounded-2xl bg-black/40 border border-white/10 p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-slate-400 font-medium">Pass Type</span>
                  <span className="font-bold text-emerald-400 uppercase tracking-wide bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {scanResult.ticket.passTier}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Attendee:</span>
                  <span className="font-bold text-white">{scanResult.ticket.attendeeName}</span>
                </div>
                {scanResult.ticket.attendeeCnic && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">CNIC:</span>
                    <span className="font-mono text-slate-200">{scanResult.ticket.attendeeCnic}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Ticket Code:</span>
                  <span className="font-mono text-slate-300">{scanResult.ticket.ticketCode}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setScanResult(null)}
              className="mt-6 w-full rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Scan Next Ticket
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl shadow-2xl">
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-10">
            <RefreshCw className="h-8 w-8 animate-spin text-emerald-400" />
            <p className="text-xs text-slate-400">Verifying session...</p>
          </div>
        ) : !isAuthenticated ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="rounded-full bg-rose-500/10 p-4 border border-rose-500/20 text-rose-400">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-xl font-bold uppercase tracking-wide">Scanner Locked</h1>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Valid authentication token required to access the ticket validation portal.
            </p>
            <button
              onClick={handleAuthenticate}
              className="mt-4 rounded-full bg-emerald-400 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:bg-emerald-300 cursor-pointer"
            >
              Enter Passcode
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Gate Access Ready</span>
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Smashh Zone Scanner</h1>
              <p className="text-xs text-slate-400 mt-1">Ready for attendee check-in</p>
            </div>

            {validating && (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-wider animate-pulse">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Checking Database...</span>
              </div>
            )}

            <div className="w-full rounded-2xl border-2 border-dashed border-emerald-500/30 bg-black/40 p-4 flex flex-col items-center justify-center min-h-60 relative overflow-hidden">
              {useCamera ? (
                <div id="qr-reader" className="w-full text-black" />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-center p-4">
                  <QrCode className="h-14 w-14 text-emerald-400/60" />
                  <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    Physical Handheld Scanner Ready
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Scan ticket barcode or switch to camera below.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setUseCamera((prev) => !prev)}
              className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 bg-white/5 cursor-pointer"
            >
              <Camera className="h-4 w-4 text-emerald-400" />
              <span>{useCamera ? 'Use Physical Scanner Mode' : 'Use Web/Mobile Camera'}</span>
            </button>

            <p className="text-[10px] text-slate-500 uppercase tracking-widest">
              Smashh Zone Gate Control
            </p>
          </div>
        )}
      </div>
    </main>
  );
}