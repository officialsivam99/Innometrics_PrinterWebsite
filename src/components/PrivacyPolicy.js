// src/components/PrivacyPolicy.jsx
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Button, Nav, Badge } from "react-bootstrap";

/**
 * PrivacyPolicy (Print Mate Online)
 * - Clean, professional UI using React-Bootstrap
 * - Gradient hero header (brand-ready)
 * - Sticky "On this page" TOC with scrollspy
 * - Smooth anchor scrolling + back-to-top FAB
 * - Props let you change company/lastUpdated/email/website without editing content
 *
 * Usage:
 * <PrivacyPolicy
 *   companyName="Print Mate Online"
 *   countryRegion="New York, United States"
 *   websiteUrl="https://printmateonline.com"
 *   contactEmail="support@printmateonline.com"
 *   lastUpdated="September 3, 2025"
 * />
 */

export default function PrivacyPolicy({
  companyName = "Print Mate Online",
  countryRegion = "New York, United States",
  websiteUrl = "https://printmateonline.com",
  contactEmail = "support@printmateonline.com",
  lastUpdated = "September 3, 2025",
}) {
  const sections = [
    { id: "interpretation-definitions", label: "Interpretation & Definitions" },
    { id: "collecting-using-data", label: "Collecting & Using Your Data" },
    { id: "use-of-data", label: "Use of Personal Data" },
    { id: "retention", label: "Retention" },
    { id: "transfer", label: "Transfer" },
    { id: "delete", label: "Delete Your Data" },
    { id: "disclosure", label: "Disclosure" },
    { id: "security", label: "Security" },
    { id: "children", label: "Children’s Privacy" },
    { id: "links", label: "Links to Other Websites" },
    { id: "changes", label: "Changes to this Policy" },
    { id: "contact", label: "Contact Us" },
  ];

  const [activeId, setActiveId] = useState(sections[0].id);
  const topRef = useRef(null);

  // Smooth anchor scrolling
  useEffect(() => {
    const handler = (e) => {
      if (e.target.matches('a[href^="#"]')) {
        const targetId = e.target.getAttribute("href").slice(1);
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", `#${targetId}`);
        }
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Scrollspy on section headings
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -40% 0px", threshold: 0.01 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []); // eslint-disable-line

  return (
    <div ref={topRef} style={{ background: "#0b0b0c" }}>
      {/* Embedded styles for this module only */}
      <style>{`
        :root {
          --ink-bg: #0b0b0c;
          --card: #101114;
          --soft: #17181d;
          --text: #eaeaf0;
          --muted: #a5a8b3;
          --border: #1d1f26;
          --accent1: rgba(32,1,34,0.95);     /* deep purple */
          --accent2: rgba(111,0,0,0.40);     /* wine red */
        }
        .pp-hero {
          background: radial-gradient(1200px 400px at 10% -10%, var(--accent2), transparent 60%),
                      linear-gradient(110deg, var(--accent1) 0%, rgba(25,25,33,0.85) 45%, rgba(10,10,14,0.95) 100%);
          color: var(--text);
        }
        .pp-hero h1 {
          letter-spacing: -0.4px;
          margin: 0;
        }
        .pp-hero .sub {
          color: var(--muted);
        }
        .pp-wrap {
          color: var(--text);
        }
        .pp-card {
          background: linear-gradient(180deg, var(--card), var(--soft));
          border: 1px solid var(--border);
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          border-radius: 16px;
        }
        .pp-toc {
          position: sticky;
          top: 24px;
          background: linear-gradient(180deg, #0f1014, #12131a);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 14px;
        }
        .pp-toc .nav-link {
          color: var(--muted);
          font-weight: 500;
          padding: 8px 10px;
          border-radius: 10px;
        }
        .pp-toc .nav-link.active, .pp-toc .nav-link:hover {
          color: var(--text);
          background: rgba(111,0,0,0.22);
        }
        .pp-h2 {
          font-size: 1.45rem;
          margin-bottom: 0.5rem;
        }
        .pp-h3 {
          font-size: 1.2rem;
          margin-top: 1.1rem;
          margin-bottom: 0.3rem;
          color: var(--text);
        }
        .pp-muted {
          color: var(--muted);
        }
        .pp-list li + li { margin-top: 6px; }
        .pp-badge {
          background: rgba(111,0,0,0.18);
          border: 1px solid rgba(111,0,0,0.35);
          padding: 6px 10px;
          border-radius: 999px;
          color: #ffd9d9;
        }
        .pp-top-actions {
          gap: 10px;
        }
        .pp-top-actions .btn {
          border-radius: 999px !important;
          border-color: rgba(255,255,255,0.15);
        }
        .pp-top-actions .btn-outline-light:hover {
          background: rgba(255,255,255,0.07);
        }
        .pp-fab {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 50;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: #15161b;
          color: var(--text);
          padding: 10px 14px;
          box-shadow: 0 8px 22px rgba(0,0,0,0.35);
        }
        .pp-fab:hover {
          background: rgba(111,0,0,0.22);
        }
        a, .link {
          color: #a0c8ff;
          text-decoration: none;
        }
        a:hover { text-decoration: underline; }
        .pp-hr {
          border: 0; border-top: 1px solid var(--border);
          margin: 18px 0 8px;
        }
      `}</style>

      {/* Hero */}
      <div className="pp-hero py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <Badge className="pp-badge">Privacy Policy</Badge>
                <span className="pp-muted">Last updated: {lastUpdated}</span>
              </div>
              <h1>Privacy Policy</h1>
              <p className="sub mt-2 mb-0">
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your
                information when You use the Service and explains Your privacy rights and how the law protects You.
              </p>
            </Col>
            <Col md={4} className="mt-3 mt-md-0">
              <div className="d-flex justify-content-md-end pp-top-actions">
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => window.print()}
                  aria-label="Print this page"
                >
                  Print / Save as PDF
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                >
                  Contact
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Content */}
      <Container className="pp-wrap py-4">
        <Row className="g-4">
          {/* TOC */}
          <Col lg={4} xl={3} className="order-2 order-lg-1">
            <div className="pp-toc">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <strong>On this page</strong>
              </div>
              <Nav className="flex-column">
                {sections.map((s) => (
                  <Nav.Link
                    key={s.id}
                    href={`#${s.id}`}
                    className={activeId === s.id ? "active" : ""}
                    aria-current={activeId === s.id ? "true" : undefined}
                  >
                    {s.label}
                  </Nav.Link>
                ))}
              </Nav>
            </div>
          </Col>

          {/* Main */}
          <Col lg={8} xl={9} className="order-1 order-lg-2">
            <Card className="pp-card p-4 p-md-5">
              <p className="mb-3">
                We use Your Personal data to provide and improve the Service. By using the Service, You agree to the
                collection and use of information in accordance with this Privacy Policy.
              </p>

              {/* Interpretation & Definitions */}
              <section id="interpretation-definitions" aria-labelledby="interpretation-definitions-title">
                <h2 id="interpretation-definitions-title" className="pp-h2">Interpretation and Definitions</h2>

                <h3 className="pp-h3">Interpretation</h3>
                <p className="pp-muted">
                  The words of which the initial letter is capitalized have meanings defined under the following
                  conditions. The following definitions shall have the same meaning regardless of whether they appear in
                  singular or in plural.
                </p>

                <h3 className="pp-h3">Definitions</h3>
                <p>For the purposes of this Privacy Policy:</p>
                <ul className="pp-list">
                  <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                  <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where “control” means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
                  <li><strong>Company</strong> (referred to as either “the Company”, “We”, “Us” or “Our” in this Agreement) refers to {companyName}.</li>
                  <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</li>
                  <li><strong>Country</strong> refers to: {countryRegion}</li>
                  <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                  <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                  <li><strong>Service</strong> refers to the Website.</li>
                  <li><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</li>
                  <li><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</li>
                  <li>
                    <strong>Website</strong> refers to {companyName}, accessible from{" "}
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                      {websiteUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                  <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                </ul>
              </section>

              <hr className="pp-hr" />

              {/* Collecting & Using Data */}
              <section id="collecting-using-data" aria-labelledby="collecting-using-data-title">
                <h2 id="collecting-using-data-title" className="pp-h2">Collecting and Using Your Personal Data</h2>

                <h3 className="pp-h3">Types of Data Collected</h3>

                <h4 className="pp-h3">Personal Data</h4>
                <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
                <ul className="pp-list">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Usage Data</li>
                </ul>

                <h4 className="pp-h3">Usage Data</h4>
                <p>Usage Data is collected automatically when using the Service.</p>
                <p>Usage Data may include information such as Your Device’s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
                <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
                <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>

                <h4 className="pp-h3">Tracking Technologies and Cookies</h4>
                <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
                <ul className="pp-list">
                  <li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</li>
                  <li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
                </ul>
                <p>
                  Cookies can be “Persistent” or “Session” Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. Learn more about cookies in this{" "}
                  <a href="https://www.freeprivacypolicy.com/blog/sample-privacy-policy-template/#Use_Of_Cookies_And_Tracking" target="_blank" rel="noopener noreferrer">
                    article
                  </a>.
                </p>
                <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
                <ul className="pp-list">
                  <li>
                    <p><strong>Necessary / Essential Cookies</strong></p>
                    <p className="pp-muted mb-1">Type: Session Cookies</p>
                    <p className="pp-muted mb-1">Administered by: Us</p>
                    <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
                  </li>
                  <li>
                    <p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
                    <p className="pp-muted mb-1">Type: Persistent Cookies</p>
                    <p className="pp-muted mb-1">Administered by: Us</p>
                    <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
                  </li>
                  <li>
                    <p><strong>Functionality Cookies</strong></p>
                    <p className="pp-muted mb-1">Type: Persistent Cookies</p>
                    <p className="pp-muted mb-1">Administered by: Us</p>
                    <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
                  </li>
                </ul>
                <p>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of this Privacy Policy.</p>
              </section>

              <hr className="pp-hr" />

              {/* Use of Data */}
              <section id="use-of-data" aria-labelledby="use-of-data-title">
                <h2 id="use-of-data-title" className="pp-h2">Use of Your Personal Data</h2>
                <p>The Company may use Personal Data for the following purposes:</p>
                <ul className="pp-list">
                  <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
                  <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
                  <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                  <li><strong>To contact You:</strong> by email, telephone calls, SMS, or push notifications regarding updates or informative communications related to functionalities, products or services, including security updates.</li>
                  <li><strong>To provide You</strong> with news, special offers and general information about goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted out.</li>
                  <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
                  <li><strong>For business transfers:</strong> To evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all assets, in which Personal Data of Service users is among the assets transferred.</li>
                  <li><strong>For other purposes</strong>: data analysis, identifying usage trends, campaign effectiveness, and to improve our Service, products, services, marketing and your experience.</li>
                </ul>
                <p>We may share Your personal information in the following situations:</p>
                <ul className="pp-list">
                  <li><strong>With Service Providers:</strong> to monitor/analyze Service use, or to contact You.</li>
                  <li><strong>For business transfers:</strong> during negotiations or in connection with a merger, acquisition or asset sale.</li>
                  <li><strong>With Affiliates:</strong> who must honor this Privacy Policy.</li>
                  <li><strong>With business partners:</strong> to offer You certain products, services or promotions.</li>
                  <li><strong>With other users:</strong> information shared in public areas may be publicly distributed outside.</li>
                  <li><strong>With Your consent</strong>: for any other purpose with Your consent.</li>
                </ul>
              </section>

              <hr className="pp-hr" />

              {/* Retention */}
              <section id="retention" aria-labelledby="retention-title">
                <h2 id="retention-title" className="pp-h2">Retention of Your Personal Data</h2>
                <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with legal obligations, resolve disputes, and enforce agreements and policies.</p>
                <p>Usage Data is generally retained for a shorter period, except when used to strengthen security, improve functionality, or when legally required for longer periods.</p>
              </section>

              <hr className="pp-hr" />

              {/* Transfer */}
              <section id="transfer" aria-labelledby="transfer-title">
                <h2 id="transfer-title" className="pp-h2">Transfer of Your Personal Data</h2>
                <p>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of Your jurisdiction where the data protection laws may differ.</p>
                <p>Your consent to this Privacy Policy followed by Your submission of information represents Your agreement to that transfer. We take reasonable steps to ensure Your data is treated securely and in accordance with this Privacy Policy, and no transfer occurs unless adequate controls are in place.</p>
              </section>

              <hr className="pp-hr" />

              {/* Delete */}
              <section id="delete" aria-labelledby="delete-title">
                <h2 id="delete-title" className="pp-h2">Delete Your Personal Data</h2>
                <p>You may request deletion of Personal Data that We have collected about You. The Service may allow deletion of certain information within account settings. You may also contact Us to request access to, correct, or delete any personal information You provided.</p>
                <p>We may retain certain information when we have a legal obligation or lawful basis to do so.</p>
              </section>

              <hr className="pp-hr" />

              {/* Disclosure */}
              <section id="disclosure" aria-labelledby="disclosure-title">
                <h2 id="disclosure-title" className="pp-h2">Disclosure of Your Personal Data</h2>

                <h3 className="pp-h3">Business Transactions</h3>
                <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>

                <h3 className="pp-h3">Law enforcement</h3>
                <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities.</p>

                <h3 className="pp-h3">Other legal requirements</h3>
                <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
                <ul className="pp-list">
                  <li>Comply with a legal obligation</li>
                  <li>Protect and defend the rights or property of the Company</li>
                  <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                  <li>Protect the personal safety of Users of the Service or the public</li>
                  <li>Protect against legal liability</li>
                </ul>
              </section>

              <hr className="pp-hr" />

              {/* Security */}
              <section id="security" aria-labelledby="security-title">
                <h2 id="security-title" className="pp-h2">Security of Your Personal Data</h2>
                <p>The security of Your Personal Data is important to Us, but no method of transmission over the Internet or electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
              </section>

              <hr className="pp-hr" />

              {/* Children */}
              <section id="children" aria-labelledby="children-title">
                <h2 id="children-title" className="pp-h2">Children’s Privacy</h2>
                <p>Our Service does not address anyone under the age of 13, and we do not knowingly collect personally identifiable information from anyone under 13. If You are a parent or guardian and become aware that Your child has provided Us with Personal Data, please contact Us so we can remove it.</p>
                <p>If We need to rely on consent as a legal basis for processing and Your country requires parental consent, We may require parental consent before collecting and using such information.</p>
              </section>

              <hr className="pp-hr" />

              {/* Links */}
              <section id="links" aria-labelledby="links-title">
                <h2 id="links-title" className="pp-h2">Links to Other Websites</h2>
                <p>Our Service may contain links to other websites not operated by Us. If You click on a third-party link, You will be directed to that site. We strongly advise You to review the Privacy Policy of every site You visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.</p>
              </section>

              <hr className="pp-hr" />

              {/* Changes */}
              <section id="changes" aria-labelledby="changes-title">
                <h2 id="changes-title" className="pp-h2">Changes to this Privacy Policy</h2>
                <p>We may update Our Privacy Policy from time to time. We will notify You by posting the new Privacy Policy on this page and, where appropriate, via email and/or a prominent notice on Our Service. The “Last updated” date at the top of this page will reflect the latest version.</p>
                <p>You are advised to review this Privacy Policy periodically for any changes. Changes are effective when posted on this page.</p>
              </section>

              <hr className="pp-hr" />

              {/* Contact */}
              <section id="contact" aria-labelledby="contact-title">
                <h2 id="contact-title" className="pp-h2">Contact Us</h2>
                <p className="mb-1">If you have any questions about this Privacy Policy, You can contact us:</p>
                <ul className="pp-list">
                  <li>By email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
                </ul>
              </section>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Back to Top Button */}
      <button
        className="pp-fab"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        title="Back to top"
      >
        ↑ Top
      </button>
    </div>
  );
}
