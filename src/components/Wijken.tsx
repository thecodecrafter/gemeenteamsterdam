import { useFetch } from "@/hooks/useFetch";
import { Heading, Link } from "@amsterdam/design-system-react";
import React from "react";
import { Loading } from "./Loading";

interface Wijk {
  identificatie: string;
  naam: string;
  _links: {
    ligtInStadsdeel: {
      href: string;
      title: string;
    };
  };
}

interface WijkenResponse {
  _embedded: {
    wijken: Wijk[];
  };
}

export const Wijken = (props: { stadsdeelId: string }) => {
  const { data, isProcessing, isSuccess, error } = useFetch<WijkenResponse>(
    `gebieden/wijken/?ligtInStadsdeel.identificatie=${props.stadsdeelId}`
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
          <Heading level={4}>
            Wijken in stadsdeel{" "}
            {data?._embedded.wijken[0]._links.ligtInStadsdeel.title}
          </Heading>

          <ul>
            {data?._embedded.wijken.map((buurt) => (
              <li key={buurt.identificatie}>
                <Link
                  key={buurt.identificatie}
                  href={`/buurten/${buurt.identificatie}`}
                >
                  {buurt.naam}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
