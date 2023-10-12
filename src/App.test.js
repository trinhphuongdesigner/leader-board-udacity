import { ChakraProvider } from "@chakra-ui/react/dist";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import NewPoll from "./pages/NewQuestion";
import NotFoundPage from "./pages/404";
import store from "./store";
import { getAllUsers } from "./apis/userApi";
import { _saveQuestion, _saveQuestionAnswer } from "./helper/fakeData";
import Header from "./components/layout/Header";

describe("test _saveQuestion", () => {
  it("Async Function", async () => {
    const optionOneText = "1";
    const optionTwoText = "2";
    const authedUser = "tylermcginnis";
    const result = await _saveQuestion({
      optionOneText,
      optionTwoText,
      authedUser,
    });
    expect(result).not.toEqual("Error");
  });

  it("Async Function incorrect", async () => {
    const optionOneText = "1";
    const optionTwoText = "2";
    const authedUser = "sarahedo123";
    try {
      await _saveQuestion({ optionOneText, optionTwoText, authedUser });
    } catch (e) {
      expect(e).toBe("Error");
    }
  });
});

describe("test _saveQuestionAnswer", () => {
  it("Async Function", async () => {
    const authedUser = "sarahedo";
    const qid = "vthrdm985a262al8qx3do";
    const answer = "optionOne";
    const result = await _saveQuestionAnswer({ authedUser, qid, answer });
    expect(result).toEqual(true);
  });

  it("Async Function incorrect", async () => {
    const authUser = "sarahedo123";
    const questionID = "vthrdm985a262al8qx3do123";
    const answer = "optionOne";
    try {
      await _saveQuestionAnswer({ authUser, questionID, answer });
    } catch (e) {
      expect(e).toBe("Please provide authedUser, qid, and answer");
    }
  });
});

describe("test page Error", () => {
  it("snap shot", () => {
    const view = render(<NotFoundPage />);
    expect(view).toMatchSnapshot();
  });
});

describe("test page New", () => {
  it("snap shot", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });
});

describe("test page Nav", () => {
  it("snap shoot", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });
});

describe("test page Login", () => {
  it("snap shoot", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });
});

describe("test page App", () => {
  it("snap shoot", () => {
    const view = render(<App />);
    expect(view).toMatchSnapshot();
  });
});

describe("test fireEvent", () => {
  it("fireEvent", async () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    );
    const select = screen.getByTestId("select-input");
    fireEvent.change(select, { target: { value: "sarahedo" } });
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);
    setTimeout(() => {
      expect(screen.getByTestId("user-name")).toBeInTheDocument();
    }, 1000);
  });
});
