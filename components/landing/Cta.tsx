const WHATSAPP_URL = "https://wa.me/6289504836618";

export function CtaSection() {
  return (
    <section className="w-full pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-4xl bg-primary px-6 py-14 sm:px-12 md:px-16 md:py-20 text-center">
          <h2 className="mx-auto max-w-2xl text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground leading-tight">
            Siap Memenuhi Kebutuhan Energi Industri Anda
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base md:text-lg text-primary-foreground/80 leading-relaxed">
            Diskusikan kebutuhan batu bara, biomassa, dan stockpile Anda
            langsung dengan tim kami.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
