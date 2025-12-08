import Menu from "../componentes/menu";

export const metadata = {

  title:  ['Clientes', 'Aeroportos', 'Destino', 'Serviço', 'Companhia Aerea', 'Item Reserva', 'Reserva'],

  description: 'Projeto Node.js com Next.js',

}


export default function RootLayout({ children }) {

  return (

    <html lang="en">

      <body>

        <header>

          <Menu />

        </header>

        <main>

          {children}

        </main>

        <footer>

          <p>Cibelly.</p>

        </footer>

      </body>

    </html>

  )

}
