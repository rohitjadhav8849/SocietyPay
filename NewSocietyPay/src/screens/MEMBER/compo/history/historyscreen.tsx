import React from "react";
import { View } from "react-native";

import MemberHistory from "./memberHistory";
import SecretaryHistory from "./secretryHistory";

/**
 * Props:
 * role comes from login / app state
 */
type Props = {
  role: "member" | "secretary"|"security";
};

const HistoryScreen = ({ role }: Props) => {
  // Secretary sees full society history
  if (role === "secretary") {
    return <SecretaryHistory />;
  }

  // Member sees only his history
  return <MemberHistory />;
};

export default HistoryScreen;
