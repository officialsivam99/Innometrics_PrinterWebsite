import Header from '../components/header';
import SupportAndTrust from '../components/SupportAndTrust';
import LegalFooter from '../components/LegalFooter';

export default function Terms() {
  return (
    <>
      <Header />
      <div className="container py-5">
        <h1>Terms & Conditions</h1>
        <p>This is the Terms & Conditions page. Add your terms and conditions here.</p>
      </div>
      <SupportAndTrust />
      <LegalFooter />
    </>
  );
}
