import React, { useEffect, useState } from 'react';
import { useLocalState } from '../hooks/useLocalState';
import { beaconMappings } from '../data/beacons';
import products from '../lib/products';

interface BeaconProps {
  code: string | null;
}

/**
 * Beacon page handles the outcome of scanning a QR code. Depending on the
 * encoded `code` parameter this component can display product drops,
 * event tickets, chat/community links, or simply award check-in points.
 * It also updates the user's loyalty points via useLocalState.
 */
export default function Beacon() {
  const [points, setPoints] = useLocalState<number>('userPoints', 0);
  const [message, setMessage] = useState<string>('');
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    // Extract the beacon code from the querystring. Codes can be passed
    // via ?code=XYZ or ?c=XYZ for convenience.
    const params = new URLSearchParams(window.location.search);
    const rawCode = params.get('code') || params.get('c');
    if (!rawCode) {
      setMessage('No beacon code provided.');
      return;
    }
    const action = beaconMappings[rawCode];
    if (!action) {
      setMessage('Unknown beacon code.');
      return;
    }
    // Award loyalty points based on the beacon's reward value. Use the
    // functional update form to ensure we capture the latest value.
    setPoints(current => current + action.reward);
    // Build the UI based on the beacon type.
    switch (action.type) {
      case 'drop': {
        const product = products.find(p => p.id === action.productId);
        if (product) {
          setMessage(`You earned ${action.reward} points!`);
          setContent(
            <div className="mt-4 bg-[#1a1a1a] p-6 rounded">
              <h2 className="text-2xl font-bold mb-2">Exclusive Drop</h2>
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="text-xl font-bold">{product.title}</h3>
              <p className="text-sm opacity-80">{product.description}</p>
              <p className="text-red-500 font-semibold mt-2">£{product.price.toFixed(2)}</p>
              <button
                className="mt-4 bg-red-700 hover:bg-red-800 px-6 py-2 rounded text-white font-bold"
                onClick={() => alert('Added to bag! Enjoy your exclusive drop.')}
              >
                Add to Bag
              </button>
            </div>,
          );
        } else {
          setContent(<p>Product associated with this drop is unavailable.</p>);
        }
        break;
      }
      case 'ticket': {
        setMessage(`You earned ${action.reward} points!`);
        setContent(
          <div className="mt-4 bg-[#1a1a1a] p-6 rounded">
            <h2 className="text-2xl font-bold mb-2">Event Ticket</h2>
            <p className="font-bold text-lg">{action.event.name}</p>
            <p className="opacity-80">Date: {action.event.date}</p>
            <p className="opacity-80">Price: £{action.event.price.toFixed(2)}</p>
            <button
              className="mt-4 bg-red-700 hover:bg-red-800 px-6 py-2 rounded text-white font-bold"
              onClick={() => alert('Ticket purchase flow is not implemented in this demo.')}
            >
              Buy Ticket
            </button>
          </div>,
        );
        break;
      }
      case 'chat': {
        setMessage(`You earned ${action.reward} points!`);
        setContent(
          <div className="mt-4 bg-[#1a1a1a] p-6 rounded">
            <h2 className="text-2xl font-bold mb-2">Join Our Community</h2>
            <p className="opacity-80">Scan to join our chat and meet fellow mess-makers.</p>
            <a
              href={action.url}
              className="underline text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {action.url}
            </a>
          </div>,
        );
        break;
      }
      case 'checkin': {
        setMessage(`Check-in recorded! You earned ${action.reward} point.`);
        setContent(<p className="mt-4">Thanks for checking in. Remember to hydrate and decompress.</p>);
        break;
      }
      default: {
        setMessage('Unknown beacon action.');
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Beacon Scan Result</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {content}
    </div>
  );
}