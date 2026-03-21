"use client";

import { SlikCheckout } from "@/components/SlikCheckout";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[819px] flex flex-col justify-center px-8 max-w-screen-2xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10">
            <div className="inline-block bg-secondary/10 text-secondary px-3 py-1 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
              Solana Global Hackathon Series
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold leading-tight tracking-tighter mb-8 text-on-surface">
              Mastering the <span className="text-primary">Solana Renaissance</span> Hackathon
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
              The definitive guide to building high-performance decentralized applications that win. Go from zero to deployment with the industry&apos;s elite architects.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <SlikCheckout amountSol={2} label="Enroll" />
              <div className="flex items-center gap-4 text-on-surface/60">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span className="text-xs font-label tracking-widest uppercase">Certified Curriculum</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative group">
            <div className="aspect-video bg-surface-container-lowest relative overflow-hidden ring-1 ring-outline-variant/20 shadow-2xl">
              <img
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZeTSqtdXN6_ildI-HI-FKkhDMJCMJ-iyjrgdw2hlcsBut33r0r6sivYmOk1WB7UuM0g1-wRIoEJaZvHDOefZ0VfuPz-XpWevII9UCo_3-91kPsJzox2Fa6x__U4rHIWZJBKlYcKx93FeIQ6FRS09HejI0yVRkf7YT3si8wfi7EzcnavpHzYqbfOYW7LICZCsVYLzsu3wrl1LAiuNQTioO6JeUvopNsMbcrptCDQP3p4aF6tEO8Ytc8vxus4XR-mXuYzzteI165vM"
                alt="Futuristic digital landscape"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 glass-panel rounded-full flex items-center justify-center text-primary border border-primary/30 hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 h-1 bg-surface-variant">
                <div className="h-full kinetic-gradient w-1/3"></div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-primary/20 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b-2 border-l-2 border-secondary/20 pointer-events-none"></div>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full -z-10"></div>
      </section>

      {/* Course Details Bento */}
      <section className="px-8 max-w-screen-2xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-low p-8 col-span-1 border-l border-primary/20">
          <svg className="w-6 h-6 text-primary mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10"/><path d="M12 12l7-7" strokeWidth="2"/></svg>
          <h3 className="font-headline text-xl font-bold mb-2">High Performance</h3>
          <p className="text-on-surface-variant text-sm">
            Learn to optimize programs for maximum TPS and sub-second finality.
          </p>
        </div>
        <div className="bg-surface-container-low p-8 col-span-1 border-l border-secondary/20">
          <svg className="w-6 h-6 text-secondary mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          <h3 className="font-headline text-xl font-bold mb-2">Audit Ready</h3>
          <p className="text-on-surface-variant text-sm">
            Security first approach to Anchor development and PDAs.
          </p>
        </div>
        <div className="bg-surface-container-low p-8 col-span-1 border-l border-tertiary/20">
          <svg className="w-6 h-6 text-tertiary mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
          <h3 className="font-headline text-xl font-bold mb-2">Founder Network</h3>
          <p className="text-on-surface-variant text-sm">
            Access to exclusive Discord channels with Solana ecosystem leads.
          </p>
        </div>
      </section>

      {/* Curriculum Accordion */}
      <section className="px-8 max-w-4xl mx-auto mt-40">
        <div className="mb-16">
          <h2 className="font-headline text-4xl font-bold tracking-tight mb-4">Course Curriculum</h2>
          <p className="text-on-surface-variant">12 Modules - 45 Lessons - 22h Total Length</p>
        </div>
        <div className="space-y-4">
          <div className="bg-surface-container-low group overflow-hidden transition-all duration-300">
            <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-6">
                <span className="font-headline font-bold text-outline-variant">01</span>
                <h4 className="font-headline text-lg font-medium">The Renaissance Mindset</h4>
              </div>
              <svg className="w-5 h-5 text-on-surface-variant group-hover:text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <div className="bg-surface-container-high ring-1 ring-primary/20 overflow-hidden">
            <div className="p-6 flex items-center justify-between cursor-pointer border-b border-outline-variant/10">
              <div className="flex items-center gap-6">
                <span className="font-headline font-bold text-primary">02</span>
                <h4 className="font-headline text-lg font-bold">Writing Your First Program</h4>
              </div>
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 15l6-6 6 6"/></svg>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/5">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M10 8l6 4-6 4z"/></svg>
                  <span className="text-sm">Environment Setup with Anchor</span>
                </div>
                <span className="text-[10px] font-label text-on-surface-variant">12:45</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/5">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M10 8l6 4-6 4z"/></svg>
                  <span className="text-sm">Account Structures & Ownership</span>
                </div>
                <span className="text-[10px] font-label text-on-surface-variant">24:10</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
                  <span className="text-sm">Project: The Hello Renaissance Counter</span>
                </div>
                <span className="text-[10px] font-label text-secondary">PROJECT</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low group overflow-hidden transition-all duration-300">
            <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-6">
                <span className="font-headline font-bold text-outline-variant">03</span>
                <h4 className="font-headline text-lg font-medium">Optimizing for Speed</h4>
              </div>
              <svg className="w-5 h-5 text-on-surface-variant group-hover:text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <div className="bg-surface-container-low group overflow-hidden transition-all duration-300">
            <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-6">
                <span className="font-headline font-bold text-outline-variant">04</span>
                <h4 className="font-headline text-lg font-medium">Scaling with Compression (cNFTs)</h4>
              </div>
              <svg className="w-5 h-5 text-on-surface-variant group-hover:text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor & Testimonials */}
      <section className="mt-40 bg-surface-container-lowest py-32 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <span className="text-[10px] font-label tracking-[0.3em] text-primary uppercase mb-6 block">
                The Architect
              </span>
              <div className="flex items-start gap-8">
                <div className="w-32 h-32 bg-surface-variant ring-1 ring-primary/30 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI_2ZYVZy60-8UCCa3NreTdue0lrzTVBizP61K6kiRsQ_p6gX7N1rxI_G6oFq9qZnfeNe73YsqVZvCza9kIUDwNI-ZMLTVH8b9TGPq_VGkOFIFsOY8YKvfqXmZW30tqfCUNqlM5ecMLfkgL7yVjnRpsrVMCLZG1eJTqXkcV9mbjK4uE5RI0boIJKk5UntQ-PWvbM9kxhoJW0xZB7O3koj2oDaF0ssxxidTUzCeCxRWuS2GWSHQTZAK0f9Z_ftleT4ymy13r64AQ2A"
                    alt="Instructor"
                  />
                </div>
                <div>
                  <h3 className="font-headline text-3xl font-bold mb-4">Anatoly Vance</h3>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    Former core engineer at Solana Labs with 8 years of distributed systems experience. Anatoly has mentored over 50 winning hackathon teams in the last two years.
                  </p>
                  <div className="flex gap-4">
                    <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                      </svg>
                    </a>
                    <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-surface-container p-8 relative ring-1 ring-outline-variant/10">
                <svg className="w-10 h-10 text-primary/20 absolute top-4 right-4" fill="currentColor" viewBox="0 0 24 24" opacity="0.2"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
                <p className="italic text-on-surface mb-6 relative z-10">&quot;This course was the turning point for our team. We understood PDAs for the first time, and it led us to win the Grand Prize.&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary-container rounded-full"></div>
                  <div>
                    <p className="font-headline font-bold text-sm">Marcus K.</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                      Co-founder, Drift Protocol (Alumni)
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container p-8 relative ring-1 ring-outline-variant/10">
                <svg className="w-10 h-10 text-primary/20 absolute top-4 right-4" fill="currentColor" viewBox="0 0 24 24" opacity="0.2"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
                <p className="italic text-on-surface mb-6 relative z-10">&quot;The depth of the optimization module is insane. I&apos;ve never seen anyone explain compute units this clearly.&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-container rounded-full"></div>
                  <div>
                    <p className="font-headline font-bold text-sm">Sarah Chen</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                      Senior Dev, Tensor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="enroll" className="py-40 text-center px-8 relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="font-headline text-5xl font-bold mb-8">Ready to Build the Future?</h2>
          <p className="text-on-surface-variant text-lg mb-12">
            Limited slots available for the current cohort. Start your journey into the Solana Renaissance today.
          </p>
          <SlikCheckout amountSol={2} label="Buy Course" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="w-full h-full border-[100px] border-primary rounded-full scale-150 blur-3xl"></div>
        </div>
      </section>
    </>
  );
}
