import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <div className="flex justify-center  flex-col items-center text-white h-[44vh] gap-4 px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold md:text-5xl flex justify-center text-3xl items-center gap-2 md:gap-5">Buy ME a Chai <span><img src="/tea.png" alt="" width={50} /></span></div>
        <p className="text-center md:text-left">
          A crowdfunding platform for creators. Get funded by your fans and followers. Start now!
        </p>
        <p className="text-center md:text-left">
          a place where you can fund your favourite creator
        </p>
        <div>
          <Link href="/login" >
            <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>

          <Link href="/about" >
            <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>

        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-20 pt-14 px-10 ">
        <h2 className="text-3xl font-bold text-center mb-14">Your Fans can buy you a Chai</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full  text-black" width={70} src="/computer.png" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className=" text-center">Yours fans are available for you to help you</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full text-black" width={70} src="/dollar.gif" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className=" text-center">Yours fans are available for you to help you</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full  text-black" width={70} src="/discussion.gif" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className=" text-center">Yours fans are available for you to help you</p>
          </div>

        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more About us</h2>
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh] ">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/QtaorVNAwbI?si=Bdp62jv1-3rmbmSM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowfullscreen></iframe>
        </div>
      </div>
    </>
  );
}
