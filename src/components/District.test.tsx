import { render, screen, waitFor } from "@testing-library/react";
import { District } from "./District";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("District", () => {
  it("renders error message", async () => {
    mockedAxios.get.mockRejectedValue({});

    render(<District />);

    await waitFor(() => screen.getByText("Something went wrong."));
  });

  it("renders error message", async () => {
    mockedAxios.get.mockRejectedValue([]);

    render(<District />);

    await waitFor(() => screen.getByText("Something went wrong."));
  });

  it("Renders successfully'", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        _embedded: {
          stadsdelen: [
            {
              identificatie: 1,
              naam: "Centrum",
            },
          ],
        },
      },
    });

    render(<District />);

    await waitFor(() => screen.getByText("Centrum"));
  });
});
