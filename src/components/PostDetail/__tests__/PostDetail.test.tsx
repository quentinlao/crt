import { render, screen, waitFor } from "@testing-library/react";
import { useSubmit, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostType } from "../../../types/postType";
import { PostDetail } from "../PostDetail";

const mockPosts: PostType = {
  id: 1,
  title: "Test Post 1",
  body: "Test body 1",
  userId: 1,
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useActionData: vi.fn(),
    useSubmit: vi.fn(),
    useNavigate: vi.fn(),
    Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, // Mock Link as a simple div
  };
});

describe("PostDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLoaderData).mockReturnValue(mockPosts);
    vi.mocked(useActionData).mockReturnValue({ ok: true });
    vi.mocked(useSubmit).mockReturnValue(vi.fn());
    vi.mocked(useNavigate).mockReturnValue(vi.fn());
  });

  it("should enter edit mode and show Save button when Edit is clicked", async () => {
    render(<PostDetail />);
    // Wait for the title to appear
    expect(await screen.findByText("Test Post 1")).toBeInTheDocument();

    const editButton = screen.getByRole("button", { name: /edit/i });

    await waitFor(() => {
      editButton.click();
    });

    // Now we should be in edit mode, so "Save" button should appear
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
});
