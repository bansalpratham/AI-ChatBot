
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    checkAuthStatus,
    loginUser,
    signupUser,
} from "../helpers/api-communicator";

type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (
        name: string,
        email: string,
        password: string
    ) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let active = true;

        async function checkStatus() {
            try {
                const data = await checkAuthStatus();

                if (active && data?.email && data?.name) {
                    setUser({
                        email: data.email,
                        name: data.name,
                    });
                    setIsLoggedIn(true);
                }
            } catch (error: any) {
                if (active) {
                    setUser(null);
                    setIsLoggedIn(false);

                    if (error?.response?.status !== 401) {
                        console.error(
                            "Auth status check failed:",
                            error
                        );
                    }
                }
            }
        }

        checkStatus();

        return () => {
            active = false;
        };
    }, []);

    const login = async (
        email: string,
        password: string
    ) => {
        const data = await loginUser(email, password);

        setUser({
            email: data.email,
            name: data.name,
        });

        setIsLoggedIn(true);
    };

    const signup = async (
        name: string,
        email: string,
        password: string
    ) => {
        const data = await signupUser(name, email, password);

        setUser({
            email: data.email,
            name: data.name,
        });

        setIsLoggedIn(true);
    };

    const logout = async () => {
        // A backend logout endpoint is needed to invalidate the cookie.
        // Until then, this only clears the frontend state.
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                login,
                logout,
                signup,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
