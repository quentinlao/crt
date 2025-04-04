import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { PostDetail } from "../PostDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("axios");

const mockPost = {
  id: 1,
  title: "Test Post",
  body: "This is a test post body",
  userId: 1,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithRouter = (ui: React.ReactElement, { route = "/posts/1" } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path='/posts/:id' element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("PostDetail", () => {
  it("renders loading state", () => {
    renderWithRouter(<PostDetail />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders post details when data is loaded", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockPost });
    renderWithRouter(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByText("Test Post")).toBeInTheDocument();
      expect(screen.getByText("This is a test post body")).toBeInTheDocument();
    });
  });

  it("renders error state when API call fails", async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error("Failed to fetch post"));
    renderWithRouter(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch post/i)).toBeInTheDocument();
    });
  });

  it("renders not found message when post is not available", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: null });
    renderWithRouter(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByText("Post not found")).toBeInTheDocument();
    });
  });
});
