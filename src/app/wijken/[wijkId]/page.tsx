"use client";

import Link from "next/link";
import React from "react";

interface Buurt {
  identificatie: string;
  naam: string;
}

const WijkPage = ({ params }: { params: { wijkId: string } }) => {
  const [buurten, setBuurten] = React.useState<Buurt[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const fetchBuurten = async (wijkId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}gebieden/wijken/?ligtInStadsdeel.identificatie=03630011872036`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch wijken");
      }

      const data = await response.json();
      if (data._embedded && data._embedded.wijken) {
        setBuurten(data._embedded.wijken);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    fetchBuurten(params.wijkId);
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Stadsdeel West - wijken</h1>
      {buurten.length > 0 ? (
        buurten.map((buurt) => (
          <Link
            key={buurt.identificatie}
            href={`/buurt/${buurt.identificatie}`}
          >
            {buurt.naam}
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WijkPage;
