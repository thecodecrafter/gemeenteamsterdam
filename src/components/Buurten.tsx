import { useFetch } from "@/hooks/useFetch";
import { Heading, UnorderedList } from "@amsterdam/design-system-react";
import React from "react";
import { Loading } from "./Loading";

interface Buurt {
  identificatie: string;
  naam: string;
  _links: {
    ligtInWijk: {
      href: string;
      title: string;
    };
  };
}

interface BuurtenResponse {
  _embedded: {
    buurten: Buurt[];
  };
}

export const Buurten = (props: { wijkId: string }) => {
  const { data, isProcessing, isSuccess, error } = useFetch<BuurtenResponse>(
    `gebieden/buurten/?ligtInWijk.identificatie=${props.wijkId}`
  );

  const wijkTitle = data?._embedded.buurten[0]._links.ligtInWijk.title;

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
          <Heading level={4} aria-label={`Buurten in de wijk ${wijkTitle}`}>
            Buurten in de wijk {wijkTitle}
          </Heading>

          <UnorderedList>
            {data?._embedded.buurten.map((area) => (
              <UnorderedList.Item
                key={area.identificatie}
                aria-label={area.naam}
              >
                {area.naam}
              </UnorderedList.Item>
            ))}
          </UnorderedList>
        </div>
      )}
    </>
  );
};
