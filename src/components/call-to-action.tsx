import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CallToAction() {
    return (
        <section className="py-5">
            <div className="mx-auto max-w-5xl  border px-6 py-12 md:py-10 lg:py-32">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Pare de apagar incêndios</h2>
                    <p className="mt-4">Coloque um guardião em cada conversa. Proteja seus clientes antes que seja tarde demais.</p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg">
                            <Link href="/">
                                <span>Agendar Demonstração</span>
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <Link href="/">
                                <span>Ver Como Funciona</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
