import { Heading, Icon, Link } from "@amsterdam/design-system-react";
import { SpinnerIcon } from "@amsterdam/design-system-react-icons";
import React from "react";

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
  const [wijken, setWijken] = React.useState<Wijk[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [naamStadsdeel, setNaamStadsdeel] = React.useState<string | null>(null);

  const fetchBuurten = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}gebieden/wijken/?ligtInStadsdeel.identificatie=${props.stadsdeelId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch wijken");
      }

      const data: WijkenResponse = await response.json();

      setNaamStadsdeel(data._embedded.wijken[0]._links.ligtInStadsdeel.title);
      setWijken(data._embedded.wijken);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBuurten();
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      {isLoading && <Icon className="spinner" svg={SpinnerIcon} />}
      {!isLoading && (
        <div>
          <Heading level={4}>Wijken in stadsdeel {naamStadsdeel}</Heading>

          <ul>
            {wijken.map((buurt) => (
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
