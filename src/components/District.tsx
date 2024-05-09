"use client";

import React from "react";
import { Link, OrderedList } from "@amsterdam/design-system-react";
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
  const { data, isProcessing, isSuccess, error } = useFetch<DistrictResponse>(
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
      {!isProcessing && isSuccess && (
        <div>
          <OrderedList markers>
            {data?._embedded.stadsdelen.map((district) => (
              <OrderedList.Item key={district.identificatie}>
                <Link
                  key={district.identificatie}
                  href={`/wijken/${district.identificatie}`}
                  aria-label={district.naam}
                >
                  {district.naam}
                </Link>
              </OrderedList.Item>
            ))}
          </OrderedList>
        </div>
      )}
    </>
  );
};
