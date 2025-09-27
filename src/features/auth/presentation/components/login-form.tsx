"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { api } from '@/igniter.client'
import { toast } from 'sonner'

export default function LoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Usando o useMutation do Igniter.js para fazer login
    const loginMutation = api.auth.signIn.useMutation({
        onSuccess: (data) => {
            toast.success('Login realizado com sucesso!')
            // Redireciona para o dashboard ou página inicial
            router.push('/dashboard')
        },
        onError: (error) => {
            toast.error('Erro ao fazer login: ' + ('Verifique suas credenciais'))
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Chama a mutation com os dados do formulário
        loginMutation.mutate({
            body: { email, password },
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-muted h-fit w-full max-w-sm overflow-hidden border shadow-md shadow-zinc-950/5 dark:bg-transparent">
            <div className="-m-px border p-8 pb-6">
                <div className="text-center">
                    <Link
                        href="/"
                        aria-label="go home"
                        className="mx-auto block w-fit">
                        <LogoIcon />
                    </Link>
                    <h1 className="mb-1 mt-4 text-xl font-semibold">Entrar no ChessLab</h1>
                    <p className="text-sm text-muted-foreground">Bem-vindo de volta! Entre com sua conta</p>
                </div>

                <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="block text-sm">
                            Email
                        </Label>
                        <Input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loginMutation.isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="password"
                                className="text-sm">
                                Senha
                            </Label>
                            <Button
                                asChild
                                variant="link"
                                className="px-0 text-xs">
                                <Link href="/forgot-password">Esqueceu a senha?</Link>
                            </Button>
                        </div>
                        <Input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loginMutation.isLoading}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isLoading}
                    >
                        {loginMutation.isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </div>

                <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <hr className="border-dashed" />
                    <span className="text-muted-foreground text-xs">ou continue com</span>
                    <hr className="border-dashed" />
                </div>
            </div>

            <div className="p-3 border-t bg-muted/50">
                <p className="text-center text-sm">
                    N�o tem uma conta?
                    <Button
                        asChild
                        variant="link"
                        className="px-2">
                        <Link href="/register">Criar conta</Link>
                    </Button>
                </p>
            </div>
        </form>
    )
}