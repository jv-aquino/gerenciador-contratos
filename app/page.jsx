"use client"

import Navbar from '@/components/Navbar'

import Login from '@/app/login'

import supabase from '@/lib/supabase'
import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <>
      <h1>Início</h1>
      <div className="content">
        <p>Sistema de gerenciamento de contratos desenvolvido pela Faculdade de Engenharia de Guaratinguetá, UNESP. Atualmente em desenvolvimento, o sistema pretende substituir o atual siscontratos para maior facilidade de acesso e visualização, além de alertar sobre datas importantes relacionadas aos contratos.</p>
      </div>
    </>
  )
}
