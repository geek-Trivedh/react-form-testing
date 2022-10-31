import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const setup = () => render(<App />);

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};
const clickTheSubmitButton = () => {
  const submitButtonElement = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButtonElement);
};
beforeEach(() => {});

describe("App", () => {
  test("initally all input elements has to be empty", () => {
    setup();
    expect(screen.getByRole("textbox").value).toBe("");
    expect(screen.getByLabelText("Password").value).toBe("");
    expect(screen.getByLabelText(/confirm password/i).value).toBe("");
  });

  test("should be able to type email", () => {
    setup();
    const { emailInputElement } = typeIntoForm({ email: "trivedhj@gmail.com" });
    expect(emailInputElement.value).toBe("trivedhj@gmail.com");
  });

  test("should be able to type a password", () => {
    setup();
    const { passwordInputElement } = typeIntoForm({ password: "secret" });
    expect(passwordInputElement.value).toBe("secret");
  });

  test("should be able to type confirm password", () => {
    setup();
    const { confirmPasswordInputElement } = typeIntoForm({
      confirmPassword: "secret",
    });
    expect(confirmPasswordInputElement.value).toBe("secret");
  });
  describe("Error handling", () => {
    test("should show email error with invalid email", () => {
      setup();
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();
      typeIntoForm({ email: "trivedhjgmail.com" });
      clickTheSubmitButton();
      expect(
        screen.getByText(/the email you input is invalid/i)
      ).toBeInTheDocument();
    });

    test("should show password error with less than 5 characters", () => {
      setup();
      typeIntoForm({ email: "trivedhj@gmail.com", password: "123" });
      clickTheSubmitButton();
      expect(
        screen.getByText(/password should be atleast 5 characters/i)
      ).toBeInTheDocument();
    });

    test("should show confirm password error if passwords doesn't match", () => {
      setup();
      typeIntoForm({
        email: "trivedhj@gmail.com",
        password: "12345",
        confirmPassword: "123456",
      });
      clickTheSubmitButton();
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
    });

    test("should not have any errors with valid inputs", () => {
      setup();
      typeIntoForm({
        email: "trivedhj@gmail.com",
        password: "12345",
        confirmPassword: "12345",
      });
      clickTheSubmitButton();
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password should be atleast 5 characters/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/passwords don't match/i)
      ).not.toBeInTheDocument();
    });
  });
});
