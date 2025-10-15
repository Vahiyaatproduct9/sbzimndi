import { persist } from "zustand/middleware";
import { create } from "zustand";
import { Profile } from "../../types/types";
import getProfile from "../../api/getProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import checkUser from "../../api/checkUser";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../functions/getLocalInfo";
import React from "react";

interface useProfileStore {
  profile: Profile | null;
  access_token: string | null;
  refresh_token: string | null;
  refreshProfile: ({ access_token, refresh_token, setMessage }: {
    access_token?: string | null,
    refresh_token?: string | null,
    setMessage?: React.Dispatch<React.SetStateAction<string>> | null
  }
  ) => Promise<void>;
  deleteProfile: () => Promise<void>;
}

export const useProfileStore = create<useProfileStore>()(
  persist(
    (set, get) => ({
      profile: null,
      access_token: null,
      refresh_token: null,
      refreshProfile: async ({ access_token, refresh_token }) => {
        const oldAccessToken = await getAccessToken();
        const oldRefreshToken = await getRefreshToken();
        let new_access_token;
        let new_refresh_token;

        try {
          const { access_token: nat, refresh_token: nrt, success } = await checkUser({
            access_token:
              access_token ??
              (oldAccessToken && oldAccessToken.length > 0 ? oldAccessToken : null),
            refresh_token:
              refresh_token ??
              (oldRefreshToken && oldRefreshToken.length > 0 ? oldRefreshToken : null),
          });

          new_access_token = nat;
          new_refresh_token = nrt;

          const res = await getProfile({
            access_token: success ? new_access_token : access_token,
          });

          set({ profile: res });
        } catch (err) {
          console.log("Error in useProfileStore:", err);
        }

        const profile = get().profile;
        if (profile?.success)
          await AsyncStorage.setItem("profile", JSON.stringify(profile));

        await setAccessToken(new_access_token);
        await setRefreshToken(new_refresh_token);

        try {
          set({ refresh_token: new_refresh_token, access_token: new_access_token });
        } catch (e) {
          set({ refresh_token: oldRefreshToken, access_token: oldAccessToken });
        }

        console.log("profile from useProfileStore:", get().profile);
      },

      deleteProfile: async () => {
        await AsyncStorage.removeItem("profile");
        set({ profile: null });
      },
    }),
    {
      name: 'profile-store',
    }
  )
);