import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from "../components/List";

const renderComponent = () => {
  const users = [
    { name: "griffin", email: "griffin@gmail.com" },
    { name: "sam", email: "sam@gmail.com" },
  ];

  render(<List users={users} />);

  return {
    users,
  };
};

test("render one row per user", () => {
  renderComponent();

  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  expect(rows).toHaveLength(2);
});

test("render the name and email of each user", () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
