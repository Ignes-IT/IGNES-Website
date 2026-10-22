'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Plan = {
  id: string;
  name: string;
  deviceLimit: number;
  price?: number;
};

const BOT_URL = 'https://t.me/ignes_it_bot';

export default function Home() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansError, setPlansError] = useState<string | null>(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_CORE_API_URL ?? 'http://localhost:3000';
    fetch(`${base}/api/plans`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setPlans(Array.isArray(data) ? data : data.plans || []);
      })
      .catch((err) => {
        console.error('Failed to load plans:', err);
        setPlansError('Failed to load plans. Make sure Core is running.');
      });
  }, []);

  return (
    <main>
      {/*HERO*/}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
        <div className="relative mb-8 h-32 w-32">
          <Image
            src="/logo.png"
            alt="IGNES"
            fill
            className="object-contain drop-shadow-[0_0_40px_rgba(107,70,193,0.6)]"
            priority
          />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
          The future of privacy
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-white/70">
          VPN with AmneziaWG obfuscation. No logs, no borders. One client — every
          device.
        </p>
        <a
          href={BOT_URL}
          className="rounded-xl bg-brand-accent px-8 py-4 text-lg font-semibold shadow-lg shadow-brand-accent/30 transition hover:bg-brand-accent-hover"
        >
          🚀 Open in Telegram
        </a>
      </section>

      {/*FEATURES*/}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">Why IGNES</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: '🛡️',
              title: 'Obfuscation',
              text: 'AmneziaWG disguises traffic as regular HTTPS. Works where other VPNs are blocked.',
            },
            {
              icon: '📱',
              title: 'Your devices',
              text: 'Manage devices right from Telegram. From 1 on FREE up to 10 on BUSINESS.',
            },
            {
              icon: '🤖',
              title: 'One client',
              text: 'The whole service lives in a Telegram bot. No extra apps, no extra accounts.',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-brand-surface p-8 transition hover:border-brand-accent/50"
            >
              <div className="mb-4 text-4xl">{f.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
              <p className="text-white/60">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/*TARIFFS*/}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-4 text-center text-3xl font-bold">Pricing</h2>
        <p className="mb-12 text-center text-white/60">
          Pick a plan — manage everything in the bot.
        </p>

        {plansError && (
          <p className="mb-6 text-center text-red-400">{plansError}</p>
        )}

        {plans.length === 0 && !plansError && (
          <p className="text-center text-white/50">Loading plans…</p>
        )}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan: any) => {
            const planName = plan.name || plan.id || plan.plan || 'Unknown';
            const planSlug = planName.toLowerCase();
            const isPro = planName.toUpperCase() === 'PRO';

            return (
              <div
                key={plan.id || planName}
                className={`rounded-2xl border p-6 transition ${
                  isPro
                    ? 'border-brand-accent bg-brand-surface shadow-lg shadow-brand-accent/20'
                    : 'border-white/10 bg-brand-surface'
                }`}
              >
                <h3 className="mb-1 text-xl font-bold">{planName}</h3>
                <p className="mb-6 text-sm text-white/60">
                  {plan.deviceLimit}{' '}
                  {plan.deviceLimit === 1 ? 'device' : 'devices'}
                </p>
                <a
                  href={`${BOT_URL}?start=plan_${planSlug}`}
                  className="block rounded-lg bg-brand-accent px-4 py-2 text-center font-medium transition hover:bg-brand-accent-hover"
                >
                  Choose
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/*FAQ*/}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">FAQ</h2>
        <div className="space-y-4">
          {[
            {
              q: 'What is obfuscation?',
              a: 'A technique that disguises VPN traffic as regular HTTPS requests. Blockers cannot tell it apart from a normal website.',
            },
            {
              q: 'Do I need to install an app?',
              a: 'No. Everything is managed via the Telegram bot. The config is downloaded as a file and imported into an AmneziaWG client.',
            },
            {
              q: 'How many devices can I connect?',
              a: 'FREE — 1, TRIAL — 2, PRO — 5, BUSINESS — 10. The limit depends on your plan.',
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-white/10 bg-brand-surface p-5"
            >
              <summary className="cursor-pointer list-none font-medium marker:hidden">
                {item.q}
              </summary>
              <p className="mt-3 text-white/60">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/*FOOTER*/}
      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/50">
        <p className="mb-2">IGNES - open-source VPN platform</p>
        <div className="flex justify-center gap-6">
          <a href="https://github.com/Ignes-IT" className="hover:text-brand-accent">
            GitHub
          </a>
          <a href={BOT_URL} className="hover:text-brand-accent">
            Telegram
          </a>
        </div>
      </footer>
    </main>
  );
}