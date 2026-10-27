import React, { useState } from "react";
import "./styles.css";

// Singapore numbers are 8 digits starting with 3, 6, 8, or 9
// Using \b boundaries so we don't accidentally match CEA numbers like R0123456
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

export default function ListingAd({ pic, title, address, description })
{
  return (
    <div className="App">
      <img className="mainPic" width="300" height="500" src={pic} alt={title} />
      <div className="mainContent">
        <h1>{title}</h1>
        <p className="address">{address}</p>
        <button>See description</button>
        <p className="description">{renderDescription(description)}</p>
      </div>
    </div>
  );
}
