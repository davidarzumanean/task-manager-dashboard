import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TaskItem } from "../TaskItem";
import type { Task, TaskPriority } from "@/types/task";

const makeTask = (overrides?: Partial<Task>) => ({
  id: 1,
  title: "My task",
  priority: "medium" as TaskPriority,
  completed: false,
  createdAt: new Date("2025-01-01T10:00:00.000Z").toISOString(),
  ...overrides,
});

describe("TaskItem", () => {
  it("edits title/priority and calls onUpdate on Save", async () => {
    const user = userEvent.setup();
    const task = makeTask();

    const onUpdate = vi.fn();
    const onDelete = vi.fn();

    render(<TaskItem task={task} onUpdate={onUpdate} onDelete={onDelete} />);

    await user.click(screen.getByRole("button", { name: /edit task/i }));

    const titleInput = screen.getByRole("textbox", { name: /task title/i });
    await user.clear(titleInput);
    await user.type(titleInput, "Updated title");

    const prioritySelect = screen.getByRole("combobox", { name: /task priority/i });
    await user.selectOptions(prioritySelect, "high");

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith(1, { title: "Updated title", priority: "high" });
  });

  it("shows validation and does not save when title is empty", async () => {
    const user = userEvent.setup();
    const task = makeTask();

    const onUpdate = vi.fn();
    const onDelete = vi.fn();

    render(<TaskItem task={task} onUpdate={onUpdate} onDelete={onDelete} />);

    await user.click(screen.getByRole("button", { name: /edit task/i }));

    const titleInput = screen.getByRole("textbox", { name: /task title/i });
    await user.clear(titleInput);

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(onUpdate).not.toHaveBeenCalled();
  });

  it("toggles completed via checkbox", async () => {
    const user = userEvent.setup();
    const task = makeTask({ completed: false });

    const onUpdate = vi.fn();
    const onDelete = vi.fn();

    render(<TaskItem task={task} onUpdate={onUpdate} onDelete={onDelete} />);

    // checkbox has aria-label depending on state
    const checkbox = screen.getByRole("checkbox", { name: /mark task as complete/i });
    await user.click(checkbox);

    expect(onUpdate).toHaveBeenCalledWith(1, { completed: true });
  });
});
