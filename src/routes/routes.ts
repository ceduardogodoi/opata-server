enum Auth {
  PREFIX = "/v1",
  SIGN_UP = "/sign-up",
  SIGN_UP_CONFIRMATION = "/sign-up/confirmation",
  SIGN_IN = "/sign-in",
  SIGN_OUT = "/sign-out",
}

enum Animals {
  PREFIX = "/v1/animals",
  ROOT = "/",
}

export const Routes = {
  auth: Auth,
  animals: Animals,
};
