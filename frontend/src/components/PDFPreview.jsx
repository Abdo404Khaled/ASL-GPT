import { useEffect, useState } from 'react';

function PDFPreview({ url }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    // Try to fetch the PDF to test if it's accessible
    fetch(url, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) throw new Error();
      })
      .catch(() => setError(true));
  }, [url]);

  if (error) {
    return (
      <div className="text-sm text-red-600">
        ⚠️ PDF preview failed.{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600"
        >
          Download PDF
        </a>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      title="PDF Preview"
      className="w-full h-64 border border-gray-300 rounded-md mt-1"
      onError={() => setError(true)}
    />
  );
}

export default PDFPreview;
