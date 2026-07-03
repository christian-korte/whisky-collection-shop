import PrivatverkaufBanner from '@/components/PrivatverkaufBanner'

export const metadata = {
  title: 'Impressum – Christians Whisky Sammlung',
}

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-playfair text-4xl font-bold text-[#f5f0e8] mb-8">Impressum</h1>

      <div className="space-y-8 text-[#f5f0e8]/80">
        <section>
          <h2 className="font-playfair text-xl font-bold text-amber-500 mb-3">Angaben gemäß § 5 TMG</h2>
          <p>Christian Korte<br />
          Hermann-Moormann-Str. 35<br />
          49090 Osnabrück<br />
          E-Mail: <a href="mailto:info@christian-korte.com" className="text-amber-400 hover:underline">info@christian-korte.com</a></p>
        </section>

        <section>
          <h2 className="font-playfair text-xl font-bold text-amber-500 mb-3">Hinweis zum Privatverkauf</h2>
          <div className="bg-amber-900/10 border border-amber-800/30 rounded-lg p-5">
            <PrivatverkaufBanner />
          </div>
        </section>

        <section>
          <h2 className="font-playfair text-xl font-bold text-amber-500 mb-3">Gewährleistungsausschluss</h2>
          <p className="leading-relaxed">
            Bei diesem Angebot handelt es sich um einen Privatverkauf. Der Verkäufer ist eine Privatperson und handelt
            nicht gewerblich. Gemäß § 437 BGB bestehen bei einem Kauf von einer Privatperson keine gesetzlichen
            Gewährleistungsrechte des Käufers, sofern diese nicht ausdrücklich vereinbart wurden.
          </p>
          <p className="leading-relaxed mt-3">
            Ein Widerrufsrecht nach § 312g BGB besteht nicht, da kein Verbrauchsgüterkauf im gewerblichen Sinne vorliegt.
          </p>
          <p className="leading-relaxed mt-3">
            Der Zustand jeder Flasche wird in der Produktbeschreibung so genau wie möglich beschrieben. Bei Fragen
            zum Zustand eines Artikels steht der Verkäufer gerne vor dem Kauf zur Verfügung.
          </p>
        </section>

        <section>
          <h2 className="font-playfair text-xl font-bold text-amber-500 mb-3">Jugendschutz</h2>
          <p className="leading-relaxed">
            Alkoholische Getränke werden ausschließlich an Personen verkauft, die das 18. Lebensjahr vollendet haben.
            Mit der Anfrage bestätigt der Käufer sein Mindestalter von 18 Jahren.
          </p>
        </section>

        <section>
          <h2 className="font-playfair text-xl font-bold text-amber-500 mb-3">Haftungsausschluss</h2>
          <p className="leading-relaxed">
            Die Inhalte dieser Seite wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
            und Aktualität der Inhalte kann keine Gewähr übernommen werden. Als privater Anbieter bin ich nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
          </p>
        </section>

        <section>
          <h2 className="font-playfair text-xl font-bold text-amber-500 mb-3">Datenschutz</h2>
          <p className="leading-relaxed">
            Beim Absenden einer Kaufanfrage werden die angegebenen Kontaktdaten (Name, E-Mail, optional Telefon)
            ausschließlich zur Bearbeitung der Anfrage verwendet und nicht an Dritte weitergegeben.
            Die Daten werden nach Abschluss des Verkaufsvorgangs gelöscht.
          </p>
        </section>
      </div>
    </div>
  )
}
