'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const QueryForm = () => {
  const searchParams = useSearchParams();

  // Indicates whether to make the request to an `origin` or a specific URL
  // See: https://developer.chrome.com/docs/crux/history-api#schema
  const [query, setQuery] = useState<string>(searchParams.get('queryType') || 'origin');

  const [url, setUrl] = useState<string>(searchParams.get('url') || '');
  const [formFactor, setFormFactor] = useState<string>(searchParams.get('formFactor') || '');
  const [error, setError] = useState<string | null>(null);

  const handleChange = e => {
    const { value, id } = e.target;

    switch (id) {
      case 'url':
        setUrl(value);
        if (value.length >= 5 && !value.startsWith('https')) {
          setError(`${value} needs to start with https protocol!`);
        } else {
          setError(null);
        }
        break;
      case 'formFactor':
        setFormFactor(value);
        break;
      case 'origin-option':
        setQuery('origin');
        break;
      case 'page-option':
        setQuery('page');
        break;
      default:
        break;
    }
  };

  return (
    <form
      encType="application/x-www-form-urlencoded"
      className="w-1/2 space-y-4"
    >
      <div className="flex flex-col">
        <fieldset>
          <legend className="font-bold mb-1">Query type:</legend>
          <div className="space-x-4">
            <label htmlFor="origin-option">Full origin</label>
            <input
              type="radio"
              name="queryType"
              value="origin"
              id="origin-option"
              checked={query === 'origin'}
              onChange={() => setQuery('origin')}
            />
            <label className="page-option">Specific page</label>
            <input
              type="radio"
              name="queryType"
              value="page"
              id="page-option"
              checked={query === 'page'}
              onChange={handleChange}
            />
          </div>
        </fieldset>
      </div>
      <div className="flex flex-col">
        <label htmlFor="url">URL (must include protocol)</label>
        <input
          type="url"
          name="url"
          id="url"
          placeholder="URL of site to analyze"
          required
          value={url}
          onChange={handleChange}
          className="text-black"
        />
        {error && (
          <div
            className="my-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="formFactor">Device type</label>
        <select
          name="formFactor"
          id="formFactor"
          value={formFactor}
          onChange={handleChange}
          className="text-black"
        >
          <option value={'DESKTOP'}>Desktop</option>
          <option value={'PHONE'}>Mobile</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-neutral-700 p-2 py-1 rounded"
        disabled={error !== null}
      >
        Submit
      </button>
    </form>
  );
};

export default QueryForm;
