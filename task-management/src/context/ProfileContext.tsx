"use client"
import { UserDetails } from "@/types";
import React, {createContext, useEffect, useState, ReactNode, useContext} from "react";
import { getUserDetailsAPI } from "@/app/_api/UsersAPIs";

type ProfileContextType = {
    userDetailsState: UserDetails;
    setUserDetailsState: React.Dispatch<React.SetStateAction<UserDetails>>;
};

export const ProfileContext = createContext<ProfileContextType | null>(null);

type ProfileProviderProps = {
    children: ReactNode;
};

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
    const [userDetailsState, setUserDetailsState] = useState<UserDetails>({
        name: "",
        lastName: "",
        email: "",
        avatarUrl: "",
        createdAt: new Date(),
        workspaces: [],
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await getUserDetailsAPI();
                setUserDetailsState(data);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            }
        };
        fetchUserDetails();
    }, []);

    return (
        <ProfileContext.Provider value={{ userDetailsState, setUserDetailsState }}>
            {children}
        </ProfileContext.Provider>
    );
};
export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context)
        throw new Error("useProfile must be used inside ProfileProvider");
    return context;
}