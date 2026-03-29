

import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://tathagatpharma.in/"), 

  title: {
    default: "Tathagat Pharma | Medical & Pharma Clinic in Prayagraj",
    template: "%s | Tathagat Pharma",
  },

  description:
    "Tathagat Medical & Pharma Clinic in Jari Bazar, Prayagraj (212106) offers doctor consultation, pharmacy services, and healthcare support near you.",

  keywords: [
    "medical clinic",
    "pharmacy near me",
    "hospital near me",
    "doctor near me",
    "medical store",
    "chemist shop",
    "Tathagat Pharma",

    "hospital in Prayagraj",
    "pharmacy in Prayagraj",
    "doctor near Prayagraj",

    "hospital in Jari",
    "pharmacy in Jari",
    "clinic in Jari",

    "hospital in Jari Bazar",
    "pharmacy in Jari Bazar",
    "medical store in Jari Bazar",

    "best pharmacy in Prayagraj",
    "clinic near me Prayagraj",
    "doctor consultation Jari Bazar"
  ],

  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  themeColor: "#0ea5e9",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Tathagat Pharma | Medical Clinic in Prayagraj",
    description:
      "Trusted pharmacy and healthcare services in Jari Bazar, Prayagraj.",
    url: "https://tathagatpharma.in",
    siteName: "Tathagat Pharma",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Tathagat Pharma",
    description: "Medical & Pharma Clinic in Prayagraj",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* 🔥 LOCAL SEO SCHEMA (VERY IMPORTANT) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Tathagat Pharma",
              "@id": "https://tathagatpharma.in",
              url: "https://tathagatpharma.in/",
              telephone: "+91-9936459785",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jari Bazar, Bara",
                addressLocality: "Prayagraj",
                addressRegion: "Uttar Pradesh",
                postalCode: "212106",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "25.0", // optional (can update later)
                longitude: "81.8",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ],
                  opens: "09:00",
                  closes: "21:00",
                },
              ],
              sameAs: [
                "https://wa.me/919936459785"
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}