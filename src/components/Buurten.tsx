import { useFetch } from "@/hooks/useFetch";
import { Heading, Icon, UnorderedList } from "@amsterdam/design-system-react";
import { SpinnerIcon } from "@amsterdam/design-system-react-icons";
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
            Buurten in de wijk{" "}
            {data?._embedded.buurten[0]._links.ligtInWijk.title}
          </Heading>

          <UnorderedList>
            {data?._embedded.buurten.map((area) => (
              <UnorderedList.Item key={area.identificatie}>
                {area.naam}
              </UnorderedList.Item>
            ))}
          </UnorderedList>
        </div>
      )}
    </>
  );
};
