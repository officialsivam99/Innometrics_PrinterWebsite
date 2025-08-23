import Header from '../components/header';
import SupportAndTrust from '../components/SupportAndTrust';
import LegalFooter from '../components/LegalFooter';

export default function Refund() {
  return (
    <>
      <Header />
      <div className="container py-5">
        <h1>Refund Policy</h1>
        <p>This is the Refund Policy page. Add your refund policy details here.</p>
      </div>
      <SupportAndTrust />
      <LegalFooter />
    </>
  );
}
