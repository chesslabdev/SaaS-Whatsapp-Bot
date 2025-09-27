import LoginForm from './components/login-form'

export default function LoginPresentation() {
    return (
        <section className="flex min-h-screen items-center justify-center px-4 py-16 md:py-32">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </section>
    )
}