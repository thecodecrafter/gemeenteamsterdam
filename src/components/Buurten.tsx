import { Heading, Icon } from "@amsterdam/design-system-react";
import { SpinnerIcon } from "@amsterdam/design-system-react-icons";
import React from "react";

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
  const [buurten, setBuurten] = React.useState<Buurt[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [naamWijk, setNaamWijk] = React.useState<string | null>(null);

  const fetchAreas = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}gebieden/buurten/?ligtInWijk.identificatie=${props.wijkId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch buurten");
      }

      const data: BuurtenResponse = await response.json();
      setBuurten(data._embedded.buurten);
      setNaamWijk(data._embedded.buurten[0]._links.ligtInWijk.title);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAreas();
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      {isLoading && <Icon className="spinner" svg={SpinnerIcon} />}
      {!isLoading && (
        <div>
          <Heading level={4}>Buurten in de wijk {naamWijk}</Heading>

          <ul>
            {buurten.length > 0 ? (
              buurten.map((area) => (
                <li key={area.identificatie}>{area.naam}</li>
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
