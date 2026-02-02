import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach } from "vitest";
import App from "@/App";

describe("App filters", () => {
  beforeEach(() => {
    // avoid persistence interfering with tests
    window.localStorage.clear();
  });

  it("filters by status (All / Active / Completed)", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add task 1
    await user.type(screen.getByRole("textbox", { name: /task title/i }), "Buy milk");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    // Add task 2
    await user.type(screen.getByRole("textbox", { name: /task title/i }), "Read book");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    // Mark "Buy milk" complete (click its checkbox)
    const buyMilkRow = screen.getByText("Buy milk").closest("li");
    expect(buyMilkRow).toBeTruthy();

    const buyMilkCheckbox = within(buyMilkRow!).getByRole("checkbox");
    await user.click(buyMilkCheckbox);

    // Completed filter
    await user.click(screen.getByRole("button", { name: /completed/i }));
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.queryByText("Read book")).not.toBeInTheDocument();

    // Active filter
    await user.click(screen.getByRole("button", { name: /active/i }));
    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
    expect(screen.getByText("Read book")).toBeInTheDocument();

    // All filter
    await user.click(screen.getByRole("button", { name: /^all$/i }));
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Read book")).toBeInTheDocument();
  });

  it("filters by search query", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole("textbox", { name: /task title/i }), "Buy milk");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await user.type(screen.getByRole("textbox", { name: /task title/i }), "Read book");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    // Search input label depends on your TaskFilters
    const search = screen.getByRole("textbox", { name: /search/i });
    await user.type(search, "milk");

    await waitFor(() => {
      expect(screen.getByText("Buy milk")).toBeInTheDocument();
      expect(screen.queryByText("Read book")).not.toBeInTheDocument();
    });
  });
  it("clears filters (search + status)", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add two tasks
    await user.type(screen.getByRole("textbox", { name: /task title/i }), "Buy milk");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await user.type(screen.getByRole("textbox", { name: /task title/i }), "Read book");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    // Apply a status filter and a search query
    await user.click(screen.getByRole("button", { name: /active/i }));

    const search = screen.getByRole("textbox", { name: /search/i });
    await user.type(search, "milk");

    // Clear button should appear after filters are active
    const clearBtn = await screen.findByRole("button", { name: /clear filters/i });
    await user.click(clearBtn);

    // Search input cleared
    expect(screen.getByRole("textbox", { name: /search/i })).toHaveValue("");

    // Both tasks visible again (debounced filtering)
    await waitFor(() => {
      expect(screen.getByText("Buy milk")).toBeInTheDocument();
      expect(screen.getByText("Read book")).toBeInTheDocument();
    });
  });
});
