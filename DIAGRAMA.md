---
config:
  layout: elk
  theme: default
---
classDiagram
    direction TB
    
    %% Sistema Principal
    class SistemaMonitoramento {
        <<ApplicationRoot>>
        -betterAuth: BetterAuthService
        -onboardingService: OnboardingService
        +registrarOrganizacao(dados) Organization
        +iniciarOnboarding(organizationId)
        +processarMensagemGlobal(msg, organizationId)
        +getOrganizacaoAtiva(sessionToken)
    }
    
    %% Better-Auth Service com Plugins
    class BetterAuthService {
        <<Better-Auth Core>>
        -organizationPlugin: OrganizationPlugin
        -adminPlugin: AdminPlugin
        +autenticar(email, senha) Session
        +verificarToken(token) User
        +getActiveOrganization(session) Organization
    }
    
    class OrganizationPlugin {
        <<Better-Auth Plugin>>
        +createOrganization(nome, slug) Organization
        +setActiveOrganization(orgId, sessionId)
        +listOrganizations(userId) Organization[]
        +inviteMember(email, role, orgId)
        +addMember(userId, role, orgId)
        +updateMemberRole(memberId, newRole)
        +createTeam(nome, orgId) Team
        +addTeamMember(teamId, userId)
        +checkPermission(userId, resource, action, orgId)
    }
    
    class AdminPlugin {
        <<Better-Auth Plugin>>
        +createUser(dados, role) User
        +impersonateUser(userId) Session
        +banUser(userId, reason)
        +unbanUser(userId)
        +removeUser(userId)
        +revokeUserSessions(userId)
        +listAllUsers() User[]
    }
    
    %% Entidades Better-Auth
    class Organization {
        <<Better-Auth Entity>>
        +id: UUID
        +name: string
        +slug: string
        +logo: string
        +metadata: Json
        +createdAt: datetime
        -- Custom Fields --
        +plano: PlanType
        +onboardingCompleto: boolean
        +whatsappConectado: boolean
        +limiteUsuarios: int
        +limiteGrupos: int
        +configuracao: ConfigOrganization
    }
    
    class Member {
        <<Better-Auth Entity>>
        +id: UUID
        +userId: UUID
        +organizationId: UUID
        +role: string[]
        +createdAt: datetime
        -- Relations --
        +user: User
        +organization: Organization
    }
    
    class Team {
        <<Better-Auth Entity>>
        +id: UUID
        +name: string
        +organizationId: UUID
        +createdAt: datetime
        -- Custom Fields --
        +gruposAtribuidos: UUID[]
        +configuracaoEquipe: ConfigEquipe
    }
    
    class TeamMember {
        <<Better-Auth Entity>>
        +id: UUID
        +teamId: UUID
        +userId: UUID
        +createdAt: datetime
    }
    
    class User {
        <<Better-Auth Entity>>
        +id: UUID
        +email: string
        +name: string
        +emailVerified: boolean
        +banned: boolean
        +banReason: string
        +banExpires: datetime
        +createdAt: datetime
        +updatedAt: datetime
    }
    
    class Session {
        <<Better-Auth Entity>>
        +id: UUID
        +userId: UUID
        +token: string
        +expiresAt: datetime
        +ipAddress: string
        +userAgent: string
        +activeOrganizationId: UUID
        +impersonatedBy: UUID
        +createdAt: datetime
    }
    
    class Invitation {
        <<Better-Auth Entity>>
        +id: UUID
        +email: string
        +organizationId: UUID
        +inviterId: UUID
        +role: string[]
        +status: string
        +expiresAt: datetime
        +createdAt: datetime
    }
    
    %% Configurações
    class ConfigOrganization {
        +tempoAlertaPadrao: int
        +palavrasChaveGlobais: string[]
        +horarioMonitoramento: HorarioConfig
        +iaHabilitada: boolean
        +webhookUrl: string
    }
    
    class ConfigEquipe {
        +gatilhosCustomizados: Gatilho[]
        +prioridadePadrao: string
        +slaResposta: int
        +headUserId: UUID
    }
    
    %% Onboarding
    class OnboardingService {
        +organizationId: UUID
        +etapaAtual: int
        +etapas: EtapaOnboarding[]
        +dadosColetados: Json
        +avancarEtapa()
        +etapaConexaoWA() QRCode
        +etapaSelecaoGrupos(grupos)
        +etapaImportarHistorico(arquivos)
        +etapaConfigurarGatilhos(config)
        +etapaCriarEquipe(teamData, members)
        +finalizar()
    }
    
    %% WhatsApp com Baileys
    class ConectorWhatsApp {
        <<Baileys>>
        +organizationId: UUID
        +sessao: BaileysSession
        +status: StatusConexao
        +conectar() QRCode
        +desconectar()
        +listarGrupos() GrupoInfo[]
        +selecionarGrupos(ids)
        +obterHistoricoRecente(grupoId, limite) Mensagem[]
        +escutarMensagens(callback)
    }
    
    class GrupoWhatsApp {
        +id: UUID
        +idWhatsApp: string
        +organizationId: UUID
        +nome: string
        +ativo: boolean
        +teamId: UUID
        +historicoImportado: boolean
        +ultimaMensagemCliente: datetime
        +ultimaAnaliseIA: datetime
        +configuracao: ConfigGrupo
    }
    
    class ConfigGrupo {
        +gatilhosAtivos: Gatilho[]
        +tempoResposta: int
        +palavrasChaveEspecificas: string[]
        +usarIA: boolean
    }
    
    %% Importação de Histórico
    class ImportadorHistorico {
        +organizationId: UUID
        +processarArquivoTXT(arquivo, grupoId)
        +parsearWhatsAppExport(conteudo) Mensagem[]
        +detectarFormato(conteudo) FormatoExport
        +extrairMensagem(linha) MensagemParseada
        +salvarLote(mensagens)
        +deduplicar(mensagens)
    }
    
    class HistoricoImportado {
        +id: UUID
        +grupoId: UUID
        +nomeArquivo: string
        +totalMensagens: int
        +dataImportacao: datetime
        +status: StatusImportacao
    }
    
    %% Mensagens
    class Mensagem {
        +id: UUID
        +idWhatsApp: string
        +grupoId: UUID
        +organizationId: UUID
        +autor: string
        +conteudo: string
        +timestamp: datetime
        +isAdmin: boolean
        +fonteImportacao: string
        +analisadaIA: boolean
        +sentimento: float
        +categoria: string
    }
    
    %% Sistema de Alertas com IA
    class Alerta {
        +id: UUID
        +grupoId: UUID
        +organizationId: UUID
        +tipo: TipoAlerta
        +prioridade: Prioridade
        +gatilhoAcionado: string
        +mensagemTrigger: string
        +analiseIA: string
        +status: StatusAlerta
        +atribuidoPara: UUID
        +criadoEm: datetime
        +resolvidoEm: datetime
        +resolvidoPor: UUID
    }
    
    class MonitorInteligente {
        -gatilhos: Gatilho[]
        -moduloIA: ServicoIA
        -filaProcessamento: Queue
        +processarMensagem(msg, grupo)
        +analisarComIA(msg, contexto)
        +verificarGatilhos(msg, grupo)
        +criarAlerta(tipo, dados)
        +executarRotinaPeriodica()
    }
    
    %% Gatilhos
    class Gatilho {
        <<abstract>>
        +id: UUID
        +nome: string
        +tipo: TipoAlerta
        +ativo: boolean
        +verificar(msg, contexto) boolean
    }
    
    class GatilhoTempo {
        +minutosSemResposta: int
        +verificar(grupo) boolean
    }
    
    class GatilhoPalavras {
        +palavrasChave: string[]
        +verificar(mensagem) boolean
    }
    
    class GatilhoIA {
        +modeloIA: string
        +threshold: float
        +analisarComIA(msg, contexto) boolean
    }
    
    %% Inteligência Artificial
    class ServicoIA {
        -provider: string
        -apiKey: string
        +analisarSentimento(texto) float
        +categorizarMensagem(texto) string
        +detectarUrgencia(mensagens) string
        +sugerirResposta(contexto) string
        +resumirConversa(mensagens) string
        +extrairIntencao(texto) string
    }
    
    class ContextoIA {
        +grupoId: UUID
        +ultimasMensagens: Mensagem[]
        +historicoResumo: string
        +topicosFrequentes: string[]
        +sentimentoMedio: float
    }
    
    %% Roles e Permissões
    class RoleDefinition {
        <<Better-Auth Roles>>
        +owner: Permissions[]
        +admin: Permissions[]
        +head: Permissions[]
        +gestor: Permissions[]
    }
    
    class Permissions {
        <<enumeration>>
        MANAGE_ORGANIZATION
        MANAGE_TEAMS
        MANAGE_MEMBERS
        INVITE_MEMBERS
        VIEW_ALL_GROUPS
        MANAGE_ASSIGNED_GROUPS
        RESOLVE_ALERTS
        CONFIGURE_TRIGGERS
        IMPORT_HISTORY
        CONFIGURE_AI
        VIEW_METRICS
    }
    
    %% Dashboard
    class DashboardMVP {
        <<Next.js App Router>>
        +middleware: AuthMiddleware
        +/onboarding/*
        +/dashboard
        +/grupos
        +/alertas
        +/equipes
        +/configuracoes
        +/importar
        +/admin/*
    }
    
    class AuthMiddleware {
        +verificarSessao(req)
        +verificarOrganizacao(req)
        +verificarPermissao(permission)
        +redirecionarSeNecessario()
    }
    
    class APIRoutes {
        <<Next.js API>>
        +/api/auth/* [Better-Auth]
        +/api/organization/* [Better-Auth]
        +/api/admin/* [Better-Auth]
        +/api/onboarding/*
        +/api/whatsapp/*
        +/api/grupos/*
        +/api/alertas/*
        +/api/mensagens/*
        +/api/ia/*
        +/api/importar/*
    }
    
    %% Enums
    class PlanType {
        <<enumeration>>
        TRIAL
        STARTER
        PROFESSIONAL
        ENTERPRISE
    }
    
    class TipoAlerta {
        <<enumeration>>
        SEM_RESPOSTA
        PALAVRA_CHAVE
        SENTIMENTO_NEGATIVO
        URGENCIA_ALTA
    }
    
    class Prioridade {
        <<enumeration>>
        BAIXA
        MEDIA
        ALTA
        CRITICA
    }
    
    class StatusAlerta {
        <<enumeration>>
        ABERTO
        ATRIBUIDO
        RESOLVIDO
    }
    
    class StatusConexao {
        <<enumeration>>
        DESCONECTADO
        CONECTANDO
        CONECTADO
        ERRO
    }
    
    %% Relacionamentos principais
    SistemaMonitoramento "1" *-- "1" BetterAuthService : usa
    SistemaMonitoramento "1" *-- "1" OnboardingService : gerencia
    SistemaMonitoramento "1" *-- "*" ConectorWhatsApp : conexoes
    
    BetterAuthService "1" *-- "1" OrganizationPlugin : plugin
    BetterAuthService "1" *-- "1" AdminPlugin : plugin
    BetterAuthService "1" -- "*" User : gerencia
    BetterAuthService "1" -- "*" Session : gerencia
    
    OrganizationPlugin "1" -- "*" Organization : gerencia
    OrganizationPlugin "1" -- "*" Member : gerencia
    OrganizationPlugin "1" -- "*" Team : gerencia
    OrganizationPlugin "1" -- "*" Invitation : gerencia
    
    Organization "1" *-- "1" ConfigOrganization : config
    Organization "1" *-- "*" Member : membros
    Organization "1" *-- "*" Team : equipes
    Organization "1" *-- "*" GrupoWhatsApp : grupos
    Organization "1" -- "1" ConectorWhatsApp : conexao
    
    Member "*" -- "1" User : usuario
    Member "*" -- "1" Organization : organizacao
    
    Team "1" *-- "1" ConfigEquipe : config
    Team "1" *-- "*" TeamMember : membros
    Team "1" -- "*" GrupoWhatsApp : gerencia
    Team "*" -- "1" Organization : pertence
    
    TeamMember "*" -- "1" User : usuario
    TeamMember "*" -- "1" Team : equipe
    
    Session "*" -- "1" User : usuario
    Session "*" o-- "1" Organization : orgAtiva
    
    GrupoWhatsApp "1" *-- "1" ConfigGrupo : config
    GrupoWhatsApp "1" *-- "*" Mensagem : mensagens
    GrupoWhatsApp "1" *-- "*" Alerta : alertas
    GrupoWhatsApp "1" o-- "*" HistoricoImportado : importacoes
    GrupoWhatsApp "*" -- "1" Organization : pertence
    GrupoWhatsApp "*" o-- "1" Team : atribuido
    
    MonitorInteligente "1" *-- "*" Gatilho : executa
    MonitorInteligente "1" *-- "1" ServicoIA : usa
    MonitorInteligente "1" -- "*" ContextoIA : contextos
    
    Gatilho <|-- GatilhoTempo : extends
    Gatilho <|-- GatilhoPalavras : extends
    Gatilho <|-- GatilhoIA : extends
    
    ImportadorHistorico "1" -- "*" HistoricoImportado : processa
    
    Alerta "*" -- "1" GrupoWhatsApp : pertence
    Alerta "*" -- "0..1" User : atribuido/resolvido
    
    DashboardMVP "1" *-- "1" AuthMiddleware : protege
    DashboardMVP "1" -- "*" APIRoutes : consome
    APIRoutes "1" -- "1" SistemaMonitoramento : acessa
    
    ServicoIA "1" -- "*" ContextoIA : analisa
    
    RoleDefinition "1" -- "*" Permissions : define
    Member -- RoleDefinition : hasRole
    
    note for BetterAuthService "Gerencia autenticação, organizações e permissões"
    note for OrganizationPlugin "Multi-tenant nativo com isolamento automático"
    note for AdminPlugin "Gerenciamento global de usuários"
    note for OnboardingService "Processo guiado específico do domínio"
    note for Organization "Agência = Organization no Better-Auth"
    note for Team "Equipes dentro de organizações"
    note for Member "Usuários com roles específicos por organização"