import { screen } from "@testing-library/react";
import { useLoaderData } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostType } from "../../../types/postType";
import { createRender } from "../../../utils/__tests__/testUtils";
import { PostList } from "../PostList";

// Mock useLoaderData
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});

const mockPosts: PostType[] = [
  {
    id: 1,
    title: "Test Post 1",
    body: "Test body 1",
    userId: 1,
  },
  {
    id: 2,
    title: "Test Post 2",
    body: "Test body 2",
    userId: 1,
  },
];

const render = createRender({ router: true, reactQuery: true });

describe("PostList", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    // Mock useLoaderData to return mockPosts
    vi.mocked(useLoaderData).mockReturnValue(mockPosts);
  });

  it("should display posts when data is loaded", () => {
    render(<PostList />);

    expect(screen.getByText("Test Post 1")).toBeInTheDocument();
    expect(screen.getByText("Test Post 2")).toBeInTheDocument();
  });

  it("should display loading state when data is not loaded", () => {
    vi.mocked(useLoaderData).mockReturnValue(undefined);

    render(<PostList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display error state when data is an error", () => {
    vi.mocked(useLoaderData).mockReturnValue(new Error("Failed to load posts"));

    render(<PostList />);

    expect(screen.getByText("Error loading posts")).toBeInTheDocument();
  });
});
