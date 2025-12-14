// app/componentes/menu.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './menu.module.css';

function Menu() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Dados dos itens do menu
    const menuItems = [
        { href: "/", label: "Home", icon: "🏠", color: "#667eea" },
        { href: "/clientes", label: "Clientes", icon: "👥", color: "#48bb78" },
        { href: "/aeroportos", label: "Aeroportos", icon: "✈️", color: "#ed8936" },
        { href: "/servicos", label: "Serviços", icon: "🔧", color: "#ed64a6" },
        { href: "/destino", label: "Destino", icon: "📍", color: "#9f7aea" },
        { href: "/companhiaAerea", label: "Companhia Aérea", icon: "🛫", color: "#4299e1" },
        { href: "/reserva", label: "Reserva", icon: "📅", color: "#0bc5ea" },
        { href: "/servicoVoo", label: "Serviço Voo", icon: "🎫", color: "#38b2ac" },
        { href: "/servicoDestino", label: "Serviço Destino", icon: "🌴", color: "#68d391" },
        { href: "/agendamentoVoo", label: "Agendamento Voo", icon: "🗓️", color: "#f6ad55" },
        { href: "/avaliacao", label: "Avaliação", icon: "⭐", color: "#fbb6ce" },
        { href: "/itemReserva", label: "Item Reserva", icon: "📋", color: "#b794f4" },
        { href: "/pagamento", label: "Pagamento", icon: "💳", color: "#90cdf4" },
    ];

    return (
        <nav className={styles.nav}>
            {/* Botão para menu mobile */}
            <button 
                className={styles.mobileToggle}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Alternar menu"
            >
                <span className={styles.hamburger}>
                    {isMobileMenuOpen ? '✕' : '☰'}
                </span>
                <span className={styles.menuLabel}>Menu</span>
            </button>

            {/* Menu principal */}
            <div className={`${styles.menuContainer} ${isMobileMenuOpen ? styles.menuOpen : ''}`}>
                <ul className={styles.menuList}>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        
                        return (
                            <li key={item.href} className={styles.menuItem}>
                                <Link 
                                    href={item.href}
                                    className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        '--item-color': item.color,
                                        '--item-hover-color': `${item.color}20`
                                    }}
                                >
                                    <span className={styles.menuIcon}>{item.icon}</span>
                                    <span className={styles.menuText}>{item.label}</span>
                                    
                                    {isActive && (
                                        <span className={styles.activeIndicator}></span>
                                    )}
                                    
                                    {/* Efeito de brilho ativo */}
                                    {isActive && (
                                        <span className={styles.activeGlow}></span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Status do sistema (mobile) */}
                <div className={styles.systemStatus}>
                    <div className={styles.statusDot}></div>
                    <span className={styles.statusText}>Sistema Online</span>
                </div>
            </div>

            {/* Overlay para fechar menu mobile */}
            {isMobileMenuOpen && (
                <div 
                    className={styles.overlay}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </nav>
    );
}

export default Menu;