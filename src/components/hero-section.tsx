import React from 'react'
import { Mail, SendHorizonal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { AnimatedList } from '@/components/ui/animated-list'
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern'
import { HeroHeader } from './header'
import { LogoCloud } from './logo-cloud'
import { cn } from '@/lib/utils'
import { ShinyButton } from './ui/shiny-button'

interface AlertItem {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

// Notificações do Guardião Digital
let guardianAlerts = [
  {
    name: "ALERTA MODERADO",
    description: "Cliente 'Empresa X' aguarda resposta há 4 horas. SLA em risco.",
    time: "há 2 min",
    icon: "🟡",
    color: "#FF8C00",
  },
  {
    name: "ALERTA CRÍTICO",
    description: "Cliente 'Global Corp' mencionou 'cancelar contrato'. Ação imediata!",
    time: "há 30s",
    icon: "🔴",
    color: "#FF3D71",
  },
  {
    name: "STATUS RESOLVIDO",
    description: "Problema resolvido por @joana.silva em 42 minutos.",
    time: "agora",
    icon: "✅",
    color: "#00C9A7",
  },
  {
    name: "CLIENTE EM RISCO",
    description: "Detectada insatisfação crescente. Equipe acionada.",
    time: "há 1 min",
    icon: "⚠️",
    color: "#FFB800",
  },
]

guardianAlerts = Array.from({ length: 8 }, () => guardianAlerts).flat()

const AlertNotification = ({ name, description, icon, color, time }: AlertItem) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

function GuardianAlertsDemo({
  className,
}: {
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative flex h-[600px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {guardianAlerts.map((item, idx) => (
          <AlertNotification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  )
}

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    return (
        <>
            <HeroHeader />

            <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
                <section className="relative">
                    {/* Interactive Grid Pattern Background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <InteractiveGridPattern
                            width={60}
                            height={60}
                            squares={[32, 20]}
                            className="opacity-40 dark:opacity-30"
                            squaresClassName="stroke-green-800/25 hover:stroke-emerald-600/60 dark:stroke-green-900/30 dark:hover:stroke-green-500/50 fill-transparent hover:fill-emerald-50/15 dark:hover:fill-green-800/25"
                        />
                    </div>
                    <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:pt-48">
                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            {/* Lado Esquerdo - Textos */}
                            <div className="text-left">
                                <div className='pb-8 flex justify-start'>
                                    <ShinyButton>Começar Agora</ShinyButton>
                                </div>
                                
                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="h1"
                                    className="text-balance text-4xl font-medium md:text-5xl lg:text-6xl">
                                    Silêncio não é ouro. É um cliente prestes a cancelar.
                                </TextEffect>
                                <TextEffect
                                    per="line"
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    delay={0.5}
                                    as="p"
                                    className="mt-6 max-w-xl text-pretty text-lg">
                                    Em meio a dezenas de chats e e-mails, sua equipe não pode estar em todos os lugares ao mesmo tempo. Mas o seu guardião, pode.
                                </TextEffect>

                                <div className="mt-8">
                                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                                        Apresentamos o sentinela digital que protege suas conversas mais valiosas. Ele lê cada interação, 24/7, para garantir que nenhuma oportunidade ou sinal de alerta se perca no caos do dia a dia.
                                    </p>
                                    
        
                                </div>
                            </div>

                            {/* Lado Direito - AnimatedList */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="max-w-md w-full">
                                    <GuardianAlertsDemo />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <LogoCloud />
            </main>
        </>
    )
}


