import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo-on.png"


export default function Home() {
  return (
    // <main className="flex flex-col items-center xl:items-start justify-around relative z-50 w-full h-[100%]  border border-slate-900 overflow-hidden bg-image text-white">

    // <div className="bg-image2 w-full h-[100%] absolute top-0 bottom-0 -z-50 lg:hidden" />

    // <nav className="absolute top-0 bg-[#202022] text-slate-800 w-full p-2 ">

    //   <div className="flex flex-row items-center justify-between w-full max-w-[1920px] mx-auto">
    //   <Image src={Logo} alt= "Logo Digital Money App" className="w-14 xl:w-28 ml-2"/> 
    //   <div className="flex flex-row gap-x-2 md:mr-2">

    //     <Link className="bg-[#202022] border border-greenlime text-greenlime px-3 py-2 rounded-md font-bold w-[120px] xl:w-[185px] text-center text-xs md:text-sm hover:text-gray-950 hover:bg-slate-300 hover:border-slate-900 transition-all duration-100 xl:text-lg xl:py-2" href="/login" id="loginButton"> Ingresar </Link>


    //     <Link className="bg-greenlime text-[#202022] px-3 py-2 rounded-md font-bold w-[120px] text-center text-xs md:text-sm border border-transparent hover:text-gray-950 hover:bg-slate-300 hover:border-slate-900 transition-all duration-100 xl:text-lg xl:w-[185px] xl:py-2"  href="/register" id="registerButton"> Crear 
    //     Cuenta  </Link>

    //   </div>
    //   </div>

    // </nav>

    //  <section className="flex flex-col w-[95%] xl:w-[60%]  mt-4 md:mt-14 mb-6 max-w-[1834px] md:ml-10 ">
    //   <h3 className="text-2xl md:text-4xl xl:text-5xl mb-1 font-extralight 
    //                  md:text-start"> De ahora en adelante ,  </h3>
    //   <h3 className="text-2xl md:text-4xl  xl:text-5xl mb-1 font-extralight 
    //                  md:text-start">  hace mas con tu dinero </h3>
    //   <div className="w-[20%] border-b-4 border-greenlime md:border-none my-2" />
    //   <h4 className="text-2xl md:text-4xl xl:text-5xl text-greenlime 
    //                  md:text-start"> Tu nueva  <br className="md:hidden"/>
    //                  <span className="font-semibold"> 
    //                   billetera virtual</span> 
    //   </h4>
    //  </section>

    //   <section className="w-[95%] xl:w-[60%] flex flex-col justify-center items-center lg:flex-row gap-2 max-w-[1440px] mx-auto -mt-20 text-black">

    //     <Link href="/login" className="bg-white flex flex-col gap-2 p-3 xl:p-6 md:p-4 rounded-3xl md:w-[70%] lg:w-[50%] shadow-lg h-[150px] md:h-[200px] xl:h-[250px] hover:bg-slate-300 hover:text-black transition-all duration-100 group">
    //     <article>
    //       <h4 className="border-b-2 border-greenlime mb-2 pb-2 text-xl md:text-3xl  group-hover:border-lime-600 font-bold">
    //         Transferi Dinero
    //       </h4>
    //       <p className="text-sm md:text-base xl:text-lg font-medium"> Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como tambien recibir transferencias y nuclear tu capital en nuestra billetera virtual </p>
    //     </article>
    //     </Link>

    //     <Link href="/login" className="bg-white flex flex-col gap-2 p-3 xl:p-6 md:p-4 rounded-3xl md:w-[70%] lg:w-[50%] shadow-lg h-[150px] md:h-[200px] xl:h-[250px]  hover:bg-slate-300 hover:text-black transition-all duration-200 group ">
    //     <article>
    //     <h4 className="border-b-2 border-greenlime mb-2 pb-2 text-xl md:text-3xl  group-hover:border-lime-600 font-bold">
    //         Pago de Servicios
    //       </h4>
    //       <p className="text-sm md:text-base xl:text-lg">  Paga mensualmente los servicios en 3 simples clicks, Facil, rapido y conveniente.Olvidate de las facturas en papel </p>
    //     </article>
    //     </Link>
    //   </section>

    //   <div className="absolute bg-greenlime w-full rounded-t-3xl h-[35%] xl:h-[25%] -z-20 bottom-0" />

    //   <footer className="absolute bottom-0 bg-greylight text-greenlime w-full p-3 ">
    //     <p className="text-sm text-center md:text-start"> 2024 Digital Money App </p>
    //   </footer>

    // </main>
    <main className="w-full h-[100%] relative flex flex-col justify-around bg-image ">

      <div className="bg-image2 h-[100%] w-full absolute top-0 bottom-0 z-10 md:hidden" />

      <nav className="w-full bg-graydark h-[64px] lg:h-[70px] flex flex-row items-center z-50">
        <div className="w-full max-w-[1920px] mx-auto flex flex-row items-center justify-between">

          <Image src={Logo} className="w-14 md:w-20 lg:w-24 ml-4" />

          <div className="mr-4 flex flex-row gap-x-2">
            <Link href="/login" className="text-greenlime border border-greenlime w-[105px] text-center py-2 rounded-md font-semibold text-sm
            lg:text-base lg:w-[135px]"> Ingresar </Link>
            <Link href="/register" className="text-graydark bg-greenlime w-[105px] text-center py-2 rounded-md font-semibold text-sm
            lg:text-base lg:w-[135px]"> Crear cuenta </Link>
          </div>

        </div>
      </nav>

      <main className="w-full max-w-[1920px] h-[calc(100%-128px)] mx-auto z-50 flex flex-col justify-between
      lg:h-[calc(100%-134px)] ">

        <section className="flex flex-col ">
          <h3 className="text-white text-xl w-[50%] mt-2 ml-2 md:mt-20 md:ml-20 md:text-4xl
          lg:text-6xl
          xl:w-[30%]">

            De ahora en <br className="hidden md:flex"/>adelante, hacés mas con tu dinero
          </h3>

          <div className="border-b-2 border-greenlime w-[30%] ml-2 my-1
          md:hidden" />
          <h3 className="text-greenlime ml-2 text-lg 
          md:text-3xl  md:ml-20 md:mt-5
          lg:lg:text-5xl">
            Tu nueva
            <br className="md:hidden"/>
            <span className="font-bold"> billetera virtual </span>
          </h3>
        </section>



        <section className="z-50 w-full max-w-[1920px] mx-auto flex flex-col gap-y-2 mb-4 lg:mb-24
        xl:flex-row xl:gap-x-3 xl:justify-center xl:items-center">
         
          <Link href={"/login"} className="bg-white h-[175px] w-[90%] mx-auto p-3 rounded-3xl max-w-[400px] 
         lg:h-[250px] lg:max-w-[650px] lg:p-6
         xl:w-[50%] xl:mx-0">
            <h6 className="text-2xl font-bold
            lg:text-4xl"> Transferí dinero </h6>
            <div className="border-2 border-greenlime w-full mx-auto my-2" />
            <p className="text-sm
            lg:text-xl"> Desde Digital Money House vas a poder transferir dinero a otras cuentas , asi comotambien recibir trasnferencias y nuclear tu capital en nuestra billetera virtual</p>
          </Link>

          <Link href={"/login"} className="bg-white h-[175px] w-[90%] mx-auto p-3 rounded-3xl max-w-[400px] 
         lg:h-[250px] lg:max-w-[650px] lg:p-6
         xl:w-[50%] xl:mx-0">
            <h6 className="text-2xl font-bold
             lg:text-4xl"> Pago de servicios </h6>
            <div className="border-2 border-greenlime w-full mx-auto my-2" />
            <p className="text-sm
             lg:text-xl"> Paga mensualmente los servicios en 3 simples clicks. Facil, rapido y conveniente.Olvidate de las facturas en papel</p>
          </Link>
         
        </section>

        <div className="bg-greenlime h-[35%] w-full absolute bottom-0 left-0 z-10 rounded-t-3xl
        lg:h-[30%]"/>

      </main>

      <footer className="h-[64px] bg-greylight text-greenlime z-50 flex flex-row items-center justify-center lg:justify-start">
        <h6 className="text-center lg:ml-8 "> 2024 Digital Money App </h6>
      </footer>

    </main>
  );
}
