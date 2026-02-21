import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth'
import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import logo from '../assets/imgs/logo.svg'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const login = useAuthStore((state) => state.login)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try{
            const loginMutate = await login({ 
                email, 
                password 
            })
            if(loginMutate) {
                toast.success("Login realizado com sucesso!")
            }
        }catch (error) {
            toast.error("Erro ao realizar login. Verifique suas credenciais e tente novamente.")
        }finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center gap-8 px-4 sm:px-0">
            <div>
                <img src={logo} alt="Logo" />
            </div>
            <Card className="w-full max-w-md px-8 pt-8 shadow-md">
                <CardHeader className="items-center text-center">
                    <CardTitle className="text-2xl font-bold">Fazer login</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Entre na sua conta para continuar
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* E-mail */}
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-sm font-medium block">
                                E-mail
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="mail@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-9 h-11"
                                    required
                                />
                            </div>
                        </div>

                        {/* Senha */}
                        <div className="space-y-1.5">
                            <label htmlFor="password" className="text-sm font-medium block">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-9 pr-10 h-11"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <Eye className="size-4" /> : <EyeClosed className="size-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Lembrar-me + Recuperar senha */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="size-4 rounded border-gray-300 accent-primary cursor-pointer"
                                />
                                Lembrar-me
                            </label>
                            <a href="#" className="text-sm text-primary font-medium hover:underline">
                                Recuperar senha
                            </a>
                        </div>

                        {/* Botão Entrar */}
                        <Button type="submit" className="w-full h-11 text-base mt-2" disabled={loading}>
                            Entrar
                        </Button>
                    </form>

                    {/* Divisor */}
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-sm text-muted-foreground">ou</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    {/* Criar conta */}
                    <div className="space-y-3 text-center">
                        <p className="text-sm text-muted-foreground">Ainda não tem uma conta?</p>
                        <Button asChild variant="outline" className="w-full h-11 text-base gap-2">
                            <Link to="/signup">
                                <UserRoundPlus className="size-4" />
                                Criar conta
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
