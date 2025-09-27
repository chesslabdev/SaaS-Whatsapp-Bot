"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { formatAuthError, isValidEmail, isValidPassword } from '@/lib/auth-utils'

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        const formData = new FormData(e.currentTarget);
        const firstname = formData.get("firstname") as string;
        const lastname = formData.get("lastname") as string;
        const email = formData.get("email") as string;
        const password = formData.get("pwd") as string;

        // Validações
        if (!isValidEmail(email)) {
            setError("Por favor, insira um email válido.");
            setLoading(false);
            return;
        }

        const passwordValidation = isValidPassword(password);
        if (!passwordValidation.isValid) {
            setError(passwordValidation.errors[0]);
            setLoading(false);
            return;
        }

        try {
            const result = await authClient.signUp.email({
                email,
                password,
                name: `${firstname} ${lastname}`.trim()
            });

            if (result.data) {
                setMessage("Conta criada com sucesso! Redirecionando...");
                // Como autoSignInAfterSignUp está habilitado, o usuário já estará logado
                setTimeout(() => {
                    router.push("/dashboard");
                }, 1500);
            } else {
                setError("Erro ao criar conta. Tente novamente.");
            }
        } catch (err: any) {
            setError(formatAuthError(err));
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="flex min-h-screen  px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                onSubmit={handleSubmit}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden  border shadow-md shadow-zinc-950/5 dark:bg-transparent">
                <div className=" -m-px  border p-8 pb-6">
                    <div className="text-center">
                        <Link
                            href="/"
                            aria-label="go home"
                            className="mx-auto block w-fit">
                            <LogoIcon />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Criar Conta no ChessLab</h1>
                        <p className="text-sm">Bem-vindo! Crie uma conta para começar</p>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
                            {message}
                        </div>
                    )}

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
                            />
                        </div>

                        <div className="space-y-0.5">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="pwd"
                                    className="text-sm">
                                    Senha
                                </Label>
                            </div>
                            <Input
                                type="password"
                                required
                                name="pwd"
                                id="pwd"
                                placeholder="Mínimo 8 caracteres"
                                className="input sz-md variant-mixed"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Mínimo 8 caracteres, com maiúscula, minúscula e número
                            </p>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Criando conta..." : "Criar Conta"}
                        </Button>
                    </div>

                    <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <hr className="border-dashed" />
                        <span className="text-muted-foreground text-xs">Or continue With</span>
                        <hr className="border-dashed" />
                    </div>

                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
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
        </section>
    )
}
