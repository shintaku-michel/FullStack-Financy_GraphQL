import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/stores/auth"
import { useDarkMode } from "@/composables/useDarkMode"
import { LogOut, Menu, Moon, Sun, X } from "lucide-react"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import logo from '../assets/imgs/logo.svg'

function getInitials(name: string) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
        ? "font-semibold text-[#1F6F43] dark:text-green-400"
        : "font-semibold text-gray-600 dark:text-gray-300 hover:text-[#1F6F43] dark:hover:text-green-400 transition-colors"

export function Header() {
    const { user, logout, isAuthenticated } = useAuthStore()
    const { isDark, toggle: toggleDark } = useDarkMode()
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    return (
        <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between">

                {isAuthenticated && (
                    <>
                    <div className="flex gap-12">
                        <img src={logo} alt="Logo" className="h-7" />
                        {/* Nav desktop */}
                        <nav className="hidden md:flex items-center gap-6 text-sm">
                            <NavLink to="/" end className={navLinkClass}>Dashboard</NavLink>
                            <NavLink to="/transactions" className={navLinkClass}>Transações</NavLink>
                            <NavLink to="/categories" className={navLinkClass}>Categorias</NavLink>
                        </nav>

                    </div>

                    <div className="flex">
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex flex-col items-end">
                                <p className="text-xs text-gray-600 dark:text-gray-300 uppercase">{user?.name}</p>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                            </div>

                            <div className="hidden md:flex">
                                {user && (
                                    <NavLink to="/profile">
                                        <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity border-2 border-gray-400">
                                            <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
                                            <AvatarFallback className="bg-gray-300 text-black text-sm font-light">
                                                {getInitials(user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </NavLink>
                                )}
                            </div>
                        
                            {/* Botão hambúrguer — mobile */}
                            <button
                                className="md:hidden p-1 text-gray-600 hover:text-gray-900 transition-colors"
                                onClick={() => setMenuOpen((prev) => !prev)}
                                aria-label="Abrir menu"
                            >
                                {menuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>

                            <button
                                type="button"
                                onClick={toggleDark}
                                aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-1 text-sm text-gray-600 font-normal cursor-pointer">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    </>
                )}
            </div>

            {/* Nav mobile */}
            {isAuthenticated && menuOpen && (
                <nav className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-4 text-sm">
                    <NavLink
                        to="/"
                        end
                        className={navLinkClass}
                        onClick={() => setMenuOpen(false)}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/transactions"
                        className={navLinkClass}
                        onClick={() => setMenuOpen(false)}
                    >
                        Transações
                    </NavLink>
                    <NavLink
                        to="/categories"
                        className={navLinkClass}
                        onClick={() => setMenuOpen(false)}
                    >
                        Categorias
                    </NavLink>
                </nav>
            )}
        </header>
    )
}
