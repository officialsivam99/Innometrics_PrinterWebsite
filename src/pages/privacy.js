// src/components/PrivacyPolicy.jsx
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Button, Nav, Badge } from "react-bootstrap";

/**
 * PrivacyPolicy (Standard Light UI)
 * - White background, dark readable text
 * - Clean "On this page" TOC (sticky)
 * - Smooth scrolling + back-to-top
 * - Print-friendly
 *
 * Props:
 *  companyName, countryRegion, websiteUrl, contactEmail, lastUpdated
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

  // Smooth anchor scrolling (no muted text, just behavior)
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const targetId = a.getAttribute("href").slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.location.hash = `#${targetId}`;
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveId(entry.target.id)),
      { rootMargin: "-50% 0px -40% 0px", threshold: 0.01 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []); // eslint-disable-line

  return (
    <div ref={topRef} className="pp-root">
      <style>{`
        /* ====== Light, Standard, Readable ====== */
        .pp-root {
          background: #ffffff;
          color: #0f172a; /* slate-900 */
        }
        .pp-hero {
          background: #f8fafc; /* light gray band */
          border-bottom: 1px solid #e2e8f0;
        }
        .pp-hero h1 {
          margin: 0;
          letter-spacing: -.2px;
          font-weight: 700;
          color: #0f172a;
        }
        .pp-hero .sub {
          color: #334155; /* slate-700 */
          margin-top: .25rem;
        }
        .pp-badge {
          background: #eef2ff; /* indigo-50 */
          color: #3730a3;     /* indigo-800 */
          border: 1px solid #c7d2fe;
          padding: 6px 10px;
          border-radius: 999px;
          font-weight: 600;
        }
        .pp-wrap {
          color: #0f172a;
          line-height: 1.7;
          font-size: 1rem;
        }
        .pp-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          box-shadow: 0 8px 20px rgba(2,6,23,.04);
        }
        .pp-h2 {
          font-size: 1.5rem;
          margin-bottom: .35rem;
          font-weight: 700;
          color: #0f172a;
        }
        .pp-h3, .pp-h4 {
          font-size: 1.125rem;
          margin-top: 1rem;
          margin-bottom: .25rem;
          font-weight: 600;
          color: #111827;
        }
        .pp-hr {
          border: 0;
          border-top: 1px solid #e5e7eb;
          margin: 24px 0 12px;
        }
        .pp-list li + li { margin-top: 6px; }

        /* Links */
        a { color: #1d4ed8; }          /* blue-700 */
        a:hover { color: #1e40af; }    /* blue-800 */

        /* TOC */
        .pp-toc {
          position: sticky;
          top: 24px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 12px;
        }
        .pp-toc strong { color: #0f172a; }
        .pp-toc .nav-link {
          color: #334155; /* slate-700 */
          font-weight: 500;
          padding: 8px 10px;
          border-radius: 8px;
        }
        .pp-toc .nav-link.active {
          background: #eef2ff; /* indigo-50 */
          color: #3730a3;      /* indigo-800 */
        }
        .pp-toc .nav-link:hover {
          background: #f1f5f9; /* slate-100 */
          color: #0f172a;
        }

        /* Top actions */
        .pp-top-actions { gap: 10px; }
        .pp-top-actions .btn { border-radius: 999px !important; }

        /* Back-to-top */
        .pp-fab {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 50;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: #0f172a;
          padding: 10px 14px;
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.15);
        }
        .pp-fab:hover { background: #f8fafc; }

        /* Copy readability */
        .pp-wrap p { margin: 0 0 .75rem; }

        /* Print styles */
        @media print {
          .pp-hero, .pp-toc, .pp-fab, .pp-top-actions { display: none !important; }
          .pp-card { box-shadow: none; border: 0; }
          a[href]:after { content: " (" attr(href) ")"; font-size: 90%; color: #6b7280; }
          body { color: #000; }
        }
      `}</style>

      {/* Hero */}
      <div className="pp-hero py-4">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center gap-3 mb-2">
                <Badge className="pp-badge">Privacy Policy</Badge>
                <span style={{ color: "#475569" }}>Last updated: {lastUpdated}</span>
              </div>
              <h1>Privacy Policy</h1>
              <p className="sub">
                This Privacy Policy explains how we collect, use, and disclose your information when you use the Service,
                along with your privacy rights and how the law protects you.
              </p>
            </Col>
            <Col md={4} className="mt-2 mt-md-0">
              <div className="d-flex justify-content-md-end pp-top-actions">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => window.print()}
                  aria-label="Print this page"
                >
                  Print / Save as PDF
                </Button>
                <Button
                  variant="primary"
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
              <p>
                We use your personal data to provide and improve the Service. By using the Service, you agree to the
                collection and use of information in accordance with this Privacy Policy.
              </p>

              {/* Interpretation & Definitions */}
              <section id="interpretation-definitions" aria-labelledby="interpretation-definitions-title">
                <h2 id="interpretation-definitions-title" className="pp-h2">Interpretation and Definitions</h2>

                <h3 className="pp-h3">Interpretation</h3>
                <p>
                  Words with initial capital letters have meanings defined under the following conditions. The following
                  definitions have the same meaning whether they appear in singular or plural.
                </p>

                <h3 className="pp-h3">Definitions</h3>
                <p>For the purposes of this Privacy Policy:</p>
                <ul className="pp-list">
                  <li><strong>Account</strong> means a unique account created for you to access our Service or parts of our Service.</li>
                  <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where “control” means ownership of 50% or more of shares or other securities entitled to vote for directors or other managing authority.</li>
                  <li><strong>Company</strong> (referred to as either “the Company”, “we”, “us” or “our” in this Agreement) refers to {companyName}.</li>
                  <li><strong>Cookies</strong> are small files placed on your device containing details of your browsing history among other uses.</li>
                  <li><strong>Country</strong> refers to: {countryRegion}</li>
                  <li><strong>Device</strong> means any device that can access the Service such as a computer, cellphone, or tablet.</li>
                  <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                  <li><strong>Service</strong> refers to the Website.</li>
                  <li><strong>Service Provider</strong> means any natural or legal person who processes data on behalf of the Company.</li>
                  <li><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (e.g., the duration of a page visit).</li>
                  <li>
                    <strong>Website</strong> refers to {companyName}, accessible from{" "}
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                      {websiteUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                  <li><strong>You</strong> means the individual accessing or using the Service, or the company or other legal entity on whose behalf such individual accesses or uses the Service, as applicable.</li>
                </ul>
              </section>

              <hr className="pp-hr" />

              {/* Collecting & Using Data */}
              <section id="collecting-using-data" aria-labelledby="collecting-using-data-title">
                <h2 id="collecting-using-data-title" className="pp-h2">Collecting and Using Your Personal Data</h2>

                <h3 className="pp-h3">Types of Data Collected</h3>

                <h4 className="pp-h4">Personal Data</h4>
                <p>While using our Service, we may ask you to provide certain personally identifiable information that can be used to contact or identify you, such as:</p>
                <ul className="pp-list">
                  <li>Email address</li>
                  <li>First and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Usage Data</li>
                </ul>

                <h4 className="pp-h4">Usage Data</h4>
                <p>Usage Data is collected automatically when using the Service and may include your device’s IP address, browser type and version, pages visited, time and date of your visit, time spent on pages, unique device identifiers, and other diagnostic data.</p>
                <p>When you access the Service through a mobile device, we may collect additional information including the type of mobile device, unique device ID, IP address, operating system, and browser type.</p>

                <h4 className="pp-h4">Tracking Technologies and Cookies</h4>
                <p>We use cookies and similar tracking technologies (beacons, tags, scripts) to track activity on our Service and store certain information. The technologies we use may include:</p>
                <ul className="pp-list">
                  <li><strong>Cookies or Browser Cookies:</strong> You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. Some parts of the Service may not function without cookies.</li>
                  <li><strong>Web Beacons:</strong> Small electronic files used to count users who have visited certain pages or opened an email and for related statistics.</li>
                </ul>
                <p>
                  Cookies can be “Persistent” or “Session” cookies. Persistent cookies remain when you go offline; session cookies are deleted when you close your browser. Learn more in this{" "}
                  <a href="https://www.freeprivacypolicy.com/blog/sample-privacy-policy-template/#Use_Of_Cookies_And_Tracking" target="_blank" rel="noopener noreferrer">
                    article
                  </a>.
                </p>
                <p>We use both Session and Persistent Cookies for the purposes below:</p>
                <ul className="pp-list">
                  <li><strong>Necessary / Essential Cookies</strong> (Session; administered by us): enable core features and help prevent fraudulent use of accounts.</li>
                  <li><strong>Cookies Policy / Notice Acceptance Cookies</strong> (Persistent; administered by us): identify whether users have accepted the use of cookies.</li>
                  <li><strong>Functionality Cookies</strong> (Persistent; administered by us): remember choices (e.g., login details, language) to provide a more personal experience.</li>
                </ul>
                <p>For more information about the cookies we use and your choices, see our Cookies Policy or the cookies section of this Privacy Policy.</p>
              </section>

              <hr className="pp-hr" />

              {/* Use of Data */}
              <section id="use-of-data" aria-labelledby="use-of-data-title">
                <h2 id="use-of-data-title" className="pp-h2">Use of Your Personal Data</h2>
                <p>The Company may use Personal Data for the following purposes:</p>
                <ul className="pp-list">
                  <li><strong>To provide and maintain our Service</strong>, including to monitor usage.</li>
                  <li><strong>To manage your account</strong> as a registered user.</li>
                  <li><strong>For contract performance</strong> related to purchases or other agreements via the Service.</li>
                  <li><strong>To contact you</strong> via email, calls, SMS, or push notifications.</li>
                  <li><strong>To provide you</strong> with news, special offers, and general information about goods/services similar to those you purchased or inquired about (unless you opt out).</li>
                  <li><strong>To manage your requests</strong> to us.</li>
                  <li><strong>For business transfers</strong> such as mergers or sales of assets.</li>
                  <li><strong>For other purposes</strong> like data analysis, trend identification, and improving our Service and experience.</li>
                </ul>
                <p>We may share your personal information in the following situations:</p>
                <ul className="pp-list">
                  <li><strong>With Service Providers</strong> to analyze use or contact you.</li>
                  <li><strong>For business transfers</strong> during negotiations or transactions.</li>
                  <li><strong>With Affiliates</strong> who must honor this Privacy Policy.</li>
                  <li><strong>With business partners</strong> to offer certain products, services, or promotions.</li>
                  <li><strong>With other users</strong> when information is shared in public areas.</li>
                  <li><strong>With your consent</strong> for other purposes.</li>
                </ul>
              </section>

              <hr className="pp-hr" />

              {/* Retention */}
              <section id="retention" aria-labelledby="retention-title">
                <h2 id="retention-title" className="pp-h2">Retention of Your Personal Data</h2>
                <p>We retain Personal Data only as long as necessary for purposes set out in this Policy and as required to comply with legal obligations, resolve disputes, and enforce agreements.</p>
                <p>Usage Data is generally retained for a shorter period unless used to improve security/functionality or when legally required for longer.</p>
              </section>

              <hr className="pp-hr" />

              {/* Transfer */}
              <section id="transfer" aria-labelledby="transfer-title">
                <h2 id="transfer-title" className="pp-h2">Transfer of Your Personal Data</h2>
                <p>Your information may be transferred and maintained on computers outside your jurisdiction where data protection laws may differ. By submitting information, you consent to that transfer. We take reasonable steps to ensure adequate safeguards are in place.</p>
              </section>

              <hr className="pp-hr" />

              {/* Delete */}
              <section id="delete" aria-labelledby="delete-title">
                <h2 id="delete-title" className="pp-h2">Delete Your Personal Data</h2>
                <p>You may request deletion of Personal Data we have collected. The Service may provide settings to delete certain information. You can also contact us to access, correct, or delete data you provided. We may retain certain information when legally required.</p>
              </section>

              <hr className="pp-hr" />

              {/* Disclosure */}
              <section id="disclosure" aria-labelledby="disclosure-title">
                <h2 id="disclosure-title" className="pp-h2">Disclosure of Your Personal Data</h2>

                <h3 className="pp-h3">Business Transactions</h3>
                <p>If the Company is involved in a merger, acquisition, or asset sale, your Personal Data may be transferred. We will provide notice before it becomes subject to a different Privacy Policy.</p>

                <h3 className="pp-h3">Law Enforcement</h3>
                <p>We may be required to disclose Personal Data if required by law or in response to valid requests by public authorities.</p>

                <h3 className="pp-h3">Other Legal Requirements</h3>
                <p>We may disclose Personal Data in good faith when necessary to:</p>
                <ul className="pp-list">
                  <li>Comply with a legal obligation</li>
                  <li>Protect and defend the rights or property of the Company</li>
                  <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                  <li>Protect the personal safety of users or the public</li>
                  <li>Protect against legal liability</li>
                </ul>
              </section>

              <hr className="pp-hr" />

              {/* Security */}
              <section id="security" aria-labelledby="security-title">
                <h2 id="security-title" className="pp-h2">Security of Your Personal Data</h2>
                <p>We strive to use commercially acceptable means to protect Personal Data, but no method of transmission over the Internet or electronic storage is 100% secure.</p>
              </section>

              <hr className="pp-hr" />

              {/* Children */}
              <section id="children" aria-labelledby="children-title">
                <h2 id="children-title" className="pp-h2">Children’s Privacy</h2>
                <p>Our Service does not address anyone under 13, and we do not knowingly collect Personal Data from them. If you are a parent/guardian and aware that your child provided Personal Data, please contact us for removal.</p>
              </section>

              <hr className="pp-hr" />

              {/* Links */}
              <section id="links" aria-labelledby="links-title">
                <h2 id="links-title" className="pp-h2">Links to Other Websites</h2>
                <p>Our Service may contain links to other websites not operated by us. We strongly advise you to review each site’s Privacy Policy. We are not responsible for third-party content or practices.</p>
              </section>

              <hr className="pp-hr" />

              {/* Changes */}
              <section id="changes" aria-labelledby="changes-title">
                <h2 id="changes-title" className="pp-h2">Changes to this Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will post the new Policy on this page and, where appropriate, notify you via email and/or a prominent notice on the Service. The “Last updated” date above reflects the latest version.</p>
              </section>

              <hr className="pp-hr" />

              {/* Contact */}
              <section id="contact" aria-labelledby="contact-title">
                <h2 id="contact-title" className="pp-h2">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, you can contact us:</p>
                <ul className="pp-list">
                  <li>By email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
                </ul>
              </section>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Back to Top */}
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
