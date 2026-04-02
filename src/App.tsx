import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Play, 
  Film, 
  Instagram, 
  Wand2, 
  Type, 
  Star, 
  Mail, 
  MapPin, 
  MessageCircle,
  Youtube,
} from 'lucide-react';

// --- Components ---

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[0.72rem] text-gold uppercase tracking-[0.2em] mb-2.5">
    // {children}
  </p>
);

const SectionTitle = ({ children, highlight }: { children: React.ReactNode, highlight?: string }) => (
  <h2 className="font-display text-5xl md:text-7xl leading-none mb-4">
    {children} {highlight && <span className="text-gold">{highlight}</span>}
  </h2>
);

const Divider = () => <div className="w-12 h-[3px] bg-gold rounded-sm my-5 mb-12" />;

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

const Reveal = ({ children, delay = 0 }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'À propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Avis', href: '#testimonials' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-8 py-5 transition-all duration-350 border-b border-border-muted ${scrolled ? 'bg-bg-dark/85 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.6)]' : 'bg-bg-dark/85 backdrop-blur-xl'}`}>
        <a href="#hero" className="font-display text-2xl tracking-wider text-gold">JP.</a>
        
        <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-[0.82rem] font-medium tracking-widest uppercase text-text-muted hover:text-gold transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          <li>
            <a 
              href="https://wa.me/2290159173277" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gold text-black px-4.5 py-2 rounded-md font-semibold text-[0.82rem] tracking-widest uppercase hover:bg-gold-light transition-colors flex items-center gap-2"
            >
              <WhatsAppIcon size={16} /> Contact
            </a>
          </li>
        </ul>

        <button className="md:hidden text-text-light" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[73px] z-[99] bg-bg-dark/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-display tracking-widest uppercase text-text-muted hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://wa.me/2290159173277" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gold text-black px-8 py-3 rounded-md font-semibold text-lg tracking-widest uppercase flex items-center gap-2"
            >
              <WhatsAppIcon size={20} /> Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center px-6 md:px-8 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(245,166,35,0.07)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(245,166,35,0.04)_0%,transparent_60%)]" />
        <div className="absolute inset-0 hero-grid opacity-30" />
        
        <div className="relative z-10 max-w-[1100px] mx-auto w-full">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-gold/12 border border-gold/30 px-3.5 py-1.5 rounded-full text-[0.75rem] font-mono text-gold mb-7">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
              Disponible pour projets — Cotonou, Bénin
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tight mb-5">
              Jean<br /><span className="text-gold">Paul</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-[clamp(1rem,2.5vw,1.3rem)] text-text-muted font-light mb-10 max-w-[540px]">
              <strong className="text-text-light font-medium">Monteur Vidéo & Motion Designer</strong> — Je transforme vos rushes en contenus qui captivent, convertissent et restent en mémoire.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://wa.me/2290159173277?text=Bonjour%20Jean%20Paul%2C%20j'aimerais%20discuter%20d'un%20projet%20vid%C3%A9o." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25d366] text-white font-bold text-[0.9rem] px-7 py-3.5 rounded-lg shadow-[0_4px_24px_rgba(37,211,102,0.25)] hover:bg-[#1ebe5d] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(37,211,102,0.35)] transition-all duration-350"
              >
                <WhatsAppIcon size={20} /> Démarrer un projet
              </a>
              <a href="#portfolio" className="inline-flex items-center gap-2.5 border border-border-muted text-text-light font-medium text-[0.9rem] px-7 py-3.5 rounded-lg hover:border-gold hover:text-gold transition-all duration-350">
                <Play size={18} /> Voir le portfolio
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex gap-12 mt-16 pt-8 border-t border-border-muted">
              {[
                { num: '120+', label: 'Projets livrés' },
                { num: '5 ans', label: "D'expérience" },
                { num: '40+', label: 'Clients satisfaits' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-4xl text-gold leading-none">{stat.num}</div>
                  <div className="text-[0.78rem] text-text-muted uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-bg-card py-24 px-6 md:px-8">
        <div className="max-w-[1100px] mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="relative">
                {/* Large Decorative Box */}
                <div className="aspect-[4/5] bg-bg-card-hover rounded-2xl overflow-hidden border border-border-muted flex items-center justify-center relative">
                  <div className="absolute font-display text-8xl text-gold opacity-50 tracking-widest">JP</div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="font-display text-[5rem] text-gold opacity-[0.06] whitespace-pre text-center leading-none">JEAN{"\n"}PAUL</span>
                  </div>
                </div>
                
                {/* Small Box with Photo */}
                <div className="absolute -bottom-4 -right-4 w-3/5 h-3/5 border-2 border-gold rounded-xl overflow-hidden group shadow-2xl z-20">
                  <img 
                    src="https://picsum.photos/seed/jean-paul-portrait/800/1000" 
                    alt="Jean Paul" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent opacity-60" />
                </div>

                <div className="absolute top-6 -left-6 bg-gold text-black font-bold text-[0.8rem] px-4 py-2.5 rounded-lg shadow-[0_4px_20px_rgba(245,166,35,0.4)] whitespace-nowrap z-30">
                  🎬 5 ans d'expérience
                </div>
              </div>
            </Reveal>

            <div className="space-y-5">
              <Reveal>
                <SectionTag>À propos</SectionTag>
                <SectionTitle highlight="histoires">Raconter des</SectionTitle>
                <Divider />
                <div className="space-y-5 text-text-muted leading-relaxed text-lg">
                  <p>
                    Basé à <strong className="text-text-light font-medium">Cotonou, Bénin</strong>, je suis un monteur vidéo passionné par le storytelling visuel depuis plus de 5 ans. Formé à l'Académie des Arts Numériques de Lomé, j'ai travaillé pour des marques locales et internationales à travers toute l'Afrique de l'Ouest.
                  </p>
                  <p>
                    Mon approche : comprendre votre audience avant de toucher à la timeline. Chaque coupe, chaque transition, chaque musique est choisie pour <strong className="text-text-light font-medium">déclencher une émotion</strong> et pousser à l'action. Je maîtrise <strong className="text-text-light font-medium">Adobe Premiere Pro, After Effects, DaVinci Resolve</strong> et les formats adaptés aux réseaux sociaux africains.
                  </p>
                  <p>
                    Que vous soyez une PME béninoise, une agence de communication ou un créateur de contenu, je livre des vidéos qui font la différence — dans les délais, sans compromis sur la qualité.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 mt-8">
                  {['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Motion Design', 'Color Grading', 'Sound Design'].map(skill => (
                    <span key={skill} className="bg-gold/12 border border-gold/20 text-gold text-[0.75rem] px-3.5 py-1.5 rounded-full font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-bg-dark py-24 px-6 md:px-8">
        <div className="max-w-[1100px] mx-auto w-full">
          <Reveal>
            <SectionTag>Services</SectionTag>
            <SectionTitle highlight="crée">Ce que je</SectionTitle>
            <Divider />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Film size={22} />, name: 'Montage Publicitaire', desc: 'Spots TV et web percutants, montage professionnel with color grading cinématique adapté à votre charte graphique.', price: 'À partir de 50 000 FCFA' },
              { icon: <Instagram size={22} />, name: 'Reels & TikTok', desc: 'Vidéos courtes virales, tendance, avec musique tendance, transitions dynamiques et sous-titres stylisés pour booster votre engagement.', price: 'À partir de 15 000 FCFA' },
              { icon: <Wand2 size={22} />, name: 'Motion Design', desc: 'Animations graphiques, infographies animées, explainer videos — des visuels qui expliquent et captivent en même temps.', price: 'À partir de 35 000 FCFA' },
              { icon: <Type size={22} />, name: 'Génériques & Titres', desc: 'Intros et outros animés, titres cinématiques, jingles visuels pour vos émissions, podcasts vidéo et contenus YouTube.', price: 'À partir de 20 000 FCFA' },
            ].map((service, i) => (
              <div key={service.name}>
                <Reveal delay={i * 0.1}>
                  <div className="group bg-bg-card border border-border-muted rounded-xl p-8 transition-all duration-350 hover:border-gold/40 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                    <div className="relative z-10">
                      <div className="w-13 h-13 bg-gold/12 border border-gold/20 rounded-xl flex items-center justify-center text-gold mb-5">
                        {service.icon}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                      <p className="text-text-muted text-[0.88rem] leading-relaxed">{service.desc}</p>
                      <span className="inline-block mt-5 font-mono text-[0.78rem] text-gold">{service.price}</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-16 p-12 bg-gradient-to-br from-[#131313] to-[#1a1500] border border-gold/20 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="font-display text-3xl leading-tight mb-2">Prêt à collaborer ?<br /><span className="text-gold">Tarifs transparents.</span></h3>
                <p className="text-text-muted text-sm max-w-[420px]">Devis gratuit en 24h. Livraison rapide. Révisions incluses dans chaque formule.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  { val: '15K', lbl: 'FCFA / Reel' },
                  { val: '50K', lbl: 'FCFA / Pub' },
                  { val: '48h', lbl: 'Délai moyen' },
                ].map(item => (
                  <div key={item.lbl} className="text-center">
                    <div className="font-display text-4xl text-gold leading-none">{item.val}</div>
                    <div className="text-[0.75rem] text-text-muted uppercase tracking-wider mt-1">{item.lbl}</div>
                  </div>
                ))}
              </div>
              <a 
                href="https://wa.me/2290159173277?text=Bonjour%20Jean%20Paul%2C%20j'aimerais%20un%20devis." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25d366] text-white font-bold text-[0.9rem] px-7 py-3.5 rounded-lg shadow-[0_4px_24px_rgba(37,211,102,0.25)] hover:bg-[#1ebe5d] hover:-translate-y-0.5 transition-all duration-350"
              >
                <WhatsAppIcon size={18} /> Demander un devis
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-bg-card py-24 px-6 md:px-8">
        <div className="max-w-[1100px] mx-auto w-full">
          <Reveal>
            <SectionTag>Portfolio</SectionTag>
            <SectionTitle highlight="réalisations">Mes</SectionTitle>
            <Divider />
            <p className="text-text-muted max-w-[540px] text-[0.95rem] mb-10">Extraits de projets récents — publicités, reels et motion design pour des marques africaines et internationales.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 'jNQXAC9IVRw', tag: 'Motion Design • 2024', title: 'Showreel Motion Design — Jean Paul' },
              { id: 'M7lc1UVf-VE', tag: 'Social Media • 2024', title: 'Pack Reels & TikTok — Stratégie Virale' },
              { id: '_OBlgSz8sSM', tag: 'Publicité • 2023', title: 'Spot Publicitaire — Montage & Colorimétrie' },
              { id: 'hY7m5jjJ9mM', tag: 'Showreel • 2024', title: 'Best of Montage Vidéo — Jean Paul' },
            ].map((video, i) => (
              <div key={video.id}>
                <Reveal delay={i * 0.1}>
                  <div className="bg-bg-card-hover border border-border-muted rounded-xl overflow-hidden transition-all duration-350 hover:border-gold/35 hover:-translate-y-1">
                    <div className="aspect-video w-full">
                      <iframe 
                        src={`https://www.youtube.com/embed/${video.id}`} 
                        title={video.title} 
                        className="w-full h-full border-none"
                        allowFullScreen 
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="font-mono text-[0.68rem] text-gold uppercase tracking-widest">{video.tag}</div>
                      <h3 className="font-semibold text-[0.95rem] mt-1.5">{video.title}</h3>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-bg-dark py-24 px-6 md:px-8">
        <div className="max-w-[1100px] mx-auto w-full">
          <Reveal>
            <div className="text-center mb-4">
              <div className="flex justify-center"><SectionTag>Témoignages</SectionTag></div>
              <SectionTitle highlight="de moi">Ce qu'ils disent</SectionTitle>
              <div className="w-12 h-[3px] bg-gold rounded-sm mx-auto my-5 mb-12" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { initials: 'AF', name: 'Aminata Fofana', role: "Fondatrice, Beauté d'Ivoire — Abidjan", text: "JP a complètement transformé notre image sur Instagram. Nos reels font maintenant entre 50 000 et 200 000 vues. Il comprend exactement ce que veut notre audience africaine, et les délais sont toujours respectés. Je recommande sans hésitation !" },
              { initials: 'JK', name: 'Jean-Baptiste Kpossou', role: 'Directeur Marketing, BrewWest Cotonou', text: "Nous avons confié à JP le montage de notre spot TV pour le lancement de notre brasserie. Le résultat était époustouflant — un vrai niveau international, avec une sensibilité locale qu'on ne trouve pas ailleurs. Un grand professionnel." },
              { initials: 'SR', name: 'Safi Rouamba', role: 'YouTubeuse & Coach Business — Ouagadougou', text: "J'avais besoin de génériques animés pour ma chaîne YouTube dédiée à l'entrepreneuriat africain. JP a livré en 48h des animations qui m'ont valu des dizaines de compliments de mes abonnés. Prix très compétitif pour la qualité rendue !" },
            ].map((testi, i) => (
              <div key={testi.name}>
                <Reveal delay={i * 0.1}>
                  <div className="bg-bg-card border border-border-muted rounded-xl p-8 relative h-full flex flex-col">
                    <span className="font-display text-8xl text-gold opacity-15 absolute top-[-1rem] left-5 leading-none pointer-events-none">“</span>
                    <div className="flex text-gold gap-0.5 mb-4 relative z-10">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-text-muted text-[0.93rem] leading-relaxed mb-6 relative z-10 flex-grow italic">
                      {testi.text}
                    </p>
                    <div className="flex items-center gap-3.5 mt-auto">
                      <div className="w-10.5 h-10.5 bg-gold/12 border border-gold/30 rounded-full flex items-center justify-center font-bold text-[0.85rem] text-gold">
                        {testi.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-[0.9rem]">{testi.name}</div>
                        <div className="text-[0.78rem] text-text-muted">{testi.role}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-bg-card py-24 px-6 md:px-8 text-center">
        <div className="max-w-[640px] mx-auto w-full">
          <Reveal>
            <div className="flex justify-center"><SectionTag>Contact</SectionTag></div>
            <SectionTitle highlight="ensemble">Travaillons</SectionTitle>
            <div className="w-12 h-[3px] bg-gold rounded-sm mx-auto my-5 mb-6" />
            <p className="text-text-muted text-[0.95rem] mb-10">
              Une idée de projet ? Envoyez-moi un message sur WhatsApp ou via email. Je réponds en moins de 2h pendant les heures ouvrables.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a 
                href="https://wa.me/2290159173277" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-bg-card-hover border border-border-muted rounded-xl px-7 py-5 flex items-center gap-3 text-[0.88rem] text-text-muted hover:border-gold/35 hover:text-text-light transition-all duration-350"
              >
                <WhatsAppIcon size={18} className="text-gold" /> +229 01 59 17 32 77
              </a>
              <a href="mailto:jean.paul@gmail.com" className="bg-bg-card-hover border border-border-muted rounded-xl px-7 py-5 flex items-center gap-3 text-[0.88rem] text-text-muted hover:border-gold/35 hover:text-text-light transition-all duration-350">
                <Mail size={18} className="text-gold" /> jean.paul@gmail.com
              </a>
              <div className="bg-bg-card-hover border border-border-muted rounded-xl px-7 py-5 flex items-center gap-3 text-[0.88rem] text-text-muted">
                <MapPin size={18} className="text-gold" /> Cotonou, Bénin
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <a 
              href="https://wa.me/2290159173277?text=Bonjour%20Jean%20Paul%2C%20je%20voudrais%20d%C3%A9marrer%20un%20projet%20vid%C3%A9o." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25d366] text-white font-bold text-lg px-10 py-4.5 rounded-xl shadow-[0_6px_32px_rgba(37,211,102,0.3)] hover:bg-[#1ebe5d] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,211,102,0.4)] transition-all duration-350"
            >
              <WhatsAppIcon size={24} /> Démarrer un projet sur WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark border-t border-border-muted py-8 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-2xl text-gold tracking-wider">JEAN PAUL.</div>
        <p className="text-[0.78rem] text-text-muted">© 2024 Jean Paul — Monteur Vidéo & Motion Designer, Cotonou</p>
        <div className="flex gap-4">
          {[
            { icon: <Instagram size={18} />, href: '#' },
            { icon: <Youtube size={18} />, href: '#' },
            { icon: <WhatsAppIcon size={18} />, href: 'https://wa.me/2290159173277' },
          ].map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-muted hover:text-gold transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <motion.a 
        href="https://wa.me/2290159173277?text=Bonjour%20Jean%20Paul%2C%20j'aimerais%20discuter%20d'un%20projet."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        whileHover={{ scale: 1.1, rotate: -5 }}
        className="fixed bottom-8 right-8 z-[500] w-14.5 h-14.5 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-[0_4px_24px_rgba(37,211,102,0.45)] group"
      >
        <div className="absolute inset-0 bg-[#25d366] rounded-full animate-ping opacity-20" />
        <WhatsAppIcon size={26} className="relative z-10" />
      </motion.a>
    </div>
  );
}
