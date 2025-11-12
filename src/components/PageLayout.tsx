import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div>
      <header style={{
        padding: '0',
        textAlign: 'center',
        borderBottom: '10px solid #000'
      }}>
        {/* You can add a navbar or other header content here */}
      </header>
      <main style={{
        maxWidth: '1400px',
        margin: '0',
        padding: '30px',
        backgroundColor: '#fff',
        border: '8px solid #000',
        minHeight: '90vh'
      }}>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
