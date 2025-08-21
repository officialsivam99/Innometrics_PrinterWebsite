// src/components/FAQ.jsx
import React, { useMemo, useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

/**
 * Props:
 * - items?: [{ id?, question, answer }]
 * - title?: string
 * - subtitle?: string
 * - allowOneOpen?: boolean   // only one panel open at a time (default: true)
 */
const defaultItems = [
  {
    question: "Do you sell genuine ink cartridges?",
    answer:
      "Yes. We carry only original manufacturer cartridges to ensure quality prints and to protect your printer warranty.",
  },
  {
    question: "How fast is delivery?",
    answer:
      "Most orders ship within 24 hours. Standard delivery takes 2–3 business days. Same-day/next-day options are available in select areas.",
  },
  {
    question: "Will this cartridge work with my printer?",
    answer:
      "Each product page lists compatible printer models. If you’re unsure, start a live chat and we’ll confirm compatibility for you.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Unopened items can be returned within 30 days for a full refund. If a cartridge is defective, we’ll replace it or refund you.",
  },
  {
    question: "Do you offer high-yield (XL) cartridges?",
    answer:
      "Yes. XL options are available for many models and reduce cost per page. Look for “XL” on the product title.",
  },
  {
    question: "Can you help me set up my printer?",
    answer:
      "Absolutely. Our support team can guide you through Wi-Fi setup, driver installs, and troubleshooting—via chat or phone.",
  },
  {
    question: "Which payments do you accept?",
    answer:
      "We accept major credit/debit cards, UPI, net banking, and popular digital wallets. All payments are processed securely.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You’ll receive a tracking link by email/SMS once your order ships. You can also check order status in your account.",
  },
];

const FAQ = ({
  items = defaultItems,
  title = "Frequently Asked Questions",
  subtitle = "Quick answers about ink, printers, delivery, and support.",
  allowOneOpen = true,
}) => {
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState(() => new Set());

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.question.toLowerCase().includes(q) ||
        i.answer.toLowerCase().includes(q)
    );
  }, [items, query]);

  function toggle(id) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (allowOneOpen) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <section
      className="faq-wrap"
      aria-labelledby="faq-title"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="faq-container">
        <header className="faq-head">
          <h2 id="faq-title" className="faq-title">{title}</h2>
          <p className="faq-sub">{subtitle}</p>

          {/* Search */}
          <div className="faq-search">
            <FiSearch size={18} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs…"
              aria-label="Search FAQs"
            />
          </div>
        </header>

        {/* List */}
        <div className="faq-list">
          {filtered.length === 0 && (
            <div className="faq-empty">
              No results for “{query}”. Try a different keyword.
            </div>
          )}

          {filtered.map((item, idx) => {
            const id = item.id ?? idx;
            const isOpen = openIds.has(id);
            const panelId = `faq-panel-${id}`;
            const btnId = `faq-btn-${id}`;

            return (
              <article
                key={id}
                className={`faq-item ${isOpen ? "open" : ""}`}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h3 className="faq-q" itemProp="name">
                  <button
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(id)}
                    className="faq-btn"
                  >
                    <span>{item.question}</span>
                    <FiChevronDown className="chev" size={20} />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="faq-a"
                  style={{
                    display: isOpen ? "block" : "none",
                    opacity: isOpen ? 1 : 0,
                  }}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="faq-a-inner" itemProp="text">
                    {item.answer}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Scoped, minimal styles */}
      <style>{`
        .faq-wrap { background:#fff; padding:56px 16px; }
        .faq-container { max-width:980px; margin:0 auto; }
        .faq-head { text-align:center; margin-bottom:22px; }
        .faq-title { margin:0; font-weight:800; font-size:32px; color:#0b1b33; }
        .faq-sub { color:#58657f; margin:10px auto 0; max-width:760px; }

        .faq-search {
          margin:18px auto 0; max-width:520px;
          display:flex; align-items:center; gap:8px;
          background:#f7fafc; border:1px solid #e7ecf3; border-radius:999px;
          padding:8px 12px;
        }
        .faq-search input {
          flex:1; border:none; outline:none; background:transparent; font-size:14.5px;
          color:#0b1b33;
        }

        .faq-list { margin-top:22px; display:grid; gap:12px; }
        .faq-item {
          border:1px solid #e7ecf3; border-radius:14px; background:#fff;
          box-shadow:0 8px 18px rgba(16,38,76,.05);
          transition: box-shadow .16s ease, border-color .16s ease, transform .16s ease;
        }
        .faq-item.open { transform: translateY(-2px); box-shadow:0 14px 24px rgba(16,38,76,.08); border-color:#dfe7f2; }

        .faq-btn {
          width:100%; text-align:left; background:transparent; border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:space-between;
          padding:16px 16px; font-weight:700; color:#0b1b33; font-size:16.5px;
        }
        .faq-btn .chev { transition: transform .16s ease; opacity:.7; }
        .faq-item.open .chev { transform: rotate(180deg); opacity:1; }

        .faq-a { padding:0 16px 16px; transition: opacity .18s ease; }
        .faq-a-inner { color:#465872; line-height:1.7; }

        .faq-empty {
          text-align:center; color:#6b7280; background:#f9fafb; border:1px dashed #d1d7e2;
          border-radius:12px; padding:16px;
        }
      `}</style>
    </section>
  );
};

export default FAQ;
