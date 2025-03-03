"use client";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useState,
} from "react";
import { LoginResponse } from "../types/Login/LoginResponse";

export const LoginContext = createContext<{
	loginData: LoginResponse | undefined;
	setLoginData: Dispatch<SetStateAction<LoginResponse | undefined>>;
}>({
	loginData: undefined,
	setLoginData: () => {},
});

export const LoginProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [loginData, setLoginData] = useState<LoginResponse | undefined>(
		undefined,
	);
	return (
		<LoginContext.Provider value={{ loginData, setLoginData }}>
			{children}
		</LoginContext.Provider>
	);
};
