import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null) // Changed from selectedChats to selectedChat for consistency
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    const fetchUser = async () => {
        setUser(dummyUserData)
    }

    const fetchUsersChats = async () => {
        setChats(dummyChats)
        // Safe selection of first chat
        if (dummyChats && dummyChats.length > 0) {
            setSelectedChat(dummyChats[0])
        } else {
            setSelectedChat(null)
        }
    }

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => {
        if (user) {
            fetchUsersChats()
        } else {
            setChats([])
            setSelectedChat(null)
        }
    }, [user])

    useEffect(() => {
        fetchUser()
    }, [])

    const value = {
        navigate,
        user,
        setUser,
        fetchUser,
        chats,
        setChats,
        selectedChat, // Updated to match the state variable name
        setSelectedChat, // Updated to match the state variable name
        theme,
        setTheme
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)