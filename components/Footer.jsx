"use client"

import React, { useCallback } from 'react';
import Image from 'next/image';

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
      
      <a href={link} target="_blank">
        <span className="symbol">{icon}</span>
        {text}
      </a>

    </li>
  )
}

function Footer({ onLiClick }) {
  const handleLiClick = useCallback(onLiClick, [onLiClick]);

  return (
    <footer className="bg-black grid px-2 py-7 mt-5">
      <Section header="Navegação">
        <Li text='Início'     link='/' icon='home' />
        <Li text='Contratos' link='/contratos' icon='sort' />
        <Li text='Pesquisar Contratos' link='/contratos/pesquisar' icon='edit_square' />
        <Li text='Empresas' link='/empresas' icon='apartment' />
        <Li text='Fiscais' link='/servidores' icon='groups' />
        <Li text='Licitacoes' link='/licitacoes' icon='call' />
      </Section> 
      
      <Section header="Links">
        <Li text='Central de Acessos' link='https://sistemas.unesp.br/central/' icon='workspaces' />
        <Li text='BEC' link='http://www.bec.sp.gov.br/BECSP/Home/Home.aspx' icon='token' />
        <Li text='TCE-SP' link='https://www.tce.sp.gov.br/cadtcesp/' icon='school' />
        <Li text='Publicação DOE-SP' link='https://pubnet.imprensaoficial.com.br/' icon='dns' />
        <Li text='Site da STMA' link='https://www.feg.unesp.br/#!/instituicao/secao-tecnica-de-materiais/' icon='link' />
      </Section>
          

      <Image src="/logoUnesp.png" alt="Logo da Unesp" width={80} height={20} className="justify-self-center self-center cursor-pointer"
      onClick={() => {
        handleLiClick("início");
        document.querySelector("#nav").scrollIntoView({ behavior: 'smooth' })
      }}/>
    </footer>
  );
}

export default React.memo(Footer);