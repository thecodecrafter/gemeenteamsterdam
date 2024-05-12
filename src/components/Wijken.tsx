import { useFetch } from "@/hooks/useFetch";
import { Heading, Link, OrderedList } from "@amsterdam/design-system-react";
import React from "react";
import { Loading } from "./Loading";
import Error from "./Error";

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
    return <Error message={error} />;
  }

  const stadsdeelTitle = data?._embedded.wijken[0]._links.ligtInStadsdeel.title;

  if (isProcessing) {
    return <Loading />;
  }

  return (
    <>
      {!isProcessing && isSuccess && (
        <div>
          <Heading
            level={4}
            aria-label={`Wijken in stadsdeel ${stadsdeelTitle}`}
          >
            Wijken in stadsdeel {stadsdeelTitle}
          </Heading>

          <OrderedList markers>
            {data?._embedded.wijken.map((buurt) => (
              <OrderedList.Item key={buurt.identificatie}>
                <Link
                  key={buurt.identificatie}
                  aria-label={buurt.naam}
                  href={`/buurten/${buurt.identificatie}`}
                >
                  {buurt.naam}
                </Link>
              </OrderedList.Item>
            ))}
          </OrderedList>
        </div>
      )}
    </>
  );
};
