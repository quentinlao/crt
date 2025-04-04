import { act, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostType } from "../../../types/postType";
import { createRender } from "../../../utils/__tests__/testUtils";
import { PostItem } from "../PostItem";

const mockPost: PostType = {
  id: 1,
  title: "Test Post 1",
  body: "Test body 1",
  userId: 1,
};
const render = createRender({ router: true, reactQuery: true });

describe("PostItem", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it("should display post when data is loaded", () => {
    render(<PostItem post={mockPost} onClick={() => {}} />);

    expect(screen.getByRole("button", { name: "Test Post 1" })).toBeInTheDocument();
  });

  it("should display post when data is loaded is clicked", () => {
    // mock the onClick function
    const onClick = vi.fn();
    render(<PostItem post={mockPost} onClick={onClick} />);
    act(() => {
      screen.getByRole("button", { name: "Test Post 1" }).click();
    });
    expect(onClick).toHaveBeenCalled();
  });
});
