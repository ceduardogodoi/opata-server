import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { env } from "../env";

export function getCognitoInstance(): CognitoIdentityProviderClient {
  return new CognitoIdentityProviderClient({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });
}
