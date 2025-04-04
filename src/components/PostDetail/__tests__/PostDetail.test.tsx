import { screen, waitFor, render } from "@testing-library/react";
import {
  useSubmit,
  useActionData,
  useLoaderData,
  useNavigate,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostType } from "../../../types/postType";
import { PostDetail } from "../PostDetail";

const mockPosts: PostType = {
  id: 1,
  title: "Test Post 1",
  body: "Test body 1",
  userId: 1,
};

// Mock Form component to avoid the data router context requirement
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useActionData: vi.fn(),
    useSubmit: vi.fn(),
    useNavigate: vi.fn(),
    // Mock Form component to avoid the data router context requirement
    Form: ({ children, method, className }: { children: React.ReactNode; method: string; className: string }) => (
      <form method={method} className={className}>
        {children}
      </form>
    ),
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
    // Create a memory router with routes for the PostDetail component
    const routes = [
      {
        path: "/posts/:postId",
        element: <PostDetail />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/1"],
      initialIndex: 0,
    });

    // Render with the RouterProvider
    render(<RouterProvider router={router} />);

    // Wait for the title to appear
    expect(await screen.findByText("Test Post 1")).toBeInTheDocument();

    const editButton = screen.getByRole("button", { name: /edit/i });

    // Check that the edit and delete buttons are present
    await waitFor(() => {
      editButton.click();
    });

    // Now we should be in edit mode, so "Save" button should appear
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
});
