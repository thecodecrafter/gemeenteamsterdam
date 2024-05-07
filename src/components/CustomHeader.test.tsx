import { render, screen, waitFor } from "@testing-library/react";
import CustomHeader from "./CustomHeader";

describe("CustomHeader", () => {
  test("Should show the title 'Data Amsterdam'", async () => {
    render(<CustomHeader />);

    await waitFor(() => expect(screen.getByText("Data Amsterdam")));
  });
});
