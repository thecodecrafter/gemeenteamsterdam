import WijkenPage from "@/app/wijken/[stadsdeelId]/page";
import { render, screen, waitFor } from "@testing-library/react";

import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("WijkenPage", () => {
  it("should render the page correctly", async () => {
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

    render(<WijkenPage params={{ stadsdeelId: "" }} />);

    await waitFor(() => {
      screen.getByText("Wijken in stadsdeel Naam Stadsdeel");
    });
  });
});
