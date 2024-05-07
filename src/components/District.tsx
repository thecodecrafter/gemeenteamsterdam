"use client";

import * as React from "react";
import { Icon, Link } from "@amsterdam/design-system-react";
import { SpinnerIcon } from "@amsterdam/design-system-react-icons";

interface District {
  identificatie: string;
  naam: string;
}

interface DistrictResponse {
  _embedded: {
    stadsdelen: District[];
  };
}

export const District = () => {
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const fetchDistricts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}gebieden/stadsdelen/`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch districts");
      }

      const data: DistrictResponse = await response.json();
      if (data._embedded?.stadsdelen) {
        setDistricts(data._embedded.stadsdelen);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDistricts();
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      {isLoading && <Icon className="spinner" svg={SpinnerIcon} />}
      {!isLoading && (
        <div>
          <ul>
            {districts.length > 0 ? (
              districts.map((district) => (
                <li key={district.identificatie}>
                  <Link
                    key={district.identificatie}
                    href={`/wijken/${district.identificatie}`}
                  >
                    {district.naam}
                  </Link>
                </li>
              ))
            ) : (
              <Icon className="spinner" svg={SpinnerIcon} />
            )}
          </ul>
        </div>
      )}
    </>
  );
};
