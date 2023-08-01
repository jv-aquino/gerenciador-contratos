import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function POST (req) {
  try {
    const body = await req.json();

    const data = body.data;
    const user = body.user;
    console.log(user);

    if (!user) {
      return new NextResponse("Operação não permitida (usuário não está logado)", { status: 401 });
    }

    const { res, error } = await supabase
    .from('contrato')
    .insert([ data ])

    if ( error, err ) { throw error }

    return NextResponse.json(res);
  } 
  catch (error) {
    console.log("CONTRATO_POST: ", error)
    return new NextResponse("Dados inválidos ou erro do servidor", { status: 500 })
  }
}