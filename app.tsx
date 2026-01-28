import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Layers,
  Network,
  Database,
  Bot,
  ArrowRight,
  Github,
  Cpu,
  BookOpen,
  Workflow,
  Check,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// AION Landing Page (single-file)
// - Minimal, product-ish
// - Tailwind + shadcn/ui + framer-motion

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const IconBubble = ({ icon: Icon }) => (
  <div className="h-10 w-10 rounded-2xl border bg-background/60 shadow-sm flex items-center justify-center">
    <Icon className="h-5 w-5" />
  </div>
);

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-16 md:py-20">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <FadeIn>
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? <p className="mt-2 text-muted-foreground max-w-3xl">{subtitle}</p> : null}
        </div>
      </FadeIn>
      {children}
    </div>
  </section>
);

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function AIONLandingPage() {
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const faq = useMemo(
    () => [
      {
        q: "AION é um framework ou um produto?",
        a: "AION é um framework open source e um padrão arquitetural. Você pode usá-lo como base para construir produtos internos (ou externos) e um ecossistema corporativo de IA.",
      },
      {
        q: "Isso substitui meu ERP/CRM?",
        a: "Não. AION se integra a sistemas existentes e cria uma camada de inteligência com governança, roteamento e unidades por domínio.",
      },
      {
        q: "Preciso treinar um modelo do zero?",
        a: "Quase nunca. O padrão recomendado é RAG + engenharia de contexto. Fine-tuning entra apenas quando necessário e com critérios.",
      },
      {
        q: "Quais componentes são open source?",
        a: "Toda a stack sugerida é open source: Spark/Airflow, Qdrant/Milvus, LangChain/LangGraph, FastAPI, OpenTelemetry, etc.",
      },
    ],
    []
  );

  const filteredFaq = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faq;
    return faq.filter((i) => (i.q + " " + i.a).toLowerCase().includes(q));
  }, [faq, query]);

  const layers = [
    {
      title: "Data Core",
      desc: "Dados como infraestrutura: ingestão, processamento, qualidade e governança.",
      icon: Database,
      bullets: ["Pipelines", "Data Lake", "Spark/SQL", "Catálogo & ACL"],
    },
    {
      title: "Domain AI Units",
      desc: "IAs especializadas por área (Customer, Finance, Legal...) com políticas próprias.",
      icon: Layers,
      bullets: ["RAG por domínio", "Permissões", "Fontes", "Testes"],
    },
    {
      title: "Intelligence Router",
      desc: "Orquestração por grafo: roteia, compõe, aplica políticas e chama ferramentas.",
      icon: Network,
      bullets: ["LangGraph", "Tool calling", "Roteamento", "Composição"],
    },
    {
      title: "Executive AI",
      desc: "Síntese estratégica para liderança: visão macro e decisão com rastreabilidade.",
      icon: Cpu,
      bullets: ["KPIs", "Cenários", "Riscos", "Briefings"],
    },
    {
      title: "Trust & Governance",
      desc: "Auditoria, observabilidade e compliance: IA confiável em produção.",
      icon: ShieldCheck,
      bullets: ["Logs", "Métricas", "Avaliação", "Conformidade"],
    },
  ];

  const stack = {
    data: [
      { name: "Apache Spark", why: "Processamento em escala" },
      { name: "Apache Airflow", why: "Orquestração de pipelines" },
      { name: "Parquet/Delta", why: "Formato eficiente + versionamento" },
    ],
    rag: [
      { name: "LangChain", why: "Componentes LLM/RAG" },
      { name: "LangGraph", why: "Orquestração por grafo" },
      { name: "Qdrant/Milvus", why: "Busca vetorial" },
    ],
    prod: [
      { name: "FastAPI", why: "API de produção" },
      { name: "Docker", why: "Empacotamento" },
      { name: "OpenTelemetry", why: "Observabilidade" },
    ],
  };

  const roadmap = [
    {
      title: "AION Core",
      desc: "Router + padrões de Domain Units + RAG base.",
      items: ["Blueprint de Unit", "CLI init", "Policies/ACL", "Citations"],
    },
    {
      title: "AION Data",
      desc: "Pipelines de dados (batch/stream) e catálogo de conhecimento.",
      items: ["Airflow DAGs", "Spark jobs", "Data Lake", "Quality checks"],
    },
    {
      title: "AION Exec",
      desc: "Camada estratégica para consolidação e decisão.",
      items: ["Briefings", "Alertas", "Cenários", "Sinais multi-unit"],
    },
  ];

  const onNewsletter = (e) => {
    e.preventDefault();
    // MVP: apenas UI (sem backend)
    // Em produção: enviar para API / Formspree / Mailchimp / n8n
    alert("Cadastro simulado — conecte seu backend para capturar emails.");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl border bg-background shadow-sm flex items-center justify-center">
              <Workflow className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold leading-none">AION</div>
              <div className="text-xs text-muted-foreground leading-none">AI-Oriented Organization Network</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="#framework">Framework</a>
            <a className="hover:text-foreground" href="#stack">Stack</a>
            <a className="hover:text-foreground" href="#roadmap">Roadmap</a>
            <a className="hover:text-foreground" href="#faq">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-2xl" onClick={() => window.open("https://github.com/", "_blank")}
              >
              <Github className="h-4 w-4 mr-2" /> GitHub
            </Button>
            <Button className="rounded-2xl" onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
              >
              Começar <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="rounded-xl">Open Source</Badge>
                <Badge variant="secondary" className="rounded-xl">AI-First Enterprise</Badge>
                <Badge variant="secondary" className="rounded-xl">Big Data + RAG + Agents</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                Arquitetura corporativa de IA — sem chatbots soltos no vazio.
              </h1>
              <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl">
                AION é um framework para desenhar ecossistemas de IA por domínio (Customer, Finance, Legal, Exec),
                sustentados por Big Data, RAG e governança. IA como infraestrutura organizacional.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button className="rounded-2xl" size="lg" onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
                  >
                  Ver Quickstart <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="outline" className="rounded-2xl" size="lg" onClick={() => document.getElementById("framework")?.scrollIntoView({ behavior: "smooth" })}
                  >
                  Entender o framework
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 max-w-xl">
                {["Unidades por domínio", "Router por grafo", "RAG com fontes", "Governança e observabilidade"].map((t) => (
                  <div key={t} className="flex items-start gap-2 rounded-2xl border p-3 bg-background/60">
                    <Check className="h-4 w-4 mt-0.5" />
                    <div className="text-sm">{t}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="rounded-3xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" /> Como a empresa “pensa” com AION
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="rounded-2xl border p-4">
                      <div className="text-sm font-medium">Pergunta do cliente</div>
                      <div className="text-sm text-muted-foreground">→ Router decide: Customer AI</div>
                    </div>
                    <div className="rounded-2xl border p-4">
                      <div className="text-sm font-medium">Dúvida de cobrança</div>
                      <div className="text-sm text-muted-foreground">→ Router decide: Finance AI</div>
                    </div>
                    <div className="rounded-2xl border p-4">
                      <div className="text-sm font-medium">Risco contratual</div>
                      <div className="text-sm text-muted-foreground">→ Router decide: Legal AI</div>
                    </div>
                    <div className="rounded-2xl border p-4">
                      <div className="text-sm font-medium">Decisão executiva</div>
                      <div className="text-sm text-muted-foreground">→ Executive AI sintetiza sinais das Units</div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    AION: dados como base, unidades como especialização, roteador como sistema nervoso, governança como imunidade.
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </header>

      {/* Framework */}
      <Section
        id="framework"
        title="O framework AION"
        subtitle="Cinco camadas para transformar IA em arquitetura corporativa — não em feature isolada."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {layers.map((l, idx) => (
            <FadeIn key={l.title} delay={idx * 0.04}>
              <Card className="rounded-3xl h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <IconBubble icon={l.icon} />
                    <div>
                      <CardTitle className="text-lg">{l.title}</CardTitle>
                      <div className="text-sm text-muted-foreground">{l.desc}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {l.bullets.map((b) => (
                      <Badge key={b} variant="secondary" className="rounded-xl">{b}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.12}>
          <div className="mt-8 rounded-3xl border p-5 md:p-6 bg-background/60">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-sm font-medium">Princípio central</div>
                <div className="text-muted-foreground">
                  A IA que atende cliente não é a mesma que suporta finanças, jurídico ou a tomada de decisão do CEO.
                  AION organiza especialização + integração + governança.
                </div>
              </div>
              <Button className="rounded-2xl" onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
                >
                Implementar o MVP <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Stack */}
      <Section
        id="stack"
        title="Stack open source recomendada"
        subtitle="Baterias incluídas, peças substituíveis. O objetivo é produzir sistemas, não dependência de vendor."
      >
        <FadeIn>
          <Tabs defaultValue="rag" className="w-full">
            <TabsList className="rounded-2xl">
              <TabsTrigger value="data" className="rounded-2xl">Data</TabsTrigger>
              <TabsTrigger value="rag" className="rounded-2xl">RAG & Orquestração</TabsTrigger>
              <TabsTrigger value="prod" className="rounded-2xl">Produção</TabsTrigger>
            </TabsList>
            {Object.entries(stack).map(([key, items]) => (
              <TabsContent key={key} value={key} className="mt-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {items.map((it) => (
                    <Card key={it.name} className="rounded-3xl">
                      <CardHeader>
                        <CardTitle className="text-base">{it.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">{it.why}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </FadeIn>
      </Section>

      {/* Roadmap */}
      <Section
        id="roadmap"
        title="Roadmap"
        subtitle="Um caminho simples: Core → Data → Exec. Primeiro provar valor, depois escalar."
      >
        <div className="grid md:grid-cols-3 gap-4">
          {roadmap.map((r, idx) => (
            <FadeIn key={r.title} delay={idx * 0.05}>
              <Card className="rounded-3xl h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{r.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">{r.desc}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {r.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section
        id="cta"
        title="Quickstart"
        subtitle="Quer colocar o AION rodando? Comece pequeno: Router + 2 Units + Vector DB + API."
      >
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <FadeIn>
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg">MVP em 7 dias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {["Subir Qdrant/Milvus (Docker)", "Ingestão de docs (.txt/.pdf)", "RAG com citações", "Router (LangGraph)", "2 Units: Customer + Finance", "API FastAPI + logs"].map(
                  (t) => (
                    <div key={t} className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  )
                )}
                <div className="pt-2">
                  <Button className="rounded-2xl" onClick={() => window.open("https://github.com/", "_blank")}
                    >
                    Abrir repositório <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.05}>
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg">Atualizações & comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onNewsletter} className="flex flex-col gap-3">
                  <label className="text-sm text-muted-foreground">
                    Entre para a lista (ex.: roadmap, releases, templates e blueprint de Units).
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="rounded-2xl"
                      type="email"
                      required
                    />
                    <Button type="submit" className="rounded-2xl">Entrar</Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Observação: este formulário está em modo demo. Conecte seu backend (n8n, FastAPI, etc.).
                  </div>
                </form>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="FAQ" subtitle="Perguntas comuns quando alguém tenta levar IA para o mundo real.">
        <FadeIn>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-full max-w-xl">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar no FAQ..."
                className="pl-9 rounded-2xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredFaq.map((i) => (
              <Card key={i.q} className="rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-base">{i.q}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{i.a}</CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      </Section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AION — AI-Oriented Organization Network. Open source.
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl" onClick={() => document.getElementById("framework")?.scrollIntoView({ behavior: "smooth" })}
              >
              Framework
            </Button>
            <Button variant="outline" className="rounded-2xl" onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
              >
              Quickstart
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
