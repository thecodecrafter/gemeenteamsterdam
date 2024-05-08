import { screen, render, waitFor } from "@testing-library/react";
import { Wijken } from "../src/components/Wijken";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Wijken", () => {
  it("renders page with the title 'Wijken in stadsdeel Naam Stadsdeel'", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        _embedded: {
          wijken: [
            {
              identificatie: 1,
              naam: "Wijknaam",
              _links: {
                ligtInStadsdeel: {
                  href: "",
                  title: "Naam Stadsdeel",
                },
              },
            },
          ],
        },
      },
    });

    render(<Wijken stadsdeelId="" />);

    await waitFor(() => screen.getByText("Wijken in stadsdeel Naam Stadsdeel"));
  });

  it("renders page with error message", async () => {
    mockedAxios.get.mockRejectedValue({});

    render(<Wijken stadsdeelId="" />);

    await waitFor(() => screen.getByText("Something went wrong."));
  });
});
