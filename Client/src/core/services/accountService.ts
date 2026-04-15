import { requests } from "../api/agent";
import { type User, type UserFormValues } from "../models";

const AccountService = 
{
    login: (values: any) => requests.post<User>('/account/login', values),
    register: (values: UserFormValues) => requests.post<User>('/account/register', values)
};

export default AccountService;
