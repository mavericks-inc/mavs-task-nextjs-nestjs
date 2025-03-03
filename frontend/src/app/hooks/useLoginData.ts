import { LoginContext } from "@/app/contexts/login";
import { useContext } from "react";

export const useLoginData = () => {
	return useContext(LoginContext);
};
