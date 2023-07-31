import Image from 'next/image'

export default function Carregando() {
  return (
    <>
      <Image src="/hourglass.png" width={140} height={260} alt='Carregando...' className='ampulheta' />
    </>
  )
}