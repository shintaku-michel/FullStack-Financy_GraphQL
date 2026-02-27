import { useAuthStore } from "@/stores/auth"
import { LogOut, Menu, X } from "lucide-react"
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
        ? "font-semibold text-[#1F6F43]"
        : "font-semibold text-gray-600 hover:text-[#1F6F43] transition-colors"

export function Header() {
    const { user, logout, isAuthenticated } = useAuthStore()
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    return (
        <header className="w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between">
                <img src={logo} alt="Logo" className="h-7" />

                {isAuthenticated && (
                    <>
                        {/* Nav desktop */}
                        <nav className="hidden md:flex items-center gap-6 text-sm">
                            <NavLink to="/" end className={navLinkClass}>Dashboard</NavLink>
                            <NavLink to="/transactions" className={navLinkClass}>Transações</NavLink>
                            <NavLink to="/categories" className={navLinkClass}>Categorias</NavLink>
                        </nav>

                        <div className="flex items-center gap-3">
                            {user && (
                                <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-light text-black">
                                    {getInitials(user.name)}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-1 text-sm text-[#1F6F43] font-normal cursor-pointer">
                                <LogOut className="w-5 h-5" />
                            </button>

                            {/* Botão hambúrguer — mobile */}
                            <button
                                className="md:hidden p-1 text-gray-600 hover:text-gray-900 transition-colors"
                                onClick={() => setMenuOpen((prev) => !prev)}
                                aria-label="Abrir menu"
                            >
                                {menuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Nav mobile */}
            {isAuthenticated && menuOpen && (
                <nav className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-4 text-sm">
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
