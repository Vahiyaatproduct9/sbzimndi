import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Geolocation from "react-native-geolocation-service";
import { requestLocationPermission } from "../../api/getLocation"; // your custom fn

interface LocationState {
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
    setLocation: () => Promise<void>;
    requestPermission: () => Promise<boolean>;
}
const memoryStorage = () => {
    let store: { [key: string]: string } = {}
    return {
        getItem: async (name: string) => {
            return store[name] ?? null
        },
        setItem: async (name: string, value: string) => {
            store[name] = value
        },
        removeItem: async (name: string) => {
            delete store[name]
        }
    }
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
                    console.log('NO location permission')
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
            storage: createJSONStorage(memoryStorage)

        }
    )
);
