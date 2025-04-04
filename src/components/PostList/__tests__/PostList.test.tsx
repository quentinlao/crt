import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { PostList } from "../PostList";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("axios");

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

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path='/' element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("PostList", () => {
  it("renders loading state", () => {
    renderWithRouter(<PostList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders posts when data is loaded", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockPosts });
    renderWithRouter(<PostList />);

    await waitFor(() => {
      expect(screen.getByText("Test Post 1")).toBeInTheDocument();
      expect(screen.getByText("Test Post 2")).toBeInTheDocument();
    });
  });

  it("handles edit mode", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockPosts });
    renderWithRouter(<PostList />);

    await waitFor(() => {
      expect(screen.getByText("Test Post 1")).toBeInTheDocument();
    });

    const editButton = screen.getByRole("button", { name: /Edit post titled "Test Post 1"/i });
    await userEvent.click(editButton);

    expect(screen.getByRole("textbox", { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /body/i })).toBeInTheDocument();
  });

  it("handles delete action", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockPosts });
    vi.mocked(axios.delete).mockResolvedValueOnce({});

    renderWithRouter(<PostList />);

    await waitFor(() => {
      expect(screen.getByText("Test Post 1")).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole("button", { name: /Delete post titled "Test Post 1"/i });
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts/1");
    });
  });
});
