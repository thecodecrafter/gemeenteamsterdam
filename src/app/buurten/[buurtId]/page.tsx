"use client";

import * as React from "react";
const Page = ({ params }: { params: { areaId: string } }) => {
  const [areas, setAreas] = React.useState<[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const fetchAreas = async () => {
    console.log("fetching areas");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}gebieden/wijken/?ligtInStadsdeel.identificatie=03630011872036`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch areas");
      }

      const data = await response.json();
      if (data._embedded && data._embedded.buurten) {
        setAreas(data._embedded.buurten);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    fetchAreas();
  }, []);

  return <h1>Area id {params.areaId}</h1>;
};

export default Page; 