// app/page.js
'use client';

import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Seção Hero com imagem de fundo */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Desbrave o mundo sob as estrelas! ⭐⭐</h1>
          <h2>Sua jornada começa aqui! ✈️✈️</h2>
          <p className={styles.subtitle}>
            Encontre os melhores serviços de viagem para tornar sua experiência inesquecível.
          </p>
        </div>
      </div>

      {/* Restante do conteúdo */}
      <div className={styles.contentContainer}>
        {/* Área de busca */}
        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Buscar serviços, destinos, hotéis..."
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>
              🔍 Buscar
            </button>
          </div>
          
          <div className={styles.filters}>
            <select className={styles.filterSelect}>
              <option>Todas categorias</option>
              <option>Hospedagem</option>
              <option>Transporte</option>
              <option>Passeios</option>
            </select>
            
            <select className={styles.filterSelect}>
              <option>Qualquer preço</option>
              <option>Até R$ 100</option>
              <option>R$ 100-500</option>
              <option>Acima de R$ 500</option>
            </select>
          </div>
        </div>

        {/* Resultados em destaque */}
        <div className={styles.featuredServices}>
          <h3>Serviços em Destaque</h3>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h4>Passeio em Capitólio</h4>
              <p>Turismo de aventura - 6h de duração</p>
              <span className={styles.price}>R$ 199,99</span>
            </div>
            <div className={styles.serviceCard}>
              <h4>Trilha da Pedra Azul</h4>
              <p>Ecoturismo - 4h de duração</p>
              <span className={styles.price}>R$ 120,00</span>
            </div>
            <div className={styles.serviceCard}>
              <h4>Hotel Praia Dourada</h4>
              <p>Hospedagem - Café da manhã incluso</p>
              <span className={styles.price}>R$ 350,00/noite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;