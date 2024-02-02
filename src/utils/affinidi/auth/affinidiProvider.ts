import { Provider } from "next-auth/providers/index";
import { providerClientId, providerClientSecret, providerIssuer } from "../secrets";

export const PROVIDER_ATTRIBUTES_KEY = "custom";

export const provider: Provider = {
  id: "affinidi",
  name: "Affinidi",
  clientId: providerClientId,
  clientSecret: providerClientSecret,
  type: "oauth",
  wellKnown: `${providerIssuer}/.well-known/openid-configuration`,
  authorization: {
    params: {
      prompt: "login",
      scope: "openid offline_access",
    },
  },
  client: {
    token_endpoint_auth_method: "client_secret_post",
  },
  idToken: true,
  profile(profile: { sub: string; custom: any[] }) {
    return {
      id: profile.sub,
      email: profile.custom?.find((i: { email: string; }) => typeof i.email === "string")?.email,
      familyName: profile.custom?.find((i: { familyName: string; }) => typeof i.familyName === "string")?.familyName,
      givenName: profile.custom?.find((i: { givenName: string; }) => typeof i.givenName === "string")?.givenName,
      middleName: profile.custom?.find((i: { middleName: string; }) => typeof i.middleName === "string")?.middleName,
      picture: profile.custom?.find((i: { picture: string; }) => typeof i.picture === "string")?.picture,
      country: profile.custom?.find((i: { country: string; }) => typeof i.country === "string")?.country,
      nickname: profile.custom?.find((i: { nickname: string; }) => typeof i.nickname === "string")?.nickname,
      phoneNumber: profile.custom?.find((i: { phoneNumber: string; }) => typeof i.phoneNumber === "string")?.phoneNumber,
      gender: profile.custom?.find((i: { gender: string; }) => typeof i.gender === "string")?.gender,
      birthdate: profile.custom?.find((i: { birthdate: string; }) => typeof i.birthdate === "string")?.birthdate,
      postalCode: profile.custom?.find((i: { postalCode: string; }) => typeof i.postalCode === "string")?.postalCode,
      city: profile.custom?.find((i: { city: string; }) => typeof i.city === "string")?.city,
      address: profile.custom?.find((i: { address: string; }) => typeof i.address === "string")?.address,
      verified: profile.custom?.find((i: { verified: boolean; }) => typeof i.verified === "boolean")?.verified,
    };
  },
};
