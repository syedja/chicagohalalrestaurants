import VisibilityReportClient from './VisibilityReportClient';

export const metadata = {
  title: 'Free Restaurant Visibility Report | Chicago Halal Restaurants',
  description: "See how visible your halal restaurant is to customers searching online. Get your free visibility report and find out exactly how to get more customers from Chicago's halal restaurant directory.",
};

export default function VisibilityReportPage({ searchParams }) {
  const initialQuery = searchParams?.q || '';

  return (
    <main style={{ paddingTop: '2rem' }}>
      <div style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '0 1rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{
          display: 'inline-block',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#15803d',
          background: '#dcfce7',
          padding: '4px 12px',
          borderRadius: '20px',
          marginBottom: '1rem',
        }}>
          Free · Takes 10 seconds
        </p>

        <h1 style={{
          fontSize: 'clamp(22px, 5vw, 34px)',
          fontWeight: '700',
          color: '#111',
          margin: '0 0 0.75rem',
          lineHeight: 1.25,
        }}>
          Free Restaurant Visibility Report
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: '0 0 2rem',
          lineHeight: 1.6,
        }}>
          See how visible your restaurant is to halal food seekers across Chicago —
          and get a step-by-step report on exactly how to improve it.
        </p>
      </div>

      <VisibilityReportClient initialQuery={initialQuery} />

      <div style={{
        maxWidth: '640px',
        margin: '2.5rem auto 0',
        padding: '2rem 1rem 0',
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        borderTop: '1px solid #f3f4f6',
      }}>
        {[
          { num: '280+', label: 'Restaurants listed' },
          { num: '13', label: 'Chicago neighborhoods' },
          { num: 'Free', label: 'Visibility report' },
        ].map(({ num, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '22px', fontWeight: '700', color: '#16a34a', margin: '0 0 2px' }}>{num}</p>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
