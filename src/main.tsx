import React, { useEffect, useState }
    from 'react'; import { createRoot }
    from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Clock, ExternalLink, Heart, Mail, MapPin, Menu, Phone, Route as RouteIcon, Users, X } from 'lucide-react';
import { InstagramIcon } from './components/InstagramIcon';
import { CONTACTS, EVENT, FAQ, GALLERY, INSTITUTIONS, LINKS } from './data'; import './styles.css';


const nav = [['/', 'Início'], ['/a-corrida', 'Corrida'], ['/adra', 'Conheça a ADRA'], ['/instituicoes', 'Instituições'], ['/galeria', 'Galeria'], ['/contato', 'Contato']];
function Register({ label = 'Inscreva-se', className = 'button' }: { label?: string, className?: string }) { return <a className={className} href={LINKS.registration} target="_blank" rel="noreferrer">{label}<ArrowRight size={18} /></a> }
function Header() { const [open, setOpen] = useState(false); return <header className="header"><div className="container header-in"><Link className="brand" to="/" aria-label="Together Run, início"><span>TOGETHER</span><strong>RUN</strong></Link><button className="menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav className={open ? 'nav open' : 'nav'} aria-label="Principal">{nav.map(([to, l]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{l}</NavLink>)}<Register /></nav></div></header> }
function Footer() { return <footer><div className="container foot"><div><div className="brand light"><span>TOGETHER</span><strong>RUN</strong></div><p>Uma corrida solidária realizada pela ADRA.<br />Fortaleza corre por uma causa maior.</p></div><div><b>Navegue</b>{nav.slice(1).map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}</div><div><b>Fale com a organização</b><a href="mailto:regional.ce@adra.org.br"><Mail />regional.ce@adra.org.br</a><a href="https://wa.me/5585999920383"><Phone />(85) 99992-0383</a><a href={LINKS.instagram}><InstagramIcon />@adra.runners</a></div></div><div className="container legal">© 2026 Together Run · ADRA Ceará · CNPJ {EVENT.cnpj}</div></footer> }
function Layout() { const l = useLocation(); useEffect(() => { window.scrollTo(0, 0); const t: Record<string, string> = { '/': 'Together Run 2026', '/a-corrida': 'A Corrida | Together Run', '/adra': 'Conheça a ADRA | Together Run', '/instituicoes': 'Instituições beneficiadas | Together Run', '/galeria': 'Galeria | Together Run', '/contato': 'Contato | Together Run' }; document.title = t[l.pathname] || 'Together Run 2026' }, [l]); return <><Header /><main><Routes><Route path="/" element={<Home />} /><Route path="/a-corrida" element={<Race />} /><Route path="/adra" element={<Adra />} /><Route path="/instituicoes" element={<Institutions />} /><Route path="/galeria" element={<Gallery />} /><Route path="/contato" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></main><a className="mobile-cta" href={LINKS.registration}>Inscreva-se <ArrowRight size={17} /></a><Footer /></> }
function Hero() { const slides = [{ image: '/images/together4.jpg', eyebrow: '22 NOV 2026 · FORTALEZA/CE', title: 'Corra por você. Transforme por todos.', text: 'Esporte, solidariedade e milhares de pessoas em movimento na Beira-Mar.' }, { image: '/assets/campaign.svg', eyebrow: 'UMA CAUSA MAIOR', title: 'Cada passo também alimenta esperança.', text: 'Entregue seus alimentos na retirada do kit e faça parte dessa rede.' }, { image: '/images/image_together_run.jpeg', eyebrow: 'JUNTOS NA BEIRA-MAR', title: 'Energia coletiva que atravessa a cidade.', text: '3 km e 5 km para celebrar saúde, encontro e impacto social.' }]; const [i, setI] = useState(0); const [pause, setPause] = useState(false); useEffect(() => { if (pause) return; const id = setInterval(() => setI(v => (v + 1) % slides.length), 6000); return () => clearInterval(id) }, [pause, slides.length]); let start = 0; return <section className="hero" tabIndex={0} aria-roledescription="carrossel" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)} onFocus={() => setPause(true)} onBlur={() => setPause(false)} onKeyDown={e => { if (e.key === 'ArrowRight') setI((i + 1) % 3); if (e.key === 'ArrowLeft') setI((i + 2) % 3) }} onTouchStart={e => start = e.touches[0].clientX} onTouchEnd={e => { const d = e.changedTouches[0].clientX - start; if (Math.abs(d) > 50) setI((i + (d < 0 ? 1 : 2)) % 3) }}>{slides.map((s, n) => <div className={'slide ' + (n === i ? 'active' : '')} key={s.image} aria-hidden={n !== i}><img src={s.image} alt="" fetchPriority={n === 0 ? 'high' : 'auto'} /><div className="hero-shade" /><div className="container hero-copy"><span className="eyebrow">{s.eyebrow}</span><div className="hero-logo">TOGETHER <b>RUN</b></div><h1>{s.title}</h1><p>{s.text}</p><div className="actions"><Register label="Quero me inscrever" /><Link className="button ghost" to="/a-corrida">Conheça a corrida</Link></div></div></div>)}<button className="arrow prev" onClick={() => setI((i + 2) % 3)} aria-label="Slide anterior"><ChevronLeft /></button><button className="arrow next" onClick={() => setI((i + 1) % 3)} aria-label="Próximo slide"><ChevronRight /></button><div className="dots">{slides.map((_, n) => <button key={n} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Ir para slide ${n + 1}`} />)}</div></section> }
function SectionTitle({ kicker, title, text }: { kicker: string, title: string, text?: string }) { return <div className="section-title"><span>{kicker}</span><h2>{title}</h2>{text && <p>{text}</p>}</div> }
function Facts() { return <div className="facts"><div><CalendarDays /><small>Data</small><b>22 nov. 2026</b></div><div><Clock /><small>Concentração</small><b>5h15</b></div><div><MapPin /><small>Local</small><b>Beira-Mar</b></div><div><RouteIcon /><small>Percursos</small><b>3 km e 5 km</b></div></div> }
function CTA() { return <section className="cta"><div className="container"><span>22 DE NOVEMBRO · FORTALEZA</span><h2>Seu próximo passo pode transformar muitas histórias.</h2><Register label="Garantir minha inscrição" className="button white" /></div></section> }
function FAQBlock() { return <div className="faq">{FAQ.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div> }
function Home() { return <><Hero /><section className="quick"><div className="container"><Facts /></div></section><section className="section intro"><div className="container split"><div><SectionTitle kicker="TOGETHER RUN 2026" title="Uma cidade inteira em movimento por solidariedade" /><p className="lead">A ADRA reúne esporte e ação humanitária em uma manhã feita para quem acredita que bem-estar também se constrói coletivamente.</p><p>A corrida promove saúde e qualidade de vida e amplia a visibilidade das ações sociais realizadas pela instituição.</p><Link className="text-link" to="/a-corrida">Conheça todos os detalhes <ArrowRight /></Link></div><div className="impact"><Users /><strong>5 mil+</strong><span>participantes esperados em Fortaleza</span><small>Expectativa informada pela organização</small></div></div></section><section className="section dark"><div className="container split reverse"><div className="photo-stack"><img src="/images/image_together_run_2.jpeg" alt="Corredores com a camisa Together Run na Beira-Mar" loading="lazy" /></div><div><SectionTitle kicker="CORRIDA SOLIDÁRIA" title="Alimento que chega. Cuidado que continua." /><p className="lead">Na retirada dos kits, cada atleta é convidado a levar seus quilos de alimentos.</p><ol className="steps"><li><b>Você leva</b><span>A entrega acontece junto à retirada do kit.</span></li><li><b>A organização reúne</b><span>Detalhes de triagem serão divulgados pela ADRA.</span></li><li><b>A rede acompanha</b><span>A destinação será compartilhada nas redes após a corrida.</span></li></ol><Link className="button outline" to="/instituicoes">Ver instituições</Link></div></div></section><section className="section"><div className="container"><SectionTitle kicker="QUEM FAZ ACONTECER" title="ADRA: presença humanitária em mais de 120 países" text="A agência atua junto às populações mais vulneráveis para melhorar suas condições de vida — e coordena a dimensão social desta corrida." /><div className="adra-strip"><img src="/assets/adra.svg" alt="Símbolo da ADRA" loading="lazy" /><div><b>Desenvolvimento · Resposta humanitária · Mobilização</b><p>A Together Run transforma a energia do esporte em um ponto de encontro com a missão da ADRA.</p></div><Link className="text-link" to="/adra">Conheça a ADRA <ArrowRight /></Link></div></div></section><section className="section soft"><div className="container"><SectionTitle kicker="DESTINO DA SOLIDARIEDADE" title="Instituições beneficiadas" /><div className="institution-grid">{INSTITUTIONS.map(x => <InstitutionCard key={x.name} x={x} />)}</div></div></section><section className="section"><div className="container"><div className="title-row"><SectionTitle kicker="REGISTROS" title="Uma energia que já começou" /><Link className="text-link" to="/galeria">Abrir galeria <ArrowRight /></Link></div><div className="preview-gallery">{GALLERY.slice(0, 3).map((x, i) => <img key={x.src} className={`g${i}`} src={x.src} alt={x.alt} loading="lazy" />)}</div></div></section><CTA /></> }
function PageHero({ kicker, title, text }: { kicker: string, title: string, text: string }) { return <section className="page-hero"><div className="container"><span>{kicker}</span><h1>{title}</h1><p>{text}</p></div></section> }
function Race() {
    return (
        <>
            <PageHero
                kicker="A CORRIDA"
                title="Movimento com propósito"
                text="Uma manhã para correr, caminhar, encontrar pessoas e ampliar o alcance da solidariedade."
            />

            <section className="quick">
                <div className="container">
                    <Facts />
                </div>
            </section>

            <section className="section">
                <div className="container split">
                    <div>
                        <SectionTitle
                            kicker="CONCEITO"
                            title="Saúde que mobiliza. Solidariedade que permanece."
                        />

                        <p className="lead">
                            Organizada pela ADRA, a Together Run nasce do Evento Together para promover saúde e qualidade de vida enquanto aproxima a sociedade das ações
                            humanitárias da instituição.
                        </p>

                        <p>
                            Na Beira-Mar de Fortaleza, cada pessoa participa do seu jeito:
                            percorrendo 3 km ou 5 km, torcendo, apoiando ou contribuindo com
                            alimentos.
                        </p>
                    </div>

                    <img
                        className="round-image"
                        src="/images/together2.jpg"
                        alt="Campanha oficial Together Run"
                    />
                </div>
            </section>

            <section className="section soft">
                <div className="container">
                    <SectionTitle kicker="PROGRAMAÇÃO" title="O ritmo da manhã" />

                    <div className="timeline">
                        {EVENT.schedule.map(([time, description]) => (
                            <div key={time}>
                                <b>{time}</b>
                                <span>{description}</span>
                            </div>
                        ))}
                    </div>

                    <p className="note">
                        Programação sujeita a atualizações oficiais da organização.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container cols">
                    <div>
                        <h2>Participação e kit</h2>

                        <p>
                            Os materiais divulgam 3 km de caminhada e corrida e 5 km de
                            corrida. Também apresentam camisa oficial, número de peito, chip,
                            hidratação e medalha.
                        </p>

                        <p className="pending">
                            <b>Informações pendentes:</b> categorias detalhadas, regras por
                            idade, local e horários de retirada dos kits, quantidade de
                            alimento, regulamento e critérios de premiação.
                        </p>
                    </div>

                    <div>
                        <h2>Doação de alimentos</h2>

                        <p>
                            Leve seus alimentos no ato da retirada do kit. As regras
                            definitivas de itens aceitos, quantidades e triagem serão
                            publicadas pelos canais oficiais.
                        </p>

                        <Register />
                    </div>
                </div>
            </section>

            <section className="section soft">
                <div className="container narrow">
                    <SectionTitle
                        kicker="DÚVIDAS FREQUENTES"
                        title="Antes de alinhar na largada"
                    />

                    <FAQBlock />
                </div>
            </section>

            <CTA />
        </>
    );
}
function Adra() { return <><PageHero kicker="CONHEÇA A ADRA" title="Humanidade em ação" text="Uma agência humanitária internacional presente em mais de 120 países, ao lado de quem mais precisa." /><section className="section"><div className="container split"><div><SectionTitle kicker="QUEM SOMOS" title="Desenvolvimento que respeita pessoas e contextos" /><p className="lead">A Agência Adventista de Desenvolvimento e Recursos Assistenciais trabalha com as camadas mais vulneráveis da sociedade para melhorar suas condições de vida.</p><p>Na Together Run, a ADRA é organizadora e realizadora, conectando a experiência esportiva à divulgação e ao fortalecimento de suas ações sociais.</p><a className="text-link" href={LINKS.adra} target="_blank" rel="noreferrer">Visite o site oficial <ExternalLink /></a></div><div className="adra-card"><img src="/assets/adra.svg" alt="Logotipo ADRA" /><dl><div><dt>Alcance</dt><dd>Mais de 120 países</dd></div><div><dt>Atuação</dt><dd>Humanitária e de desenvolvimento</dd></div><div><dt>Regional</dt><dd>ADRA Ceará</dd></div></dl></div></div></section><section className="section dark"><div className="container"><SectionTitle kicker="NA TOGETHER RUN" title="Da largada à entrega, uma rede de cuidado" /><div className="three"><div><Heart /><h3>Mobilizar</h3><p>Convidar atletas, famílias, voluntários e parceiros a agir por uma causa comum.</p></div><div><Users /><h3>Coordenar</h3><p>Conduzir a arrecadação em parceria com as instituições beneficiárias.</p></div><div><ArrowRight /><h3>Prestar contas</h3><p>Compartilhar o acompanhamento da arrecadação e destinação nas redes sociais.</p></div></div></div></section><CTA /></> }
function InstitutionCard({ x }: { x: (typeof INSTITUTIONS)[number] }) { return <article className="institution"><div className="logo-box"><img src={x.image} alt={`Logotipo ${x.name}`} loading="lazy" /></div><div><span>{x.type}</span><h3>{x.name}</h3><h4>{x.fullName}</h4><p><MapPin size={17} />{x.location}</p><p>{x.audience}</p><p>{x.description}</p><p><b>Contribuição:</b> {x.contribution}</p>{x.link && <a className="text-link" href={x.link} target="_blank" rel="noreferrer">Conhecer instituição <ExternalLink /></a>}</div></article> }
function Institutions() { return <><PageHero kicker="INSTITUIÇÕES BENEFICIADAS" title="A solidariedade tem destino" text="Conheça as organizações indicadas para receber os alimentos arrecadados pela Together Run." /><section className="section"><div className="container institution-list">{INSTITUTIONS.map(x => <InstitutionCard key={x.name} x={x} />)}</div></section><section className="section soft"><div className="container"><SectionTitle kicker="TRANSPARÊNCIA" title="O caminho dos alimentos" /><div className="flow">{[['01', 'Arrecadação', 'Cada atleta leva seus alimentos na entrega dos kits.'], ['02', 'Triagem', 'Procedimento e critérios serão confirmados pela organização.'], ['03', 'Distribuição', 'A arrecadação será destinada após a corrida.'], ['04', 'Beneficiárias', 'ACOLD e Associação Beija-Flor são as instituições indicadas.'], ['05', 'Acompanhamento', 'A destinação poderá ser acompanhada nas redes sociais.']].map(x => <div key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div><p className="note">Pontos ainda não confirmados estão identificados para atualização assim que a ADRA publicar o protocolo final.</p></div></section><CTA /></> }
function Gallery() { const [filter, setFilter] = useState('Todos'); const [open, setOpen] = useState<number | null>(null); const imgs = GALLERY.filter(x => filter === 'Todos' || x.category === filter); useEffect(() => { const k = (e: KeyboardEvent) => { if (open === null) return; if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowRight') setOpen((open + 1) % imgs.length); if (e.key === 'ArrowLeft') setOpen((open - 1 + imgs.length) % imgs.length) }; addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [open, imgs.length]); return <><PageHero kicker="GALERIA" title="A corrida começa antes da largada" text="Movimento, encontros e energia coletiva: registros que ajudam a contar esta história." /><section className="section"><div className="container"><div className="filters">{['Todos', 'Campanha', 'Corrida'].map(f => <button className={f === filter ? 'active' : ''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div><div className="gallery-grid">{imgs.map((x, i) => <button key={x.src} onClick={() => setOpen(i)}><img src={x.src} alt={x.alt} loading="lazy" /><span>{x.category}</span></button>)}</div><div className="training"><div><b>Treinões ADRA Runners</b><p>Veja também as páginas oficiais dos treinões na Fortal Pass.</p></div><a href={LINKS.training1} target="_blank">Treinão 1 <ExternalLink /></a><a href={LINKS.training2} target="_blank">Treinão 2 <ExternalLink /></a></div></div></section>{open !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Visualização da imagem"><button className="close" onClick={() => setOpen(null)} aria-label="Fechar"><X /></button><button onClick={() => setOpen((open - 1 + imgs.length) % imgs.length)} aria-label="Anterior"><ChevronLeft /></button><figure><img src={imgs[open].src} alt={imgs[open].alt} /><figcaption>{imgs[open].alt}</figcaption></figure><button onClick={() => setOpen((open + 1) % imgs.length)} aria-label="Próxima"><ChevronRight /></button></div>}</> }
function Contact() {
    return <>
        <PageHero
            kicker="CONTATO" title="Vamos conversar?"
            text="Escolha o canal mais adequado. A equipe da ADRA Ceará está pronta para orientar sua participação."
        />
        <section className="section">
            <div className="container contact-grid">
                <div>
                    <SectionTitle kicker="CANAIS OFICIAIS" title="Fale com a organização" />
                    <div className="contact-list">
                        {CONTACTS.map(c => <a href={c.href} key={c.value} target={c.href.startsWith('http') ? '_blank' : undefined}>
                            <span>{c.href.startsWith('mailto') ? <Mail /> : <Phone />}
                            </span>
                            <div>
                                <small>{c.label}</small><b>
                                    {c.value}</b>
                            </div>
                            <ArrowRight />
                        </a>)}
                    </div>
                </div>
                <aside><h2>Como podemos ajudar?</h2>
                    {[['Atletas', 'Inscrição, programação, kits e participação.'], ['Voluntários', 'Interesse em colaborar com a mobilização.'], ['Patrocinadores', 'Parcerias e apoio ao evento.'], ['Instituições', 'Informações sobre a ação e futuras articulações.']].map(x => <div key={x[0]}><b>{x[0]}</b>
                        <p>{x[1]}</p></div>)}
                    <Register label="Fazer minha inscrição" />
                </aside>
            </div>
        </section>
        <section className="section soft">
            <div className="container narrow">
                <SectionTitle kicker="PERGUNTAS FREQUENTES" title="Respostas rápidas" />
                <FAQBlock />
            </div>
        </section></>
}
function NotFound() { return <section className="notfound"><h1>404</h1><p>Esta página saiu do percurso.</p><Link className="button" to="/">Voltar ao início</Link></section> }; createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><Layout /></BrowserRouter></React.StrictMode>);
