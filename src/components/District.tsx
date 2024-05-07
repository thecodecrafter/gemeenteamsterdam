"use client";

import * as React from "react";
import { Link } from "@amsterdam/design-system-react";
import { useFetch } from "@/hooks/useFetch";
import { Loading } from "./Loading";

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
  const { data, isProcessing, error } = useFetch<DistrictResponse>(
    "gebieden/stadsdelen/"
  );

  if (error) {
    return <h1>{error}</h1>;
  }

  if (isProcessing) {
    return <Loading />;
  }

  return (
    <>
      {!isProcessing && (
        <div>
          <ul>
            {data?._embedded.stadsdelen.map((district) => (
              <li key={district.identificatie}>
                <Link
                  key={district.identificatie}
                  href={`/wijken/${district.identificatie}`}
                >
                  {district.naam}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
