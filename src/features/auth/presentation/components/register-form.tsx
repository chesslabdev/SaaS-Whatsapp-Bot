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

export default function RegisterForm() {
    const router = useRouter()
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Usando o useMutation do Igniter.js para fazer registro
    const registerMutation = api.auth.signUp.useMutation({
        onSuccess: (data) => {
            toast.success('Conta criada com sucesso!')
            // Redireciona para a página de login ou dashboard
            router.push('/login')
        },
        onError: (error) => {
            toast.error('Erro ao criar conta: ' + ( 'Verifique os dados informados'))
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validação básica da senha
        if (password.length < 8) {
            toast.error('A senha deve ter pelo menos 8 caracteres')
            return
        }

        // Chama a mutation com os dados do formulário
        registerMutation.mutate({
            body: { email, password, name: `${firstname} ${lastname}`.trim() },
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
                    <h1 className="mb-1 mt-4 text-xl font-semibold">Criar Conta no ChessLab</h1>
                    <p className="text-sm text-muted-foreground">Bem-vindo! Crie uma conta para começar</p>
                </div>

                <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label
                                htmlFor="firstname"
                                className="block text-sm">
                                Nome
                            </Label>
                            <Input
                                type="text"
                                required
                                name="firstname"
                                id="firstname"
                                placeholder="Seu nome"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                disabled={registerMutation.isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="lastname"
                                className="block text-sm">
                                Sobrenome
                            </Label>
                            <Input
                                type="text"
                                required
                                name="lastname"
                                id="lastname"
                                placeholder="Seu sobrenome"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                disabled={registerMutation.isLoading}
                            />
                        </div>
                    </div>

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
                            disabled={registerMutation.isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="password"
                            className="text-sm">
                            Senha
                        </Label>
                        <Input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Mínimo 8 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={registerMutation.isLoading}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Mínimo 8 caracteres, com maiúscula, minúscula e número
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={registerMutation.isLoading}
                    >
                        {registerMutation.isLoading ? 'Criando conta...' : 'Criar Conta'}
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
                    Já tem uma conta?
                    <Button
                        asChild
                        variant="link"
                        className="px-2">
                        <Link href="/login">Entrar</Link>
                    </Button>
                </p>
            </div>
        </form>
    )
}