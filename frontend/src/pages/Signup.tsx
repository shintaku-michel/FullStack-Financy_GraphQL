import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getErrorMessage } from '@/lib/errors'
import { Eye, EyeClosed, Lock, LogIn, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Logo } from '../assets/imgs/Logo'
import { useAuthStore } from '../stores/auth'

export function Signup() {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const signup = useAuthStore((state) => state.signup)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const signupMutate = await signup({
                name: fullname,
                email,
                password
            });
            if (signupMutate) {
                toast.success("Cadastro realizado com sucesso!");
            }
        } catch (error) {
            toast.error(getErrorMessage(error, "Erro ao realizar cadastro."))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center gap-8 px-4 sm:px-0">
            <div>
                <Logo className="h-8 text-emerald-700 dark:text-emerald-400" />
            </div>
            <Card className="w-full max-w-md px-8 pt-8 shadow-md">
                <CardHeader className="items-center text-center">
                    <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Comece a controlar suas finanças ainda hoje
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* E-mail */}
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-sm font-medium block">
                                Nome completo
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    id="fullname"
                                    type="text"
                                    placeholder="Seu nome completo"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    className="pl-9 h-11"
                                    required
                                />
                            </div>
                        </div>
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

                                <div className='absolute top-full mt-2 text-xs text-muted-foreground'>
                                    <p>A senha deve ter no mínimo 8 caracteres</p>
                                </div>
                                
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <Eye className="size-4" /> : <EyeClosed className="size-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Botão Entrar */}
                        <Button type="submit" className="w-full h-11 text-base mt-6" disabled={loading}>
                            Cadastrar
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
                        <p className="text-sm text-muted-foreground">Já tem uma conta?</p>
                        <Button asChild variant="outline" className="w-full h-11 text-base gap-2">
                            <Link to="/login">
                                <LogIn className="size-4" />
                                Fazer login
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
