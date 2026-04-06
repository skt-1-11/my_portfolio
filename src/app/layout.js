import './globals.css';

export const metadata = {
  title: 'Sudheer Kumar T | Senior Data Engineer & ML Platform Architect',
  description: 'Senior Data Engineer with 7+ years building scalable AI/ML platforms, production data pipelines, and cloud-native architectures across AWS, Azure, and GCP.',
  keywords: ['Data Engineer', 'ML Platform', 'AWS', 'Azure', 'GCP', 'Python', 'Machine Learning', 'Data Pipeline', 'GenAI', 'LLM', 'MLOps', 'Kafka', 'Databricks'],
  authors: [{ name: 'Sudheer Kumar T' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Sudheer Kumar T | Data Engineer & ML Architect',
    description: 'Building production-grade AI/ML platforms and data infrastructure at scale',
  },
};

const visibilityFallback = `
  setTimeout(function() {
    var h = document.querySelector('header');
    if (h && parseFloat(getComputedStyle(h).opacity) < 0.5) {
      var s = document.createElement('style');
      s.id = 'fm-fallback';
      s.textContent = 'header{opacity:1!important;transform:translateY(0)!important}main *,footer *{opacity:1!important;filter:none!important}';
      document.head.appendChild(s);
    }
  }, 2500);
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#030014" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: visibilityFallback }} />
      </body>
    </html>
  );
}
