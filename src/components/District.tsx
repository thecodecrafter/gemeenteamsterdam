"use client";

import { Link } from "@amsterdam/design-system-react";
import * as React from "react";

interface Area {
  identificatie: string;
  naam: string;
}

export const District = () => {
  const [districts, setDistricts] = React.useState<Area[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const fetchDistricts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}gebieden/wijken/?ligtInStadsdeel.identificatie=03630011872036`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch districts");
      }

      const data = await response.json();
      if (data._embedded && data._embedded.wijken) {
        setDistricts(data._embedded.wijken);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    fetchDistricts();
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Stadsdeel West - wijken</h1>
      {districts.length > 0 ? (
        districts.map((district) => (
          <Link
            key={district.identificatie}
            href={`/buurt/${district.identificatie}`}
          >
            {district.naam}
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
