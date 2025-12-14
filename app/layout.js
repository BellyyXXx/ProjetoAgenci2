// app/layout.js
import './globals.css';
import Menu from "../componentes/menu";
import styles from './layout.module.css';

export const metadata = {
  title: 'Agência de Viagens - Sistema de Gestão',
  description: 'Sistema completo para gestão de agência de viagens, clientes, reservas e serviços',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={styles.body}>
        {/* Overlay de fundo */}
        <div className={styles.backgroundOverlay}></div>
        
        {/* Container principal */}
        <div className={styles.container}>
          
          {/* Header com menu */}
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.logoSection}>
                <div className={styles.logo}>
                  <span className={styles.logoIcon}>✈️</span>
                  <div className={styles.logoText}>
                    <h1 className={styles.logoTitle}>OrionTour</h1>
                    <p className={styles.logoSubtitle}>Sistema de Gestão</p>
                  </div>
                </div>
                <div className={styles.systemInfo}>
                  <div className={styles.infoBadge}>
                    <span className={styles.infoIcon}>🚀</span>
                    <span className={styles.infoText}>Online</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.menuContainer}>
                <Menu />
              </div>
            </div>
          </header>

          {/* Conteúdo principal */}
          <main className={styles.main}>
            <div className={styles.contentWrapper}>
              <div className={styles.contentHeader}>
                <div className={styles.breadcrumb}>
                  <span className={styles.breadcrumbHome}>🏠 Início</span>
                  <span className={styles.breadcrumbSeparator}>›</span>
                  <span className={styles.breadcrumbCurrent}>Dashboard</span>
                </div>
                <div className={styles.pageActions}>
                  <button className={styles.helpButton}>
                    <span className={styles.helpIcon}>❓</span>
                    Ajuda
                  </button>
                  <button className={styles.notificationButton}>
                    <span className={styles.notificationIcon}>🔔</span>
                    <span className={styles.notificationBadge}>3</span>
                  </button>
                </div>
              </div>
              
              <div className={styles.content}>
                {children}
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <div className={styles.footerSection}>
                <div className={styles.footerLogo}>
                  <span className={styles.footerLogoIcon}>✈️</span>
                  <span className={styles.footerLogoText}>OrionTour</span>
                </div>
                <p className={styles.footerDescription}>
                  Sistema de gestão para agências de viagem
                </p>
              </div>
              
              <div className={styles.footerSection}>
                <h4 className={styles.footerTitle}>Desenvolvido por</h4>
                <div className={styles.developerInfo}>
                  <div className={styles.developerAvatar}>C</div>
                  <div className={styles.developerDetails}>
                    <p className={styles.developerName}>Cibelly</p>
                    <p className={styles.developerContact}>Projeto de Gestão</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.footerSection}>
                <h4 className={styles.footerTitle}>Links Úteis</h4>
                <ul className={styles.footerLinks}>
                  <li><a href="/docs" className={styles.footerLink}>Documentação</a></li>
                  <li><a href="/suporte" className={styles.footerLink}>Suporte</a></li>
                  <li><a href="/sobre" className={styles.footerLink}>Sobre o Sistema</a></li>
                </ul>
              </div>
            </div>
            
            <div className={styles.footerBottom}>
              <p className={styles.copyright}>
                © {new Date().getFullYear()} TravelSync - Todos os direitos reservados
              </p>
              <div className={styles.footerStats}>
                <span className={styles.statItem}>
                  <span className={styles.statIcon}>👥</span>
                  <span className={styles.statText}>Usuários ativos</span>
                </span>
                <span className={styles.statItem}>
                  <span className={styles.statIcon}>✅</span>
                  <span className={styles.statText}>Sistema estável</span>
                </span>
              </div>
            </div>
          </footer>
        </div>

        {/* Botão flutuante de ajuda */}
        <button className={styles.floatingHelpButton}>
          <span className={styles.floatingIcon}>💬</span>
          <span className={styles.floatingText}>Precisa de ajuda?</span>
        </button>
      </body>
    </html>
  )
}