import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostList } from "../PostList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockPosts = [
  {
    id: 1,
    title: "Test Post 1",
    body: "This is a test post",
    userId: 1,
  },
  {
    id: 2,
    title: "Test Post 2",
    body: "This is another test post",
    userId: 1,
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("PostList", () => {
  it("renders loading state", () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <PostList />
      </QueryClientProvider>
    );
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders posts when data is loaded", async () => {
    vi.spyOn(window, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPosts),
      } as Response)
    );

    const { findByText } = render(
      <QueryClientProvider client={queryClient}>
        <PostList />
      </QueryClientProvider>
    );

    expect(await findByText("Test Post 1")).toBeInTheDocument();
    expect(await findByText("Test Post 2")).toBeInTheDocument();
  });

  it("handles edit mode", async () => {
    const { findByText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <PostList />
      </QueryClientProvider>
    );

    const editButton = await findByText("Edit");
    await userEvent.click(editButton);

    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("handles delete action", async () => {
    const deletePost = vi.fn();
    const { findByText } = render(
      <QueryClientProvider client={queryClient}>
        <PostList />
      </QueryClientProvider>
    );

    const deleteButton = await findByText("Delete");
    await userEvent.click(deleteButton);

    expect(deletePost).toHaveBeenCalled();
  });
});
