// import "../globals.css";
// import NavbarWrapper from "@/components/NavbarWrapper";
// import FooterWrapper from "@/components/FooterWrapper";

// export const metadata = {
//   title: "Tathagat Pharma",
//   description: "Medical & Pharma Clinic",

//   icons: {
//     icon: [
//       { url: "/favicon.ico" },
//       { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
//       { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
//     ],
//     apple: "/apple-touch-icon.png",
//   },
//   manifest: "/site.webmanifest",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <NavbarWrapper />   {/* 🔝 Top */}
        
//         {children}          {/* 📄 Page content */}
        
//         <FooterWrapper />   {/* 🔻 Bottom */}
//       </body>
//     </html>
//   );
// }

import NavbarWrapper from "@/components/NavbarWrapper"
import FooterWrapper from "@/components/FooterWrapper"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavbarWrapper />
      
      {children}
      
      <FooterWrapper />
    </>
  )
}