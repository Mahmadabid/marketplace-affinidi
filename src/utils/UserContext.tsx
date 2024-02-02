import { Dispatch, SetStateAction, createContext } from "react";
import { UserInfo } from "./affinidi/types/types";

export interface UserDataProps {
    userId: string;
    user: UserInfo
}

export const UserDataValues = {
    userId: '',
    user: {
        email: "",
        familyName: "",
        givenName: "",
        middleName: "",
        picture: "",
        country: "",
        nickname: "",
        phoneNumber: "",
        gender: "",
        birthdate: "",
        postalCode: "",
        city: "",
        address: "",
        verified: false,
    }
}

export const UserContext = createContext<[UserDataProps, Dispatch<SetStateAction<UserDataProps>>]>(([UserDataValues, () => { }]));
