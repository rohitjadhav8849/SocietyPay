export type Role = "member" | "secretary";

export type UserDocument = {
  id: string;
  type: "aadhaar" | "bill" | "selfie";
  uri: string;
  verified: boolean;
};

export type UserProfile = {
  societyid:string,
  id: string;
  name: string;
  mobile: string;
  role: Role;
  society: string,
  flat: {
    wing:string,
    number: string
  };
  documents: UserDocument[];
};
