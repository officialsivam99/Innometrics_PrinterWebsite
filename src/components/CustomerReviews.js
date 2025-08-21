// src/components/CustomerReviews.jsx
import React, { useMemo } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const defaultReviews = [
  {
    id: 1,
    name: "Emily Johnson",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    title: "Perfect for my home office",
    text:
      "Setup was quick and prints are sharp. Delivery was on time and packing was solid.",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Michael Carter",
    avatar: "https://i.pravatar.cc/80?img=27",
    rating: 4,
    title: "Great value",
    text:
      "The price is right and the cartridges last longer than I expected. Recommended.",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Sarah Miller",
    avatar: "https://i.pravatar.cc/80?img=48",
    rating: 5,
    title: "Excellent support",
    text:
      "Live chat fixed my Wi-Fi setup in minutes. Genuine products and fast delivery.",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Daniel Wilson",
    avatar: "https://i.pravatar.cc/80?img=7",
    rating: 4,
    title: "Reliable prints",
    text:
      "Print quality is consistent. I like the clean UI and simple checkout process.",
    date: "1 month ago",
  },
  {
    id: 5,
    name: "Jessica Davis",
    avatar: "https://i.pravatar.cc/80?img=36",
    rating: 5,
    title: "Fast delivery",
    text:
      "Ordered at night and got it the next day. Packaging was neat and safe.",
    date: "1 month ago",
  },
  {
    id: 6,
    name: "Matthew Anderson",
    avatar: "https://i.pravatar.cc/80?img=16",
    rating: 5,
    title: "Genuine ink, no mess",
    text:
      "Original ink cartridges—no clogging. Will buy again for sure.",
    date: "2 months ago",
  },
];

function Stars({ rating = 0, size = 16 }) {
  const full = Math.round(rating);
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[...Array(5)].map((_, i) =>
        i < full ? (
          <AiFillStar key={i} size={size} color="#f59e0b" />
        ) : (
          <AiOutlineStar key={i} size={size} color="#f59e0b" />
        )
      )}
    </span>
  );
}

const CustomerReviews = ({
  title = "What our customers say",
  subtitle = "Real feedback from verified buyers.",
  reviews = defaultReviews,
  onWriteReview,
}) => {
  const avg = useMemo(() => {
    if (!reviews.length) return 0;
    return (
      Math.round(
        (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length) * 10
      ) / 10
    );
  }, [reviews]);

  return (
    <section className="cr-wrap" aria-labelledby="reviews-title">
      <div className="cr-container">
        <header className="cr-head">
          <h2 id="reviews-title" className="cr-title">{title}</h2>
          <p className="cr-sub">{subtitle}</p>

          <div className="cr-summary">
            <Stars rating={avg} size={18} />
            <span className="cr-score">{avg}</span>
            <span className="cr-count">({reviews.length} reviews)</span>
            {onWriteReview && (
              <button className="cr-cta" onClick={onWriteReview}>
                Write a review
              </button>
            )}
          </div>
        </header>

        <div className="cr-grid">
          {reviews.map((r) => (
            <article key={r.id} className="cr-card">
              <div className="cr-top">
                <img src={r.avatar} alt={r.name} className="cr-avatar" loading="lazy" />
                <div className="cr-meta">
                  <div className="cr-name">
                    {r.name}
                    <span className="cr-verified">
                      <FiCheckCircle size={14} />
                      Verified Buyer
                    </span>
                  </div>
                  <div className="cr-stars">
                    <Stars rating={r.rating} />
                    <span className="cr-date">· {r.date}</span>
                  </div>
                </div>
              </div>

              <h3 className="cr-card-title">{r.title}</h3>
              <p className="cr-text">{r.text}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .cr-wrap { background:#fff; padding:56px 16px; }
        .cr-container { max-width:1180px; margin:0 auto; }
        .cr-head { text-align:center; }
        .cr-title { margin:0; font-weight:800; font-size:32px; color:#0b1b33; }
        .cr-sub { color:#56617a; margin:8px auto 0; max-width:720px; }
        .cr-summary {
          margin-top:14px; display:inline-flex; align-items:center; gap:10px;
          background:#f7fafc; border:1px solid #e7ecf3; padding:10px 14px; border-radius:999px;
        }
        .cr-score { font-weight:800; color:#0b1b33; }
        .cr-count { color:#6b7280; }
        .cr-cta {
          margin-left:10px; border:none; background:#2563eb; color:#fff; font-weight:700;
          padding:8px 12px; border-radius:999px; cursor:pointer;
        }
        .cr-cta:hover { filter:brightness(.95); }

        .cr-grid { margin-top:26px; display:grid; gap:18px; grid-template-columns:1fr; }
        @media (min-width: 768px) { .cr-grid { grid-template-columns:1fr 1fr; } }
        @media (min-width: 1200px){ .cr-grid { grid-template-columns:repeat(3,1fr); } }

        .cr-card {
          background:#fff; border:1px solid #e7ecf3; border-radius:14px;
          padding:18px 18px 16px; box-shadow:0 8px 20px rgba(16,38,76,.05);
          transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease;
        }
        .cr-card:hover { transform:translateY(-4px); box-shadow:0 16px 26px rgba(16,38,76,.08); border-color:#dfe7f2; }

        .cr-top { display:flex; gap:12px; align-items:center; }
        .cr-avatar { width:44px; height:44px; border-radius:50%; object-fit:cover; border:1px solid #e7ecf3; }
        .cr-meta { display:flex; flex-direction:column; gap:4px; }
        .cr-name { font-weight:800; color:#0b1b33; display:flex; align-items:center; gap:8px; }
        .cr-verified { display:inline-flex; align-items:center; gap:6px; background:#ecfdf5; color:#059669; border:1px solid #a7f3d0; padding:2px 8px; border-radius:999px; font-size:12px; }
        .cr-stars { display:flex; align-items:center; gap:8px; color:#6b7280; }
        .cr-date { color:#6b7280; font-size:13px; }

        .cr-card-title { margin:12px 0 6px; font-size:18px; color:#0b1b33; }
        .cr-text { margin:0; color:#4b5563; line-height:1.65; }
      `}</style>
    </section>
  );
};

export default CustomerReviews;
