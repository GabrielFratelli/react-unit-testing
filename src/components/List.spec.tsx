import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";

describe("List Component", () => {
  it("should render list items", async () => {
    const { getByText, rerender, queryByText } = render(
      <List initialItems={["biel", "mãe", "pai"]} />
    );

    expect(getByText("biel")).toBeInTheDocument();
    expect(getByText("mãe")).toBeInTheDocument();
    expect(getByText("pai")).toBeInTheDocument();

    await rerender(<List initialItems={["fernanda"]} />);

    expect(getByText("fernanda")).toBeInTheDocument();
    expect(queryByText("biel")).not.toBeInTheDocument();
  });

  it("shold be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText } = render(
      <List initialItems={[]} />
    );

    const inputElement = getByPlaceholderText("Novo item");
    const addButton = getByText("Adicionar");

    await userEvent.type(inputElement, "fê");
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(getByText("fê")).toBeInTheDocument();
    });
  });

  it("shold be able to add remove item from the list", async () => {
    const { getByText, getAllByText } = render(
      <List initialItems={["biel"]} />
    );

    const removeButtons = getAllByText("Remover");

    await userEvent.click(removeButtons[0]);

    await waitForElementToBeRemoved(() => {
      return getByText("biel");
    });
  });
});
