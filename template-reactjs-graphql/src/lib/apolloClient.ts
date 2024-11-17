import environment from "@/utils/environment";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import Cookies from "js-cookie";

const httpLink = new HttpLink({
  uri: `${environment.SERVER_URL}/graphql`,
});

// Create a middleware link to add the authorization header
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = Cookies.get("_use") || "";

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  devtools: {
    enabled: true,
  },
});

export default client;
