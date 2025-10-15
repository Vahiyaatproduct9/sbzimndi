import { create } from "zustand";
import { persist } from "zustand/middleware";
import Geolocation from "react-native-geolocation-service";
import { requestLocationPermission } from "../../api/getLocation"; // your custom fn

interface LocationState {
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
    setLocation: () => Promise<void>;
    requestPermission: () => Promise<boolean>;
}

export default create<LocationState>()(
    persist(
        (set, get) => ({
            latitude: null,
            longitude: null,
            accuracy: null,

            setLocation: async () => {
                const permissionGranted = await get().requestPermission();
                if (!permissionGranted) {
                    set({ latitude: null, longitude: null, accuracy: null });
                    return;
                }

                try {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            set({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                accuracy: position.coords.accuracy,
                            });
                        },
                        (error) => {
                            console.log("Error in getting location:", error);
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 60000,
                            maximumAge: 10000,
                            forceRequestLocation: true,
                            forceLocationManager: true,
                        }
                    );
                } catch (error) {
                    console.log("Error getting geolocation:", error);
                }
            },

            requestPermission: async () => await requestLocationPermission(),
        }),
        {
            name: "location", // storage key name
        }
    )
);
