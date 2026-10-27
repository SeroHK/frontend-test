import React, { useState, useEffect } from "react";
import "./styles.css";

// Singapore numbers are 8 digits starting with 3, 6, 8, or 9
// Using \b boundaries so we don't accidentally match CEA license numbers like R0123456 or year 2021
const SG_PHONE_REGEX = /\b([3689]\d{3})[ -]?(\d{4})\b/g;

function PhoneNumber({ raw, masked })
{
  const [revealed, setRevealed] = useState(false);

  function handleClick(e)
  {
    e.stopPropagation();
    setRevealed(!revealed);
  }

  return (
    <span
      role="button"
      tabIndex={0}
      className={`phone-number ${revealed ? "revealed" : "masked"}`}
      onClick={handleClick}
      onKeyDown={(e) =>
      {
        if (e.key === "Enter" || e.key === " ")
        {
          handleClick(e);
        }
      }}
      title={revealed ? "Click to mask" : "Click to reveal"}
    >
      {revealed ? raw : masked}
    </span>
  );
}

function renderDescription(text)
{
  if (!text)
  {
    return null;
  }

  const parts = [];
  let lastIndex = 0;
  let match;

  SG_PHONE_REGEX.lastIndex = 0;

  while ((match = SG_PHONE_REGEX.exec(text)) !== null)
  {
    const [fullMatch, prefix] = match;

    if (match.index > lastIndex)
    {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <PhoneNumber
        key={match.index}
        raw={fullMatch}
        masked={`${prefix} XXXX`}
      />
    );

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length)
  {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function ListingAd({
  pic,
  title,
  address,
  project_type,
  year,
  ownership_type,
  psf_min,
  psf_max,
  subprice_label,
  availabilities_label,
  description
})
{
  // Keep true initially for search crawlers/SSR, then collapse once client mounts
  const [showDescription, setShowDescription] = useState(true);

  useEffect(() =>
  {
    setShowDescription(false);
  }, []);

  function handleToggleDescription()
  {
    setShowDescription((prev) => !prev);
  }

  const psfText =
    psf_min && psf_max
      ? `$${psf_min.toLocaleString()} - $${psf_max.toLocaleString()} psf`
      : null;

  const propertyDetails = [project_type, year, ownership_type]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="card-container">
      <div className="image-wrapper">
        <span className="badge-launching">LAUNCHING SOON</span>
        <img
          className="mainPic"
          src={pic}
          alt={title || "Property"}
          loading="lazy"
        />

        {/* Carousel arrows */}
        <button
          type="button"
          className="carousel-arrow carousel-prev"
          aria-label="Previous"
          onClick={(e) => e.stopPropagation()}
        >
          ‹
        </button>
        <button
          type="button"
          className="carousel-arrow carousel-next"
          aria-label="Next"
          onClick={(e) => e.stopPropagation()}
        >
          ›
        </button>
      </div>

      <div className="mainContent">
        <div className="header-row">
          <div className="title-section">
            <img
              src="/building-icon.svg"
              alt=""
              className="building-icon"
              width="40"
              height="40"
            />
            <div className="title-text">
              <h1 className="project-title">{title}</h1>
              <p className="address">{address}</p>
            </div>
          </div>

          <div className="pricing-section">
            {psfText && <div className="psf-price">{psfText}</div>}
            {subprice_label && (
              <div className="subprice-label">{subprice_label}</div>
            )}
          </div>
        </div>

        <div className="details-section">
          {propertyDetails && <p className="meta-text">{propertyDetails}</p>}
          {availabilities_label && (
            <p className="meta-text">{availabilities_label}</p>
          )}
        </div>

        <div className="action-row">
          <button
            type="button"
            className="see-description-btn"
            onClick={handleToggleDescription}
          >
            {showDescription ? "Hide description" : "See description"}
          </button>
        </div>

        {showDescription && (
          <div className="description-container">
            <p className="description-text">{renderDescription(description)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
