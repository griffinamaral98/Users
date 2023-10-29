import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Form from "../components/Form";

test("it shows two inputs and a button", () => {
  render(<Form />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", async () => {
  // NOT THE BEST IMPLEMENTATION

  const mock = jest.fn();

  render(<Form onUserAdd={mock} />);

  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  });
  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });
  const button = screen.getByRole("button");

  await user.click(nameInput);
  await user.keyboard("Griffin");

  await user.click(emailInput);
  await user.keyboard("griffin@gmail.com");

  await user.click(button);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: "Griffin",
    email: "griffin@gmail.com",
  });
});

test("empties the two inputs when form is submitted", async () => {
  render(<Form onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  await user.click(nameInput);
  await user.keyboard("griffin");

  await user.click(emailInput);
  await user.keyboard("griffin@gmail.com");

  await user.click(button);

  await expect(nameInput).toHaveValue("");
  await expect(emailInput).toHaveValue("");
});
