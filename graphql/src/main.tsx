import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import environment from "./utils/environment.ts";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apolloClient.ts";

const PRODUCTION = "production";

if (environment.NODE_ENV === PRODUCTION) disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>
);
