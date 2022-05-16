import {
    HOME_PAGE, 
    LOGIN_ROUTE, 
    MESSENGER, 
    REGISTRATION_ROUTE, 
    USER_LIST,
    PROFILE_ROUTE,
    USER_COLLECTIONS,
    SEARCH_ROUTE,
    USER_COLLECTION
} from "./utils/consts";
import Auth from "./pages/Auth";
import UsersList from "./pages/UserListPage";
import Messenger from "./pages/Messenger";
import HomePage from "./pages/HomePage";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile"
import UserColletions from "./pages/UserCollections"
import UserColletion from "./pages/UserCollection"
import Search from "./pages/SearchPage"


export const authRoutes = [
    {
        path: MESSENGER,
        Component: Messenger
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: USER_COLLECTIONS,
        Component: UserColletions
    },
    {
        path: USER_COLLECTION,
        Component: UserColletion
    },
]

export const adminRoutes= [
    {
        path: USER_LIST,
        Component: UsersList
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: HOME_PAGE,
        Component: HomePage
    },
    {
        path: SEARCH_ROUTE,
        Component: Search
    },
]
