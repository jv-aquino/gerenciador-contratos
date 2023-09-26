import Image from 'next/image';
import Link from 'next/link';

function Section({header, children}) {
  return (
    <div>
      <h3>{header}</h3>
      <ul>
        {children}
      </ul>
    </div>
  )
}

function Li({text, icon, link}) {
  return (
    <li className={"highlight "}>
      
      <Link href={link} target="_blank">
        <span className="symbol">{icon}</span>
        {text}
      </Link>

    </li>
  )
}

export default function Footer() {
  return (
    <footer className="bg-black grid px-2 py-7 mt-4">
      <Section header="Navegação">
        <Li text='Início'     link='/' icon='home' />
        <Li text='Contratos' link='/contratos' icon='sort' />
        <Li text='Pesquisar Contrato' link='/contratos/pesquisar' icon='search' />
        <Li text='Empresas' link='/empresas' icon='apartment' />
        <Li text='Fiscais' link='/servidores' icon='groups' />
        <Li text='Licitacoes' link='/licitacoes' icon='call' />
      </Section> 
      
      <Section header="Links">
        <Li text='Central de Acessos' link='https://sistemas.unesp.br/central/' icon='workspaces' />
        <Li text='BEC' link='http://www.bec.sp.gov.br/BECSP/Home/Home.aspx' icon='token' />
        <Li text='TCE-SP' link='https://www.tce.sp.gov.br/cadtcesp/' icon='school' />
        <Li text='Publicação DOE-SP' link='https://pubnet.imprensaoficial.com.br/' icon='dns' />
        <Li text='Site da STMA' link='https://transparencia-compras.vercel.app/' icon='link' />
      </Section>
          

      <Image src="/logoUnespBranco.png" alt="Logo da Unesp" width={300} height={100} className="justify-self-center self-center"/>
    </footer>
  );
}