import Header from '../components/header';
import SupportAndTrust from '../components/SupportAndTrust';
import LegalFooter from '../components/LegalFooter';

export default function Privacy() {
  return (
    <>
      <Header />
      <div className="container py-5">
        <h1>Privacy Policy</h1>
        <p>This is the Privacy Policy page. Add your privacy policy details here.</p>
      </div>
      <SupportAndTrust />
      <LegalFooter />
    </>
  );
}
